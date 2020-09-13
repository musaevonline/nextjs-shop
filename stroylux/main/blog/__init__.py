from django.utils.translation import pgettext_lazy


class ArticleStatus:
    DRAFT = 'draft'
    COMPLETED = 'completed'

    CHOICES = [
        (DRAFT, pgettext_lazy('article status', 'Draft')),
        (COMPLETED, pgettext_lazy('article status', 'Completed'))
    ]


class ArticleCommentStatus:
    HIDDEN = 'HIDDEN'
    VISIBLE = 'visible'

    CHOICES = [
        (HIDDEN, pgettext_lazy('article comment status', 'Hidden')),
        (VISIBLE, pgettext_lazy('article comment status', 'Visible'))
    ]
