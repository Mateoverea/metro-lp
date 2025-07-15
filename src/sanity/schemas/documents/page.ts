import { File } from "lucide-react";
import { fieldsets } from "../misc/fieldsets";
import { defineField, defineType } from "sanity";
import { fieldGroups } from "../misc/field-groups";

export default defineType({
  name: 'page',
  title: 'Páginas',
  type: 'document',
  icon: File,
  fieldsets: [ ...fieldsets ],
  groups: [ ...fieldGroups ],
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: rule => rule.required()
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
      name: 'pageBuilder',
      title: 'Constructor de Páginas',
      type: 'pageBuilder',
    }),
    defineField({
      name: "seo",
      title: 'SEO',
      type: "seoObject",
    }),
  ]
})