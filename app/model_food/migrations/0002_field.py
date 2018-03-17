# -*- coding: utf-8 -*-
# Generated by Django 1.10.4 on 2018-02-08 01:03
from __future__ import unicode_literals

import django.contrib.postgres.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('model_food', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Field',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=60, unique=True)),
                ('data', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=60, unique=True), size=None)),
                ('classify', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='model_food_classify', to='model_food.Classify')),
            ],
            options={
                'abstract': False,
                'db_table': 'model_food_field',
            },
        ),
    ]