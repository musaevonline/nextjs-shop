import graphene

from .mutations.banner_image import ShopImageCreate, ShopImageDelete, ShopImageBulkDelete, ShopImageReorder, \
    ShopImageUpdate
from .mutations.site import ShopDomainUpdate, ShopSettingsUpdate, ShopAddressUpdate, AuthorizationKeyAdd, \
    AuthorizationKeyDelete
from .types import Shop


class ShopQueries(graphene.ObjectType):
    shop = graphene.Field(
        Shop, description="Return information about the shop.", required=True
    )

    @staticmethod
    def resolve_shop(self, _info):
        return Shop()


class ShopMutations(graphene.ObjectType):
    authorization_key_add = AuthorizationKeyAdd.Field()
    authorization_key_delete = AuthorizationKeyDelete.Field()

    shop_domain_update = ShopDomainUpdate.Field()
    shop_settings_update = ShopSettingsUpdate.Field()
    shop_address_update = ShopAddressUpdate.Field()

    shop_image_create = ShopImageCreate.Field()
    shop_image_delete = ShopImageDelete.Field()
    shop_image_bulk_delete = ShopImageBulkDelete.Field()
    shop_image_reorder = ShopImageReorder.Field()
    shop_image_update = ShopImageUpdate.Field()