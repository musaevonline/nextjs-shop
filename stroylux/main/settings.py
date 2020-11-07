import ast
import os
import warnings
from datetime import timedelta

import dj_database_url
import dj_email_url
from django.core.exceptions import ImproperlyConfigured
from django.core.management.utils import get_random_secret_key
from django_prices.utils.formatting import get_currency_fraction

SITE_ID = 1
REAL_IP_ENVIRON = os.environ.get("REAL_IP_ENVIRON", "REMOTE_ADDR")
GOOGLE_ANALYTICS_TRACKING_ID = ''


def get_list(text):
    return [item.strip() for item in text.split(",")]


def get_bool_from_env(name, default_value):
    if name in os.environ:
        value = os.environ[name]
        try:
            return ast.literal_eval(value)
        except ValueError as e:
            raise ValueError("{} is an invalid value for {}".format(value, name)) from e
    return default_value


BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROJECT_ROOT = os.path.normpath(os.path.join(os.path.dirname(__file__), ".."))
DEBUG = get_bool_from_env("DEBUG", True)

ADMINS = (
    ('admin', 'admin@admin.com'),
)
MANAGERS = ADMINS
_DEFAULT_CLIENT_HOSTS = "localhost,127.0.0.1"
ALLOWED_CLIENT_HOSTS = os.environ.get("ALLOWED_CLIENT_HOSTS")
if not ALLOWED_CLIENT_HOSTS:
    if DEBUG:
        ALLOWED_CLIENT_HOSTS = _DEFAULT_CLIENT_HOSTS
    else:
        raise ImproperlyConfigured(
            "ALLOWED_CLIENT_HOSTS environment variable must be set when DEBUG=False."
        )
ALLOWED_CLIENT_HOSTS = get_list(ALLOWED_CLIENT_HOSTS)
INTERNAL_IPS = get_list(os.environ.get("INTERNAL_IPS", "127.0.0.1"))

ROOT_URLCONF = 'main.urls'

WSGI_APPLICATION = 'main.wsgi.application'

DATABASES = {
    "default": dj_database_url.config(
        default="postgres://stroylux:stroylux@localhost:5432/stroylux", conn_max_age=600
    )
}

LANGUAGE_CODE = 'ru'

TIME_ZONE = 'Europe/Minsk'

USE_I18N = True

USE_L10N = True

USE_TZ = True

EMAIL_URL = os.environ.get("EMAIL_URL")
SENDGRID_USERNAME = os.environ.get("SENDGRID_USERNAME")
SENDGRID_PASSWORD = os.environ.get("SENDGRID_PASSWORD")
if not EMAIL_URL and SENDGRID_USERNAME and SENDGRID_PASSWORD:
    EMAIL_URL = "smtp://%s:%s@mail.stroyluxdrev.by:587/?tls=True" % (
        SENDGRID_USERNAME,
        SENDGRID_PASSWORD,
    )
email_config = dj_email_url.parse(
    EMAIL_URL or 'console://' or "console://demo@example.com:console@example/"
)

EMAIL_FILE_PATH = email_config["EMAIL_FILE_PATH"]
EMAIL_HOST_USER = email_config["EMAIL_HOST_USER"]
EMAIL_HOST_PASSWORD = email_config["EMAIL_HOST_PASSWORD"]
EMAIL_HOST = os.environ.get('EMAIL_HOST') or email_config["EMAIL_HOST"]
EMAIL_PORT = os.environ.get('EMAIL_PORT') or email_config["EMAIL_PORT"]
EMAIL_BACKEND = os.environ.get('EMAIL_BACKEND') or email_config["EMAIL_BACKEND"]
EMAIL_USE_TLS = email_config["EMAIL_USE_TLS"]
EMAIL_USE_SSL = email_config["EMAIL_USE_SSL"]

# If enabled, make sure you have set proper storefront address in ALLOWED_CLIENT_HOSTS.
ENABLE_ACCOUNT_CONFIRMATION_BY_EMAIL = get_bool_from_env(
    "ENABLE_ACCOUNT_CONFIRMATION_BY_EMAIL", False
)

