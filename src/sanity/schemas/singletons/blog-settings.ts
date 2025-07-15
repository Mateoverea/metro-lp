import { defineField, defineType } from "sanity";

export default defineType({
  name: 'blogSettings',
  title: 'Configuración del Blog',
  type: 'document',
  fields: [
    defineField({
      title: 'Mostrar Artículos Relacionados',
      name: 'showRelatedPosts',
      type: 'boolean',
      description: 'Habilitar para mostrar 3 artículos relacionados al final de cada artículo.',
      initialValue: true
    }),
    defineField({
      title: 'Mostrar Tabla de Contenidos',
      name: 'showTableOfContents',
      type: 'boolean',
      description: 'Habilitar para mostrar una tabla de contenidos en la barra lateral derecha de cada artículo.',
      initialValue: true
    }),
    defineField({
      title: 'Mostrar Artículos por Categoría',
      name: 'showPostsByCategory',
      type: 'boolean',
      description: 'Habilitar para mostrar las categorías de artículos en la barra lateral derecha de cada artículo.',
      initialValue: true
    }),
  ]
})