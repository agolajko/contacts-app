from django.contrib import admin
from .models import Contact


class ContactAdmin(admin.ModelAdmin):
    list_display = ('first', 'last', 'twitter', 'avatar', 'notes', 'favorite')


admin.site.register(Contact, ContactAdmin)
