import { useEffect, useRef, useState } from 'react';
import { extractProductIds } from '../utils/extractProductIds';
import { fetchProductsByIds } from '../utils/fetchProducts';
import ProductCard from '../components/ProductCard';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const socketRef = useRef(null);
    const chatBoxRef = useRef(null);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8000/ws/chat/');
        socketRef.current = socket;

        socket.onmessage = async (event) => {
            const data = JSON.parse(event.data);
            const text = data.message;

            const ai_message = /\d+/.test(text) ? 'Пожалуйста, вот подходящие товары:' : text;

            // 1. Добавляем текстовое сообщение от ИИ
            setMessages((prev) => [
                ...prev,
                { text: ai_message, type: 'ai' }
            ]);

            // 2. Если есть ID товаров — загружаем и отображаем
            const ids = extractProductIds(text);
            if (ids.length > 0) {
                setIsLoading(true);
                try {
                    const products = await fetchProductsByIds(ids);
                    setMessages((prev) => [
                        ...prev,
                        {
                            text: '', // можно оставить пустым, т.к. есть карточки
                            type: 'ai',
                            productCards: products,
                        },
                    ]);
                } catch (error) {
                    console.error('Ошибка при загрузке товаров:', error);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        return () => socket.close();
    }, []);

    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [messages]);

    const sendMessage = () => {
        if (!input.trim()) return;

        // 1. Отображаем сообщение пользователя
        setMessages((prev) => [...prev, { text: input, type: 'user' }]);

        // 2. Отображаем статус загрузки
        setMessages((prev) => [...prev, { text: 'Идет поиск товаров...', type: 'loading' }]);

        // 3. Отправляем на сервер
        socketRef.current?.send(JSON.stringify({ message: input }));
        setInput('');
    };

    return (
        <div className='w-full bg-[#191A1F]'>
            <div className="flex flex-col h-[calc(100vh-80px)] text-white px-4 py-6 max-w-3xl mx-auto w-full">
                <div ref={chatBoxRef} className="flex-1 overflow-y-auto space-y-6 pr-2 scroll-smooth">
                    {messages.map((msg, index) => (
                        <div key={index} className="space-y-2">
                            {msg.text && (
                                <div
                                    className={`max-w-[75%] px-4 py-3 rounded-xl text-sm whitespace-pre-wrap break-words opacity-90 animate-fadeIn ${
                                        msg.type === 'user'
                                            ? 'bg-[#a78bfa] text-white self-end ml-auto'
                                            : msg.type === 'ai'
                                            ? 'bg-[#2a2a2a] text-white'
                                            : 'animate-pulse text-gray-400'
                                    }`}
                                >
                                    {msg.text}
                                </div>
                            )}

                            {msg.productCards && (
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                                    {msg.productCards.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="flex gap-2 mt-4">
                    <input
                        type="text"
                        className="flex-1 p-2 rounded bg-[#2a2a2a] text-white focus:outline-none"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder="Введите сообщение..."
                    />
                    <button
                        onClick={sendMessage}
                        className="px-4 py-2 bg-[#a78bfa] text-white rounded hover:bg-[#8b5cf6] transition"
                    >
                        Отправить
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
