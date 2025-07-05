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
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      group: 'content',
      description: 'Main image for the call-to-action section',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for accessibility and SEO',
        })
      ]
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
      name: 'socialMediaPlatforms',
      title: 'Social Media Platforms',
      type: 'array',
      group: 'content',
      description: 'Add your social media links',
      of: [{
        type: 'object',
        fields: [
          defineField({
            name: 'platform',
            title: 'Platform Name',
            type: 'string',
            description: 'e.g., Instagram, Facebook, Twitter',
          }),
          defineField({
            name: 'profileUrl',
            title: 'Profile URL',
            type: 'url',
            description: 'Full URL to your social media profile',
          }),
          defineField({
            name: 'icon',
            title: 'Platform Icon',
            type: 'image',
            description: 'Upload an icon for this platform',
          }),
        ],
        preview: {
          select: {
            title: 'platform',
            subtitle: 'profileUrl',
            media: 'icon',
          },
        },
      }]
    }),
    defineField({
      name: 'whatsappContact',
      title: 'WhatsApp Contact',
      type: 'object',
      group: 'content',
      description: 'WhatsApp contact information',
      fields: [
        defineField({
          name: 'phoneNumber',
          title: 'Phone Number',
          type: 'string',
          description: 'WhatsApp phone number (with country code, e.g., +1234567890)',
        }),
        defineField({
          name: 'message',
          title: 'Default Message',
          type: 'text',
          description: 'Pre-filled message when users click WhatsApp link',
          rows: 2,
        }),
        defineField({
          name: 'buttonText',
          title: 'Button Text',
          type: 'string',
          initialValue: 'Chat on WhatsApp',
        }),
      ]
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
      media: 'featuredImage',
    },
    prepare(selection) {
      const { title, media } = selection
      return {
        title: title ?? 'No title set. Add one inside this block',
        subtitle: 'Call To Action with Location & Social Media',
        media: media || Clapperboard,
      }
    },
  },
})