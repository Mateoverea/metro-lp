import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { PageBuilderType } from '@/types';
import { CircleCheck, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Heading from '@/components/shared/heading';
import Container from '@/components/global/container';
import ButtonRenderer from '@/components/shared/button-renderer';
import PortableTextEditor from '@/components/portable-text/portable-text-editor';

export type FeatureCardsBlockProps = PageBuilderType<"featureCardsBlock">;

// Helper function to safely extract columnsPerRow
function getColumnsPerRow(props: Record<string, unknown>): string {
  return (props.columnsPerRow as string) || '2';
}

export default function FeatureCardsBlock(props: FeatureCardsBlockProps) {

  // Extract grid configuration with fallback
  const columnsPerRow = getColumnsPerRow(props as Record<string, unknown>);
  const { heading, buttons, features, showCallToAction, anchorId } = props;
  const hideImages = (props as Record<string, unknown>).hideImages as boolean | undefined;
  const enableExpand = (props as Record<string, unknown>).enableExpand as boolean | undefined;
  const expandLabel = ((props as Record<string, unknown>).expandLabel as string) ?? 'Ver más';
  const collapseLabel = ((props as Record<string, unknown>).collapseLabel as string) ?? 'Ver menos';

  return (
    <section 
      {...(anchorId ? { id: anchorId } : {})}
      className='px-4 xl:px-10'
    >
      <Container className='py-10 md:py-16 px-4 space-y-8 md:space-y-6 border-x border-dashed'>
        <div className='relative max-w-[60rem] mx-auto py-2 md:py-4 flex flex-col md:flex-row gap-30 md:gap-6 items-center justify-between border-y border-dashed overflow-hidden'>
          {/* Background pattern layer */}
          <div className='absolute inset-0 pattern-bg--2 pointer-events-none'></div>
          
          <Heading tag="h2" size="xxl" className='relative col-span-7 py-1.5 text-balance leading-normal z-10'>
            {heading}
          </Heading>
          {buttons && buttons.length > 0 && (
            <ButtonRenderer classNames='relative z-20 hidden md:flex' buttons={buttons} />  
          )}
          <EdgeBlur />
        </div>
        <div className={cn(
          'max-w-[60rem] mx-auto grid grid-cols-1 gap-6',
          columnsPerRow === '3' ? 'md:grid-cols-3' : 'md:grid-cols-2'
        )}>
          {features?.map((feature) => (
            <div key={feature._key} className={cn(
              columnsPerRow === '3' ? 'col-span-3 md:col-span-1' : 'col-span-2 md:col-span-1'
            )}>
              <FeatureCard 
                feature={feature} 
                hideImages={!!hideImages}
                enableExpand={!!enableExpand}
                expandLabel={expandLabel}
                collapseLabel={collapseLabel}
              />
            </div>
          ))}
          {showCallToAction && (
            <CallToActionComponent
              props={props}
              columnsPerRow={columnsPerRow}
            />
          )}
        </div>
      </Container>
    </section>
  )
}

function FeatureCard({ feature, hideImages, enableExpand, expandLabel, collapseLabel }: {
  feature:  NonNullable<FeatureCardsBlockProps['features']>[number];
  hideImages: boolean;
  enableExpand: boolean;
  expandLabel: string;
  collapseLabel: string;
}) {
  const [expanded, setExpanded] = React.useState(false);
  return (
    <div className='border border-dashed rounded-3xl'>
      {/* When not expandable, keep image above title as before */}
      {!enableExpand && !hideImages && (
        <div className='p-3'>
          {feature.image?.asset?.url ? (
            <Image
              src={feature.image.asset.url}
              width={600}
              height={400}
              alt={feature.title ?? ''}
              className='rounded-2xl h-[280px] object-cover overflow-hidden'
            />
          ) : (
            <div className='rounded-2xl h-[280px] bg-gray-200 flex items-center justify-center'>
              <span className='text-gray-400 text-sm'>No image available</span>
            </div>
          )}
        </div>
      )}
      <div className='mt-5 px-6 md:px-8 pb-2'>
        <div className='space-y-6'>
          <Heading tag="h3" size="sm" className='relative py-2 font-semibold border-y border-y-gray-200/40 bg-gradient-to-r from-transparent via-gray-50/30 to-transparent'>
            {/* Use the heading as the expand/collapse trigger when enabled */}
            <button
              type='button'
              className='w-full grid grid-cols-[1fr_auto_1fr] items-center cursor-pointer select-none appearance-none bg-transparent focus-visible:outline-none h-12'
              aria-expanded={expanded}
              aria-label={enableExpand ? (expanded ? collapseLabel : expandLabel) : undefined}
              onClick={() => {
                if (enableExpand) setExpanded((prev) => !prev)
              }}
            >
              <span className='col-start-2 justify-self-center text-center flex items-center justify-center leading-none'>
                {feature.title}
              </span>
              <span className='col-start-3 justify-self-end inline-flex items-center'>
                {enableExpand && (
                  <ChevronDown
                    className={cn('h-4 w-4 shrink-0 transition-transform duration-200', expanded ? 'rotate-180' : 'rotate-0')}
                    aria-hidden='true'
                  />
                )}
              </span>
            </button>
          </Heading>
          {/* When expandable and expanded, show image below the title so the title doesn't move */}
          {enableExpand && expanded && !hideImages && (
            <div className='p-3'>
              {feature.image?.asset?.url ? (
                <Image
                  src={feature.image.asset.url}
                  width={600}
                  height={400}
                  alt={feature.title ?? ''}
                  className='rounded-2xl h-[280px] object-cover overflow-hidden'
                />
              ) : (
                <div className='rounded-2xl h-[280px] bg-gray-200 flex items-center justify-center'>
                  <span className='text-gray-400 text-sm'>No image available</span>
                </div>
              )}
            </div>
          )}
          {(!enableExpand || expanded) && (
            <p className='text-balance text-sm md:text-base text-gray-600'>
              {feature.description}
            </p>
          )}
        </div>
      </div>
      {(!enableExpand || expanded) && (
        <div className='mt-4 space-y-3 border-t border-dashed'>
          {(feature?.items ?? [])
            .filter(() => !enableExpand || expanded)
            .map((item, index, arr) => (
              <div 
                key={`${item}-${index}`}
                className={cn('flex items-start md:items-center gap-2 px-6 md:px-8 py-4 border-b border-dashed', {
                  'border-none pb-6': index === arr.length - 1
                })}
              >
                <CircleCheck className='h-4 w-4 text-green-600' />
                <span className='text-balance text-sm md:text-base text-gray-600'>
                  {item}
                </span>
              </div>
          ))}
        </div>
      )}
      {(!enableExpand || expanded) && feature?.button?.showButton && (
        <div className='px-4 py-4 border-t border-dashed'>
          <Button 
            variant={feature?.button.buttonVariant}
            buttonType={feature?.button.buttonType}
            pageReference={feature?.button.buttonPageReference}
            externalUrl={feature?.button.buttonExternalUrl ?? ''}
            className='h-12 w-full'
          >
            {feature.button.buttonText}
          </Button>
        </div>
      )}
    </div>
  )
}

function CallToActionComponent({ props, columnsPerRow }: { 
  props: FeatureCardsBlockProps; 
  columnsPerRow: string 
}) {
  // Extract CTA properties safely with proper type casting
  const propsRecord = props as Record<string, unknown>;
  const callToActionHeading = propsRecord.callToActionHeading as string;
  const callToActionContent = propsRecord.callToActionContent as Parameters<typeof PortableTextEditor>[0]['data'];
  const callToActionButtons = propsRecord.callToActionButtons as NonNullable<FeatureCardsBlockProps['buttons']>;

  return (
    <div className={cn(
      'w-full p-8 flex flex-col md:flex-row items-center gap-8 border rounded-3xl pattern-bg--2',
      columnsPerRow === '3' ? 'col-span-3' : 'col-span-2'
    )}>
      <div className="space-y-5 md:space-y-3">
        <div className="font-medium text-xl text-balance">
          {callToActionHeading}
        </div>
        <PortableTextEditor 
          data={callToActionContent}
          classNames='text-balance text-sm md:text-base text-gray-500'
        />
      </div>
      {callToActionButtons && Array.isArray(callToActionButtons) && callToActionButtons.length > 0 && (
        <div className='items-center md:justify-center gap-2.5'>
          <ButtonRenderer buttons={callToActionButtons} />  
        </div>
      )}
    </div>
  )
}

function EdgeBlur() {
  return (
    <div className='absolute inset-0 flex items-center justify-between pointer-events-none'>
      <div className='relative bg-gradient-to-r from-white to-transparent h-full w-[100px]'></div>
      <div className='bg-gradient-to-l from-white to-transparent h-full w-[100px]'></div>
    </div>
  )
}
