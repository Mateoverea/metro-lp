import { Clapperboard } from "lucide-react";
import { defineField, defineType } from "sanity";

export default defineType({
  name: 'callToActionObject',
  title: 'Llamada a la Acción',
  type: 'object',
  fields: [
    defineField({
      name: 'callToActionTitle',
      type: 'string',
      title: 'Título',
    }),
    defineField({
      name: 'callToActionParagraph',
      type: 'text',
      title: 'Párrafo',
      rows: 4
    }),
    defineField({
      name: 'buttons',
      title: 'Botones',
      type: 'array',
      of: [{ type: 'buttonObject' }],
    }),
  ],
  preview: {
    select: {
      title: 'callToActionTitle',
    },
    prepare(selection) {
      const { title } = selection
      return {
        title: title ?? 'Sin título. Agrega uno dentro de este bloque',
        subtitle: 'Llamada a la Acción',
        media: Clapperboard,
      }
    },
  },
})