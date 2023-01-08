export interface BlogSEO {
  title: string;
  excerpt: string;
  thumbnail: string;
}

export interface Props {
  title?: string;
  description?: string;
  pathname?: string;
  children?: React.ReactNode;
  blogSEO?: BlogSEO;
}

export interface ItemElement {
  "@type": string;
  position: number;
  item: {
    "@id": string;
    name: string;
  };
}

export interface SchemaOrgJSONLD {
  "@context": string;
  "@type": string;
  url?: string;
  name?: string;
  headline?: string;
  alternateName?: string;
  itemListElement?: ItemElement[];
  description?: string;
}
