# SITE ENGINE - SANITY + NEXT.JS DEVELOPMENT RULES
# Site Engine - Sanity CMS + Next.js Marketing Website Template

## PROJECT STRUCTURE OVERVIEW

This is a Next.js 15 project with Sanity CMS headless integration featuring:
- Page Builder system with reusable blocks
- Singleton documents for global settings  
- Type-safe queries with auto-generated TypeScript types
- Studio integration at `/studio` route
- Real-time preview capabilities

## CORE DEVELOPMENT PRINCIPLES

- Write clean, simple, readable code
- Implement features in the simplest possible way
- Keep files small and focused (<200 lines)
- Test after every meaningful change
- Use clear, consistent naming
- ALWAYS write simple, clean and modular code
- Use ESLint rules ALWAYS
- Include LOTS of explanatory comments
- Document all changes and reasoning IN THE COMMENTS

## FILE STRUCTURE PATTERNS

```
src/
├── sanity/
│   ├── schemas/
│   │   ├── singletons/          # Global settings (one instance)
│   │   ├── documents/           # Content types (multiple instances)
│   │   ├── objects/             # Reusable field objects
│   │   ├── page-builder/        # Page builder blocks
│   │   └── misc/                # Shared utilities
│   ├── lib/
│   │   ├── queries/             # GROQ queries organized by type
│   │   └── structure/           # Studio navigation structure
│   └── components/              # Custom Sanity Studio components
├── components/
│   ├── page-builder/blocks/     # Frontend block components
│   ├── global/                  # Layout components (header, footer)
│   ├── shared/                  # Reusable UI components
│   └── ui/                      # Base UI components
└── app/(frontend)/              # Next.js app router pages
```

## STEPS FOR ADDING SANITY VARIABLES/CONTENT TYPES

### STEP 1: DETERMINE CONTENT TYPE

**Choose between:**
- **Singleton**: Global settings (only one instance) → `src/sanity/schemas/singletons/`
- **Document**: Content with multiple entries → `src/sanity/schemas/documents/`
- **Object**: Reusable field groups → `src/sanity/schemas/objects/`
- **Page Builder Block**: Modular page content → `src/sanity/schemas/page-builder/blocks/`

### STEP 2: CREATE SCHEMA DEFINITION

**For Singletons (Global Settings):**
```typescript
// src/sanity/schemas/singletons/[name]-settings.ts
import { defineField, defineType } from "sanity";
import { fieldGroups } from "../misc/field-groups";

export default defineType({
  name: '[name]Settings',
  title: '[Name] Settings',
  type: 'document',
  groups: [...fieldGroups],
  fields: [
    defineField({
      name: "fieldName",
      type: "string", // string | text | number | boolean | image | array | object | reference
      title: "Field Title",
      description: "Help text for editors",
      group: 'content', // content | seo | settings | appearance | companyDetails
      validation: Rule => Rule.required(), // Optional validation
      initialValue: "default", // Optional default value
    }),
    // Add more fields...
  ],
  preview: {
    prepare() {
      return {
        title: '[Name] Settings',
      }
    },
  },
})
```

**For Documents (Multiple Entries):**
```typescript
// src/sanity/schemas/documents/[name].ts
import { defineField, defineType } from "sanity";

export default defineType({
  name: '[name]',
  title: '[Name]',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'title' },
      validation: Rule => Rule.required(),
    }),
    // Add more fields...
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
    },
  },
})
```

**For Page Builder Blocks:**
```typescript
// src/sanity/schemas/page-builder/blocks/[name]-block.ts
import { [Icon] } from "lucide-react";
import { defineField, defineType } from "sanity";
import { fieldsets } from "../../misc/fieldsets";
import { fieldGroups } from "../../misc/field-groups";

export default defineType({
  name: '[name]Block',
  title: '[Name]',
  type: 'object',
  fieldsets: [...fieldsets],
  groups: [...fieldGroups],
  fields: [
    // Define block-specific fields
  ],
  preview: {
    select: {
      title: 'heading', // or main identifying field
    },
    prepare(selection) {
      const { title } = selection;
      return {
        title: title ?? 'No title set',
        subtitle: '[Name] Block',
        media: [Icon],
      }
    },
  },
})
```

