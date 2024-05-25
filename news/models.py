from django.db import models


class News(models.Model):
    title = models.CharField(max_length=50)
    text = models.CharField(max_length=5000)
    image = models.ImageField(upload_to ='uploads/')
    createDate = models.DateField(auto_now=True)

    class Meta:
        verbose_name = "Новости"
        verbose_name_plural = "Новости"

    def __str__(self):
        return self.title