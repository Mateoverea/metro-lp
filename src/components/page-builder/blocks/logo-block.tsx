import Image from 'next/image';
import { cn } from '@/lib/utils';
import { stegaClean } from 'next-sanity';
import { PageBuilderType } from '@/types';
import Container from '@/components/global/container';
import Heading from '@/components/shared/heading';

export type LogoBlockProps = PageBuilderType<"logoBlock">;

/**
 * Logo Block Component with Ultra-Smooth Marquee Animation
 * 
 * Features:
 * - Hardware-accelerated animations using translate3d()
 * - Triple content duplication for seamless infinite loops
 * - Clean white background with consistent styling
 * - Smooth pause on hover with animation-play-state
 * - Responsive design with proper spacing
 * - No overlapping or stuttering issues
 * - Performance optimized for modern browsers
 */
export default function LogoBlock(props: LogoBlockProps) {

  const { heading, logos, anchorId } = props;
  
  return (
    <section 
      {...(anchorId ? { id: anchorId } : {})}
      className='px-4 md:px-10'
    >
      <Container className='pt-8 border-x border-dashed'>
        {/* Section title with consistent styling */}
        {heading && (
          <div className='text-center mb-12'>
            <Heading tag="h2" size="xxl" className='text-balance leading-normal'>
              {heading}
            </Heading>
          </div>
        )}
        
        {/* Ultra-smooth marquee container */}
        <div className="relative overflow-hidden">
          {/* Main marquee track with hardware acceleration */}
          <div 
            className="flex animate-logo-marquee-fast md:animate-logo-marquee hover:[animation-play-state:paused] motion-reduce:animate-none"
            style={{
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              perspective: '1000px'
            }}
          >
            {/* First content copy */}
            <div className="flex items-center justify-around min-w-full flex-shrink-0">
              {logos?.map((item) => (
                <LogoItem key={`first-${item._key}`} item={item} />
              ))}
            </div>
            
            {/* Second content copy for seamless loop */}
            <div className="flex items-center justify-around min-w-full flex-shrink-0">
              {logos?.map((item) => (
                <LogoItem key={`second-${item._key}`} item={item} />
              ))}
            </div>
            
            {/* Third content copy for ultra-smooth transitions */}
            <div className="flex items-center justify-around min-w-full flex-shrink-0">
              {logos?.map((item) => (
                <LogoItem key={`third-${item._key}`} item={item} />
              ))}
            </div>
          </div>
          
          {/* Fade edges for smooth visual effect */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-10"></div>
        </div>
      </Container>
    </section>
  )
}

/**
 * Individual Logo Item Component
 * Extracted for better performance and readability
 */
function LogoItem({ item }: { item: NonNullable<LogoBlockProps['logos']>[number] }) {
  return (
    <div className="group/logo flex-shrink-0 mx-4 md:mx-6 lg:mx-8">
      {/* Render logo with optimized performance */}
      {item.image?.asset?.url ? (
        item.link ? (
          <a 
            href={item.link}
            target="_blank" 
            rel="noopener noreferrer" 
            className="block transform hover:scale-110 transition-transform duration-300 ease-out"
            style={{ willChange: 'transform' }}
          >
            <Image
              width={200}
              height={100}
              src={item.image.asset.url}
              alt={`${item.title} Logo`}
              className={cn('object-contain opacity-60 group-hover/logo:opacity-100 transition-all duration-300 filter grayscale group-hover/logo:grayscale-0', {
                'w-40 md:w-48 lg:w-56 h-20 md:h-24 lg:h-28': stegaClean(item?.size) === 'large',
                'w-32 md:w-40 lg:w-44 h-16 md:h-20 lg:h-22': stegaClean(item?.size) !== 'large'
              })}
              loading="lazy"
              style={{ willChange: 'opacity, filter' }}
            />
          </a>
        ) : (
          <Image
            width={200}
            height={100}
            src={item.image.asset.url}
            alt={`${item.title} Logo`}
            className={cn('object-contain opacity-60 hover:opacity-100 transition-all duration-300 transform hover:scale-110 filter grayscale hover:grayscale-0', {
              'w-40 md:w-48 lg:w-56 h-20 md:h-24 lg:h-28': stegaClean(item?.size) === 'large',
              'w-32 md:w-40 lg:w-44 h-16 md:h-20 lg:h-22': stegaClean(item?.size) !== 'large'
            })}
            loading="lazy"
            style={{ willChange: 'opacity, filter, transform' }}
          />
        )
      ) : (
        /* Optimized fallback for missing images */
        <div className={cn("bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs border border-dashed transition-colors duration-300 hover:bg-gray-200", {
          'w-40 md:w-48 lg:w-56 h-20 md:h-24 lg:h-28': stegaClean(item?.size) === 'large',
          'w-32 md:w-40 lg:w-44 h-16 md:h-20 lg:h-22': stegaClean(item?.size) !== 'large'
        })}>
          {item.title || 'Logo'}
        </div>
      )}
    </div>
  )
}

