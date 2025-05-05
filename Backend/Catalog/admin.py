from django.contrib import admin
from .models import Category, SubCategory, Product, Marketplace, Favorite, Review, Brand


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)


@admin.register(SubCategory)
class SubCategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'category')
    list_filter = ('category',)
    search_fields = ('name', 'category__name')


@admin.register(Marketplace)
class MarketplaceAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'product', 'price', 'link')
    search_fields = ('name', 'product__name')
    list_filter = ('name',)
    autocomplete_fields = ('product',)


class MarketplaceInline(admin.TabularInline):
    model = Marketplace
    extra = 1
    fields = ('name', 'link', 'price')
    readonly_fields = ('id',)
    show_change_link = True

    def has_add_permission(self, request, obj):
        # Разрешаем добавление только при редактировании (не при создании)
        return obj is not None


@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)
    list_filter = ('name',)


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'sub_category', 'brand_name', 'popularity', 'like_count')
    search_fields = ('name', 'brand_name', 'sub_category__name')
    list_filter = ('sub_category__category', 'sub_category', 'brand_name')
    inlines = [MarketplaceInline]

    fieldsets = (
        ('Основная информация', {
            'fields': ('id', 'name', 'description', 'image_url')
        }),
        ('Категория и Бренд', {
            'fields': ('sub_category', 'brand_name')
        }),
        ('Дополнительно', {
            'fields': ('popularity', 'like_count', 'characteristics')
        }),
    )

    def get_inline_instances(self, request, obj=None):
        # Отключаем инлайны, если объект ещё не создан
        if obj is None:
            return []
        return super().get_inline_instances(request, obj)


@admin.register(Favorite)
class FavoriteAdmin(admin.ModelAdmin):
    list_display = ('user', 'product')
    search_fields = ('user__email', 'product__name')
    autocomplete_fields = ('user', 'product')


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('user', 'product', 'rating')
    search_fields = ('user__email', 'product__name', 'text')
    list_filter = ('rating',)
    autocomplete_fields = ('user', 'product')
