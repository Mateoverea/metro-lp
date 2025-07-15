import { Folder } from "lucide-react";
import { StructureBuilder } from "sanity/structure";

export const PagesItem = (
  S: StructureBuilder, 
) => (
  S.listItem()
    .title('Pages')
    .icon(Folder)
    .child(
      S.list()
        .title('Pages')
        .items([
          PageBuilder(S),
          IndexPages(S)
        ])
    )
)

export const IndexPages = (
  S: StructureBuilder, 
) => (
  S.listItem()
    .title('Index Pages')
    .child(
      S.list()
        .title('Index Pages')
        .items([
                BlogItem(S),
      ProjectsItem(S)
        ])
    ) 
)

export const PageBuilder = (
  S: StructureBuilder, 
) => (
  S.listItem()
    .title('Page Builder')
    .child(
      S.documentList()
      .title('Page Builder')
      .filter('_type == "page"')
    ) 
)

export const BlogItem = (
  S: StructureBuilder, 
) => (
  S.listItem()
    .title('Blog')
    .child(
      S.document()
      .id('blogPage')
      .schemaType('blogPage')
      .documentId('blogPage')
      .title('Blog')
    )
)



export const ProjectsItem = (
  S: StructureBuilder, 
) => (
  S.listItem()
    .title('Oferta Académica')
    .child(
      S.document()
      .id('projectsPage')
      .schemaType('projectsPage')
      .documentId('projectsPage')
      .title('Oferta Académica')
    )
)