# Generated by Django 3.0.5 on 2020-05-24 13:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shipping', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='shippingmethod',
            name='description',
            field=models.TextField(blank=True),
        ),
    ]
