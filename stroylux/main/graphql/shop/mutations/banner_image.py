import graphene
from django.core.exceptions import ValidationError

from ...core.types.common import ShopError
from ...core.utils import validate_image_file
from ....core.permissions import SitePermissions
from ....site import models
from ....site.error_codes import SiteErrorCode
from ....site.thumbnails import (
    create_site_thumbnails
)
from main.graphql.core.mutations import BaseMutation, ModelBulkDeleteMutation
from main.graphql.core.types import Upload
from main.graphql.shop.types import Shop, SiteBannerImage


class ShopImageCreateInput(graphene.InputObjectType):
    alt = graphene.String(description="Alt text for an image.")
    description = graphene.String(description="Description for an image.")
    image = Upload(
        required=True, description="Represents an image file in a multipart request."
    )


class ShopImageCreate(BaseMutation):
    shop = graphene.Field(Shop)

    class Arguments:
        input = ShopImageCreateInput(
            required=True, description="Fields required to create a site image."
        )

    class Meta:
        description = (
            "Create a site image. This mutation must be sent as a `multipart` "
            "request. More detailed specs of the upload format can be found here: "
            "https://github.com/jaydenseric/graphql-multipart-request-spec"
        )
        permissions = (SitePermissions.MANAGE_SETTINGS,)
        error_type_class = ShopError
        error_type_field = "shop_errors"

    @classmethod
    def perform_mutation(cls, _root, info, **data):
        data = data.get("input")
        site = info.context.site
        image_data = info.context.FILES.get(data["image"])
        validate_image_file(image_data, "image")

        image = site.settings.images.create(image=image_data, alt=data.get("alt", ""),
                                            description=data.get("description", ""))
        create_site_thumbnails.delay(image.pk)
        return ShopImageCreate(shop=Shop())


class ShopImageUpdateInput(graphene.InputObjectType):
    alt = graphene.String(description="Alt text for an image.")
    description = graphene.String(description="Description for an image.")


class ShopImageUpdate(BaseMutation):
    shop = graphene.Field(Shop)

    class Arguments:
        id = graphene.ID(required=True, description="ID of a site image to update.")
        input = ShopImageUpdateInput(
            required=True, description="Fields required to update a site image."
        )

    class Meta:
        description = "Updates a site image."
        permissions = (SitePermissions.MANAGE_SETTINGS,)
        error_type_class = ShopError
        error_type_field = "shop_errors"

    @classmethod
    def perform_mutation(cls, _root, info, **data):
        image = cls.get_node_or_error(info, data.get("id"), only_type=SiteBannerImage)
        alt = data.get("input").get("alt")
        description = data.get("input").get("description")
        if alt is not None:
            image.alt = alt
            image.description = description
            image.save(update_fields=["alt", "description"])
        return ShopImageUpdate(shop=Shop())


class ShopImageReorder(BaseMutation):
    shop = graphene.Field(Shop)

    class Arguments:
        images_ids = graphene.List(
            graphene.ID,
            required=True,
            description="IDs of a site images in the desired order.",
        )

    class Meta:
        description = "Changes ordering of the site image."
        permissions = (SitePermissions.MANAGE_SETTINGS,)
        error_type_class = ShopError
        error_type_field = "shop_errors"

    @classmethod
    def perform_mutation(cls, root, info, images_ids):
        site = info.context.site
        if len(images_ids) != site.settings.images.count():
            raise ValidationError(
                {
                    "order": ValidationError(
                        "Incorrect number of image IDs provided.",
                        code=SiteErrorCode.INVALID,
                    )
                }
            )

        images = []
        for image_id in images_ids:
            image = cls.get_node_or_error(
                info, image_id, field="order", only_type=SiteBannerImage
            )
            if image and image.site != site.settings:
                raise ValidationError(
                    {
                        "order": ValidationError(
                            "Image %(image_id)s does not belong to this site.",
                            code=SiteErrorCode.NOT_BANNER_IMAGE,
                            params={"image_id": image_id},
                        )
                    }
                )
            images.append(image)

        for order, image in enumerate(images):
            image.sort_order = order
            image.save(update_fields=["sort_order"])

        return ShopImageReorder(shop=Shop())


class ShopImageDelete(BaseMutation):
    shop = graphene.Field(Shop)

    class Arguments:
        id = graphene.ID(required=True, description="ID of a site image to delete.")

    class Meta:
        description = "Deletes a site image."
        permissions = (SitePermissions.MANAGE_SETTINGS,)
        error_type_class = ShopError
        error_type_field = "shop_errors"

    @classmethod
    def perform_mutation(cls, _root, info, **data):
        image = cls.get_node_or_error(info, data.get("id"), only_type=SiteBannerImage)
        image_id = image.id
        image.delete()
        image.id = image_id
        return ShopImageDelete(shop=Shop())


class ShopImageBulkDelete(ModelBulkDeleteMutation):
    class Arguments:
        ids = graphene.List(
            graphene.ID,
            required=True,
            description="List of site image IDs to delete.",
        )

    class Meta:
        description = "Deletes site images."
        model = models.BannerImage
        permissions = (SitePermissions.MANAGE_SETTINGS,)
        error_type_class = ShopError
        error_type_field = "shop_errors"
