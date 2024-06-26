from django import forms
from django.contrib import admin
from django.utils.safestring import mark_safe
from ckeditor_uploader.widgets import CKEditorUploadingWidget

from .models import Tag, Genre, Book, Author, Review


class BookAdminForm(forms.ModelForm):
    """Форма с виджетом ckeditor"""
    description = forms.CharField(label="Описание", widget=CKEditorUploadingWidget())

    class Meta:
        model = Book
        fields = '__all__'


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    """Тег"""
    list_display = ("name",)
    #readonly_fields = ('url',)
    prepopulated_fields = {'url': ('name',)}


class ReviewInline(admin.TabularInline):
    """Отзывы на странице фильма"""
    model = Review
    extra = 1
    readonly_fields = ("name", "email")


@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    """Книги"""
    list_display = ("title", "url", "draft")
    search_fields = ("title", "author__name")
    save_on_top = True
    save_as = True
    list_editable = ("draft",)
    actions = ["publish", "unpublish"]
    form = BookAdminForm
    #readonly_fields = ("get_image",)
    prepopulated_fields = {"url": ("title",)}


    def unpublish(self, request, queryset):
        """Снять с публикации"""
        row_update = queryset.update(draft=True)
        if row_update == 1:
            message_bit = "1 запись была обновлена"
        else:
            message_bit = f"{row_update} записей были обновлены"
        self.message_user(request, f"{message_bit}")

    def publish(self, request, queryset):
        """Опубликовать"""
        row_update = queryset.update(draft=False)
        if row_update == 1:
            message_bit = "1 запись была обновлена"
        else:
            message_bit = f"{row_update} записей были обновлены"
        self.message_user(request, f"{message_bit}")

    publish.short_description = "Опубликовать"
    publish.allowed_permissions = ('change', )

    unpublish.short_description = "Снять с публикации"
    unpublish.allowed_permissions = ('change',)



@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    """Отзывы к книге"""
    list_display = ("name", "parent", "book", "id")
    readonly_fields = ("name",)


@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
    """Жанры"""
    list_display = ("name",)
    prepopulated_fields = {'url': ('name',)}
    #readonly_fields = ("url",)



@admin.register(Author)
class AuthorAdmin(admin.ModelAdmin):
    """Автор"""
    list_display = ("name",)


admin.site.site_title = "Django Books"
admin.site.site_header = "Django Books"
