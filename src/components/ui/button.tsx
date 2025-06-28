import Link from "next/link";
import * as React from "react";
import { ButtonType } from "@/types";
import { ArrowRight } from "lucide-react";
import { cn, getAnchorHref, resolveHref } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "px-6 md:px-8 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm md:text-base font-semibold transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 shadow-university hover:shadow-university-lg transform hover:-translate-y-1",
  {
    variants: {
      variant: {
        primary: "text-white bg-gradient-university hover:bg-university-navy-dark border border-university-navy/20",
        secondary: "text-university-navy bg-white hover:bg-university-academic-50 border-2 border-university-navy hover:border-university-navy-dark",
        tertiary: "text-white bg-university-gold hover:bg-yellow-500 border border-university-gold/30",
        outline: "text-university-navy border-2 border-university-academic-300 hover:border-university-navy hover:bg-university-academic-50 backdrop-blur",
        underline: "xl:px-0 mb-2 text-university-navy underline underline-offset-[10px] decoration-[2px] decoration-university-navy hover:decoration-university-gold",
        gradient: "text-white bg-gradient-to-r from-university-navy via-university-navy-light to-university-navy hover:from-university-navy-dark hover:to-university-navy-light",
      },
      size: {
        default: "h-9 md:h-10",
        sm: "h-9 px-4",
      },
      width: {
        auto: "w-auto",
        fullWidth: "w-full"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
      width: "auto"
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonVariants> {
      disableIcon?: boolean;
      pageReference?: ButtonType['buttonPageReference'];
      externalUrl?: ButtonType['buttonExternalUrl'];
      fileUrl?: ButtonType['buttonExternalUrl']
      buttonType?: ButtonType['buttonType'];
      emailAddress?: ButtonType['buttonEmailAddress'];
      anchorLocation?: ButtonType['buttonAnchorLocation'];
      anchorId?: ButtonType['buttonAnchorId'];
    }

const Button = React.forwardRef<HTMLAnchorElement, ButtonProps>(({ 
  children, 
  className, 
  variant, 
  size, 
  width,
  disableIcon, 
  pageReference, 
  externalUrl, 
  emailAddress,
  fileUrl,
  buttonType, 
  anchorLocation,
  anchorId,
  ...props 
}, ref) => {

  switch (buttonType) {
    case 'internal':
      if (!pageReference) return null;
      return (
        <Link
          href={resolveHref(pageReference._type, pageReference.slug ?? '') ?? '/'}
          ref={ref}
          className={cn('group', buttonVariants({ variant, size, width, className }))}
          {...props}
        >
          {children} {!disableIcon && (<ButtonIcon />)}
        </Link>
      );
    case 'anchor':
      return (
        <Link
          href={getAnchorHref({ 
            anchorLocation: anchorLocation ?? 'currentPage', 
            anchorId: anchorId ?? '', 
            pageReference: pageReference ?? null
          })}
          ref={ref}
          className={cn('group', buttonVariants({ variant, size, width, className }))}
          {...props}
        >
          {children} {!disableIcon && (<ButtonIcon />)}
        </Link>
      );
    case 'external':
      return (
        <a 
          href={`${externalUrl}`}
          rel="noopener noreferrer" target="_blank"
          className={cn('group', buttonVariants({ variant, size, width, className }))}
        >
          {children} {!disableIcon && (<ButtonIcon />)}
        </a>
      );
    case 'fileDownload':
      return (
        <a 
          href={fileUrl ?? ''}
          download rel="noopener noreferrer" target="_blank"
          className={cn('group', buttonVariants({ variant, size, width, className }))}
        >
          {children} {!disableIcon && (<ButtonIcon />)}
        </a>
      );
    case 'emailAddress':
      return (
        <a 
          href={`mailto:${emailAddress}`}
          rel="noopener noreferrer" target="_blank"
          className={cn('group', buttonVariants({ variant, size, width, className }))}
        >
          {children} {!disableIcon && (<ButtonIcon />)}
        </a>
      );
  }
});

Button.displayName = "Button";

export { Button, buttonVariants };

function ButtonIcon() {
  return <ArrowRight size={16} className="transition duration-300 group-hover:translate-x-0.5" />
}