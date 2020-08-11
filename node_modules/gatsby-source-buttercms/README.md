# gatsby-source-buttercms

Source plugin for pulling blog posts, authors, categories, tags, and content fields into [Gatsby](https://www.gatsbyjs.org/) from [ButterCMS](https://buttercms.com/).

## Install

`npm install --save gatsby-source-buttercms`

## Usage

```JavaScript
module.exports = {
  plugins: [
     {
        resolve: `gatsby-source-buttercms`,
        options: {
              authToken: `<API_TOKEN>`,
              // Optional array of Collection key 
              contentFields: {
                keys: [`collection_key`],
                // Optional. Set to 1 to enable test mode for viewing draft content.
                test: 0,
              },
              // Optional array of page type keys
              pageTypes: [`page_type_key`],
              // Optional array of locales (if configured in your account)
              locales: [`en`, `es`, `fr`],
              preview: 1 // Return draft content
        },
    }
  ]
}
```

### Query Blog Posts

The plugin maps all JSON fields documented in the [Butter CMS API Reference](https://buttercms.com/docs/api/#blog-engine) to GraphQL fields.

```GraphQL
{
  allButterPost {
    edges {
      node {
        id
        date
        url
        created
        published
        author {
          first_name
          last_name
          email
          slug
          bio
          title
          linkedin_url
          facebook_url
          instagram_url
          pinterest_url
          twitter_handle
          profile_image
        }
        categories {
          name
          slug
        }
        tags {
          name
          slug
        }
        featured_image
        slug
        title
        body
        summary
        seo_title
        meta_description
        status
      }
    }
  }
}
```

### Query Content Fields(Object)

```GraphQL
{
  allButterContentField {
    edges {
      node {
        key
        value
      }
    }
  }
}
```

### Query Content Fields(Collection)

```GraphQL
{
  allButterCollection {
    edges {
      node {
        key
        value{
          #Your collection fields
        }
      }
    }
  }
}
```

### Query Pages

```GraphQL
{
  allButterPage {
    edges {
      node {
        slug
        page_type
        # Your page’s fields …
      }
    }
  }
}
```

### Other

View our [Gatsby Blog engine](https://buttercms.com/gatsbyjs-blog-engine/) and [Gatsby Full CMS](https://buttercms.com/gatsbyjs-cms/) for other examples of using ButterCMS with Gatsby.
