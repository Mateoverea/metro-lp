import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, useCdn } from "./api"; // 👈 Importa useCdn

export const client = createClient({
  projectId: projectId,
  dataset: dataset,
  apiVersion: apiVersion,
  useCdn: useCdn, // 👈 Usa la configuración del api.ts (que ya está en false)
  perspective: 'published',
  stega: { 
    studioUrl: "/studio",
    enabled: true
  },
});