import React from 'react';
import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';

const headingVariants = cva(
  'font-bold antialiased text-university-navy tracking-tight leading-tight transition-all duration-300 ease-in-out',
  {
    variants: {
      tag: {
        h1: '', h2: '', h3: '', h4: '', h5: '', h6: '',
      },
      size: {
        xxxl: 'text-4xl md:text-[3.75rem] md:leading-[4rem] lg:text-[4.5rem] lg:leading-[4.75rem]',
        xxl: 'text-3xl md:text-5xl lg:text-6xl',
        xl: 'text-2xl md:text-4xl lg:text-5xl',
        lg: 'text-xl md:text-3xl lg:text-4xl',
        md: 'text-xl md:text-2xl lg:text-3xl',
        sm: 'text-lg md:text-xl lg:text-2xl',
        xs: 'text-base md:text-lg lg:text-xl',
      },
      variant: {
        default: '',
        gradient: 'text-gradient-university',
        accent: 'text-university-gold',
      }
    },
    defaultVariants: {
      tag: 'h1',
      size: 'xl',
      variant: 'default',
    },
  }
)

interface HeadingProps 
  extends React.HTMLAttributes<HTMLHeadingElement>, 
  VariantProps<typeof headingVariants> {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    variant?: 'default' | 'gradient' | 'accent';
}

const sizeToComponent = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
} as const;

export default function Heading({
  tag = 'h1',
  size = 'xxl',
  variant = 'default',
  as,
  className,
  children,
  ...props
}: HeadingProps) {

  const Component = as || sizeToComponent[tag as keyof typeof sizeToComponent] || 'h1';
  
  return (
    <Component 
      className={cn('hover:scale-[1.02] transition-transform duration-200', headingVariants({ tag, size, variant, className }))}
      {...props}
    >
      {children}
    </Component>
  )
}