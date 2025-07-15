import { fieldsets } from "../misc/fieldsets";
import { defineField, defineType } from "sanity";
import { fieldGroups } from "../misc/field-groups";
import { pageReferenceTypes } from "../misc/page-reference-types";

export default defineType({
  name: 'generalSettings',
  title: 'Configuración General',
  type: 'document',
  fieldsets: [ ...fieldsets ],
  groups: [ ...fieldGroups ],
  fields: [
    defineField({
      name: "siteTitle",
      type: "string",
      title: "Título del Sitio",
    }),
    defineField({
      title: 'Logotipo',
      name: 'siteLogo',
      type: 'image',
    }),
    defineField({
      name: 'homePage',
      title: 'Página de Inicio',
      type: 'reference',
      description: 'Elige qué página quieres establecer como página de inicio.',
      to: [ ...pageReferenceTypes ]
    }),
    defineField({
      title: 'Correo Electrónico',
      name: 'companyEmailAddress',
      type: 'string',
      group: 'companyDetails'
    }),
    defineField({
      title: 'Número de Teléfono',
      name: 'companyPhoneNumber',
      type: 'string',
      group: 'companyDetails'
    }),
    defineField({
      name: 'companySocialMediaLinks',
      title: 'Enlaces de Redes Sociales',
      type: 'array',
      group: 'companyDetails',
      of: [{
        type: 'object',
        fields: [
          defineField({
            name: 'title',
            title: 'Nombre de la Plataforma',
            type: 'string',
          }),
          defineField({
            name: 'profileUrl',
            title: 'URL del Perfil',
            type: 'url',
          }),
          defineField({
            name: 'icon',
            title: 'Icono',
            type: 'image',
          }),
        ]
      }]
    }),
    defineField({
      name: "copyright",
      type: "string",
      title: "Copyright",
      description: 'El año actual y el símbolo © se añadirán automáticamente.'
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Configuración General',
      }
    },
  },
})