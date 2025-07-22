import Image from "next/image";
import { PostBySlugQueryResult } from "../../../sanity.types";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";

type Author = NonNullable<
  NonNullable<PostBySlugQueryResult>
>;

interface AuthorProps {
  author: Author['author'];
  classNames?: string;  
}

export default function Author({ author, classNames }: AuthorProps) {

  if (!author) return null;

  return (
    <HoverCard>
      <HoverCardTrigger>
        {/* Only render Image if we have a valid URL */}
        {author?.avatar?.asset?.url ? (
          <Image
            src={author.avatar.asset.url}
            width={26}
            height={26}
            alt={author.name ?? ''}
            className='rounded-full'
          />
        ) : (
          <div className="w-[26px] h-[26px] rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-xs font-medium">
              {author?.name?.charAt(0)?.toUpperCase() ?? '?'}
            </span>
          </div>
        )}
      </HoverCardTrigger>
      <HoverCardContent className={classNames}>
        <div className='text-sm font-semibold antialiased'>
          {author.name}
        </div>
        <div className='text-sm text-gray-600'>
          @{author.username}
        </div>
        <div className='mt-3 pt-3 border-t border-dashed text-sm text-gray-600'>
          {author.bio}
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}