import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Heading from '@/components/shared/heading';
import Container from '@/components/global/container';
import { AllPostsQueryResult } from '../../../../sanity.types';
import { formatDate } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

// Tipos para el bloque
interface LatestBlogPostsBlockProps {
  title?: string;
  showViewAllButton?: boolean;
  posts?: AllPostsQueryResult;
  paddingTop?: 'none' | 'small' | 'medium' | 'default' | 'large';
  paddingBottom?: 'none' | 'small' | 'medium' | 'default' | 'large';
  anchorId?: string;
}

// Mapeo de clases de padding que coincide con el sistema del proyecto
const paddingTopClasses = {
  none: '',
  small: 'pt-8 md:pt-12',
  medium: 'pt-12 md:pt-16',
  default: 'pt-16 md:pt-20',
  large: 'pt-20 md:pt-28'
};

const paddingBottomClasses = {
  none: '',
  small: 'pb-8 md:pb-12', 
  medium: 'pb-12 md:pb-16',
  default: 'pb-16 md:pb-20',
  large: 'pb-20 md:pb-28'
};

export default function LatestBlogPostsBlock({ 
  title = 'Artículos Recientes',
  showViewAllButton = true,
  posts = [],
  paddingTop = 'default',
  paddingBottom = 'default',
  anchorId
}: LatestBlogPostsBlockProps) {
  
  // Si no hay posts, no renderizar nada
  if (!posts || posts.length === 0) {
    return null;
  }

  // Construir clases de padding
  const topClass = paddingTopClasses[paddingTop] || 'pt-16 md:pt-20';
  const bottomClass = paddingBottomClasses[paddingBottom] || 'pb-16 md:pb-20';
  
  return (
    <section 
      className={`${topClass} ${bottomClass}`}
      id={anchorId || undefined}
    >
      <Container>
        {/* Header de la sección */}
        <div className='mb-8 md:mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-dashed'>
          <Heading tag="h2" size="xl" className="text-balance">
            {title}
          </Heading>
          
          {/* Botón "Ver todos" */}
          {showViewAllButton && (
            <Button 
              variant="tertiary" 
              size="default"
              buttonType="external"
              externalUrl="/blog"
              className="whitespace-nowrap"
            >
              Ver todos
            </Button>
          )}
        </div>
        
        {/* Grid de posts simplificado sin interactividad */}
        <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6'>
          {posts.map((post) => (
            <SimplePostCard key={post._id} post={post} />
          ))}
        </div>
      </Container>
    </section>
  );
}

// Componente PostCard simplificado sin interactividad para evitar hidratación
function SimplePostCard({ post }: { post: AllPostsQueryResult[number] }) {
  const { _createdAt, title, category, author, slug, excerpt, image } = post;

  return (
    <article aria-label={title ?? ''} className='relative group pb-8 border-b border-dashed'>
      <Link href={`/blog/${slug}`} className='relative'>
        {/* Categoría */}
        {category?.title && (
          <div className='z-10 absolute top-10 left-10 px-1.5 rounded-md text-sm font-medium text-nowrap bg-white'>
            {category.title}
          </div>
        )}
        
        {/* Imagen */}
        {image?.asset?.url && (
          <div className='p-4 rounded-3xl border border-dashed backdrop-blur-md backdrop-opacity-50 pattern-bg--2'>
            <Image
              src={image.asset.url}
              width={800}
              height={800}
              alt={image.altText ?? ''}
              className='aspect-[3/2] rounded-2xl'
            />
          </div>
        )}
        
        {/* Título */}
        <Heading tag="h2" size="md" className='mt-5 md:mt-6 text-balance'>
          {title}   
        </Heading>
        
        {/* Excerpt */}
        <p className='mt-4 text-balance text-neutral-500'>
          {excerpt}
        </p>
        
        {/* Metadatos simplificados */}
        <div className='mt-5 md:mt-6 flex items-center justify-between'>
          <div className='flex items-center gap-3.5'>
            {/* Avatar simplificado sin hover */}
            {author?.avatar?.asset?.url ? (
              <Image
                src={author.avatar.asset.url}
                width={26}
                height={26}
                alt={author.name ?? ''}
                className='rounded-full'
              />
            ) : (
              <div className="w-[26px] h-[26px] rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-xs font-medium">
                  {author?.name?.charAt(0)?.toUpperCase() ?? '?'}
                </span>
              </div>
            )}
            
            {/* Fecha simplificada */}
            <span className='text-sm font-medium text-gray-500'>
              {formatDate(_createdAt)}
            </span>
          </div>
          
          {/* Icono de flecha */}
          <ChevronRight 
            size={18} 
            className='-translate-x-6 opacity-0 group-hover:-translate-x-0 group-hover:opacity-100 transition-all duration-300 text-gray-600'
          />
        </div>
      </Link>
      
      {/* Línea animada simplificada */}
      <span className="absolute -bottom-[4px] left-0 block h-[2px] w-full max-w-0 group-hover:max-w-full rounded-full transition-all duration-500 ease-out bg-university-navy shadow-university" />
    </article>
  );
} 