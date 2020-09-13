import graphene
from django.core.exceptions import ValidationError

from main.blog.error_codes import BlogErrorCode
from main.blog.utils import delete_blog, delete_blog_categories, delete_blog_articles
from main.core.exceptions import PermissionDenied
from main.core.permissions import BlogPermissions
from main.graphql.blog.types import BlogType, BlogCategoryType, BlogArticleType
from main.graphql.core.mutations import ModelMutation, ModelDeleteMutation
from main.graphql.core.types import Upload
from main.blog import models
from main.graphql.core.types.common import BlogError
from main.graphql.core.utils import validate_image_file, validate_slug_and_generate_if_needed
from main.blog.thumbnails import create_blog_thumbnails, create_blog_category_thumbnails, create_blog_article_thumbnails


class BlogInput(graphene.InputObjectType):
    name = graphene.String(description="Blog name.")
    description = graphene.String(description="Blog description (HTML/text).")
    slug = graphene.String(description="Blog slug.")
    image = Upload(description="Image file.")


class BlogCreate(ModelMutation):
    class Arguments:
        input = BlogInput(
            required=True, description="Fields required to create a blog."
        )

    class Meta:
        description = "Creates a new blog."
        model = models.Blog
        permissions = (BlogPermissions.MANAGE_BLOG,)
        error_type_class = BlogError
        error_type_field = "blog_errors"

    @classmethod
    def clean_input(cls, info, instance, data):
        cleaned_input = super().clean_input(info, instance, data)
        try:
            cleaned_input = validate_slug_and_generate_if_needed(
                instance, "name", cleaned_input
            )
        except ValidationError as error:
            error.code = BlogErrorCode.REQUIRED.value
            raise ValidationError({"slug": error})
        if data.get("image"):
            image_data = info.context.FILES.get(data["image"])
            validate_image_file(image_data, "image")
        return cleaned_input

    @classmethod
    def save(cls, info, instance, cleaned_input):
        instance.save()
        if cleaned_input.get("image"):
            create_blog_thumbnails.delay(instance.pk)


class BlogUpdate(BlogCreate):
    class Arguments:
        id = graphene.ID(required=True, description="ID of a blog to update.")
        input = BlogInput(
            required=True, description="Fields required to update a blog."
        )

    class Meta:
        description = "Updates a blog."
        model = models.Blog
        permissions = (BlogPermissions.MANAGE_BLOG,)
        error_type_class = BlogError
        error_type_field = "blog_errors"


class BlogDelete(ModelDeleteMutation):
    class Arguments:
        id = graphene.ID(required=True, description="ID of a blog to delete.")

    class Meta:
        description = "Deletes a blog."
        model = models.Blog
        permissions = (BlogPermissions.MANAGE_BLOG,)
        error_type_class = BlogError
        error_type_field = "blog_errors"

    @classmethod
    def perform_mutation(cls, _root, info, **data):
        if not cls.check_permissions(info.context):
            raise PermissionDenied()
        node_id = data.get("id")
        instance = cls.get_node_or_error(info, node_id, only_type=BlogType)

        db_id = instance.id

        delete_blog([db_id])

        instance.id = db_id
        return cls.success_response(instance)


class BlogCategoryInput(graphene.InputObjectType):
    name = graphene.String(description="Blog category name.")
    description = graphene.String(description="Blog category description (HTML/text).")
    slug = graphene.String(description="Blog category slug.")
    image = Upload(description="Image file.")


class BlogCategoryCreate(ModelMutation):
    class Arguments:
        input = BlogCategoryInput(
            required=True, description="Fields required to create a blog category."
        )

    class Meta:
        description = "Creates a new blog category."
        model = models.BlogCategory
        permissions = (BlogPermissions.MANAGE_BLOG,)
        error_type_class = BlogError
        error_type_field = "blog_errors"

    @classmethod
    def clean_input(cls, info, instance, data):
        cleaned_input = super().clean_input(info, instance, data)
        try:
            cleaned_input = validate_slug_and_generate_if_needed(
                instance, "name", cleaned_input
            )
        except ValidationError as error:
            error.code = BlogErrorCode.REQUIRED.value
            raise ValidationError({"slug": error})
        if data.get("image"):
            image_data = info.context.FILES.get(data["image"])
            validate_image_file(image_data, "image")
        return cleaned_input

    @classmethod
    def save(cls, info, instance, cleaned_input):
        instance.save()
        if cleaned_input.get("image"):
            create_blog_category_thumbnails.delay(instance.pk)


