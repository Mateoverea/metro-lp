import Image from 'next/image';
import { cn } from '@/lib/utils';
import { stegaClean } from 'next-sanity';
import { PageBuilderType } from '@/types';
import Container from '@/components/global/container';

export type LogoBlockProps = PageBuilderType<"logoBlock">;

export default function LogoBlock(props: LogoBlockProps) {

  const { heading, logos, anchorId } = props;
  
  return (
    <section 
      {...(anchorId ? { id: anchorId } : {})}
      className='px-4 md:px-10 border-b border-university-academic-200/30 bg-gradient-university-soft'
    >
      <Container className='py-16 md:py-24 border-x border-dashed border-university-academic-300/40'>
        <div className='text-center mb-12'>
          <div className='w-fit mx-auto py-3 px-8 bg-white shadow-university rounded-full border border-university-academic-200'>
            <h2 className='font-semibold text-sm md:text-base uppercase tracking-wide text-university-navy'> 
              {heading}
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center">
          {logos?.map((item) => (
            <div key={item._key} className="group">
              {item.link ? (
                <a 
                  href={item.link}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block transform hover:scale-105 transition-transform duration-200"
                >
                  <Image
                    width={200}
                    height={100}
                    src={item.image?.asset?.url ?? ''}
                    alt={`${item.title} Logo`}
                    className={cn('w-20 md:w-28 object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-200', {
                      'w-32 md:w-36': stegaClean(item?.size) === 'large'
                    })}
                  />
                </a>
              ): (
                <Image
                  width={200}
                  height={100}
                  src={item.image?.asset?.url ?? ''}
                  alt={`${item.title} Logo`}
                  className={cn('w-20 md:w-28 object-contain opacity-70 hover:opacity-100 transition-opacity duration-200 transform hover:scale-105', {
                    'w-32 md:w-36': stegaClean(item?.size) === 'large'
                  })}
                />  
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

