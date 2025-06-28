import { cn } from "@/lib/utils";

export default function AnimatedUnderline({ className: additionalStyles, variant = 'university' }: { 
  className?: string;
  variant?: 'university' | 'gold' | 'gradient';
}) {
  const variants = {
    university: "bg-university-navy",
    gold: "bg-university-gold", 
    gradient: "bg-gradient-to-r from-university-navy to-university-navy-light"
  };
  
  const baseStyles = `absolute -bottom-[4px] left-0 block h-[2px] w-full max-w-0 group-hover:max-w-full rounded-full transition-all duration-500 ease-out ${variants[variant]} shadow-university`
  
  return <span className={cn( baseStyles, additionalStyles )}></span>
}