ENABLE_SSL = get_bool_from_env("ENABLE_SSL", False)
if ENABLE_SSL:
    SECURE_SSL_REDIRECT = not DEBUG


DEFAULT_FROM_EMAIL = os.environ.get("DEFAULT_FROM_EMAIL", EMAIL_HOST_USER)
# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.0/howto/static-files/

MEDIA_ROOT = os.path.join(PROJECT_ROOT, "media")
MEDIA_URL = os.environ.get("MEDIA_URL", "/media/")

STATIC_ROOT = os.path.join(PROJECT_ROOT, "static")
STATIC_URL = os.environ.get("STATIC_URL", "/static/")
STATICFILES_DIRS = [
    ("images", os.path.join(PROJECT_ROOT, "main", "static", "images"))
]
STATICFILES_FINDERS = [
    "django.contrib.staticfiles.finders.FileSystemFinder",
    "django.contrib.staticfiles.finders.AppDirectoriesFinder",
]

context_processors = [
    'django.contrib.auth.context_processors.auth',
    'django.contrib.messages.context_processors.messages',

    "django.template.context_processors.debug",
    "django.template.context_processors.media",
    "django.template.context_processors.static",
    "main.site.context_processors.site",
]

loaders = [
    "django.template.loaders.filesystem.Loader",
    "django.template.loaders.app_directories.Loader",
]
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [os.path.join(PROJECT_ROOT, "templates")],
        "OPTIONS": {
            "debug": DEBUG,
            "context_processors": context_processors,
            "loaders": loaders,
            "string_if_invalid": '<< MISSING VARIABLE "%s" >>' if DEBUG else "",
        },
    }
]

SECRET_KEY = os.environ.get("SECRET_KEY", "q@akg7^)mb)kq0el=0f0bhetgy+9=@a@bkx14m98&fgqu^clex")

if not SECRET_KEY and DEBUG:
    warnings.warn("SECRET_KEY not configured, using a random temporary key.")
    SECRET_KEY = get_random_secret_key()

MIDDLEWARE = [
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',

    "django.middleware.security.SecurityMiddleware",
    "django.middleware.common.CommonMiddleware",

    "main.core.middleware.google_analytics",
    "main.core.middleware.country",
    "main.core.middleware.site",
]
if DEBUG:
    MIDDLEWARE += ["debug_toolbar.middleware.DebugToolbarMiddleware"]

INSTALLED_APPS = [
    # Django modules
    "django.contrib.admin",
    "django.contrib.contenttypes",
    "django.contrib.sites",
    "django.contrib.staticfiles",
    "django.contrib.auth",
    "django.contrib.postgres",

    'django.contrib.messages',
    'django.contrib.sessions',
    # Local apps
    "main.core",
    "main.account",
    "main.site",
    "main.product",
    "main.checkout",
    "main.shipping",
    "main.payment",
    "main.order",
    "main.graphql",
    "main.blog",
    "main.page",
    # External apps
    "versatileimagefield",
    "graphene_django",
    "django_prices",
    "django_filters",
    "django_countries",
    "phonenumber_field",
    'captcha',
    'social_django'
]
SOCIAL_AUTH_POSTGRES_JSONFIELD = True
if DEBUG:
    INSTALLED_APPS += ['debug_toolbar']

AUTH_USER_MODEL = "account.User"
AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
        "OPTIONS": {"min_length": 8},
    }
]

DEFAULT_COUNTRY = os.environ.get("DEFAULT_COUNTRY", "BY")
DEFAULT_CURRENCY = os.environ.get("DEFAULT_CURRENCY", "BYN")
DEFAULT_DECIMAL_PLACES = get_currency_fraction(DEFAULT_CURRENCY)
DEFAULT_CURRENCY_CODE_LENGTH = 3
DEFAULT_MAX_DIGITS = 12

DEFAULT_MAX_EMAIL_DISPLAY_NAME_LENGTH = 78


def get_host():
    from django.contrib.sites.models import Site

    return Site.objects.get_current().domain


