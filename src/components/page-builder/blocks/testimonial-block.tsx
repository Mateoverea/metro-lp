"use client"
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { stegaClean } from 'next-sanity';
import { PageBuilderType } from '@/types';
import Container from '@/components/global/container';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import ElegantText from '@/components/shared/elegant-text';
import Heading from '@/components/shared/heading';

/**
 * Testimonial Block Component
 * 
 * Features:
 * - Responsive testimonial display with carousel and grid layouts
 * - Elegant animations with ElegantText wrapper
 * - University brand styling with custom shadows and borders
 * - Optimized for both single and multiple testimonials
 * - Professional card design with avatar, quotes, and company logos
 */

export type TestimonialBlockProps = PageBuilderType<"testimonialBlock">;

export default function TestimonialBlock(props: TestimonialBlockProps) {
  const { 
    heading,  
    testimonials, 
    anchorId, 
    cornerRadiusTop,
    cornerRadiusBottom,
  } = props;

  // Filter valid testimonials
  const validTestimonials = testimonials?.filter(t => t?.quote && t?.name) || [];

  return (
    <section 
      {...(anchorId ? { id: anchorId } : {})}
      className={cn('px-4 xl:px-10 pattern-bg border-y border-university-academic-200/30 bg-gradient-university-soft', {
        'rounded-t-4xl': stegaClean(cornerRadiusTop) === 'rounded',
        'rounded-b-4xl': stegaClean(cornerRadiusBottom) === 'rounded'
      })}
    >
      <Container className='py-16 md:py-28 space-y-12 md:space-y-16 border-x border-dashed border-university-academic-300/40'>
        
        {/* Header Section */}
        <div className="text-center space-y-6">
          
          
          {heading && (
            <ElegantText variant="slide-in" delay={0.3}>
              <Heading 
                size="xxl" 
                variant="gradient" 
                className='text-center text-balance'
                tag="h2"
              >
                {heading}
              </Heading>
            </ElegantText>
          )}
        </div>

        {/* Testimonials Content */}
        {validTestimonials.length > 0 && (
          <ElegantText variant="fade-up" delay={0.5}>
            {validTestimonials.length === 1 ? (
              <SingleTestimonialLayout testimonial={validTestimonials[0]} />
            ) : validTestimonials.length <= 3 ? (
              <GridTestimonialLayout testimonials={validTestimonials} />
            ) : (
              <CarouselTestimonialLayout testimonials={validTestimonials} />
            )}
          </ElegantText>
        )}
      </Container>
    </section>
  )
}

// Single testimonial layout for featured display
function SingleTestimonialLayout({ testimonial }: {
  testimonial: NonNullable<TestimonialBlockProps['testimonials']>[number];
}) {
  return (
    <div className="max-w-4xl mx-auto">
      <FeaturedTestimonialCard testimonial={testimonial} />
    </div>
  );
}

// Grid layout for 2-3 testimonials
function GridTestimonialLayout({ testimonials }: {
  testimonials: NonNullable<TestimonialBlockProps['testimonials']>;
}) {
  return (
    <div className={cn("max-w-6xl mx-auto grid gap-6 md:gap-8", {
      'grid-cols-1 md:grid-cols-2': testimonials.length === 2,
      'grid-cols-1 md:grid-cols-2 lg:grid-cols-3': testimonials.length === 3,
    })}>
      {testimonials.map((testimonial) => (
        <TestimonialCard 
          key={testimonial._id} 
          testimonial={testimonial} 
        />
      ))}
    </div>
  );
}

