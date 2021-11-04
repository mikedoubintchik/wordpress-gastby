/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

const SEO = ({ description, lang, meta, title }) => {
  const { wp, wpUser } = useStaticQuery(
    graphql`
      query {
        wp {
          generalSettings {
            title
            description
          }
        }

        # if there's more than one user this would need to be filtered to the main user
        wpUser {
          twitter: name
        }
      }
    `
  );

  const metaDescription = description || wp.generalSettings?.description;
  const defaultTitle = wp.generalSettings?.title;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: wpUser?.twitter || ``,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    >
      <link
        rel="stylesheet"
        id="elementor-frontend-css"
        href="http://localhost:8000/wp-content/plugins/elementor/assets/css/frontend.css?ver=3.4.7"
        media="all"
      />
      <link
        rel="stylesheet"
        id="elementor-icons-css"
        href="http://localhost:8000/wp-content/plugins/elementor/assets/lib/eicons/css/elementor-icons.css?ver=5.13.0"
        media="all"
      />
      <link
        rel="stylesheet"
        id="elementor-common-css"
        href="http://localhost:8000/wp-content/plugins/elementor/assets/css/common.css?ver=3.4.7"
        media="all"
      />
      <link
        rel="stylesheet"
        id="elementor-post-5-css"
        href="http://localhost:8000/wp-content/uploads/elementor/css/post-5.css?ver=1635975525"
        media="all"
      />
      <link
        rel="stylesheet"
        id="elementor-global-css"
        href="http://localhost:8000/wp-content/uploads/elementor/css/global.css?ver=1635983966"
        media="all"
      />
      {/* <script
        src="http://localhost:8000/wp-content/plugins/elementor/assets/js/common.js?ver=3.4.7"
        id="elementor-common-js"
      />

      <script
        src="http://localhost:8000/wp-content/plugins/elementor/assets/js/app-loader.js?ver=3.4.7"
        id="elementor-app-loader-js"
      />
      <script
        src="http://localhost:8000/wp-includes/js/wp-embed.js?ver=5.8.1"
        id="wp-embed-js"
      />
      <script
        src="http://localhost:8000/wp-content/plugins/elementor/assets/js/webpack.runtime.js?ver=3.4.7"
        id="elementor-webpack-runtime-js"
      />
      <script
        src="http://localhost:8000/wp-content/plugins/elementor/assets/js/frontend-modules.js?ver=3.4.7"
        id="elementor-frontend-modules-js"
      />
      <script
        src="http://localhost:8000/wp-content/plugins/elementor/assets/lib/waypoints/waypoints.js?ver=4.0.2"
        id="elementor-waypoints-js"
      />
      <script
        src="http://localhost:8000/wp-content/plugins/elementor/assets/lib/swiper/swiper.js?ver=5.3.6"
        id="swiper-js"
      />
      <script
        src="http://localhost:8000/wp-content/plugins/elementor/assets/lib/share-link/share-link.js?ver=3.4.7"
        id="share-link-js"
      />

      <script
        src="http://localhost:8000/wp-content/plugins/elementor/assets/js/frontend.js?ver=3.4.7"
        id="elementor-frontend-js"
      />
      <script
        src="http://localhost:8000/wp-content/plugins/elementor/assets/js/preloaded-modules.js?ver=3.4.7"
        id="preloaded-modules-js"
      />

      <script
        src="http://localhost:8000/wp-content/plugins/elementor/assets/js/elementor-admin-bar.js?ver=3.4.7"
        id="elementor-admin-bar-js"
      /> */}
    </Helmet>
  );
};

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
};

export default SEO;
