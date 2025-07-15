import { Folder, Tag } from "lucide-react";
import { StructureBuilder, StructureResolverContext } from "sanity/structure";
import { orderableDocumentListDeskItem} from '@sanity/orderable-document-list';

export const ProjectsItem = (
  S: StructureBuilder, 
  context: StructureResolverContext
) => (
  S.listItem()
    .title('Oferta Académica')
    .icon(Folder)
    .child(
      S.list()
        .title('Oferta Académica')
        .items([
          AllProjects(S),
          ProjectCategories(S, context),
        ])
    )
)

export const AllProjects = (
  S: StructureBuilder, 
) => (
  S.listItem()
    .title('Programas')
    .icon(Folder)
    .child(
      S.documentList()
      .title('Todos los Programas')
      .filter('_type == "project"')
    ) 
)

export const ProjectCategories = (
  S: StructureBuilder, 
  context: StructureResolverContext
) => (
  orderableDocumentListDeskItem({
    S, 
    context, 
    icon: Tag, 
    type: 'projectCategory', 
    title: 'Categorías', 
    id: 'orderable-project-categories'
  })
)