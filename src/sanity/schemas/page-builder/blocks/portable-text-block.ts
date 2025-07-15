import { LetterText } from "lucide-react";
import { defineField, defineType } from "sanity";
import { fieldsets } from "../../misc/fieldsets";
import { fieldGroups } from "../../misc/field-groups";
import { AlignmentInput, alignmentOptions } from "@/sanity/components/alignment-input";

export default defineType({
  name: 'portableTextBlock',
  title: 'Texto Enriquecido',
  type: 'object',
  fieldsets: [ ...fieldsets ],
  groups: [ ...fieldGroups ],
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Contenido',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'callToActionObject' }
      ],
    }),
    defineField({
      title: "Alineación",
      name: "alignment",
      type: "string",
      options: {
        list: alignmentOptions.map(({ title, value }) => ({ title, value })),
        layout: 'radio',
      },
      components: { input: AlignmentInput },
      initialValue: 'center',
    }),
    defineField({
      name: 'anchorId',
      title: 'ID del Ancla',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: '',
    },
    prepare(selection) {
      const { title } = selection
      return {
        title: title ?? 'Sin título. Agrega uno dentro de este bloque',
        subtitle: 'Texto Enriquecido',
        media: LetterText,
      }
    },
  },
})