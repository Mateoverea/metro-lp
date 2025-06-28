import { GalleryVertical } from "lucide-react";
import { defineField, defineType } from "sanity";
import { fieldsets } from "../../misc/fieldsets";
import { fieldGroups } from "../../misc/field-groups";

export default defineType({
  name: 'heroBlock',
  title: 'Hero',
  type: 'object',
  fieldsets: [ ...fieldsets ],
  groups: [ ...fieldGroups ],
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        { 
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
        },
      ],
    }),
    defineField({
      title: "Media",
      name: "mediaType",
      type: "string",
      options: {
        list: [
          { title: "Image", value: "image" },
          { title: "None", value: "none" },
        ],
      },
      initialValue: 'image',
    }),
    defineField({
      title: "Corner Radius - Bottom L/R",
      name: "bottomCornerRadius",
      type: "string",
      options: {
        list: [
          { title: "Straight", value: "straight" },
          { title: "Rounded", value: "rounded" },
        ],
      },
      initialValue: 'straight',
    }),
    
    defineField({
      name: 'buttons',
      title: 'Buttons',
      type: 'array',
      of: [{ type: 'buttonObject' }],
    }),
   
    
    defineField({
      title: "Overlay Type",
      name: "overlayType",
      type: "string",
      options: {
        list: [
          { title: "None", value: "none" },
          { title: "Dark", value: "dark" },
        ],
      },
      initialValue: 'none',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      fields: [
        defineField({
          name: 'altText',
          title: 'Alternative Text',
          type: 'string'
        }),
      ],
    }),
    defineField({
      name: 'anchorId',
      title: 'Anchor ID',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      media: '',
    },
    prepare(selection) {
      const { title } = selection
      return {
        title: title ?? 'No title set. Add one inside this block',
        subtitle: 'Hero',
        media: GalleryVertical,
      }
    },
  },
})