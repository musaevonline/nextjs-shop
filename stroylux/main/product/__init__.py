from enum import Enum


class ProductAvailabilityStatus(str, Enum):
    NOT_PUBLISHED = "not-published"
    VARIANTS_MISSSING = "variants-missing"
    OUT_OF_STOCK = "out-of-stock"
    LOW_STOCK = "low-stock"
    NOT_YET_AVAILABLE = "not-yet-available"
    READY_FOR_PURCHASE = "ready-for-purchase"

    @staticmethod
    def get_display(status):
        status_mapping = {
            ProductAvailabilityStatus.NOT_PUBLISHED: "not published",
            ProductAvailabilityStatus.VARIANTS_MISSSING: "variants missing",
            ProductAvailabilityStatus.OUT_OF_STOCK: "out of stock",
            ProductAvailabilityStatus.LOW_STOCK: "stock running low",
            ProductAvailabilityStatus.NOT_YET_AVAILABLE: "not yet available",
            ProductAvailabilityStatus.READY_FOR_PURCHASE: "ready for purchase",
        }

        if status in status_mapping:
            return status_mapping[status]
        else:
            raise NotImplementedError(f"Unknown status: {status}")


class VariantAvailabilityStatus(str, Enum):
    AVAILABLE = "available"
    OUT_OF_STOCK = "out-of-stock"

    @staticmethod
    def get_display(status):
        status_mapping = {
            VariantAvailabilityStatus.AVAILABLE: "available",
            VariantAvailabilityStatus.OUT_OF_STOCK: "out of stock",
        }

        if status in status_mapping:
            return status_mapping[status]
        else:
            raise NotImplementedError(f"Unknown status: {status}")


class AttributeInputType:
    """The type that we expect to render the attribute's values as."""

    DROPDOWN = "dropdown"
    MULTISELECT = "multiselect"

    CHOICES = [
        (DROPDOWN, "Dropdown"),
        (MULTISELECT, "Multi Select"),
    ]

    # list the input types that cannot be assigned to a variant
    NON_ASSIGNABLE_TO_VARIANTS = [MULTISELECT]


class ReviewRating:
    TERRIBLE = 1
    POOR = 2
    AVERAGE = 3
    VERY_GOOD = 4
    EXCELLENT = 5

    CHOICES = (
        (TERRIBLE, 'Terrible'),
        (POOR, 'Poor'),
        (AVERAGE, 'Average'),
        (VERY_GOOD, 'Very Good'),
        (EXCELLENT, 'Excellent'),
    )


class ReviewStatus:
    IN_PROGRESS = 'IN_PROGRESS'
    PUBLISHED = 'PUBLISHED'
    CANCELED = 'CANCELED'

    CHOICES = (
        (IN_PROGRESS, 'in progress'),
        (PUBLISHED, 'published'),
        (CANCELED, 'canceled')
    )
