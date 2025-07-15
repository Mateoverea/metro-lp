import { FiFile } from "react-icons/fi";
import { fieldsets } from "../misc/fieldsets";
import { defineField, defineType } from "sanity";
import { fieldGroups } from "../misc/field-groups";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";

export default defineType({
  name: 'postCategory',
  title: 'Categorías del Blog',
  type: 'document',
  icon: FiFile,
  fieldsets: [ ...fieldsets ],
  groups: [ ...fieldGroups ],
  orderings: [orderRankOrdering],
  fields: [
    defineField({
      name: 'title',
      title: 'Nombre de la Categoría',
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
      name: 'categoryColor',
      title: 'Color de la Categoría',
      type: 'simplerColor',
      description: 'Por defecto es blanco.'
    }),
    orderRankField({ 
      type: 'postCategory' 
    }),
  ]
})