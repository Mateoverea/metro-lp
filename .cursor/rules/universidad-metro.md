# Universidad Metropolitana de Occidente - SiteEngine Project

## 🎓 PROYECTO PRINCIPAL
Sitio web institucional para Universidad Metropolitana de Occidente basado en SiteEngine (Next.js + Sanity CMS)
- Sitio actual: https://universidadmetropolitana.mx
- Base técnica: https://github.com/jamesreaco/site-engine

## 🎨 IDENTIDAD VISUAL UNIVERSITARIA
- Color primario: Azul marino #003366
- Secundarios: Blanco, gris claro  
- Estilo: Académico, sobrio, limpio
- Tipografía: Sans-serif moderna

## 📐 ESTRUCTURA OBJETIVO

### 1. LANDING INSTITUCIONAL PRINCIPAL
- Hero con mensaje y CTA
- ¿Por qué estudiar en la Metro?
- Oferta académica
- Instalaciones / Vida estudiantil
- Testimonios
- Contacto y redes

### 2. PLANTILLA REPLICABLE CARRERAS (11 páginas)
- Administración de empresas
- Contaduría pública
- Derecho
- Ciencias de la educación
- Psicología
- Diseño gráfico
- Arquitectura
- Comercio internacional
- Mercadotecnia
- Ciencias de la comunicación
- Sistemas computacionales

#### Estructura por carrera:
- Nombre de la carrera
- ¿Por qué estudiarla?
- Plan de estudios
- Campo laboral  
- CTA de inscripción

## 🏗️ ARQUITECTURA TÉCNICA ACTUAL

### SiteEngine Base:
- Next.js App Router
- Sanity CMS headless
- TypeScript + Tailwind
- Sistema page-builder modular con 12 bloques:
  - heroBlock, headerBlock, featureCardsBlock
  - featuresMinimalBlock, freeformBlock, portableTextBlock
  - callToActionBlock, logoBlock, testimonialBlock
  - servicesBlock, formBlock, mediaBlock

### Sanity Schemas:
- Documentos: page, post, project, service, author, etc.
- Singletons: settings, navigation, blog, marketing
- Page Builder: sistema modular de bloques
- Objetos: seo, heading, rich-text, button, etc.

## 🎯 ENFOQUE DESARROLLO
- Todo editable desde Sanity Studio (/studio)
- Arquitectura modular reutilizable
- Enfoque en contenido académico institucional
- Diseño responsive y accesible

## 📋 REGLAS DESARROLLO
- Código limpio y simple
- Archivos < 200 líneas
- Comentarios explicativos abundantes
- ESLint siempre
- Testear cada cambio
- Modular y reutilizable 