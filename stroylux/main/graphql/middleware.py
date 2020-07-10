from django.conf import settings
from django.contrib.auth.models import AnonymousUser
from graphql_jwt.middleware import JSONWebTokenMiddleware

from .views import GraphQLView


class JWTMiddleware(JSONWebTokenMiddleware):
    def resolve(self, next, root, info, **kwargs):
        request = info.context

        if not hasattr(request, "user"):
            request.user = AnonymousUser()
        return super().resolve(next, root, info, **kwargs)


def process_view(self, request, view_func, *args):
    if hasattr(view_func, "view_class") and issubclass(
            view_func.view_class, GraphQLView
    ):
        request._graphql_view = True


if settings.ENABLE_DEBUG_TOOLBAR:
    import warnings

    try:
        from graphiql_debug_toolbar.middleware import DebugToolbarMiddleware
    except ImportError:
        warnings.warn("The graphiql debug toolbar was not installed.")
    else:
        DebugToolbarMiddleware.process_view = process_view