### STEP 3: REGISTER SCHEMA

**Add to schema index:**
```typescript
// src/sanity/schemas/index.ts
import newSchema from "./path/to/new-schema";

const coreSchema = [
  // ... existing schemas
  newSchema, // Add here
];
```

### STEP 4: CREATE QUERY

**Create query for data fetching:**
```typescript
// src/sanity/lib/queries/[category]/[name].ts
import { defineQuery } from "next-sanity";

export const [name]Query = defineQuery(`*[_type == '[schemaName]'][0] {
  fieldName,
  imageField { 
    asset->{ url },
    alt
  },
  arrayField[] {
    // array item fields
  },
  referenceField->{
    _id,
    title,
    'slug': slug.current
  }
}`);

// For documents with multiple entries:
export const [name]sQuery = defineQuery(`*[_type == '[schemaName]'] | order(_createdAt desc) {
  // fields
}`);
```

### STEP 5: REGENERATE TYPES

**ALWAYS run after schema changes:**
```bash
npx sanity typegen generate
```
This updates `sanity.types.ts` with new TypeScript types.

### STEP 6: ADD TO STUDIO STRUCTURE (Optional)

**For better organization in Studio:**
```typescript
// src/sanity/lib/structure/items/[name]-item.ts
import { [Icon] } from "lucide-react";
import type { StructureBuilder } from "sanity/structure";

export const [Name]Item = (S: StructureBuilder) =>
  S.listItem()
    .title('[Name]')
    .icon([Icon])
    .child(
      // For singletons:
      S.document()
        .id('[schemaName]')
        .schemaType('[schemaName]')
        .documentId('[schemaName]')
        .title('[Name]')
      
      // For documents:
      // S.documentList()
      //   .title('All [Name]s')
      //   .filter('_type == "[schemaName]"')
    );
```

**Add to main structure:**
```typescript
// src/sanity/lib/structure/index.ts
import { [Name]Item } from "./items/[name]-item";

export const structure: StructureResolver = (S, context) => (
  S.list()
    .title('Content')
    .items([
      // ... existing items
      [Name]Item(S), // Add here
    ])
)
```

### STEP 7: FETCH DATA IN LAYOUT/PAGE

**For global data (add to layout):**
```typescript
// src/app/(frontend)/layout.tsx
import { [name]Query } from "@/sanity/lib/queries/[category]/[name]";

export default async function RootLayout({ children }) {
  const [
    // ... existing queries
    { data: [name]Data }
  ] = await Promise.all([
    // ... existing fetches
    sanityFetch({ query: [name]Query })
  ]);

  return (
    <html lang="en">
      <body>
        <ClientLayout 
          // ... existing props
          [name]Data={[name]Data}
        >
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
```

**Update ClientLayout interface:**
```typescript
// src/components/global/client-layout.tsx
import { [Name]QueryResult } from '../../../sanity.types';

interface ClientLayoutProps {
  // ... existing props
  [name]Data: [Name]QueryResult;
}

export default function ClientLayout({ 
  // ... existing props
  [name]Data 
}: ClientLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        // ... existing props
        [name]Data={[name]Data}
      />
      <main className="flex-1">
        {children}
      </main>
      <Footer 
        // ... existing props
        [name]Data={[name]Data}
      />
    </div>
  );
}
```

### STEP 8: USE DATA IN COMPONENTS

**Access data in components:**
```typescript
// src/components/[category]/[component].tsx
import { [Name]QueryResult } from '../../../sanity.types';

interface ComponentProps {
  [name]Data: [Name]QueryResult;
}

export default function Component({ [name]Data }: ComponentProps) {
  const { fieldName, imageField, arrayField } = [name]Data ?? {};

  return (
    <div>
      {/* Use fieldName directly */}
      <h1>{fieldName}</h1>
      
      {/* Use image with proper handling */}
      {imageField && (
        <img 
          src={imageField.asset?.url}
          alt={imageField.alt || 'Default alt text'}
        />
      )}
      
      {/* Loop through arrays */}
      {arrayField?.map((item, index) => (
        <div key={index}>
          {/* Render array items */}
        </div>
      ))}
    </div>
  );
}
```

### STEP 9: CREATE PAGE BUILDER BLOCK COMPONENT (If applicable)

