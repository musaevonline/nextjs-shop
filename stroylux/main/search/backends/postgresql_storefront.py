from django.contrib.postgres.search import TrigramSimilarity, SearchVector, \
    SearchQuery, SearchRank
from django.db.models import Q

from ...product.models import Product

layout = dict(zip(map(ord, "qwertyuiop[]asdfghjkl;'zxcvbnm,./`"
                           'QWERTYUIOP{}ASDFGHJKL:"ZXCVBNM<>?~'),
                  "йцукенгшщзхъфывапролджэячсмитьбю.ё"
                  'ЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮ,Ё'))


def search(phrase):
    """Return matching products for storefront sections.
    Fuzzy storefront search that is resistant to small typing errorsAddressCreate made
    by user. Name is matched using trigram similarity, description uses
    standard postgres full text search.
    Args:
        phrase (str): searched phrase
    """
    translated_phrase = phrase
    if phrase:
        translated_phrase = phrase.translate(layout)
    vector = SearchVector('name', weight='B')
    query = SearchQuery(phrase).bitor(SearchQuery(translated_phrase))
    # query_translated = SearchQuery(translated_phrase)
    name_sim = TrigramSimilarity("name", phrase)
    name_translated_sim = TrigramSimilarity("name", translated_phrase)
    ft_in_description = Q(description__search=phrase) | Q(
        description__search=translated_phrase)
    ft_by_sku = Q(variants__sku__search=phrase) | Q(
        variants__sku__search=translated_phrase)
    ft_by_name = Q(name__search=phrase) | Q(name__search=translated_phrase)
    name_similar = Q(name_sim__gt=0.2) | Q(name_translated_sim__gt=0.2)
    name_rank = Q(rank__gte=0.3)
    name_part = Q(name__icontains=phrase) | Q(
        name__icontains=translated_phrase)
    return Product.objects.annotate(name_sim=name_sim,
                                    name_translated_sim=name_translated_sim,
                                    rank=SearchRank(vector, query)).filter(
        (
            ft_in_description | name_similar | ft_by_sku | ft_by_name | name_rank | name_part)
    ).order_by('-name_sim', '-name_translated_sim', '-rank')
