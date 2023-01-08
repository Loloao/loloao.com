import React from "react";
import useSiteMetadata from "../../utils/hooks/useSiteDatameta";
import { BlogSEO, Props, SchemaOrgJSONLD } from "./types";

export default ({ blogSEO, title, description, pathname, children }: Props) => {
  const {
    title: defaultTitle,
    description: defaultDescription,
    image,
    siteUrl,
    twitterUsername,
  } = useSiteMetadata();

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image}`,
    url: `${siteUrl}${pathname || ``}`,
    twitterUsername,
  };

  const schemaOrgJSONLD: SchemaOrgJSONLD[] = [
    {
      "@context": "http://schema.org",
      "@type": "WebSite",
      url: siteUrl,
      name: title,
      alternateName: title,
    },
  ];

  if (blogSEO) {
    const { title, excerpt, thumbnail } = blogSEO;
    // if (thumbnail) {
    //   image = postMeta.thumbnail.childImageSharp.fixed.src;
    // }
    schemaOrgJSONLD.push(
      {
        "@context": "http://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            item: {
              "@id": siteUrl,
              name: title,
              // image,
            },
          },
        ],
      },
      {
        "@context": "http://schema.org",
        "@type": "BlogPosting",
        url: siteUrl,
        name: title,
        alternateName: title,
        headline: title,
        // image: {
        //   "@type": "ImageObject",
        //   url: image,
        // },
        description: excerpt,
      }
    );
  }

  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />

      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>

      <link
        rel="icon"
        href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>👤</text></svg>"
      />
      {children}
    </>
  );
};
