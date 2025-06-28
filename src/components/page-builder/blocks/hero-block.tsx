"use client"

import { cn } from '@/lib/utils';
import { PageBuilderType } from '@/types';
import Heading from '@/components/shared/heading';
import Container from '@/components/global/container';

import ButtonRenderer from '@/components/shared/button-renderer';
import PortableTextEditor from '@/components/portable-text/portable-text-editor';
import ElegantText from '@/components/shared/elegant-text';

/**
 * Hero Block Component with Background Image Support
 * 
 * Features:
 * - Main hero content with heading, text, and buttons
 * - Optional foreground image with video overlay support
 * - NEW: Background image support with automatic text color adjustment
 * - Responsive design with proper content layering
 */

export type HeroBlockProps = PageBuilderType<"heroBlock">;

export default function HeroBlock(props: HeroBlockProps) {

  const { 
    heading, 
    content, 
    bottomCornerRadius, 
    buttons, 
    anchorId 
  } = props;

  // Extract backgroundImage from props (bypassing type checking until types are regenerated)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const backgroundImage = (props as any)?.backgroundImage;

  return (
    <section 
      {...(anchorId ? { id: anchorId } : {})} 
      className={cn('min-h-screen w-full pattern-bg border-b border-b-university-academic-200/30 relative overflow-hidden flex items-center', {
        'rounded-3xl md:rounded-4xl': bottomCornerRadius === 'rounded',
        'bg-gradient-university-soft': !backgroundImage?.asset?.url
      })}
      style={backgroundImage?.asset?.url ? {
        backgroundImage: `url(${backgroundImage.asset.url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      } : undefined}
          >
        {/* Background image overlay for better text readability */}
        {backgroundImage?.asset?.url && (
          <div className="absolute inset-0 bg-black/40 rounded-3xl md:rounded-4xl" />
        )}
        
        <Container 
          variant="fullWidth"
          className='relative z-10 px-6 md:px-10 lg:px-16 xl:px-20'
        >
        <div 
          className='py-20 md:py-32 grid grid-cols-12 gap-6 md:gap-8 xl:gap-16 items-center min-h-[80vh]'
        >
          <div className='col-span-12 xl:col-span-8 flex flex-col justify-center space-y-8'>
            <ElegantText variant="fade-up" delay={0.2}>
              <Heading 
                size="xxxl" 
                tag="h1" 
                variant={backgroundImage?.asset?.url ? 'default' : 'gradient'}
                className={cn('text-balance leading-tight drop-shadow-lg text-4xl md:text-5xl lg:text-6xl xl:text-7xl', {
                  'text-white': backgroundImage?.asset?.url,
                  'hover:text-university-navy-light': !backgroundImage?.asset?.url
                })}
              >
                {heading}
              </Heading>
            </ElegantText>
            
            <ElegantText variant="slide-in" delay={0.4}>
              <PortableTextEditor 
                data={content ?? []}
                classNames={cn('text-lg md:text-xl lg:text-2xl text-balance leading-relaxed max-w-4xl', {
                  'text-university-academic-700': !backgroundImage?.asset?.url,
                  'text-gray-100': backgroundImage?.asset?.url
                })}
              />
            </ElegantText>
            
            {buttons && buttons.length > 0 && (
              <ElegantText variant="fade-up" delay={0.6}>
                <div className='pt-4'>
                  <ButtonRenderer buttons={buttons} />  
                </div>
              </ElegantText>
            )}
          </div>
          
          <div className='col-span-12 xl:col-span-4'>
            {/* Espacio para futuro contenido visual */}
          </div>
        </div>

      </Container>
    </section>
  )
}

