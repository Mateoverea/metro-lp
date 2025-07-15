import { fieldsets } from "../misc/fieldsets";
import { fieldGroups } from "../misc/field-groups";
import { pageReferenceTypes } from "../misc/page-reference-types";
import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: 'navigationSettings',
  title: 'Configuración de Navegación',
  type: 'document',
  fieldsets: [ ...fieldsets ],
  groups: [ ...fieldGroups ],
  fields: [
    defineField({
      name: 'navbarMenuItems',
      title: 'Elementos del Menú',
      type: 'array',
      group: 'navbar',
      fieldset: 'navbar',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              title: "Tipo de Elemento de Menú",
              name: "menuItemType",
              type: "string",
              options: {
                list: [
                  { title: "Individual", value: "single" },
                  { title: "Grupo", value: "group" },
                ],
              },
              initialValue: 'single',
            }),
            defineField({
              name: 'title',
              title: 'Título',
              type: 'string',
              description: 'El título del elemento del menú.'
            }),
            defineField({
              name: 'pageReference',
              title: 'Página',
              description: 'La página a la que enlazará el elemento del menú.',
              type: 'reference',
              to: [ ...pageReferenceTypes ],
              hidden: ({ parent }) => parent?.menuItemType !== 'single'
            }),
            defineField({
              title: "Referencias de Páginas",
              name: "pageReferences",
              type: "array",
              of: [{ 
                type: 'reference', 
                to: [ ...pageReferenceTypes ]
              }],
              hidden: ({ parent }) => parent?.menuItemType !== 'group'
            }),
            defineField({
              name: 'isButton',
              title: 'Mostrar como Botón',
              type: 'boolean',
              description: 'Si está marcado, el elemento del menú se mostrará como un botón en lugar de un enlace.',
              initialValue: false,
              hidden: ({ parent }) => parent?.menuItemType !== 'single'
            })
          ]
        }),
      ],
    }),
    defineField({
      name: 'showSlideOutMenu',
      title: 'Mostrar Menú Deslizante',
      type: 'boolean',
      group: 'slideOutMenu',
      fieldset: 'slideOutMenu',
      initialValue: false
    }),
    defineField({
      name: 'slideOutMenuItems',
      title: 'Elementos del Menú',
      type: 'array',
      group: 'slideOutMenu',
      fieldset: 'slideOutMenu',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              title: "Tipo de Elemento de Menú",
              name: "menuItemType",
              type: "string",
              options: {
                list: [
                  { title: "Individual", value: "single" },
                  { title: "Grupo", value: "group" },
                ],
              },
              initialValue: 'single',
            }),
            defineField({
              name: 'title',
              title: 'Título',
              type: 'string',
              description: 'El título del elemento del menú.'
            }),
            defineField({
              name: 'pageReference',
              title: 'Página',
              description: 'La página a la que enlazará el elemento del menú.',
              type: 'reference',
              to: [ ...pageReferenceTypes ],
              hidden: ({ parent }) => parent?.menuItemType !== 'single'
            }),
            defineField({
              title: "Referencias de Páginas",
              name: "pageReferences",
              type: "array",
              of: [{ 
                type: 'reference', 
                to: [ ...pageReferenceTypes ]
              }],
              hidden: ({ parent }) => parent?.menuItemType !== 'group'
            }),
            defineField({
              name: 'isButton',
              title: 'Mostrar como Botón',
              type: 'boolean',
              description: 'Si está marcado, el elemento del menú se mostrará como un botón en lugar de un enlace.',
              initialValue: false
            })
          ]
        }),
      ],
      hidden: ({ parent }) => !parent.showSlideOutMenu
    }),
    defineField({
      name: 'slideOutMenuButtons',
      title: 'Botones',
      type: 'array',
      group: 'slideOutMenu',
      fieldset: 'slideOutMenu',
      of: [{ type: 'buttonObject' }],
      description: 'Mostrar botones en el pie del menú deslizante.'
    }),
    defineField({
      name: 'showCompanyDetailsSlideOutMenu',
      title: 'Mostrar Detalles de la Empresa',
      type: 'boolean',
      group: 'slideOutMenu',
      fieldset: 'slideOutMenu',
      description: 'Cuando esté habilitado, los detalles de la empresa (email, teléfono y redes sociales) agregados en la configuración general se mostrarán en el menú deslizante debajo de los elementos del menú.',
      initialValue: false
    }),
    defineField({
      name: 'footerColumns',
      title: 'Columnas del Pie de Página',
      type: 'array',
      group: 'footer',
      fieldset: 'footer',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Título de la Columna',
              type: 'string',
            }),
            defineField({
              name: 'menuItems',
              title: 'Elementos del Menú',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'title',
                      title: 'Título',
                      type: 'string',
                      description: 'El título del elemento del menú.'
                    }),
                    defineField({
                      title: "Tipo de Enlace",
                      name: "linkType",
                      type: "string",
                      options: {
                        list: [
                          { title: "Interno", value: "internal" },
                          { title: "URL Externa", value: "external" },
                        ],
                      },
                      initialValue: 'internal',
                    }),
                    defineField({
                      name: 'pageReference',
                      title: 'Página',
                      description: 'La página a la que enlazará el elemento del menú.',
                      type: 'reference',
                      to: [ ...pageReferenceTypes ],
                      hidden: ({ parent }) => parent?.linkType !== 'internal',
                    }),
                    defineField({
                      name: 'externalUrl',
                      title: 'URL Externa',
                      description: 'La URL externa a la que enlazará el elemento del menú.',
                      type: 'url',
                      validation: Rule => Rule.uri({ scheme: ['http', 'https', 'mailto', 'tel'] }),
                      hidden: ({ parent }) => parent?.linkType !== 'external',
                    }),
                  ]
                }
              ]
            })
          ]
        })
      ]
    }),
    defineField({
      name: 'footerLegalMenuItems',
      title: 'Elementos del Menú Legal',
      type: 'array',
      group: 'footer',
      fieldset: 'footer',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Título',
              type: 'string',
              description: 'El título del elemento del menú.'
            }),
            defineField({
              name: 'pageReference',
              title: 'Página',
              description: 'La página a la que enlazará el elemento del menú.',
              type: 'reference',
              to: [ ...pageReferenceTypes ]
            }),
          ]
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Navegación',
      }
    },
  },
})
