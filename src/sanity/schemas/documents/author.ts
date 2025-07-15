import { Users } from "lucide-react";
import { fieldsets } from "../misc/fieldsets";
import { defineField, defineType } from "sanity";
import { fieldGroups } from "../misc/field-groups";

export default defineType({
  name: 'author',
  title: 'Autores',
  type: 'document',
  icon: Users,
  fieldsets: [ ...fieldsets ],
  groups: [ ...fieldGroups ],
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'username',
      title: 'Nombre de Usuario',
      type: 'string',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'bio',
      title: 'Biografía Breve',
      type: 'text',
      rows: 4,
      validation: rule => rule.required()
    }),
    defineField({
      name: 'avatar',
      title: 'Foto de Perfil',
      type: 'image',
    }),
  ]
})