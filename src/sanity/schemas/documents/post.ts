import { FiFile } from "react-icons/fi";
import { fieldsets } from "../misc/fieldsets";
import { defineField, defineType } from "sanity";
import { fieldGroups } from "../misc/field-groups";

export default defineType({
  name: 'post',
  title: 'Artículos del Blog',
  type: 'document',
  icon: FiFile,
  fieldsets: [ ...fieldsets ],
  groups: [ ...fieldGroups ],
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: rule => rule.required()
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'reference',
      to: { type: 'postCategory' },
      validation: rule => rule.required()
    }),
    defineField({
      name: 'author',
      title: 'Autor',
      type: 'reference',
      to: { type: 'author' },
      validation: rule => rule.required()
    }),
    defineField({
      name: 'excerpt',
      title: 'Extracto',
      type: 'text',
      rows: 4  
    }),
    defineField({
      name: 'content',
      title: 'Contenido',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'callToActionObject' },
        { type: 'singleImageObject' },
        { type: 'videoObject' }
      ],
    }),
    defineField({
      name: 'image',
      title: 'Imagen',
      type: 'image',
      fields: [
        defineField({
          name: 'altText',
          title: 'Texto Alternativo',
          type: 'string'
        }),
        defineField({
          name: 'caption',
          title: 'Descripción',
          type: 'string'
        }),
      ],
    }),
    defineField({
      title: "Related Posts",
      name: "relatedPostsType",
      type: "string",
      description: "Defaults to posts of the same category.",
      options: {
        list: [
          { title: "Autofill", value: "autofill" },
          { title: "Custom", value: "custom" },
        ],
      },
      initialValue: 'autofill',
    }),
    defineField({
      title: "Choose Related Posts",
      name: "customRelatedPosts",
      type: "array",
      of: [{ 
        type: 'reference', 
        to: [{ type: 'post' }] 
      }],
      validation: rule => rule.max(3),
      hidden: ({ parent }) => parent?.relatedPosts !== 'custom'
    }),
    defineField({
      name: "seo",
      title: 'SEO',
      type: "seoObject",
    }),
  ]
})