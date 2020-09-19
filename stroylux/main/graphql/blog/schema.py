import graphene

from main.graphql.blog.bulk_mutations import BlogCategoryBulkDelete, BlogArticleBulkDelete
from main.graphql.blog.mutations import BlogCategoryCreate, BlogCategoryUpdate, \
    BlogCategoryDelete, BlogArticleCreate, BlogArticleUpdate, BlogArticleDelete
from main.graphql.blog.sorters import BlogCategoryOrder, BlogArticleOrder
from main.graphql.blog.filters import BlogCategoryFilterInput, BlogArticleFilterInput
from main.graphql.blog.resolvers import resolve_blog_category, \
    resolve_blog_category_list, resolve_blog_article, resolve_blog_article_list
from main.graphql.blog.types import BlogCategoryType, BlogArticleType
from main.graphql.core.fields import FilterInputConnectionField


class BlogQueries(graphene.ObjectType):
    blog_category = graphene.Field(
        BlogCategoryType,
        id=graphene.Argument(
            graphene.ID, description="ID of the blog category.", required=False
        ),
        slug=graphene.Argument(
            graphene.String, description="Slug of the blog category.", required=False
        ),
        description="Look up a blog category by ID or slug.",
    )
    blog_category_list = FilterInputConnectionField(
        BlogCategoryType,
        filter=BlogCategoryFilterInput(description="Filtering options for blog category list."),
        sort_by=BlogCategoryOrder(description="Sort blog category list."),
        ids=graphene.List(
            graphene.ID, description="Filter blog category list by given IDs."
        ),
        description="List of the shop's blog category.",
    )
    blog_article = graphene.Field(
        BlogArticleType,
        id=graphene.Argument(
            graphene.ID, description="ID of the blog article.", required=False
        ),
        slug=graphene.Argument(
            graphene.String, description="Slug of the blog article.", required=False
        ),
        description="Look up a blog article by ID or slug.",
    )
    blog_article_list = FilterInputConnectionField(
        BlogArticleType,
        filter=BlogArticleFilterInput(description="Filtering options for blog article list."),
        sort_by=BlogArticleOrder(description="Sort blog article list."),
        ids=graphene.List(
            graphene.ID, description="Filter blog article list by given IDs."
        ),
        description="List of the shop's blog article.",
    )

    @staticmethod
    def resolve_blog_category(self, info, id=None, slug=None):
        return resolve_blog_category(info, id, slug)

    @staticmethod
    def resolve_blog_category_list(self, info, ids=None, **kwargs):
        return resolve_blog_category_list(info, ids, **kwargs)

    @staticmethod
    def resolve_blog_article(self, info, id=None, slug=None):
        return resolve_blog_article(info, id, slug)

    @staticmethod
    def resolve_blog_article_list(self, info, ids=None, **kwargs):
        return resolve_blog_article_list(info, ids, **kwargs)


class BlogMutations(graphene.ObjectType):

    blog_category_create = BlogCategoryCreate.Field()
    blog_category_update = BlogCategoryUpdate.Field()
    blog_category_delete = BlogCategoryDelete.Field()
    blog_category_bulk_delete = BlogCategoryBulkDelete.Field()

    blog_article_create = BlogArticleCreate.Field()
    blog_article_update = BlogArticleUpdate.Field()
    blog_article_delete = BlogArticleDelete.Field()
    blog_article_bulk_delete = BlogArticleBulkDelete.Field()
