from django.db import models

# Create your models here.


class Contact(models.Model):
    first = models.CharField(max_length=100)
    last = models.CharField(max_length=100)
    twitter = models.CharField(max_length=100)
    avatar = models.CharField(max_length=100)
    notes = models.TextField()
    favorite = models.BooleanField()

    def __str__(self):
        # change this line so it returns the first name and last name
        return self.first
