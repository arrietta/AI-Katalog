# Generated by Django 5.1.6 on 2025-05-04 12:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Catalog', '0003_product_brand_name_product_category_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='product_url',
            field=models.URLField(blank=True, default='Link', max_length=500, null=True, verbose_name='Сылка'),
        ),
    ]
