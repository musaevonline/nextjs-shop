from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations


def create_default_site(apps, schema_editor):
    SiteSettings = apps.get_model("site", "SiteSettings")
    Site = apps.get_model("sites", "Site")
    settings_id = getattr(settings, "SITE_ID", None)
    site, dummy_created = Site.objects.get_or_create(
        domain='localhost:8000', defaults={"name": 'StroyLux'}
    )
    SiteSettings.objects.get_or_create(
        pk=settings_id,
        site=site,
        defaults={
            "header_text": "StroyLux - a sample shop!",
        },
    )

class Migration(migrations.Migration):

    dependencies = [("site", "0001_initial")]

    operations = [
        migrations.RunPython(create_default_site, lambda app, schema_editor: None)
    ]