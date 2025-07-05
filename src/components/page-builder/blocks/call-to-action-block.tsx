"use client"

import Image from 'next/image';
import Heading from '@/components/shared/heading';
import Container from '@/components/global/container';
import { Button } from '@/components/ui/button';
import PortableTextEditor from '@/components/portable-text/portable-text-editor';
import ElegantText from '@/components/shared/elegant-text';
import { MapPin, MessageCircle, ExternalLink } from 'lucide-react';

// TypeScript interface matching our enhanced call-to-action schema
interface EnhancedCallToActionBlock {
  _type: "callToActionBlock";
  _key?: string;
  heading?: string;
  content?: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "normal";
    listItem?: never;
    markDefs?: Array<{
      href?: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  }>;
  // New enhanced fields
  featuredImage?: {
    asset?: {
      _ref?: string;
      _type?: "reference";
      url?: string;
    };
    alt?: string;
    _type?: "image";
  };
  locationText?: string;
  socialMediaPlatforms?: Array<{
    _key: string;
    platform?: string;
    profileUrl?: string;
    icon?: {
      asset?: {
        _ref?: string;
        _type?: "reference";
        url?: string;
      };
      _type?: "image";
    };
  }>;
  whatsappContact?: {
    phoneNumber?: string;
    message?: string;
    buttonText?: string;
  };
  googleMaps?: {
    embedUrl?: string;
    address?: string;
    showMap?: boolean;
  };
  button?: {
    _key?: string;
    showButton?: boolean;
    buttonText?: string;
    buttonVariant?: "primary" | "secondary" | "tertiary" | "outline" | "underline";
    buttonType?: "internal" | "anchor" | "external" | "fileDownload" | "emailAddress";
    buttonPageReference?: {
      _id?: string;
      _type?: string;
      title?: string;
      slug?: string;
    };
    buttonExternalUrl?: string;
    buttonEmailAddress?: string;
    buttonFileUrl?: {
      asset?: {
        url?: string;
      };
    };
    buttonAnchorLocation?: "currentPage" | "choosePage";
    buttonAnchorId?: string;
    buttonWidth?: "auto" | "fullWidth";
  };
  anchorId?: string;
  paddingTop?: "none" | "small" | "medium" | "default" | "large";
  paddingBottom?: "none" | "small" | "medium" | "default" | "large";
}

export type CallToActionBlockProps = EnhancedCallToActionBlock;

