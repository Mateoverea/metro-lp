import { defineField, defineType } from "sanity";
import { fieldsets } from "../../misc/fieldsets";
import { fieldGroups } from "../../misc/field-groups";
import { paddingFields } from "../../misc/padding-fields";

export const latestBlogPostsBlock = defineType({
  name: 'latestBlogPostsBlock',
  type: 'object',
  title: 'Bloque de Artículos Recientes',
  description: 'Muestra automáticamente los últimos 3 artículos del blog',
  fieldsets: [ ...fieldsets ],
  groups: [ ...fieldGroups ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Título de la Sección',
      description: 'Título opcional para esta sección',
      initialValue: 'Artículos Recientes'
    }),
    defineField({
      name: 'showViewAllButton',
      type: 'boolean',
      title: 'Mostrar Botón "Ver Todos"',
      description: 'Mostrar un botón para ver todos los artículos del blog',
      initialValue: true
    }),
    defineField({
      name: 'anchorId',
      title: 'ID de Ancla',
      type: 'string',
      description: 'ID único para enlazar directamente a esta sección'
    }),
    ...paddingFields
  ],
  preview: {
    select: {
      title: 'title'
    },
    prepare({ title }) {
      return {
        title: title || 'Artículos Recientes',
        subtitle: 'Muestra los últimos 3 artículos del blog',
        media: () => '📰'
      };
    }
  }
}); 