```typescript
// src/components/page-builder/blocks/[name]-block.tsx
import { [Name]BlockType } from "../../../../sanity.types";

export default function [Name]Block(props: [Name]BlockType) {
  const { 
    heading, 
    content, 
    // ... other block fields 
  } = props;

  return (
    <section className="py-12">
      <div className="container mx-auto">
        {heading && (
          <h2 className="text-3xl font-bold mb-6">
            {heading}
          </h2>
        )}
        {/* Render block content */}
      </div>
    </section>
  );
}
```

**Register in PageBuilder:**
```typescript
// src/components/page-builder/index.tsx
const [Name]Block = dynamic(() => import("./blocks/[name]-block"));

const PB_BLOCKS = {
  // ... existing blocks
  [name]Block: [Name]Block,
} as const;
```

## COMMON FIELD TYPES & PATTERNS

### Basic Fields
```typescript
// String field
defineField({
  name: "textField",
  type: "string",
  title: "Text Field"
})

// Long text
defineField({
  name: "description",
  type: "text",
  title: "Description",
  rows: 3
})

// Rich text with blocks
defineField({
  name: "content",
  type: "array",
  of: [{ type: "block" }]
})

// Number
defineField({
  name: "price",
  type: "number",
  title: "Price"
})

// Boolean
defineField({
  name: "isActive",
  type: "boolean",
  title: "Is Active",
  initialValue: false
})
```

### Image Fields
```typescript
defineField({
  name: "image",
  type: "image",
  title: "Image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      type: "string",
      title: "Alternative Text"
    })
  ]
})
```

### Reference Fields
```typescript
defineField({
  name: "pageReference",
  type: "reference",
  title: "Page Reference",
  to: [{ type: "page" }]
})
```

### Array Fields
```typescript
defineField({
  name: "items",
  type: "array",
  title: "Items",
  of: [{
    type: "object",
    fields: [
      { name: "title", type: "string" },
      { name: "description", type: "text" }
    ]
  }]
})
```

### Select Fields
```typescript
defineField({
  name: "variant",
  type: "string",
  title: "Variant",
  options: {
    list: [
      { title: "Primary", value: "primary" },
      { title: "Secondary", value: "secondary" }
    ]
  }
})
```

## AVAILABLE FIELD GROUPS
- `content` - Main content fields
- `seo` - SEO related fields  
- `settings` - Configuration options
- `appearance` - Visual styling
- `navbar` - Navigation bar settings
- `footer` - Footer settings
- `companyDetails` - Company information

## DEBUGGING COMMANDS

```bash
# Regenerate TypeScript types
npx sanity typegen generate

# Start development server
npm run dev

# Deploy schema changes to Sanity
npx sanity deploy

# Check for TypeScript errors
npx tsc --noEmit

# Run linting
npm run lint
```

## TROUBLESHOOTING COMMON ISSUES

### Issue: Server Errors After Schema Changes
**Symptoms:** Internal server errors, ENOENT file errors in `.next` directory, 500 errors

**Root Cause:** Corrupted Next.js build cache combined with Sanity type generation cache issues

**Solution (Windows PowerShell):**
```bash
# 1. Stop all Node processes
taskkill /F /IM node.exe

# 2. Clear Next.js build cache
Remove-Item -Recurse -Force .next

# 3. Restart development server
npm run dev
```

**Solution (Mac/Linux):**
```bash
# 1. Stop dev server (Ctrl+C)
# 2. Clear Next.js build cache
rm -rf .next

# 3. Restart development server
npm run dev
```

### Issue: Sanity Types Not Updating
**Symptoms:** TypeScript errors, old type definitions persist after schema changes

**Root Cause:** Sanity TypeGen cache not detecting schema changes properly

**Solution:**
```bash
# 1. Stop dev server
# 2. Regenerate types
npx sanity typegen generate

# 3. If still not working, clear all caches
Remove-Item -Recurse -Force .next
Remove-Item -Recurse -Force node_modules/.cache

# 4. Restart server
npm run dev
```

### Issue: Import Path Errors for sanity.types.ts
**Symptoms:** "Cannot find module" errors when importing from sanity.types

**Root Cause:** Inconsistent import paths across the project

