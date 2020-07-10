import graphene
from django_prices.templatetags import prices


class Money(graphene.ObjectType):
    currency = graphene.String(description="Currency code.", required=True)
    amount = graphene.Float(description="Amount of money.", required=True)
    localized = graphene.String(
        description="Money formatted according to the current locale.",
        required=True,
        deprecation_reason=(
            "Price formatting according to the current locale should be handled by the "
            "frontend client. This field will be removed after 2020-07-31."
        ),
    )

    class Meta:
        description = "Represents amount of money in specific currency."

    @staticmethod
    def resolve_localized(root, _info):
        return prices.amount(root)


class TaxedMoney(graphene.ObjectType):
    currency = graphene.String(description="Currency code.", required=True)
    gross = graphene.Field(
        Money, description="Amount of money including taxes.", required=True
    )
    net = graphene.Field(
        Money, description="Amount of money without taxes.", required=True
    )
    tax = graphene.Field(Money, description="Amount of taxes.", required=True)

    class Meta:
        description = (
            "Represents a monetary value with taxes. In cases where taxes were not "
            "applied, net and gross values will be equal."
        )


class MoneyRange(graphene.ObjectType):
    start = graphene.Field(Money, description="Lower bound of a price range.")
    stop = graphene.Field(Money, description="Upper bound of a price range.")

    class Meta:
        description = "Represents a range of amounts of money."
