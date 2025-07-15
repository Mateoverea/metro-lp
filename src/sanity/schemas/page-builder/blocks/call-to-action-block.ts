import { Clapperboard } from "lucide-react";
import { defineField, defineType } from "sanity";
import { fieldsets } from "../../misc/fieldsets";
import { fieldGroups } from "../../misc/field-groups";

export default defineType({
  name: 'callToActionBlock',
  title: 'Llamada a la Acción',
  type: 'object',
  fieldsets: [ ...fieldsets ],
  groups: [ ...fieldGroups ],
  fields: [
    defineField({
      name: 'heading',
      title: 'Título',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'content',
      title: 'Contenido',
      type: 'array',
      group: 'content',
      of: [
        { 
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
        },
      ],
    }),
    defineField({
      name: 'locationText',
      title: 'Texto de Ubicación',
      type: 'text',
      group: 'content',
      description: 'Describe tu ubicación o dirección',
      rows: 3,
    }),
    defineField({
      name: 'googleMaps',
      title: 'Ubicación de Google Maps',
      type: 'object',
      group: 'content',
      description: 'Insertar ubicación de Google Maps',
      fields: [
        defineField({
          name: 'embedUrl',
          title: 'URL de Inserción de Google Maps',
          type: 'text',
          description: 'Obtén la URL de inserción desde Google Maps (Compartir > Insertar mapa)',
          rows: 3,
        }),
        defineField({
          name: 'address',
          title: 'Dirección',
          type: 'text',
          description: 'Dirección completa para mostrar',
          rows: 2,
        }),
        defineField({
          name: 'showMap',
          title: 'Mostrar Mapa',
          type: 'boolean',
          description: 'Alternar para mostrar/ocultar el mapa insertado',
          initialValue: true,
        }),
      ]
    }),
    defineField({
      name: 'button',
      title: 'Botón de Acción',
      type: 'buttonObject',
      group: 'content',
      description: 'Botón principal de llamada a la acción',
    }),
    defineField({
      name: 'anchorId',
      title: 'ID del Ancla',
      type: 'string',
      group: 'settings',
      description: 'ID único para enlazar a esta sección',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare(selection) {
      const { title } = selection
      return {
        title: title ?? 'Sin título. Agrega uno dentro de este bloque',
        subtitle: 'Llamada a la Acción con Ubicación y Mapas',
        media: Clapperboard,
      }
    },
  },
})