class BlogCategoryUpdate(BlogCategoryCreate):
    class Arguments:
        id = graphene.ID(required=True, description="ID of a blog category to update.")
        input = BlogCategoryInput(
            required=True, description="Fields required to update a blog category."
        )

    class Meta:
        description = "Updates a blog category."
        model = models.BlogCategory
        permissions = (BlogPermissions.MANAGE_BLOG,)
        error_type_class = BlogError
        error_type_field = "blog_errors"


class BlogCategoryDelete(ModelDeleteMutation):
    class Arguments:
        id = graphene.ID(required=True, description="ID of a blog category to delete.")

    class Meta:
        description = "Deletes a blog category."
        model = models.BlogCategory
        permissions = (BlogPermissions.MANAGE_BLOG,)
        error_type_class = BlogError
        error_type_field = "blog_errors"

    @classmethod
    def perform_mutation(cls, _root, info, **data):
        if not cls.check_permissions(info.context):
            raise PermissionDenied()
        node_id = data.get("id")
        instance = cls.get_node_or_error(info, node_id, only_type=BlogCategoryType)

        db_id = instance.id

        delete_blog_categories([db_id])

        instance.id = db_id
        return cls.success_response(instance)


class BlogArticleInput(graphene.InputObjectType):
    title = graphene.String(description="Blog article name.")
    body = graphene.String(description="Blog article description (HTML/text).")
    slug = graphene.String(description="Blog article slug.")
    image = Upload(description="Image file.")


class BlogArticleCreate(ModelMutation):
    class Arguments:
        input = BlogArticleInput(
            required=True, description="Fields required to create a blog article."
        )

    class Meta:
        description = "Creates a new blog article."
        model = models.BlogArticle
        permissions = (BlogPermissions.MANAGE_BLOG,)
        error_type_class = BlogError
        error_type_field = "blog_errors"

    @classmethod
    def clean_input(cls, info, instance, data):
        cleaned_input = super().clean_input(info, instance, data)
        try:
            cleaned_input = validate_slug_and_generate_if_needed(
                instance, "title", cleaned_input
            )
        except ValidationError as error:
            error.code = BlogErrorCode.REQUIRED.value
            raise ValidationError({"slug": error})
        if data.get("image"):
            image_data = info.context.FILES.get(data["image"])
            validate_image_file(image_data, "image")
        return cleaned_input

    @classmethod
    def save(cls, info, instance, cleaned_input):
        instance.save()
        if cleaned_input.get("image"):
            create_blog_article_thumbnails.delay(instance.pk)


class BlogArticleUpdate(BlogArticleCreate):
    class Arguments:
        id = graphene.ID(required=True, description="ID of a blog article to update.")
        input = BlogArticleInput(
            required=True, description="Fields required to update a blog article."
        )

    class Meta:
        description = "Updates a blog article."
        model = models.BlogArticle
        permissions = (BlogPermissions.MANAGE_BLOG,)
        error_type_class = BlogError
        error_type_field = "blog_errors"


class BlogArticleDelete(ModelDeleteMutation):
    class Arguments:
        id = graphene.ID(required=True, description="ID of a blog article to delete.")

    class Meta:
        description = "Deletes a blog article."
        model = models.BlogArticle
        permissions = (BlogPermissions.MANAGE_BLOG,)
        error_type_class = BlogError
        error_type_field = "blog_errors"

    @classmethod
    def perform_mutation(cls, _root, info, **data):
        if not cls.check_permissions(info.context):
            raise PermissionDenied()
        node_id = data.get("id")
        instance = cls.get_node_or_error(info, node_id, only_type=BlogArticleType)

        db_id = instance.id

        delete_blog_articles([db_id])

        instance.id = db_id
        return cls.success_response(instance)
