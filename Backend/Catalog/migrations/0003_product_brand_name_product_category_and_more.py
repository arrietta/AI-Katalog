# Generated by Django 5.1.6 on 2025-05-03 13:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Catalog', '0002_product_description_alter_marketplace_id_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='brand_name',
            field=models.CharField(default='None', max_length=255),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='product',
            name='category',
            field=models.CharField(default='Категория', max_length=255, verbose_name='Категория'),
        ),
        migrations.AddField(
            model_name='product',
            name='image_url',
            field=models.URLField(default='Photo', max_length=500, verbose_name='Фото'),
        ),
        migrations.AddField(
            model_name='product',
            name='product_url',
            field=models.URLField(default='Link', max_length=500, verbose_name='Сылка'),
        ),
        migrations.AddField(
            model_name='product',
            name='sub_category',
            field=models.CharField(default='Под Категория', max_length=255, verbose_name='Под Категория'),
        ),
    ]
