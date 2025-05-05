import json
import openai
from django.conf import settings
from channels.generic.websocket import AsyncWebsocketConsumer


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        self.thread_id = None

    async def receive(self, text_data):
        data = json.loads(text_data)
        user_message = data["message"]

        if not self.thread_id:
            self.thread_id = await self.create_openai_thread()

        response = await self.send_message_to_openai(self.thread_id, user_message)

        await self.send(text_data=json.dumps({"message": response}))

    async def create_openai_thread(self):
        client = openai.OpenAI(api_key=settings.OPENAI_API_KEY)
        thread = client.beta.threads.create()
        return thread.id  # Возвращаем уникальный thread_id

    async def send_message_to_openai(self, thread_id, message):
        client = openai.OpenAI(api_key=settings.OPENAI_API_KEY)

        client.beta.threads.messages.create(
            thread_id=thread_id,
            role="user",
            content=message
        )

        run = client.beta.threads.runs.create(
            thread_id=thread_id,
            assistant_id=settings.OPENAI_ASSISTANT_ID
        )

        while True:
            run_status = client.beta.threads.runs.retrieve(thread_id=thread_id, run_id=run.id)
            if run_status.status == "completed":
                break

        messages = client.beta.threads.messages.list(thread_id=thread_id)
        return messages.data[0].content[0].text.value if messages.data else "Ошибка получения ответа"
