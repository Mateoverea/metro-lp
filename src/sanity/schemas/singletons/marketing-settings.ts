import { fieldsets } from "../misc/fieldsets";
import { defineField, defineType } from "sanity";
import { fieldGroups } from "../misc/field-groups";

export default defineType({
  name: 'marketingSettings',
  title: 'Configuración de Marketing',
  type: 'document',
  fieldsets: [ ...fieldsets ],
  groups: [ ...fieldGroups ],
  fields: [
    defineField({
      name: "googleAnalyticsId",
      type: "string",
      title: "ID de Google Analytics",
    }),
    defineField({
      name: "googleTagManagerId",
      type: "string",
      title: "ID de Google Tag Manager",
    }),
  ]
})