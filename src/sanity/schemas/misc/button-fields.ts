import { defineField } from "sanity";
import { pageReferenceTypes } from "./page-reference-types";

export const buttonFields = [
  defineField({
    name: 'showButton',
    title: 'Mostrar Botón',
    type: 'boolean',
    initialValue: false
  }),
  defineField({
    name: 'buttonText',
    title: 'Texto del Botón',
    type: 'string',
    hidden: ({parent}) => !parent?.showButton,
  }),
  defineField({
    title: "Tipo de Botón",
    name: "buttonType",
    type: "string",
    options: {
      list: [
        { title: "Interno", value: "internal" },
        { title: "Ancla", value: "anchor" },
        { title: "URL Externa", value: "external" },
        { title: "Descarga de Archivo", value: "fileDownload" },
        { title: "Dirección de Email", value: "emailAddress" },
      ],
    },
    initialValue: 'internal',
    hidden: ({parent}) => !parent?.showButton,
  }),
  defineField({
    title: "Ubicación del Ancla del Botón",
    name: "buttonAnchorLocation",
    type: "string",
    options: {
      list: [
        { title: "Página Actual", value: "currentPage" },
        { title: "Elegir Página", value: "choosePage" },
      ],
    },
    initialValue: 'currentPage',
    hidden: ({ parent }) => !parent?.showButton || parent?.buttonType !== 'anchor',
  }),
  defineField({
    name: 'buttonPageReference',
    title: 'Referencia de Página del Botón',
    description: 'La página a la que enlazará el botón.',
    type: 'reference',
    to: [ ...pageReferenceTypes ],
    hidden: ({ parent }) => !parent?.showButton || 
      (parent?.buttonType !== 'internal' && 
       !(parent?.buttonType === 'anchor' && parent?.buttonAnchorLocation === 'choosePage')),
  }),
  defineField({
    name: 'buttonAnchorId',
    title: 'ID del Ancla del Botón',
    description: 'El ID del ancla al que enlazará el botón.',
    type: 'string',
    hidden: ({ parent }) => !parent?.showButton || parent?.buttonType !== 'anchor',
  }),
  defineField({
    name: 'buttonExternalUrl',
    title: 'URL Externa del Botón',
    description: 'La URL externa a la que enlazará el botón.',
    type: 'url',
    validation: Rule => Rule.uri({ scheme: ['http', 'https', 'mailto', 'tel'] }),
    hidden: ({ parent }) => !parent?.showButton || parent?.buttonType !== 'external',
  }),
  defineField({
    name: 'buttonEmailAddress',
    title: 'Dirección de Email del Botón',
    description: 'La dirección de email a la que enlazará el botón.',
    type: 'string',
    hidden: ({ parent }) => !parent?.showButton || parent?.buttonType !== 'emailAddress',
  }),
  defineField({
    name: 'buttonFileUrl',
    title: 'URL del Archivo del Botón',
    type: 'file',  
    hidden: ({ parent }) => !parent?.showButton || parent?.buttonType !== 'fileDownload',
  }),
  defineField({
    title: "Variante del Botón",
    name: "buttonVariant",
    type: "string",
    options: {
      list: [
        { title: "Primario", value: "primary" },
        { title: "Secundario", value: "secondary" },
        { title: "Terciario", value: "tertiary" },
        { title: "Contorno", value: "outline" },
        { title: "Subrayado", value: "underline" },
      ],
    },
    initialValue: 'primary',
    hidden: ({parent}) => !parent?.showButton,
  }),
  defineField({
    title: "Ancho del Botón",
    name: "buttonWidth",
    type: "string",
    options: {
      list: [
        { title: "Automático", value: "auto" },
        { title: "Ancho Completo", value: "fullWidth" },
      ],
    },
    initialValue: 'auto',
    hidden: ({parent}) => !parent?.showButton,
  }),
]