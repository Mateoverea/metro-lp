import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { PageBuilderType } from '@/types';
import Heading from '@/components/shared/heading';
import Container from '@/components/global/container';
import ButtonRenderer from '@/components/shared/button-renderer';
import PortableTextEditor from '@/components/portable-text/portable-text-editor';
import Image from 'next/image';

export type FeaturesMinimalBlockProps = PageBuilderType<"featuresMinimalBlock">;

// Interfaz temporal hasta que se actualicen los tipos generados de Sanity
interface TemporaryFeaturesMinimalBlockProps {
  image?: {
    asset?: {
      url?: string;
    };
    alt?: string;
  } | null;
}

export default function FeaturesMinimalBlock(props: FeaturesMinimalBlockProps) {

  const { 
    heading,
    content, 
    buttons,
    features, 
    enableBorderTop,
    cornerRadiusTop,
    enableBorderBottom,
    cornerRadiusBottom,
    anchorId,
  } = props;

  // Type assertion temporal para acceder a la propiedad image
  const featuresProps = props as unknown as TemporaryFeaturesMinimalBlockProps;
  const image = featuresProps.image;

  return (
    <section
      {...(anchorId ? { id: anchorId } : {})} 
      className={cn('px-4 xl:px-10 bg-gray-50', {
        'border-t': enableBorderTop,
        'border-b': enableBorderBottom,
        'rounded-t-4xl': cornerRadiusTop === 'rounded',
        'rounded-b-4xl': cornerRadiusBottom === 'rounded'
      })}
    >
      <Container className='py-16 md:py-28 border-x border-dashed space-y-10 md:space-y-14'>
        <div className='grid grid-cols-12 gap-y-12 md:gap-y-20 xl:gap-x-20'>
          <div className='col-span-12 xl:col-span-5 max-w-[400px] md:max-w-full space-y-10 md:space-y-10'>
            <div className='lg:flex justify-between xl:flex-col'>
              <Heading tag="h2" size="xl" className='max-w-[420px] relative pr-2.5 py-3 text-balance leading-normal border-y border-dashed border-t-gray-200 border-b-gray-200 bg-gray-50 pattern-bg--2'>
                <span className='relative z-20'>
                  {heading}
                </span>
                <EdgeBlur />
              </Heading>
              {content && (
                <PortableTextEditor 
                  data={content}
                  classNames='max-w-[400px] mt-8 text-balance text-gray-600'
                />
              )}
            </div>
            {buttons && buttons.length > 0 && (
              <ButtonRenderer buttons={buttons} />  
            )}
          </div>
          <div className='col-span-12 xl:col-span-7 space-y-8'>
            <div className='w-full h-48 md:h-56 bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 rounded-2xl border border-gray-200/60 shadow-sm overflow-hidden relative'>
              {image?.asset?.url ? (
                <Image
                  src={image.asset.url}
                  alt={image.alt || 'Featured image'}
                  fill
                  className='object-cover'
                />
              ) : (
                <>
                  <div className='absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10'></div>
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <div className='text-center space-y-2'>
                      <div className='w-16 h-16 mx-auto bg-white/80 rounded-full flex items-center justify-center shadow-lg'>
                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <p className='text-sm text-gray-600 font-medium'>Educación de Excelencia</p>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className='grid md:grid-cols-2 gap-y-4 md:gap-x-10'>
              {features?.map((feature: string) => (
                <div key={feature} className='pb-4 flex items-center gap-3.5 border-b border-dashed border-b-slate-200/80 hover:border-b-blue-300/60 transition-colors duration-200'>
                  <div className='flex-shrink-0 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center'>
                    <Check size={14} className='text-white' />
                  </div>
                  <span className='text-sm md:text-base text-gray-700 hover:text-gray-900 transition-colors duration-200'>
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

function EdgeBlur() {
  return (
    <div className='absolute inset-0 flex items-center justify-between'>
      <div className='relative bg-gradient-to-r from-gray-50 to-transparent h-full w-[100px]'></div>
      <div className='bg-gradient-to-l from-gray-50 to-transparent h-full w-[100px]'></div>
    </div>
  )
}