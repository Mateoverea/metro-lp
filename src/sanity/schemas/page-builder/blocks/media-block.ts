import { Image } from "lucide-react";
import { defineField, defineType } from "sanity";
import { fieldsets } from "../../misc/fieldsets";
import { fieldGroups } from "../../misc/field-groups";

export default defineType({
  name: 'mediaBlock',
  title: 'Media Gallery',
  type: 'object',
  fieldsets: [ ...fieldsets ],
  groups: [ ...fieldGroups ],
  fields: [
    // Main title for the media gallery
    defineField({
      name: 'title',
      title: 'Gallery Title',
      type: 'string',
      description: 'Optional title for the media gallery'
    }),
    
    // Array of images for the bento grid
    defineField({
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: { hotspot: true },
            fields: [
              defineField({
                name: 'altText',
                title: 'Alternative Text',
                type: 'string'
              }),
            ]
          }),
          defineField({
            name: 'caption',
            title: 'Caption',
            type: 'string',
            description: 'Optional caption for this image'
          }),
          defineField({
            name: 'size',
            title: 'Grid Size',
            type: 'string',
            options: {
              list: [
                { title: 'Small (1x1)', value: 'small' },
                { title: 'Medium (2x1)', value: 'medium' },
                { title: 'Large (2x2)', value: 'large' },
              ],
            },
            initialValue: 'small'
          })
        ],
        preview: {
          select: {
            title: 'caption',
            media: 'image',
            subtitle: 'size'
          },
          prepare(selection) {
            const { title, media, subtitle } = selection
            return {
              title: title || 'No caption',
              media: media,
              subtitle: `Size: ${subtitle}`
            }
          }
        }
      }],
      validation: Rule => Rule.min(3).max(12).error('Please add between 3 and 12 images')
    }),

    // Layout options
    defineField({
      name: 'layoutStyle',
      title: 'Layout Style',
      type: 'string',
      options: {
        list: [
          { title: 'Bento Grid', value: 'bento' },
          { title: 'Carousel Only', value: 'carousel' },
          { title: 'Mixed (Grid + Carousel)', value: 'mixed' },
        ],
      },
      initialValue: 'bento'
    }),

    // Background settings
    defineField({
      title: "Background Width",
      name: "backgroundWidth",
      type: "string",
      options: {
        list: [
          { title: "Full-width", value: "full" },
          { title: "Contained", value: "contained" },
        ],
      },
      initialValue: 'full',
    }),

    // Anchor ID
    defineField({
      name: 'anchorId',
      title: 'Anchor ID',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'images.0.image',
      count: 'images'
    },
    prepare(selection) {
      const { title, media, count } = selection
      const imageCount = count ? count.length : 0
      return {
        title: title || 'Media Gallery',
        subtitle: `${imageCount} images`,
        media: media || Image,
      }
    },
  },
})