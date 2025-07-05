"use client"
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { stegaClean } from 'next-sanity';
import Container from '@/components/global/container';
import Heading from '@/components/shared/heading';
import ElegantText from '@/components/shared/elegant-text';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';

// Using temporary types until Sanity type generation resolves import issues
interface MediaBlockItem {
  image?: {
    asset?: {
      _ref?: string;
      url?: string;
    };
    altText?: string;
  };
  caption?: string;
  size?: 'small' | 'medium' | 'large';
  _key?: string;
}

interface MediaBlockProps {
  _type: "mediaBlock";
  title?: string;
  images?: MediaBlockItem[];
  layoutStyle?: 'bento' | 'carousel' | 'mixed';
  backgroundWidth?: 'full' | 'contained';
  anchorId?: string;
}

// Define the grid layout patterns for bento grid
const BENTO_LAYOUTS = {
  3: ['large', 'small', 'small'],
  4: ['large', 'small', 'small', 'medium'],
  5: ['large', 'small', 'small', 'medium', 'small'],
  6: ['large', 'medium', 'small', 'small', 'small', 'small'],
  7: ['large', 'medium', 'small', 'small', 'medium', 'small', 'small'],
  8: ['large', 'medium', 'small', 'small', 'medium', 'small', 'small', 'small'],
  9: ['large', 'medium', 'small', 'small', 'medium', 'small', 'small', 'medium', 'small'],
  12: ['large', 'medium', 'small', 'small', 'medium', 'small', 'small', 'medium', 'small', 'small', 'small', 'small']
} as const;

export default function MediaBlock(props: MediaBlockProps) {
  const { 
    title,
    images,
    layoutStyle,
    backgroundWidth,
    anchorId 
  } = props;

  // Filter out images without proper data
  const validImages = images?.filter(item => 
    Boolean(item?.image?.asset?._ref || item?.image?.asset?.url)
  ) || [];
  
  if (!validImages.length) {
    return null;
  }

  return (
    <section 
      {...(anchorId ? { id: anchorId } : {})} 
      className={cn('border-t border-dashed pattern-bg--2', {
        'px-4 md:px-10': stegaClean(backgroundWidth) === 'contained'
      })}
    >
      <Container 
        className={cn('py-16 md:py-16 space-y-12', {
          'border-x border-dashed': stegaClean(backgroundWidth) === 'contained'
        })}
      >
        {/* Title Section */}
        {title && (
          <ElegantText variant="fade-up">
            <div className="text-center">
              <Heading tag="h2" size="xxl" className="text-balance">
                {title}
              </Heading>
            </div>
          </ElegantText>
        )}

        {/* Media Content */}
        <ElegantText variant="fade-up" delay={0.3}>
          {stegaClean(layoutStyle) === 'carousel' ? (
            <CarouselLayout images={validImages} />
          ) : stegaClean(layoutStyle) === 'mixed' ? (
            <MixedLayout images={validImages} />
          ) : (
            <BentoGridLayout images={validImages} />
          )}
        </ElegantText>
      </Container>
    </section>
  )
}

// Bento Grid Layout Component
function BentoGridLayout({ images }: { images: MediaBlockItem[] }) {
  const imageCount = images.length;
  const suggestedLayout = BENTO_LAYOUTS[imageCount as keyof typeof BENTO_LAYOUTS] || 
                         BENTO_LAYOUTS[Math.min(12, Math.max(3, imageCount)) as keyof typeof BENTO_LAYOUTS];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4 max-w-7xl mx-auto">
      {images.map((item, index) => {
        // Use the suggested layout or fallback to user's size preference
        const gridSize = suggestedLayout[index] || stegaClean(item.size) || 'small';
        
        return (
          <MediaCard 
            key={item._key || index}
            item={item}
            className={cn(
              'group cursor-pointer overflow-hidden',
              {
                // Small: 1x1 on mobile, 1x1 on desktop
                'col-span-1 row-span-1': gridSize === 'small',
                // Medium: 2x1 on mobile, 2x1 on desktop  
                'col-span-2 row-span-1': gridSize === 'medium',
                // Large: 2x2 on mobile, 3x2 on desktop
                'col-span-2 row-span-2 md:col-span-3 md:row-span-2': gridSize === 'large',
              }
            )}
          />
        );
      })}
    </div>
  );
}

// Carousel Layout Component
function CarouselLayout({ images }: { images: MediaBlockItem[] }) {
  return (
    <div className="max-w-5xl mx-auto">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {images.map((item, index) => (
            <CarouselItem key={item._key || index} className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
              <MediaCard 
                item={item}
                className="group cursor-pointer overflow-hidden aspect-square"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="border-university-academic-300 text-university-navy hover:bg-university-academic-50" />
        <CarouselNext className="border-university-academic-300 text-university-navy hover:bg-university-academic-50" />
      </Carousel>
    </div>
  );
}

// Mixed Layout Component (Grid + Carousel)
function MixedLayout({ images }: { images: MediaBlockItem[] }) {
  const gridImages = images.slice(0, 6); // First 6 for grid
  const carouselImages = images.length > 6 ? images.slice(6) : []; // Rest for carousel

  return (
    <div className="space-y-12">
      {/* Bento Grid Section */}
      <BentoGridLayout images={gridImages} />
      
      {/* Carousel Section */}
      {carouselImages.length > 0 && (
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-university-academic-50/30 to-transparent rounded-3xl" />
          <div className="relative p-8">
            <Heading tag="h3" size="md" className="text-center mb-8 text-university-navy">
              More Images
            </Heading>
            <CarouselLayout images={carouselImages} />
          </div>
        </div>
      )}
    </div>
  );
}

// Individual Media Card Component
function MediaCard({ 
  item, 
  className 
}: { 
  item: MediaBlockItem;
  className?: string;
}) {
  return (
    <div className={cn(
      'relative bg-white border border-university-academic-200/50 rounded-xl shadow-university hover:shadow-university-lg transition-all duration-300 hover:-translate-y-1',
      className
    )}>
      <div className="p-3 h-full">
        <div className="relative h-full rounded-lg overflow-hidden bg-gray-100">
          <Image
            src={item.image?.asset?.url ?? ''}
            width={800}
            height={800}
            alt={item.image?.altText || item.caption || 'Gallery image'}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Overlay with caption */}
          {item.caption && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white text-sm font-medium">
                  {item.caption}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}