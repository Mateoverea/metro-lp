import { Shapes } from "lucide-react";
import { defineField, defineType } from "sanity";
import { fieldsets } from "../../misc/fieldsets";
import { fieldGroups } from "../../misc/field-groups";
import { SpacingInput, spacingOptions } from "@/sanity/components/spacing-input";
import { AlignmentInput, alignmentOptions } from "@/sanity/components/alignment-input";

export default defineType({
  name: 'freeformBlock',
  title: 'Carreras',
  type: 'object',
  fieldsets: [ ...fieldsets ],
  groups: [ ...fieldGroups ],
  fields: [
    defineField({
      name: 'title',
      title: 'Título Principal',
      type: 'string',
      description: 'Título que aparecerá en la parte superior del bloque.',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'showCategoryFilter',
      title: 'Mostrar Filtro de Categorías',
      type: 'boolean',
      description: 'Mostrar botones para filtrar entre Licenciaturas y Maestrías.',
      initialValue: true,
    }),
    defineField({
      name: 'columns',
      title: 'Carreras',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({
            name: 'title',
            type: 'string',
            title: 'Nombre de la Carrera',
            description: 'Título de la carrera (será visible en el carrusel).',
            validation: Rule => Rule.required(),
          }),
          defineField({
            name: 'category',
            title: 'Categoría',
            type: 'string',
            description: 'Selecciona si es licenciatura o maestría.',
            options: {
              list: [
                { title: "Licenciatura", value: "licenciatura" },
                { title: "Maestría", value: "maestria" },
              ],
              layout: 'radio',
            },
            validation: Rule => Rule.required(),
            initialValue: 'licenciatura',
          }),
          defineField({
            title: "Espaciado Entre Elementos",
            name: "spacing",
            type: "string",
            description: 'Agregar espaciado por defecto entre elementos (opcional).',
            options: {
              list: spacingOptions.map(({ title, value }) => ({ title, value })),
              layout: 'radio',
            },
            components: { input: SpacingInput },
            initialValue: 'small',
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
            initialValue: 'left',
          }),
          defineField({
            name: 'items',
            title: 'Contenido de la Carrera',
            type: 'array',
            of: [
              defineField({ 
                name: 'spacerObject', 
                type: 'spacerObject', 
                title: 'Espaciador', 
              }),
              defineField({ 
                name: 'headingObject', 
                type: 'headingObject', 
                title: 'Encabezado', 
              }),
              defineField({ 
                name: 'richTextObject', 
                type: 'richTextObject', 
                title: 'Texto Enriquecido', 
              }),
              defineField({ 
                name: 'buttonObject', 
                type: 'buttonObject', 
                title: 'Botón', 
              }),
              defineField({ 
                name: 'singleImageObject', 
                type: 'singleImageObject', 
                title: 'Imagen', 
              }),
            ]
          }),
        ],
        preview: {
          select: {
            title: 'title',
            category: 'category',
          },
          prepare(selection) {
            const { title, category } = selection;
            return {
              title: title || 'Sin título',
              subtitle: category === 'maestria' ? 'Maestría' : 'Licenciatura',
            }
          },
        },
      }]
    }),
    defineField({
      title: "Borde",
      name: "border",
      type: "string",
      description: 'Mostrar un borde para separar este bloque de los bloques de arriba y abajo.',
      options: {
        list: [
          { title: "Ninguno", value: "none" },
          { title: "Arriba y Abajo", value: "topBottom" },
          { title: "Solo Arriba", value: "top" },
          { title: "Solo Abajo", value: "bottom" },
        ],
      },
      initialValue: 'none',
    }),
    defineField({
      name: 'anchorId',
      title: 'ID de Ancla',
      type: 'string',
      description: 'ID único para enlazar a esta sección.',
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
        title: title ?? 'Sin título establecido. Agrega uno dentro de este bloque',
        subtitle: 'Carreras',
        media: Shapes,
      }
    },
  },
})