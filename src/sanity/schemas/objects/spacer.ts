import { defineField, defineType } from "sanity";
import { BetweenHorizonalEnd } from "lucide-react";
import { SpacingInput, spacingOptions } from "@/sanity/components/spacing-input";

export default defineType({
  name: 'spacerObject',
  title: 'Espaciador',
  type: 'object',
  fields: [
    defineField({
      title: "Espaciado",
      name: "spacing",
      type: "string",
      options: {
        list: spacingOptions.map(({ title, value }) => ({ title, value })),
        layout: 'radio',
      },
      components: { input: SpacingInput },
      initialValue: 'small',
    }),
  ],
  preview: {
    select: {
      title: 'spacing',
    },
    prepare(selection) {
      const { title } = selection
      return {
        title: (title ?? 'Sin título. Agrega uno dentro de este bloque').charAt(0).toUpperCase() + 
              (title ?? 'Sin título. Agrega uno dentro de este bloque').slice(1),
        subtitle: 'Espaciador',
        media: BetweenHorizonalEnd,
      }
    },
  },
})