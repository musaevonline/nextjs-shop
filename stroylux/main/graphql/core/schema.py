import graphene
import graphql_jwt
import graphql_social_auth

from .mutations import CreateToken, VerifyToken


class CoreQueries(graphene.ObjectType):
    pass


class CoreMutations(graphene.ObjectType):
    token_create = CreateToken.Field()
    token_refresh = graphql_jwt.Refresh.Field()
    token_verify = VerifyToken.Field()
    social_auth = graphql_social_auth.SocialAuthJWT.Field()
