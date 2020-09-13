from enum import Enum


class BlogErrorCode(Enum):
    ALREADY_EXISTS = "already_exists"
    GRAPHQL_ERROR = "graphql_error"
    INVALID = "invalid"
    NOT_BLOG_IMAGE = "not_blog_image"
    NOT_FOUND = "not_found"
    REQUIRED = "required"
    UNIQUE = "unique"
