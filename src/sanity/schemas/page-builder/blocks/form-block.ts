import { Send } from "lucide-react";
import { defineField, defineType } from "sanity";
import { fieldsets } from "../../misc/fieldsets";
import { fieldGroups } from "../../misc/field-groups";

export default defineType({
  name: 'formBlock',
  title: 'Formulario',
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
      name: 'form',
      title: 'Formulario',
      type: 'reference',
      to: [{ type: 'form' }],
      validation: (Rule) => Rule.required(),
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
        subtitle: 'Formulario',
        media: Send,
      }
    },
  },
})