**Solution:** Use relative imports based on file location:
```typescript
// From src/components/page-builder/blocks/
import { MediaBlock } from '../../../../sanity.types';

// From src/components/global/
import { GeneralSettingsQueryResult } from '../../../sanity.types';

// From src/app/(frontend)/
import { PageBySlugQueryResult } from '../../../sanity.types';
```

### Issue: TypeScript Errors After Schema Updates
**Symptoms:** Build fails, component props don't match generated types

**Temporary Workaround (when types don't generate correctly):**
```typescript
// Create temporary interface matching your schema
interface TempMediaBlockProps {
  _type: "mediaBlock";
  title?: string;
  images?: Array<{
    image?: {
      asset?: {
        _ref?: string;
        url?: string;
      };
      altText?: string;
    };
    caption?: string;
    size?: 'small' | 'medium' | 'large';
    _key?: string;
  }>;
  layoutStyle?: 'bento' | 'carousel' | 'mixed';
  backgroundWidth?: 'full' | 'contained';
  anchorId?: string;
}

// Use until types generate properly
export type MediaBlockProps = TempMediaBlockProps;
```

### Issue: Schema Changes Not Appearing in Studio
**Symptoms:** New fields don't show up in Sanity Studio

**Solution:**
```bash
# 1. Restart dev server (Studio runs on same server)
# 2. Hard refresh browser (Ctrl+F5 or Cmd+Shift+R)
# 3. Clear browser cache for localhost:3000
```

## BEST PRACTICES FOR SCHEMA CHANGES

### Before Making Schema Changes:
1. **Stop the dev server** - Prevents cache conflicts
2. **Plan the complete schema** - Avoid multiple iterations
3. **Check existing patterns** - Follow project conventions

### After Schema Changes:
1. **Always regenerate types**: `npx sanity typegen generate`
2. **Restart dev server** - Ensures clean build
3. **Test in Studio first** - Verify fields appear correctly
4. **Test frontend component** - Ensure data flows properly
5. **Clear caches if issues persist**

### Schema Change Checklist:
- [ ] Schema file created/updated
- [ ] Schema registered in `src/sanity/schemas/index.ts`
- [ ] Query created/updated in `src/sanity/lib/queries/`
- [ ] Types regenerated: `npx sanity typegen generate`
- [ ] Component updated to use new types
- [ ] Dev server restarted
- [ ] Tested in Studio
- [ ] Tested in frontend

## CACHE CLEARING PRIORITY

When encountering errors, clear caches in this order:

1. **Next.js cache** (most common issue):
   ```bash
   Remove-Item -Recurse -Force .next
   ```

2. **Node modules cache**:
   ```bash
   Remove-Item -Recurse -Force node_modules/.cache
   ```

3. **Full node_modules** (last resort):
   ```bash
   Remove-Item -Recurse -Force node_modules
   npm install
   ```

## ERROR PATTERNS TO RECOGNIZE

### ENOENT Errors in .next Directory
```
Error: ENOENT: no such file or directory, open '.next/server/pages/_app/build-manifest.json'
```
**Fix:** Clear `.next` directory and restart

### Type Import Errors
```
Cannot find module '../../../sanity.types' or its corresponding type declarations
```
**Fix:** Check import path, regenerate types, or use temporary interface

### 500 Internal Server Error
**Common causes:**
- Corrupted build cache → Clear `.next`
- Type mismatches → Regenerate types
- Schema/query conflicts → Restart server

Remember: **When in doubt, clear caches and restart!** 🔄

## ERROR HANDLING PATTERNS

- Always provide fallback values: `field || 'default'`
- Check for data existence: `data?.field`
- Handle loading states appropriately
- Add proper TypeScript types from `sanity.types.ts`

## WHEN CREATING NEW FEATURES

1. **Plan the data structure first** - What fields do you need?
2. **Choose the right schema type** - Singleton, Document, Object, or Block?
3. **Create the schema** - Follow naming conventions
4. **Generate types** - Run typegen command
5. **Create query** - Write efficient GROQ query
6. **Fetch data** - Add to appropriate layout/page
7. **Create component** - Use TypeScript types
8. **Test thoroughly** - Verify in Studio and frontend

Always test your changes in both the Sanity Studio and the frontend to ensure everything works correctly. 