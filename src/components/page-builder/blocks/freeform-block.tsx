import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { stegaClean } from 'next-sanity';
import { Button } from '@/components/ui/button';
import Heading from '@/components/shared/heading';
import Container from '@/components/global/container';
import { ButtonType, PageBuilderType } from '@/types';
import PortableTextEditor from '@/components/portable-text/portable-text-editor';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';

export type FreeformBlockProps = PageBuilderType<"freeformBlock">;

export default function FreeformBlock(props: FreeformBlockProps) {
  // Extraer las propiedades del bloque (usando type assertion temporal para las nuevas propiedades)
  const { title, columns, border, anchorId } = props;
  // @ts-expect-error - Propiedades nuevas hasta actualizar tipos generados
  const showCategoryFilter = props.showCategoryFilter as boolean;
  
  // Estado para el filtro de categorías
  const [activeCategory, setActiveCategory] = useState<'all' | 'licenciatura' | 'maestria'>('all');

  // Filtrar las carreras según la categoría seleccionada
  const filteredColumns = React.useMemo(() => {
    if (!columns || !Array.isArray(columns)) return [];
    
    if (activeCategory === 'all') {
      return columns;
    }
    
    return columns.filter(column => {
      try {
        const category = column?.category;
        if (!category) return false;
        const cleanCategory = stegaClean(category);
        return cleanCategory === activeCategory;
      } catch (error) {
        console.warn('Error filtering column:', error);
        return false;
      }
    });
  }, [columns, activeCategory]);

  // Callbacks estables para evitar re-renders
  const setAllCategory = React.useCallback(() => setActiveCategory('all'), []);
  const setLicenciaturaCategory = React.useCallback(() => setActiveCategory('licenciatura'), []);
  const setMaestriaCategory = React.useCallback(() => setActiveCategory('maestria'), []);

  return (
    <section 
      {...(anchorId ? { id: anchorId } : {})} 
      className='px-4 md:px-10'
    >
      <Container
        className={cn('py-16 md:py-16 border-x border-dashed', {
          'border-y': stegaClean(border) === 'topBottom',
          'border-t': stegaClean(border) === 'top',
          'border-b': stegaClean(border) === 'bottom',
        })}
      >
        
      {/* Título principal */}
      {title && (
        <div className="text-center mb-12">
          <Heading tag="h2" size="xxl" className="mb-4">
            {title}
          </Heading>
        </div>
      )}

      {/* Filtros de categoría */}
      {showCategoryFilter && columns && columns.length > 0 && (
          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-lg bg-gray-100 p-1">
              <button
                onClick={setAllCategory}
                className={cn(
                  'px-6 py-2 text-sm font-medium rounded-md transition-all duration-200',
                  activeCategory === 'all'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                )}
              >
                Todas
              </button>
              <button
                onClick={setLicenciaturaCategory}
                className={cn(
                  'px-6 py-2 text-sm font-medium rounded-md transition-all duration-200',
                  activeCategory === 'licenciatura'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                )}
              >
                Licenciaturas
              </button>
              <button
                onClick={setMaestriaCategory}
                className={cn(
                  'px-6 py-2 text-sm font-medium rounded-md transition-all duration-200',
                  activeCategory === 'maestria'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                )}
              >
                Maestrías
              </button>
            </div>
          </div>
        )}

        {/* Mensaje cuando no hay carreras para mostrar */}
        {filteredColumns.length === 0 && columns && columns.length > 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No hay carreras disponibles en esta categoría.
            </p>
          </div>
        )}

        {/* Carrusel de carreras */}
        {filteredColumns.length > 0 && (
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {filteredColumns.map((column) => (
                <CarouselItem key={column?._key} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                  <div 
                    className={cn(
                      'flex flex-col h-full min-h-[500px] bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden',
                      {
                        'items-center text-center': stegaClean(column?.alignment) === 'center',
                        'items-end text-right': stegaClean(column?.alignment) === 'right',
                        'items-start text-left': stegaClean(column?.alignment) === 'left' || !column?.alignment,
                      }
                    )}
                  >
                    {/* Header visual IDÉNTICO en todas las tarjetas - Con el TÍTULO */}
                    <div className="w-full h-20 bg-gradient-to-r from-university-navy/90 to-university-navy/90 flex items-center justify-center relative">
                      {/* TÍTULO siempre en el mismo lugar - IDÉNTICO en estructura */}
                      <div className="relative z-10 px-4 py-2 text-center max-w-full">
                        <Heading tag="h3" size="md" className="text-white font-normal leading-tight line-clamp-2 min-h-[1.5rem] flex items-center justify-center">
                          {column?.title || 'Título de Carrera'}
                        </Heading>
                      </div>
                      
                      {/* Badge de categoría en esquina - consistente */}
                      <div className="absolute top-0.5 left-1">
                        <span className={cn(
                          'px-2 py-1 text-xs font-bold rounded-full',
                          stegaClean(column?.category) === 'maestria'
                            ? 'bg-university-silver text-university-navy'
                            : 'bg-white text-university-navy'
                        )}>
                          {stegaClean(column?.category) === 'maestria' ? 'Mtro.' : 'Lic.'}
                        </span>
                      </div>
                    </div>

                    {/* Contenido variable */}
                    <div className="p-4 flex-1 flex flex-col">
                      {/* El título ya está arriba, aquí va el resto del contenido */}

                    {/* Contenido de la carrera - Separamos contenido principal de botones */}
                    {/* Contenido principal que crece para llenar espacio disponible */}
                    <div className="flex-1 space-y-4">
                      {column?.items?.filter(item => item?._type !== 'buttonObject').map((item) => (
                        <React.Fragment key={item?._key}>
                          {/* Encabezado */}
                          {(item?._type === 'headingObject' && item?.headingText) && (
                            <Heading tag={item?.headingTag} size={item?.headingSize}>
                              {item?.headingText}
                            </Heading>
                          )}
                          
                          {/* Espaciador */}
                          {(item?._type === 'spacerObject' && item?.spacing) && (
                            <div 
                              className={cn('h-0', {
                                'h-4': stegaClean(item?.spacing) === 'small',
                                'h-6': stegaClean(item?.spacing) === 'medium',
                                'h-8': stegaClean(item?.spacing) === 'large',
                              })}
                            />
                          )}
                          
                          {/* Texto enriquecido */}
                          {(item?._type === 'richTextObject' && item?.richTextContent) && (
                            <PortableTextEditor 
                              data={item?.richTextContent} 
                              classNames='text-balance text-gray-600 leading-relaxed'
                            />
                          )}
                          
                          {/* Imagen */}
                          {(item?._type === 'singleImageObject' && item?.image?.asset?.url) && (
                            <div className='group p-3 border border-dashed rounded-2xl bg-gray-50 cursor-pointer overflow-hidden'>
                              <Image
                                src={item?.image?.asset?.url ?? ''}
                                width={400}
                                height={300}
                                alt={item?.image?.asset?.altText ?? ''}
                                className={cn('object-cover w-full rounded-xl transition-transform duration-300 group-hover:scale-105', {
                                  'aspect-square': !item?.image?.aspectRatio || stegaClean(item?.image?.aspectRatio) === 'square',
                                  'aspect-[3/2]': stegaClean(item?.image?.aspectRatio) === 'rectangle',
                                  'aspect-[3/4]': stegaClean(item?.image?.aspectRatio) === 'portrait',
                                })}
                              />
                            </div>
                          )}
                        </React.Fragment>
                      ))}
                    </div>

                    {/* Sección de botones fija en la parte inferior */}
                    {column?.items?.some(item => item?._type === 'buttonObject') && (
                      <div className="mt-auto space-y-3">
                        {column?.items?.filter(item => item?._type === 'buttonObject').map((item) => (
                          <Button 
                            key={item?._key}
                            size="sm"
                            variant={stegaClean(item?.buttonVariant)}
                            buttonType={item?.buttonType}
                            pageReference={item?.buttonPageReference as ButtonType['buttonPageReference']}
                            externalUrl={item?.buttonExternalUrl ?? ''}
                            className="w-full"
                          >
                            {item?.buttonText}
                          </Button>
                        ))}
                      </div>
                    )}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Botones de navegación del carrusel */}
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}
      </Container>
    </section>
  )
}