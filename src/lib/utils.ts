import { Metadata } from 'next';
import toast from "react-hot-toast";
import { ButtonType } from '@/types';
import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { urlForImage } from '@/sanity/lib/utils';

import { 
  BlogPageQueryResult, 
  PageBySlugQueryResult, 
  PostBySlugQueryResult, 
  ProjectBySlugQueryResult, 
  ProjectsPageQueryResult, 
   
} from '../../sanity.types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
};

export function scrollToElement(id: string) {
  const element = document.getElementById(id)
  if (element) {
    const rect = element.getBoundingClientRect()
    const scrollTop = window.scrollY + rect.top - 90
    window.scrollTo({ top: scrollTop, behavior: 'smooth' })
  }
};

export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
};

export function truncateText(text: string, target: number) {
  if (text.length > target) { 
    return text.slice(0, target) + '...';
  };
  return text;
};

export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).replace(/(\d+)/, (match) => {
    const num = parseInt(match);
    const suffix = ['th', 'st', 'nd', 'rd'][
      (num > 3 && num < 21) || num % 10 > 3 ? 0 : num % 10
    ];
    return match + suffix;
  });
};

export async function copyHeadingUrl(id: string): Promise<boolean> {
  try {
    const url = `${window.location.href.split('#')[0]}#${id}`;
    await navigator.clipboard.writeText(url);
    return true;
  } catch (error) {
    console.error('Failed to copy URL:', error);
    return false;
  }
};

export function copyToClipboard(input: string) {
  
  if (input.startsWith('#') || document.getElementById(input)) {
    copyHeadingUrl(input.startsWith('#') ? input.substring(1) : input)
      .then(() => toast.success('Copied link to clipboard'))
      .catch(() => toast.error('Failed to copy link'));
  } 
  
  else {
    navigator.clipboard.writeText(input)
      .then(() => toast.success('Copied to clipboard'))
      .catch(() => toast.error('Failed to copy text'));
  }
};

export function formatFieldId(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-');
}

export function getAnchorHref({ 
  anchorLocation, 
  anchorId, 
  pageReference 
}: { 
  anchorLocation: ButtonType['buttonAnchorLocation'];
  anchorId: ButtonType['buttonAnchorId'];
  pageReference: ButtonType['buttonPageReference'];
}) {
  if (anchorLocation === 'currentPage') {
    return `#${anchorId}`;
  }
  
  // Usar resolveHref para construir la URL correcta de la página
  const pageHref = resolveHref(pageReference?._type, pageReference?.slug ?? '');
  return `${pageHref}#${anchorId}`;
}

export function getPageHref(page: { slug: string; _type?: string }) {
  return `/${page._type ? `${page._type}/` : ''}${page.slug}`;
}

export function resolveHref(documentType?: string, slug?: string): string | undefined {
  switch (documentType) {
    case 'home':
      return '/';
    case 'page':
      // Detectar automáticamente si la página debería estar bajo /oferta-academica/
      if (slug && isAcademicOfferPage(slug)) {
        return `/oferta-academica/${slug}`;
      }
      return slug ? `/${slug}` : undefined;
    case 'project':
      return slug ? `/oferta-academica/${slug}` : undefined;
    case 'projectCategory':
      return slug ? `/oferta-academica/category/${slug}` : undefined;
    case 'post':
      return slug ? `/blog/${slug}` : undefined;
    default:
      return `/${slug}`;
  }
}

// Función auxiliar para detectar si una página debería estar bajo /oferta-academica/
function isAcademicOfferPage(slug: string): boolean {
  // Lista de slugs que deberían estar bajo /oferta-academica/
  const academicOfferPages = [
    'administracion',
    'contabilidad',
    'derecho',
    'psicologia',
    'ingenieria',
    'medicina',
    'enfermeria',
    'arquitectura',
    'educacion',
    'comunicacion',
    'marketing',
    'turismo',
    'gastronomia',
  ];

  // Verificar si el slug exacto está en la lista
  if (academicOfferPages.includes(slug.toLowerCase())) {
    return true;
  }

  // Verificar si el slug contiene palabras clave relacionadas con programas académicos
  const academicKeywords = [
    'carrera',
    'programa',
    'licenciatura',
    'tecnico',
    'diplomado',
    'especialidad',
    'maestria',
    'doctorado',
    'ingenieria',
    'bachillerato',
  ];

  const lowerSlug = slug.toLowerCase();
  return academicKeywords.some(keyword => lowerSlug.includes(keyword));
}

export type PageQueryResult = 
  | PageBySlugQueryResult 
  | BlogPageQueryResult 
  | PostBySlugQueryResult
  | ProjectsPageQueryResult
  | ProjectBySlugQueryResult;
  
export function processMetadata({ data }: {
  data: PageQueryResult;
}): Metadata {

  const { _id: id, title: pageTitle } = data ?? {};
  const { title, description, image, noIndex } = data?.seo ?? {};

  const metadata: Metadata = {
    title: {
      template: `${title ? title : pageTitle} | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
      default: `${title ? title : pageTitle}`,
    },
    description,
  };

  metadata.openGraph = {
    images: {
      url: image
        ? urlForImage(image)?.width(1200).height(630).url() as string
        : `/api/og?id=${id}`,
      width: 1200,
      height: 630,
    },
  };

  if (noIndex) {
    metadata.robots = 'noindex'
  };

  return metadata;
}