// Carousel layout for 4+ testimonials
function CarouselTestimonialLayout({ testimonials }: {
  testimonials: NonNullable<TestimonialBlockProps['testimonials']>;
}) {
  return (
    <div className="max-w-7xl mx-auto">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4 md:-ml-6">
          {testimonials.map((testimonial) => (
            <CarouselItem 
              key={testimonial._id} 
              className="pl-4 md:pl-6 basis-full md:basis-1/2 lg:basis-1/3"
            >
              <TestimonialCard testimonial={testimonial} />
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Custom styled navigation buttons */}
        <CarouselPrevious className="border-university-academic-300 text-university-navy hover:bg-university-academic-50 hover:border-university-navy transition-colors" />
        <CarouselNext className="border-university-academic-300 text-university-navy hover:bg-university-academic-50 hover:border-university-navy transition-colors" />
      </Carousel>
    </div>
  );
}

// Standard testimonial card component
function TestimonialCard({ testimonial }: {
  testimonial: NonNullable<TestimonialBlockProps['testimonials']>[number];
}) {
  return (
    <article className="h-full card-hover-effect">
      <div className='h-full p-6 md:p-8 space-y-6 flex flex-col justify-between bg-white border border-university-academic-200/50 rounded-xl shadow-university'>
        
        {/* Quote Section */}
        <div className="relative flex-1">
          <div className="absolute -top-2 -left-2 text-university-academic-300 text-5xl md:text-6xl font-serif leading-none select-none">
            &ldquo;
          </div>
          <blockquote className='text-base md:text-lg text-university-academic-800 leading-relaxed pl-6 pt-2'>
            {testimonial?.quote}
          </blockquote>
        </div>
        
        {/* Author Section */}
        <div className='flex flex-col space-y-4'>
          <div className='flex items-center gap-4'>
            {testimonial?.avatar?.asset?.url && (
              <div className="relative">
                <Image
                  src={testimonial.avatar.asset.url}
                  width={50}
                  height={50}
                  alt={testimonial?.name ?? 'Author avatar'}
                  className='w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-university-academic-200 object-cover'
                />
                <div className="absolute inset-0 rounded-full ring-2 ring-university-academic-100 ring-offset-2"></div>
              </div>
            )}
            <div className='space-y-1'>
              <h3 className='text-sm md:text-base font-semibold text-university-navy'>
                {testimonial?.name}
              </h3>
              {testimonial?.jobTitle && (
                <p className='text-sm text-university-academic-600'>
                  {testimonial.jobTitle}
                </p>
              )}
            </div>
          </div>
          
          {/* Company Logo */}
          {testimonial?.logo?.asset?.url && (
            <div className="pt-4 border-t border-university-academic-200">
              <Image
                src={testimonial.logo.asset.url}
                width={120}
                height={40}
                alt={`${testimonial?.company || 'Company'} Logo`}
                className='h-8 w-auto max-w-[120px] opacity-70 hover:opacity-100 transition-opacity'
              />
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

// Featured testimonial card for single testimonial display
function FeaturedTestimonialCard({ testimonial }: {
  testimonial: NonNullable<TestimonialBlockProps['testimonials']>[number];
}) {
  return (
    <article className="card-hover-effect">
      <div className='p-8 md:p-12 bg-white border border-university-academic-200/50 rounded-2xl shadow-university-lg'>
        
        {/* Quote Section */}
        <div className="relative text-center mb-8">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 text-university-academic-300 text-8xl font-serif leading-none select-none">
            &ldquo;
          </div>
          <blockquote className='text-xl md:text-2xl lg:text-3xl text-university-academic-800 leading-relaxed pt-12 text-balance'>
            {testimonial?.quote}
          </blockquote>
        </div>
        
        {/* Author Section */}
        <div className='flex flex-col items-center space-y-6'>
          <div className='flex flex-col md:flex-row items-center gap-6'>
            {testimonial?.avatar?.asset?.url && (
              <div className="relative">
                <Image
                  src={testimonial.avatar.asset.url}
                  width={80}
                  height={80}
                  alt={testimonial?.name ?? 'Author avatar'}
                  className='w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-university-academic-200 object-cover'
                />
                <div className="absolute inset-0 rounded-full ring-4 ring-university-academic-100 ring-offset-4"></div>
              </div>
            )}
            <div className='text-center md:text-left space-y-2'>
              <h3 className='text-lg md:text-xl font-semibold text-university-navy'>
                {testimonial?.name}
              </h3>
              {testimonial?.jobTitle && (
                <p className='text-base md:text-lg text-university-academic-600'>
                  {testimonial.jobTitle}
                </p>
              )}
            </div>
          </div>
          
          {/* Company Logo */}
          {testimonial?.logo?.asset?.url && (
            <div className="pt-6 border-t border-university-academic-200 w-full text-center">
              <Image
                src={testimonial.logo.asset.url}
                width={150}
                height={50}
                alt={`${testimonial?.company || 'Company'} Logo`}
                className='h-10 w-auto max-w-[150px] mx-auto opacity-70 hover:opacity-100 transition-opacity'
              />
            </div>
          )}
        </div>
      </div>
    </article>
  );
}