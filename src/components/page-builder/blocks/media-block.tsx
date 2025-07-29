"use client"
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { stegaClean } from 'next-sanity';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
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
import { X } from 'lucide-react';

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
  10: ['large', 'medium', 'small', 'small', 'medium', 'small', 'small', 'medium', 'small', 'small'],
  11: ['large', 'medium', 'small', 'small', 'medium', 'small', 'small', 'medium', 'small', 'small', 'small'],
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
  
  // State for image dialog
  const [selectedImage, setSelectedImage] = useState<MediaBlockItem | null>(null);
  
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
            <CarouselLayout images={validImages} onImageClick={setSelectedImage} />
          ) : stegaClean(layoutStyle) === 'mixed' ? (
            <MixedLayout images={validImages} onImageClick={setSelectedImage} />
          ) : (
            <BentoGridLayout images={validImages} onImageClick={setSelectedImage} />
          )}
        </ElegantText>
      </Container>

      {/* Image Dialog */}
      <ImageDialog 
        image={selectedImage} 
        onClose={() => setSelectedImage(null)} 
      />
    </section>
  )
}

// Bento Grid Layout Component
function BentoGridLayout({ images, onImageClick }: { images: MediaBlockItem[]; onImageClick: (image: MediaBlockItem) => void }) {
  const imageCount = images.length;
  
  // Get the layout configuration with robust fallback logic
  const getSuggestedLayout = (count: number): readonly string[] => {
    // Try to get exact match first
    if (BENTO_LAYOUTS[count as keyof typeof BENTO_LAYOUTS]) {
      return BENTO_LAYOUTS[count as keyof typeof BENTO_LAYOUTS];
    }
    
    // Fallback to closest available layout
    if (count >= 12) return BENTO_LAYOUTS[12];
    if (count >= 9) return BENTO_LAYOUTS[9];
    if (count >= 6) return BENTO_LAYOUTS[6];
    return BENTO_LAYOUTS[3]; // Minimum fallback
  };
  
  const suggestedLayout = getSuggestedLayout(imageCount);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4 max-w-7xl mx-auto">
      {images.map((item, index) => {
        // Use the suggested layout or fallback to user's size preference
        const gridSize = suggestedLayout[index] || stegaClean(item.size) || 'small';
        
        return (
          <MediaCard 
            key={item._key || index}
            item={item}
            onImageClick={onImageClick}
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
function CarouselLayout({ images, onImageClick }: { images: MediaBlockItem[]; onImageClick: (image: MediaBlockItem) => void }) {
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
                onImageClick={onImageClick}
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
function MixedLayout({ images, onImageClick }: { images: MediaBlockItem[]; onImageClick: (image: MediaBlockItem) => void }) {
  const gridImages = images.slice(0, 6); // First 6 for grid
  const carouselImages = images.length > 6 ? images.slice(6) : []; // Rest for carousel

  return (
    <div className="space-y-12">
      {/* Bento Grid Section */}
      <BentoGridLayout images={gridImages} onImageClick={onImageClick} />
      
      {/* Carousel Section */}
      {carouselImages.length > 0 && (
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-university-academic-50/30 to-transparent rounded-3xl" />
          <div className="relative p-8">
            <Heading tag="h3" size="md" className="text-center mb-8 text-university-navy">
              More Images
            </Heading>
            <CarouselLayout images={carouselImages} onImageClick={onImageClick} />
          </div>
        </div>
      )}
    </div>
  );
}

// Individual Media Card Component
function MediaCard({ 
  item, 
  className,
  onImageClick 
}: { 
  item: MediaBlockItem;
  className?: string;
  onImageClick: (image: MediaBlockItem) => void;
}) {
  return (
    <div 
      className={cn(
        'relative bg-white border border-university-academic-200/50 rounded-xl shadow-university hover:shadow-university-lg transition-all duration-300 hover:-translate-y-1',
        className
      )}
      onClick={() => onImageClick(item)}
    >
      <div className="p-3 h-full">
        <div className="relative h-full rounded-lg overflow-hidden bg-gray-100">
          {/* Only render Image if we have a valid URL */}
          {item.image?.asset?.url ? (
            <Image
              src={item.image.asset.url}
              width={800}
              height={800}
              alt={item.image?.altText || item.caption || 'Gallery image'}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <span className="text-sm">No image available</span>
            </div>
          )}
          
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

// Image Dialog Component
function ImageDialog({ 
  image, 
  onClose 
}: { 
  image: MediaBlockItem | null; 
  onClose: () => void;
}) {
  // Close on escape key and handle body scroll
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (image) {
      // Calculate scrollbar width to prevent layout shift
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      
      // Save current body styles
      const originalOverflow = document.body.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;
      
      // Prevent scroll and compensate for scrollbar
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      
      document.addEventListener('keydown', handleEscape);
      
      return () => {
        // Restore original styles
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [image, onClose]);

  if (!image?.image?.asset?.url) return null;

  const modalContent = (
    <div 
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all duration-200 hover:scale-110"
      >
        <X className="h-6 w-6" />
      </button>
      
      {/* Image container */}
      <div 
        className="relative max-w-[90vw] max-h-[90vh] bg-white rounded-lg overflow-hidden shadow-2xl animate-in fade-in-0 zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={image.image.asset.url}
          width={1200}
          height={800}
          alt={image.image?.altText || image.caption || 'Gallery image'}
          className="w-auto h-auto max-w-full max-h-[90vh] object-contain"
          priority
        />
        
        {/* Caption */}
        {image.caption && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent text-white p-6">
            <p className="text-sm font-medium text-center">
              {image.caption}
            </p>
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}