import { fieldsets } from "../misc/fieldsets";
import { BriefcaseBusiness } from "lucide-react";
import { defineField, defineType } from "sanity";
import { fieldGroups } from "../misc/field-groups";

export default defineType({
  name: 'project',
  title: 'Programas Académicos',
  type: 'document',
  icon: BriefcaseBusiness,
  fieldsets: [ ...fieldsets ],
  groups: [ ...fieldGroups ],
  fields: [
    defineField({
      name: 'title',
      title: 'Nombre del Programa',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: rule => rule.required()
    }),
    defineField({
      name: 'category',
      title: 'Categoría del Programa',
      type: 'reference',
      to: [{ type: 'projectCategory' }],
      validation: rule => rule.required()
    }),
    defineField({
      name: 'excerpt',
      title: 'Descripción Breve',
      type: 'text',
      rows: 4  
    }),
    defineField({
      name: 'image',
      title: 'Imagen',
      type: 'image',
      fields: [
        defineField({
          name: 'altText',
          title: 'Texto Alternativo',
          type: 'string'
        }),
        defineField({
          name: 'caption',
          title: 'Descripción',
          type: 'string'
        }),
      ],
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Page Builder',
      type: 'pageBuilder',
    }),
    defineField({
      name: "seo",
      title: 'SEO',
      type: "seoObject",
    }),
  ]
})