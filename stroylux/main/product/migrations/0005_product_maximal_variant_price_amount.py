# Generated by Django 3.0.5 on 2020-06-14 16:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0004_auto_20200614_1137'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='maximal_variant_price_amount',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=12),
        ),
    ]