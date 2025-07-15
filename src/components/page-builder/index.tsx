"use client"
import dynamic from "next/dynamic";
import { ComponentType } from "react";
import { createDataAttribute } from "next-sanity";
import { PageBySlugQueryResult } from "../../../sanity.types";
import { dataset, projectId, studioUrl } from "@/sanity/lib/api";

const HeroBlock = dynamic(() => import("./blocks/hero-block"));
const HeaderBlock = dynamic(() => import("./blocks/header-block"));
const FeatureCardsBlock = dynamic(() => import("./blocks/feature-cards-block"));
const TestimonialBlock = dynamic(() => import("./blocks/testimonial-block"));
const LogoBlock = dynamic(() => import("./blocks/logo-block"));
const FreeformBlock = dynamic(() => import("./blocks/freeform-block"));
const PortableTextBlock = dynamic(() => import("./blocks/portable-text-block"));
const CallToActionBlock = dynamic(() => import("./blocks/call-to-action-block"));
const FeaturesMinimalBlock = dynamic(() => import("./blocks/features-minimal-block"));
const FormBlock = dynamic(() => import("./blocks/form-block"));
const MediaBlock = dynamic(() => import("./blocks/media-block"));

type PageBlock = NonNullable<
  NonNullable<PageBySlugQueryResult>["pageBuilder"]
>[number];

export type PageBuilderProps = {
  pageBuilder: PageBlock[];
  id: string;
  type: string;
};

const PB_BLOCKS = {
  heroBlock: HeroBlock,
  headerBlock: HeaderBlock,
  featureCardsBlock: FeatureCardsBlock,
  testimonialBlock: TestimonialBlock,
  logoBlock: LogoBlock,
  freeformBlock: FreeformBlock,
  portableTextBlock: PortableTextBlock,
  callToActionBlock: CallToActionBlock,
  featuresMinimalBlock: FeaturesMinimalBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
} as const;

export function PageBuilder({ pageBuilder, id, type }: PageBuilderProps) {
  return (
    <div
      data-sanity={createDataAttribute({
        id: id,
        type: type,
        dataset: dataset,
        baseUrl: studioUrl,
        path: "pageBuilder",
        projectId: projectId,
      }).toString()}
    >
      {pageBuilder.map((block) => {
        // Type guard to ensure block has the required properties
        if (!block || typeof block !== 'object' || !('_type' in block) || !('_key' in block)) {
          return null;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const Component = PB_BLOCKS[block._type as keyof typeof PB_BLOCKS] as ComponentType<any>;
        
        if (!Component) {
          console.warn(`Unknown block type: ${block._type}`);
          return null;
        }

        return (
          <div
            key={`${block._type}-${block._key}`}
            data-sanity={createDataAttribute({
              id: id,
              type: type,
              dataset: dataset,
              baseUrl: studioUrl,
              projectId: projectId,
              path: `pageBuilder[_key=="${block._key}"]`,
            }).toString()}
          >
            <Component {...block} />
          </div>
        );
      })}
    </div>
  );
}