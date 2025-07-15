import { defineField, defineType } from "sanity";
import { fieldsets } from "../../misc/fieldsets";
import { fieldGroups } from "../../misc/field-groups";

export default defineType({
  name: 'blogPage',
  title: 'Página del Blog',
  type: 'document',
  fieldsets: [ ...fieldsets ],
  groups: [ ...fieldGroups ],
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Constructor de Páginas',
      type: 'pageBuilder',
      description: 'Estos bloques se mostrarán debajo del contenido principal.'
    }),
    defineField({
      name: "seo",
      title: 'SEO',
      type: "seoObject",
    }),
  ]
})