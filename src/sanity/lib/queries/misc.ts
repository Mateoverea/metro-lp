import { defineQuery } from "next-sanity";

export const sitemapQuery = defineQuery(`
  *[_type in ["page", "post", "project", "blogPage", "projectsPage"] && defined(slug.current)] {
    "href": select(
      _type == "page" => "/" + slug.current,
      _type == "post" => "/blog/" + slug.current,
      _type == "blogPage" => "/blog",
      _type == "project" => "/oferta-academica/" + slug.current,
      _type == "projectsPage" => "/oferta-academica",
      slug.current
    ),
    _updatedAt
  }
`)

export const redirectsQuery = defineQuery(`
  *[_type == "redirect" && isEnabled == true] {
      source,
      destination,
      permanent
  }
`);