import { cn } from '@/lib/utils';
import { PageBuilderType } from '@/types';
import Heading from '@/components/shared/heading';
import Container from '@/components/global/container';
import PortableTextEditor from '@/components/portable-text/portable-text-editor';
import ElegantText from '@/components/shared/elegant-text';

export type HeaderBlockProps = PageBuilderType<"headerBlock">;

export default function HeaderBlock(props: HeaderBlockProps) {

  const { heading, content, bottomCornerRadius, anchorId } = props;

  return (
    <section 
      {...(anchorId ? { id: anchorId } : {})} 
      className={cn('px-4 md:px-10 pattern-bg border-b border-university-academic-200/30 bg-gradient-university-soft', {
        'rounded-4xl': bottomCornerRadius === 'rounded'
      })}
    >
      <Container className='border-x border-dashed border-university-academic-300/40'>
        <div className='pt-36 md:pt-52 pb-20 md:pb-36'>
          <ElegantText variant="fade-up" delay={0.2}>
            <Heading 
              tag="h1" 
              size="xxl" 
              variant="gradient"
              className='text-balance leading-normal drop-shadow-sm'
            >
              {heading}
            </Heading>
          </ElegantText>
          <ElegantText variant="slide-in" delay={0.4}>
            <PortableTextEditor 
              data={content ?? []}
              classNames='mt-6 md:mt-8 md:text-xl text-balance text-university-academic-700 leading-relaxed'
            />
          </ElegantText>
        </div>
      </Container>
    </section>
  )
}
