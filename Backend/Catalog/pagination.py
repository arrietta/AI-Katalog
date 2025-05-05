from rest_framework.pagination import PageNumberPagination


class CustomPageNumberPagination(PageNumberPagination):
    page_size = 10  # стандартный размер страницы
    page_size_query_param = 'page_size'  # позволяет переопределять через URL
    max_page_size = 100  # ограничение, чтобы не грузить слишком много