export default function CallToActionBlock(props: CallToActionBlockProps) {
  const { 
    heading, 
    content, 
    featuredImage,
    locationText,
    socialMediaPlatforms,
    whatsappContact,
    googleMaps,
    button,
    anchorId
  } = props;

  // Helper function to generate WhatsApp URL
  const generateWhatsAppUrl = (phoneNumber?: string, message?: string) => {
    if (!phoneNumber) return '#';
    const encodedMessage = message ? encodeURIComponent(message) : '';
    return `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}${encodedMessage ? `?text=${encodedMessage}` : ''}`;
  };

  // Helper function to extract embed URL from Google Maps
  const extractEmbedUrl = (url?: string) => {
    if (!url) return '';
    if (url.includes('embed')) return url;
    const match = url.match(/src="([^"]+)"/);
    return match ? match[1] : url;
  };

  return (
    <section 
      {...(anchorId ? { id: anchorId } : {})}
      className='px-4 md:px-10 pattern-bg--2 border-t border-dashed'
    >
      <Container 
        className='py-16 md:py-16 border-x border-dashed space-y-12'
      >
        
        <div className='grid grid-cols-12 gap-6 md:gap-8 xl:gap-16 items-start'>
          
          {/* Left Column - Main Content */}
          <div className='col-span-12 lg:col-span-5 space-y-8'>
            
            {/* Main Heading and Content */}
            <div className='space-y-6'>
              {heading && (
                <ElegantText variant="fade-up">
                  <Heading 
                    tag="h2" 
                    size="xxl"
                    variant="gradient"  
                    className="text-balance leading-tight"
                  >
                    {heading}
                  </Heading>
                </ElegantText>
              )}
              
              {content && (
                <ElegantText variant="slide-in" delay={0.2}>
                  <PortableTextEditor 
                    data={content}
                    classNames="text-lg md:text-xl text-university-academic-700 text-balance leading-relaxed"
                  />
                </ElegantText>
              )}
            </div>

            {/* Location Information */}
            {locationText && (
              <ElegantText variant="fade-up" delay={0.3}>
                <div className='p-4 bg-university-academic-50 border border-university-academic-200 rounded-lg'>
                  <div className='flex items-start gap-3'>
                    <MapPin className='w-5 h-5 text-university-navy mt-0.5 flex-shrink-0' />
                    <div className='flex-1'>
                      <p className='text-university-academic-700 leading-relaxed whitespace-pre-line'>
                        {locationText}
                      </p>
                    </div>
                  </div>
                </div>
              </ElegantText>
            )}

            {/* Social Media Platforms */}
            {socialMediaPlatforms && socialMediaPlatforms.length > 0 && (
              <ElegantText variant="fade-up" delay={0.4}>
                <div className='space-y-4'>
                  <div className='flex items-center gap-2'>
                    <ExternalLink className='w-5 h-5 text-university-navy' />
                    <h3 className='font-semibold text-university-navy text-lg'>Síguenos</h3>
                  </div>
                  <div className='flex flex-wrap gap-3'>
                    {socialMediaPlatforms.map((platform) => (
                      <a
                        key={platform._key}
                        href={platform.profileUrl || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className='group flex items-center gap-3 px-4 py-3 bg-white border border-university-academic-200 rounded-lg hover:border-university-navy hover:bg-university-academic-50 transition-all duration-300 shadow-sm hover:shadow-md'
                      >
                        {platform.icon?.asset?.url && (
                          <Image
                            src={platform.icon.asset.url}
                            alt={`${platform.platform} icon`}
                            width={20}
                            height={20}
                            className="flex-shrink-0 group-hover:scale-110 transition-transform duration-200"
                          />
                        )}
                        <span className='text-sm font-medium text-university-academic-700 group-hover:text-university-navy'>
                          {platform.platform}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </ElegantText>
            )}

            {/* Action Buttons Row */}
            <ElegantText variant="fade-up" delay={0.5}>
              <div className='flex flex-col sm:flex-row gap-6 pt-6'>
                
                {/* WhatsApp Contact */}
                {whatsappContact?.phoneNumber && (
                  <a
                    href={generateWhatsAppUrl(whatsappContact.phoneNumber, whatsappContact.message)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className='group inline-flex items-center justify-center gap-3 px-6 py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-all duration-300 shadow-university hover:shadow-university-lg transform hover:-translate-y-1 min-w-[200px]'
                  >
                    <MessageCircle className='w-5 h-5 group-hover:scale-110 transition-transform duration-200' />
                    <span className='font-semibold'>
                      {whatsappContact.buttonText || 'Chat en WhatsApp'}
                    </span>
                  </a>
                )}

                {/* Main Action Button */}
                {button && button.showButton && (
                  <Button
                    variant={button.buttonVariant || 'primary'}
                    size="default"
                    width={button.buttonWidth || 'auto'}
                    buttonType={button.buttonType}
                    // @ts-expect-error - Temporary fix until Sanity types are updated
                    pageReference={button.buttonPageReference}
                    externalUrl={button.buttonExternalUrl}
                    emailAddress={button.buttonEmailAddress}
                    fileUrl={button.buttonFileUrl?.asset?.url}
                    anchorLocation={button.buttonAnchorLocation}
                    anchorId={button.buttonAnchorId}
                    className="min-w-[200px]"
                  >
                    {button.buttonText}
                  </Button>
                )}
              </div>
            </ElegantText>
          </div>

          {/* Right Column - Visual Content */}
          <div className='col-span-12 lg:col-span-7 space-y-8'>
            
            {/* Featured Image */}
            {featuredImage?.asset?.url && (
              <ElegantText variant="fade-up" delay={0.6}>
                <div className='relative overflow-hidden rounded-xl shadow-university hover:shadow-university-lg transition-all duration-300'>
                  <Image
                    src={featuredImage.asset.url}
                    alt={featuredImage.alt || 'Imagen destacada'}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </ElegantText>
            )}

            {/* Google Maps Integration */}
            {googleMaps?.showMap && googleMaps.embedUrl && (
              <ElegantText variant="fade-up" delay={0.7}>
                <div className='space-y-4'>
                  {googleMaps.address && (
                    <div className='p-4 bg-university-academic-50 border border-university-academic-200 rounded-lg'>
                      <div className='flex items-start gap-3'>
                        <MapPin className='w-5 h-5 text-university-navy mt-0.5 flex-shrink-0' />
                        <div className='flex-1'>
                          <h3 className='font-semibold text-university-navy mb-1'>Visítanos</h3>
                          <p className='text-university-academic-600 leading-relaxed'>
                            {googleMaps.address}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className='relative overflow-hidden rounded-lg shadow-university border border-university-academic-200'>
                    <iframe
                      src={extractEmbedUrl(googleMaps.embedUrl)}
                      width="600"
                      height="300"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full h-[300px]"
                      title="Ubicación en Google Maps"
                    />
                  </div>
                </div>
              </ElegantText>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
} 