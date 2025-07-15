import { GalleryVertical } from "lucide-react";
import { defineField, defineType } from "sanity";
import { fieldsets } from "../../misc/fieldsets";
import { fieldGroups } from "../../misc/field-groups";

export default defineType({
  name: 'heroBlock',
  title: 'Héroe',
  type: 'object',
  fieldsets: [ ...fieldsets ],
  groups: [ ...fieldGroups ],
  fields: [
    defineField({
      name: 'heading',
      title: 'Título',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Contenido',
      type: 'array',
      of: [
        { 
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
        },
      ],
    }),
    defineField({
      title: "Multimedia",
      name: "mediaType",
      type: "string",
      options: {
        list: [
          { title: "Imagen", value: "image" },
          { title: "Ninguno", value: "none" },
        ],
      },
      initialValue: 'image',
    }),
    defineField({
      title: "Borde Redondeado - Inferior I/D",
      name: "bottomCornerRadius",
      type: "string",
      options: {
        list: [
          { title: "Recto", value: "straight" },
          { title: "Redondeado", value: "rounded" },
        ],
      },
      initialValue: 'straight',
    }),
    
    defineField({
      name: 'buttons',
      title: 'Botones',
      type: 'array',
      of: [{ type: 'buttonObject' }],
    }),
   
    
    defineField({
      title: "Tipo de Superposición",
      name: "overlayType",
      type: "string",
      options: {
        list: [
          { title: "Ninguno", value: "none" },
          { title: "Oscuro", value: "dark" },
        ],
      },
      initialValue: 'none',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Imagen de Fondo',
      type: 'image',
      fields: [
        defineField({
          name: 'altText',
          title: 'Texto Alternativo',
          type: 'string'
        }),
      ],
    }),
    defineField({
      name: 'anchorId',
      title: 'ID del Ancla',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      media: '',
    },
    prepare(selection) {
      const { title } = selection
      return {
        title: title ?? 'Sin título. Agrega uno dentro de este bloque',
        subtitle: 'Héroe',
        media: GalleryVertical,
      }
    },
  },
})