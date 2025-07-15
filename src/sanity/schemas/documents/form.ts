import { File } from "lucide-react";
import { fieldsets } from "../misc/fieldsets";
import { defineField, defineType } from "sanity";
import { fieldGroups } from "../misc/field-groups";

export default defineType({
  name: 'form',
  title: 'Formularios',
  type: 'document',
  icon: File,
  fieldsets: [ ...fieldsets ],
  groups: [ ...fieldGroups ],
  fields: [
    defineField({
      name: 'title',
      title: 'Título del Formulario',
      type: 'string',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'submitButtonText',
      title: 'Texto del Botón de Envío',
      type: 'string',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'fields',
      title: 'Campos del Formulario',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Nombre/Etiqueta',
              type: 'string',
            }),
            defineField({
              name: 'placeholder',
              title: 'Texto de Ayuda',
              type: 'string',
            }),
            defineField({
              name: "inputType",
              title: "Tipo de Campo",
              type: "string",
              options: {
                list: [
                  { title: "Texto", value: "text" },
                  { title: "Área de Texto", value: "textarea" },
                  { title: "Correo Electrónico", value: "email" },
                  { title: "Teléfono", value: "tel" },
                ],
              },
              initialValue: 'text',
            }),
            defineField({
              name: 'isRequired',
              title: 'Campo Obligatorio',
              type: 'boolean',
              initialValue: false
            }),
          ],
        },
      ],
    }),
    
  ]
})