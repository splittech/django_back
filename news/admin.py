from django import forms
from django.contrib import admin
from django.utils.safestring import mark_safe
from ckeditor_uploader.widgets import CKEditorUploadingWidget

from .models import News


class NewsAdminForm(forms.ModelForm):
    """Форма с виджетом ckeditor"""
    text = forms.CharField(label="Текст", widget=CKEditorUploadingWidget())

    class Meta:
        model = News
        fields = '__all__'

@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    """Новости"""
    list_display = ("title",)
    save_on_top = True
    save_as = True
    actions = ["publish", "unpublish"]
    form = NewsAdminForm
    readonly_fields = ("get_image",)

    def get_image(self, obj):
        return mark_safe(f'<img src={obj.poster.url} width="100" height="110"')

    get_image.short_description = "Изображение"


admin.site.site_title = "Django News"
admin.site.site_header = "Django News"