MAX_CHECKOUT_LINE_QUANTITY = int(os.environ.get("MAX_CHECKOUT_LINE_QUANTITY", 10000))

ALLOWED_HOSTS = get_list(os.environ.get("ALLOWED_HOSTS", "localhost,127.0.0.1"))
ALLOWED_GRAPHQL_ORIGINS = os.environ.get("ALLOWED_GRAPHQL_ORIGINS", "*")

SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")

VERSATILEIMAGEFIELD_RENDITION_KEY_SETS = {
    "products": [
        ("product_gallery", "thumbnail__540x540"),
        ("product_gallery_2x", "thumbnail__1080x1080"),
        ("product_small", "thumbnail__60x60"),
        ("product_small_2x", "thumbnail__120x120"),
        ("product_list", "thumbnail__255x255"),
        ("product_list_2x", "thumbnail__510x510"),

        ("product_gallery_webp", "thumbnail_webp__540x540"),
        ("product_gallery_2x_webp", "thumbnail_webp__1080x1080"),
        ("product_small_webp", "thumbnail_webp__60x60"),
        ("product_small_2x_webp", "thumbnail_webp__120x120"),
        ("product_list_webp", "thumbnail_webp__255x255"),
        ("product_list_2x_webp", "thumbnail_webp__510x510"),
    ],
    "background_images": [
        ("header_image", "thumbnail__1080x440"),
        ("header_image_webp", "thumbnail_webp__1080x440")
    ],
    "user_avatars": [
        ("default", "thumbnail__445x445"),
        ("default_crop", "crop__445x445"),
        ("default_crop_webp", "crop_webp__445x445"),
    ],
    "blog": [
        ("default", "thumbnail__1600x900"),
        ("lg", "thumbnail__800x450"),
        ("md", "thumbnail__400x225"),
        ("sm", "thumbnail__200x110"),
        ("xs", "thumbnail__100x55"),

        ("default_crop_webp", "crop_webp__1600x900"),
        ("lg_crop_webp", "crop_webp__800x450"),
        ("md_crop_webp", "crop_webp__400x225"),
        ("sm_crop_webp", "crop_webp__200x110"),
        ("xs_crop_webp", "crop_webp__100x55"),

    ],
    'shop_banner': [
        ("default", "thumbnail__1080x600"),
        ("lg", "thumbnail__1600x900"),
        ("sm", "thumbnail__120x120"),

        ("default_webp", "thumbnail_webp__1080x600"),
        ("lg_webp", "thumbnail_webp__1600x900"),
        ("md_webp", "thumbnail_webp__960x540"),
        ("sm_webp", "thumbnail_webp__120x120"),

        ("default_crop_webp", "crop_webp__1080x600"),
        ("lg_crop_webp", "crop_webp__1600x900"),
        ("md_crop_webp", "crop_webp__960x540"),
        ("sm_crop_webp", "crop_webp__120x120"),

    ]
}

VERSATILEIMAGEFIELD_SETTINGS = {
    # Images should be pre-generated on Production environment
    "create_images_on_demand": get_bool_from_env("CREATE_IMAGES_ON_DEMAND", False),
    'jpeg_resize_quality': 70
}

PLACEHOLDER_IMAGES = {
    60: "images/placeholder60x60.png",
    120: "images/placeholder120x120.png",
    255: "images/placeholder255x255.png",
    540: "images/placeholder540x540.png",
    1080: "images/placeholder1080x1080.png",
}

DEFAULT_PLACEHOLDER = "images/placeholder255x255.png"

SEARCH_BACKEND = "main.search.backends.postgresql"

AUTHENTICATION_BACKENDS = [
    "graphql_jwt.backends.JSONWebTokenBackend",
    'social_core.backends.google.GoogleOAuth2',
    "django.contrib.auth.backends.ModelBackend",
]

# Django GraphQL JWT settings
GRAPHQL_JWT = {
    "JWT_PAYLOAD_HANDLER": "main.graphql.utils.create_jwt_payload",
    "JWT_EXPIRATION_DELTA": timedelta(days=7)
}
if not DEBUG:
    GRAPHQL_JWT["JWT_VERIFY_EXPIRATION"] = True

