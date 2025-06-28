"use client"
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { stegaClean } from 'next-sanity';
import { PageBuilderType } from '@/types';
import Container from '@/components/global/container';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import ElegantText from '@/components/shared/elegant-text';
import Heading from '@/components/shared/heading';


export type TestimonialBlockProps = PageBuilderType<"testimonialBlock">;

export default function TestimonialBlock(props: TestimonialBlockProps) {

  const { 
    heading, 
    eyebrow, 
    testimonials, 
    anchorId, 
    cornerRadiusTop,
    cornerRadiusBottom,
  } = props;

  return (
    <section 
      {...(anchorId ? { id: anchorId } : {})}
      className={cn('pb-10 md:pb-0 xl:px-10 pattern-bg border-y border-university-academic-200/30 bg-gradient-university-soft', {
        'rounded-t-4xl': stegaClean(cornerRadiusTop) === 'rounded',
        'rounded-b-4xl': stegaClean(cornerRadiusBottom) === 'rounded'
      })}
    >
      <Container className='py-16 md:py-28 space-y-12 border-x border-dashed border-university-academic-300/40'>
        <div className="text-center">
          <ElegantText variant="fade-up">
            <div className='w-fit mx-auto px-6 py-3 flex items-center justify-between rounded-full text-center text-sm font-semibold tracking-tight text-white bg-gradient-university shadow-university'>
              {eyebrow}
            </div>
          </ElegantText>
          <ElegantText variant="slide-in" delay={0.3}>
            <Heading 
              size="xxl" 
              variant="gradient" 
              className='mt-8 text-center'
            >
              {heading}
            </Heading>
          </ElegantText>
        </div>
        
        {testimonials && testimonials.length > 1 ? (
          <ElegantText variant="fade-up" delay={0.5}>
            <Carousel className="w-full max-w-5xl mx-auto">
              <CarouselContent className="-ml-4">
                {testimonials?.map((testimonial) => (
                  <CarouselItem key={testimonial._id} className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                    <TestimonialCard 
                      testimonial={testimonial} 
                      classNames='border border-university-academic-200/50 rounded-xl shadow-university hover:shadow-university-lg transition-all duration-300 hover:-translate-y-1'
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="border-university-academic-300 text-university-navy hover:bg-university-academic-50" />
              <CarouselNext className="border-university-academic-300 text-university-navy hover:bg-university-academic-50" />
            </Carousel>
          </ElegantText>
        ): (
          <ElegantText variant="fade-up" delay={0.5}>
            <div className="max-w-2xl mx-auto">
              <TestimonialCard 
                testimonial={testimonials?.[0] ?? null} 
                classNames='border border-university-academic-200/50 rounded-xl shadow-university'
              />
            </div>
          </ElegantText>
        )}       
      </Container>
    </section>
  )
}

function TestimonialCard({ testimonial, classNames }: {
  testimonial: NonNullable<TestimonialBlockProps['testimonials']>[number] | null;
  classNames?: string;
}) {
  return (
    <div className={cn('h-full p-6 md:p-8 space-y-6 flex flex-col justify-between bg-white rounded-xl', classNames)}>
      <div className="relative">
        <div className="absolute -top-2 -left-2 text-university-academic-300 text-6xl font-serif">&ldquo;</div>
        <h2 className='text-base md:text-lg text-university-academic-800 leading-relaxed pl-6'>
          {testimonial?.quote}
        </h2>
      </div>
      <div className='flex flex-col space-y-4'>
        <div className='flex items-center gap-4'>
          <Image
            src={testimonial?.avatar?.asset?.url ?? ''}
            width={50}
            height={50}
            alt={testimonial?.name ?? ''}
            className='w-12 h-12 rounded-full border-2 border-university-academic-200'
          />
          <div className='space-y-0.5'>
            <h3 className='text-sm md:text-base font-semibold text-university-navy'>
              {testimonial?.name}
            </h3>
            <p className='text-sm text-university-academic-600'>
              {testimonial?.jobTitle}
            </p>
          </div>
        </div>
        {testimonial?.logo?.asset?.url && (
          <div className="pt-4 border-t border-university-academic-200">
            <Image
              src={testimonial?.logo?.asset?.url ?? ''}
              width={100}
              height={50}
              alt={`${testimonial?.company} Logo`}
              className='h-8 w-auto opacity-70'
            />
          </div>
        )}
      </div>
    </div>
  )
}