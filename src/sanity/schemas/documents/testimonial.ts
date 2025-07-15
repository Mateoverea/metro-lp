import { Star } from "lucide-react";
import { fieldsets } from "../misc/fieldsets";
import { defineField, defineType } from "sanity";
import { fieldGroups } from "../misc/field-groups";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";

export default defineType({
  name: 'testimonial',
  title: 'Testimonios',
  type: 'document',
  icon: Star,
  fieldsets: [ ...fieldsets ],
  groups: [ ...fieldGroups ],
  orderings: [orderRankOrdering],
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'jobTitle',
      title: 'Cargo/Puesto',
      type: 'string',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'company',
      title: 'Empresa/Institución',
      type: 'string',
    }),
    defineField({
      name: 'quote',
      title: 'Testimonio',
      type: 'text',
      rows: 6,
      validation: rule => rule.required()
    }),
    defineField({
      name: 'avatar',
      title: 'Foto de Perfil',
      type: 'image',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'logo',
      title: 'Logo de la Empresa',
      type: 'image',
      validation: rule => rule.required()
    }),
    orderRankField({ 
      type: 'postCategory' 
    }),
  ],
})