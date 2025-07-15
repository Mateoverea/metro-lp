import { PageBySlugQueryResult } from "../../sanity.types";

// Helper type to filter out empty objects and extract only valid blocks
type ValidPageBuilderBlocks = NonNullable<
  NonNullable<PageBySlugQueryResult>["pageBuilder"]
>[number] extends infer U 
  ? U extends { _type: string }
    ? U
    : never
  : never;

export type PageBuilderBlockTypes = ValidPageBuilderBlocks["_type"];

export type PageBuilderType<T extends PageBuilderBlockTypes> = Extract<
  ValidPageBuilderBlocks,
  { _type: T }
>;

export type ButtonType = NonNullable<
  NonNullable<PageBuilderType<"heroBlock">>["buttons"]
>[number];

export type PortableTextProps = NonNullable<
  NonNullable<PageBuilderType<"heroBlock">>["content"]
>;

export type FormType = NonNullable<
  NonNullable<PageBuilderType<"formBlock">>["form"]
>;