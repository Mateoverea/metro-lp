import { Link } from "lucide-react";
import { defineField, defineType, SanityDocumentLike } from "sanity";

function isValidInternalPath(value: string | undefined) {
  if (!value) {
    return "El valor es requerido";
  } else if (!value.startsWith("/")) {
    return "Las rutas internas deben comenzar con /";
  } else if (/[^a-zA-Z0-9\-_/:]/.test(value)) {
    return "La ruta contiene caracteres inválidos";
  } else if (/:[^/]+:/.test(value)) {
    return "Los parámetros solo pueden contener un : directamente después de /";
  } else if (
    value.split("/").some((part) => part.includes(":") && !part.startsWith(":"))
  ) {
    return "El carácter : solo puede aparecer directamente después de /";
  }
  return true;
}

function isValidUrl(value: string | undefined) {
  try {
    new URL(value || "");
    return true;
  } catch {
    return "URL inválida";
  }
}

export default defineType({
  name: "redirect",
  title: "Redirecciones",
  type: "document",
  icon: Link,
  validation: (Rule) => 
    Rule.custom((doc: SanityDocumentLike | undefined) => {
      if (doc && doc.source === doc.destination) {
        return ["source", "destination"].map((field) => ({
          message: "El origen y destino no pueden ser iguales",
          path: [field],
        }));
      }

      return true;
    }),
  fields: [
    defineField({
      name: "source",
      title: "Ruta de Origen",
      type: "string",
      validation: (Rule) => Rule.required().custom(isValidInternalPath),
    }),
    defineField({
      name: "destination",
      title: "Ruta de Destino",
      type: "string",
      validation: (Rule) =>
        Rule.required().custom((value: string | undefined) => {
          const urlValidation = isValidUrl(value);
          const pathValidation = isValidInternalPath(value);

          if (urlValidation === true || pathValidation === true) {
            return true;
          }
          return typeof urlValidation === "boolean"
            ? urlValidation
            : pathValidation;
        }),
    }),
    defineField({
      name: "permanent",
      title: "Redirección Permanente",
      type: "boolean",
      initialValue: true,
      description: "¿Debe ser la redirección permanente (301) o temporal (302)?",
    }),
    defineField({
      name: "isEnabled",
      title: "Activa",
      description: "Activar o desactivar esta redirección",
      type: "boolean",
      initialValue: true,
    }),
  ],
});