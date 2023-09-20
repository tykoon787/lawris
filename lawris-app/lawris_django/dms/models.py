from textwrap import fill
from django.db import models

# Create your models here.


class BasePDFTemplate(models.Model):
    """
    Contains generic content for various templates
    """
    @property
    def read_template_content(self, template_file: str):
        """
        Reads the content from a template

        Args: 
            template_file (__str__): Path to the file
        """
        with open(template_file, 'r') as template_file:
            return template_file.read()

    class Meta:
        abstract = True


class Template(BasePDFTemplate):
    """
    Template Model

    A template is a form from a statute
    """
    TEMPLATE_TYPES = [
        ('affidavit', 'Affidavit'),
        ('petition', 'Petition'),
    ]

    CATEGORY_CHOICES = [
        ('civil', 'Civil'),
        ('criminal', 'Criminal')
    ]

    DIVISION_CHOICES = [
        ('family', 'Family'),
        ('land', 'Land'),
        ('employment', 'Employment'),
    ]

    SUB_DIVISION_CHOICES = [
        ('succession', 'Succession'),
    ]

    type = models.CharField(max_length=20, choices=TEMPLATE_TYPES)
    title = models.CharField(max_length=200)
    category_of_law = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    division_of_law = models.CharField(max_length=20, choices=DIVISION_CHOICES)
    branch_of_division_of_law = models.CharField(
        max_length=20, choices=SUB_DIVISION_CHOICES)
    template_file = models.CharField(max_length=255)

    def fill_template(self, data):
        """
        Fills the template with data

        Args: 
            data: Data to be filled
            template_file: Template file to be read and used
        """
        template_content = self.read_template_content(self.template_file)
        filled_template = template_content.format(**data)
        return (filled_template)

    def __str__(self):
        return self.title


class Document(models.Model):
    """
    Document Model
    """
    template = models.ForeignKey(Template, on_delete=models.CASCADE, null=True)
    filled_content = models.TextField(default="")
    type = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @classmethod
    def create_and_fill(cls, template: Template, data: dict):
        """
        Creates a document instance, fills it with data and saves it

        Args:
            template (Template): The template to use
            data (dict): A dictionary containing placeholder values

        Returns:
            Document: The created and filled document
        """
        filled_content = template.fill_template(data)
        document = cls(template=template, filled_content=filled_content)
        document.save()
        return document
