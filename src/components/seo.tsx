import React, { FC } from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby"

const SEO: FC<SEOProps> = ({ description, lang = "pl", meta, title, schemaMarkup, articleImg }) => {
  const data = useStaticQuery(
    graphql`
      {
        info: site {
          siteMetadata {
            title
            description
            author,
            siteUrl
          }
        },
        logo: file(name: {eq: "b"}) {
          childImageSharp {
            fluid(maxWidth: 250, maxHeight: 250, quality: 50) {
              src
            }
          }
        }
      }
    `
  );
  
  const site: any = data.info;
  const image: string = `${site.siteMetadata.siteUrl}${data.logo.childImageSharp.fluid.src}`;

  const metaDescription: string =  site.siteMetadata.description;
  const defaultTitle: string = site.siteMetadata?.title;

  const metaContent: Array<MetaProps> = [
    {
      name: `description`,
      content: metaDescription
    },
    {
      property: `og:title`,
      content: title  ? title : defaultTitle,
    },
    {
      property: `og:image`,
      content: articleImg ? articleImg : image,
    },
    {
      property: `og:description`,
      content: description ? description : metaDescription,
    },
    {
      property: `og:type`,
      content: `website`,
    },
    {
      property: `og:url`,
      content: site.siteUrl,
    },
    {
      name: `twitter:card`,
      content: `summary`,
    },
    {
      name: `twitter:creator`,
      content: site.siteMetadata?.author || ``,
    },
    {
      name: `twitter:title`,
      content: title,
    },
    {
      name: `twitter:site`,
      content: title,
    },
    {
      name: `twitter:image`,
      content: articleImg ? articleImg : image,
    },
    {
      name: `twitter:description`,
      content: metaDescription,
    },
  ];

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}
      meta={meta ? metaContent.concat(meta) : metaContent}
    >
      {schemaMarkup && 
          <script type="application/ld+json">{JSON.stringify(schemaMarkup)}</script>
      }
    </Helmet>
  )
}

type MetaProps = {
  name?: string,
  content?: any,
  property?: string
};

type SEOProps = {
    description?: string,
    lang?: string,
    meta?: ConcatArray<MetaProps>,
    title?: string,
    schemaMarkup?: any,
    articleImg?: string
};

export default SEO;
