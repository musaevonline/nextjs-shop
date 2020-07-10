import graphene

from main.graphql.core.types.sort_input import SortInputObjectType


class PermissionGroupSortField(graphene.Enum):
    NAME = ["name"]

    @property
    def description(self):
        # pylint: disable=no-member
        if self in [PermissionGroupSortField.NAME]:
            sort_name = self.name.lower().replace("_", " ")
            return f"Sort permission group accounts by {sort_name}."
        raise ValueError("Unsupported enum value: %s" % self.value)


class PermissionGroupSortingInput(SortInputObjectType):
    class Meta:
        sort_enum = PermissionGroupSortField
        type_name = "permission group"