import { Folder, Tag, Users } from "lucide-react";
import { StructureBuilder, StructureResolverContext } from "sanity/structure";
import { orderableDocumentListDeskItem} from '@sanity/orderable-document-list';

export const BlogItem = (
  S: StructureBuilder, 
  context: StructureResolverContext
) => (
  S.listItem()
    .title('Blog')
    .icon(Folder)
    .child(
      S.list()
        .title('Blog')
        .items([
          AllPosts(S),
          PostCategories(S, context),
          Authors(S)
        ])
    )
)

export const AllPosts = (
  S: StructureBuilder, 
) => (
  S.listItem()
    .title('Artículos')
    .icon(Folder)
    .child(
      S.documentList()
      .title('Todos los Artículos')
      .filter('_type == "post"')
    ) 
)

export const PostCategories = (
  S: StructureBuilder, 
  context: StructureResolverContext
) => (
  orderableDocumentListDeskItem({
    S, 
    context, 
    icon: Tag, 
    type: 'postCategory', 
    title: 'Categorías', 
    id: 'orderable-post-categories'
  })
)

export const Authors = (
  S: StructureBuilder, 
) => (
  S.listItem()
    .title('Autores')
    .icon(Users)
    .child(
      S.documentList()
      .title('Autores')
      .filter('_type == "author"')
    ) 
)