# CELERY SETTINGS
CELERY_BROKER_URL = (
        os.environ.get("CELERY_BROKER_URL", os.environ.get("CLOUDAMQP_URL")) or ""
)
CELERY_TASK_ALWAYS_EAGER = not CELERY_BROKER_URL
CELERY_ACCEPT_CONTENT = ["json"]
CELERY_TASK_SERIALIZER = "json"
CELERY_RESULT_SERIALIZER = "json"
CELERY_RESULT_BACKEND = os.environ.get("CELERY_RESULT_BACKEND", None)

PLAYGROUND_ENABLED = get_bool_from_env("PLAYGROUND_ENABLED", True)
ENABLE_DEBUG_TOOLBAR = get_bool_from_env("ENABLE_DEBUG_TOOLBAR", False)
if ENABLE_DEBUG_TOOLBAR:
    # Ensure the graphiql debug toolbar is actually installed before adding it
    try:
        __import__("graphiql_debug_toolbar")
    except ImportError as exc:
        msg = (
            f"{exc} -- Install the missing dependencies by "
            f"running `pip install -r requirements_dev.txt`"
        )
        warnings.warn(msg)
    else:
        INSTALLED_APPS += ["django.forms", "debug_toolbar", "graphiql_debug_toolbar"]
        MIDDLEWARE.append("main.graphql.middleware.DebugToolbarMiddleware")

        DEBUG_TOOLBAR_PANELS = [
            "ddt_request_history.panels.request_history.RequestHistoryPanel",
            "debug_toolbar.panels.timer.TimerPanel",
            "debug_toolbar.panels.headers.HeadersPanel",
            "debug_toolbar.panels.request.RequestPanel",
            "debug_toolbar.panels.sql.SQLPanel",
            "debug_toolbar.panels.profiling.ProfilingPanel",
        ]
        DEBUG_TOOLBAR_CONFIG = {"RESULTS_CACHE_SIZE": 100}

OPENTRACING_MAX_QUERY_LENGTH_LOG = 2000
GRAPHENE = {
    "RELAY_CONNECTION_ENFORCE_FIRST_OR_LAST": True,
    "RELAY_CONNECTION_MAX_LIMIT": 100,
    "MIDDLEWARE": [
        "main.graphql.middleware.JWTMiddleware",
        'graphene_django.debug.DjangoDebugMiddleware'
    ]
}

RECAPTCHA_PUBLIC_KEY = os.environ.get("RECAPTCHA_PUBLIC_KEY", '') #'6LcGQ_gUAAAAAHF3GpHmEql5CfmNcUAYsHWHxh4p'
RECAPTCHA_PRIVATE_KEY = os.environ.get("RECAPTCHA_PRIVATE_KEY", '') # '6LcGQ_gUAAAAAE3pGZbL2YTnBSWFmjmgvjsFMa_y'

RECAPTCHA_PROXY = {'http': 'http://127.0.0.1:8000', 'https': 'https://127.0.0.1:8000'}
RECAPTCHA_DOMAIN = 'www.recaptcha.net'
RECAPTCHA_REQUIRED_SCORE = 0.85

CKEDITOR_UPLOAD_PATH = 'uploads/'
# CKEDITOR_BASEPATH = os.path.join(STATIC_URL, "ckeditor/ckeditor/")
CKEDITOR_CONFIGS = {

    'default': {
        'toolbar': [
            ['Undo', 'Redo',
             '-', 'Bold', 'Italic', 'Underline',
             '-', 'Link', 'Unlink', 'Anchor',
             '-', 'Format',
             '-', 'SpellChecker', 'Scayt',
             '-', 'Maximize',
             '-', 'Language',
             ],
        ],
        'height': '100%',
        'width': '100%',
        'toolbarCanCollapse': False,
    },
    'full': {
        'toolbar': None,
        'width': '100%',
        'height': '250px',
        'toolbarCanCollapse': False,
    },
    'disable': {
        'toolbar': [],
        'width': '100%',
        'height': '600px',
        'toolbarCanCollapse': False,
    },
}