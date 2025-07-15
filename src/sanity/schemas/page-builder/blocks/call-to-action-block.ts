import { Clapperboard } from "lucide-react";
import { defineField, defineType } from "sanity";
import { fieldsets } from "../../misc/fieldsets";
import { fieldGroups } from "../../misc/field-groups";

export default defineType({
  name: 'callToActionBlock',
  title: 'Call To Action',
  type: 'object',
  fieldsets: [ ...fieldsets ],
  groups: [ ...fieldGroups ],
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'content',
      title: 'Content',
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
      title: 'Location Text',
      type: 'text',
      group: 'content',
      description: 'Describe your location or address',
      rows: 3,
    }),
    defineField({
      name: 'googleMaps',
      title: 'Google Maps Location',
      type: 'object',
      group: 'content',
      description: 'Embed Google Maps location',
      fields: [
        defineField({
          name: 'embedUrl',
          title: 'Google Maps Embed URL',
          type: 'text',
          description: 'Get the embed URL from Google Maps (Share > Embed a map)',
          rows: 3,
        }),
        defineField({
          name: 'address',
          title: 'Address',
          type: 'text',
          description: 'Full address for display',
          rows: 2,
        }),
        defineField({
          name: 'showMap',
          title: 'Show Map',
          type: 'boolean',
          description: 'Toggle to show/hide the embedded map',
          initialValue: true,
        }),
      ]
    }),
    defineField({
      name: 'button',
      title: 'Action Button',
      type: 'buttonObject',
      group: 'content',
      description: 'Main call-to-action button',
    }),
    defineField({
      name: 'anchorId',
      title: 'Anchor ID',
      type: 'string',
      group: 'settings',
      description: 'Unique ID for linking to this section',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare(selection) {
      const { title } = selection
      return {
        title: title ?? 'No title set. Add one inside this block',
        subtitle: 'Call To Action with Location & Maps',
        media: Clapperboard,
      }
    },
  },
})