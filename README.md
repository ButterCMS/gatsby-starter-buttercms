Kick off your Gatsby + ButterCMS with this default boilerplate. 

[Live demo](https://gatsby-starter-buttercms.netlify.com/)

## Important Notice
This project was created as an example use case of ButterCMS and Gatsby and will not be actively maintained. 

If you’re interested in exploring the best, most up-to-date way to integrate Butter into javascript frameworks like Gatsby, you can check out the following resources:

### Starter Projects

The following turn-key starters are fully integrated with dynamic sample content from your ButterCMS account, including main menu, pages, blog posts, categories, and tags, all with a beautiful, custom theme with already-implemented search functionality. All of the included sample content is automatically created in your account dashboard when you sign up for a free trial of ButterCMS.
- [Gatsby Starter](https://buttercms.com/starters/gatsbyjs-starter-project/)
- [Angular Starter](https://buttercms.com/starters/angular-starter-project/)
- [React Starter](https://buttercms.com/starters/react-starter-project/)
- [Vue.js Starter](https://buttercms.com/starters/vuejs-starter-project/)
- Or see a list of all our [currently-maintained starters](https://buttercms.com/starters/). (Over a dozen and counting!)

### Other Resources
- Check out the [official ButterCMS Docs](https://buttercms.com/docs/)
- Check out the [official ButterCMS API docs](https://buttercms.com/docs/api/)



## 🚀 Quick start

1.  **Create a Gatsby site.**

    Use the Gatsby CLI to create a new site, specifying the default starter.

    ```sh
    # create a new Gatsby site using the default starter
    npx gatsby new my-default-starter https://github.com/butterCMS/gatsby-starter-buttercms
    ```
    
    If you run into an error with `npx`, you may need to first remove `node_modules` then run:
    
    ```
    yarn upgrade --latest
    yarn install
    gatsby develop
    ```
    

2. **Create Content**
   
   For this template to work, you have to create your content on ButterCMS
   as stated [here](https://buttercms.com/docs/api-client/gatsbyjs)

2. **Configuration**
    You need to add the API token from your dashboard, along with associated
    page types, content fileds, and pages.

    `gatsby-config-js`

    ```js
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
    ```

1.  **Start developing.**

    Navigate into your new site’s directory and start it up.

    ```sh
    cd my-default-starter/
    gatsby develop
    ```

1.  **Open the source code and start editing!**

    Your site is now running at `http://localhost:8000`!

    _Note: You'll also see a second link: _`http://localhost:8000/___graphql`_. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql)._

    Open the `my-default-starter` directory in your code editor of choice and edit `src/pages/index.js`. Save your changes and the browser will update in real time!

## 🧐 What's inside?

A quick look at the top-level files and directories you'll see in a Gatsby project.

    .
    ├── node_modules
    ├── src
    ├── gatsby-browser.js
    ├── gatsby-config.js
    ├── gatsby-node.js
    ├── gatsby-ssr.js
    ├── LICENSE
    ├── package-lock.json
    ├── package.json
    └── README.md

1.  **`/node_modules`**: This directory contains all of the modules of code that your project depends on (npm packages) are automatically installed.

2.  **`/src`**: This directory will contain all of the code related to what you will see on the front-end of your site (what you see in the browser) such as your site header or a page template. `src` is a convention for “source code”.

3.  **`gatsby-browser.js`**: This file is where Gatsby expects to find any usage of the [Gatsby browser APIs](https://www.gatsbyjs.org/docs/browser-apis/) (if any). These allow customization/extension of default Gatsby settings affecting the browser.

4.  **`gatsby-config.js`**: This is the main configuration file for a Gatsby site. This is where you can specify information about your site (metadata) like the site title and description, which Gatsby plugins you’d like to include, etc. (Check out the [config docs](https://www.gatsbyjs.org/docs/gatsby-config/) for more detail).

5.  **`gatsby-node.js`**: This file is where Gatsby expects to find any usage of the [Gatsby Node APIs](https://www.gatsbyjs.org/docs/node-apis/) (if any). These allow customization/extension of default Gatsby settings affecting pieces of the site build process.

6.  **`gatsby-ssr.js`**: This file is where Gatsby expects to find any usage of the [Gatsby server-side rendering APIs](https://www.gatsbyjs.org/docs/ssr-apis/) (if any). These allow customization of default Gatsby settings affecting server-side rendering.

7.  **`LICENSE`**: Gatsby is licensed under the MIT license.

8. **`package-lock.json`** (See `package.json` below, first). This is an automatically generated file based on the exact versions of your npm dependencies that were installed for your project. **(You won’t change this file directly).**

9. **`package.json`**: A manifest file for Node.js projects, which includes things like metadata (the project’s name, author, etc). This manifest is how npm knows which packages to install for your project.

10. **`README.md`**: A text file containing useful reference information about your project.

## 🎓 Learning Gatsby

Looking for more guidance? Full documentation for Gatsby lives [on the website](https://www.gatsbyjs.org/). Here are some places to start:

- **For most developers, we recommend starting with our [in-depth tutorial for creating a site with Gatsby](https://www.gatsbyjs.org/tutorial/).** It starts with zero assumptions about your level of ability and walks through every step of the process.

- **To dive straight into code samples, head [to our documentation](https://www.gatsbyjs.org/docs/).** In particular, check out the _Guides_, _API Reference_, and _Advanced Tutorials_ sections in the sidebar.

## 💫 Deploy

### Gatsby Cloud
While creating a site on Gatsby Cloud create `BUTTER_CMS_TOKEN` environment variable set to your Read API Token which could be found on the settings page https://buttercms.com/settings/.

### Preview
1. In Gatsby Cloud go to Site Settings -> Webhook and copy Preview Webhook URL (https://share.getcloudapp.com/kpuKN1v0)
2. In ButterCMS go to Webhooks page https://buttercms.com/webhooks/ and paste copied value into Target URL input field and select appropriate Event i.e. `post.all - blog post has any activity` and click "Save"
3. In Gatsby Cloud go to CMS Preview and copy preview site URL (https://share.getcloudapp.com/eDujwkwj)
4. In ButterCMS go to Preview Settings page https://buttercms.com/settings/previews and paste into Blog Posts input field url for blog posts. For this repository it is [copied preview site url]/blog/&lt;slug&gt; i.e. https://preview-gatsbystarterbuttercmsmas34503.gtsb.io/blog/&lt;slug&gt; and click Save (https://share.getcloudapp.com/6qu8x9Yw)
5. To preview a post in ButterCMS (webhook should be set to post related event) go to the Posts dashboard (https://buttercms.com/blog_home/) and click on any post. Click Preview button and the preview panel will appear at the bottom of the page (https://share.getcloudapp.com/llu5nQm8). Make changes to the post and to preview how it would look like click Save Draft. The preview panel should update automatically and reflect made changes. Note, that it might take several seconds for preview site to update. To preview pages use the same approach.

### Netlify
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/butterCMS/gatsby-starter-buttercms)



## Other

View our [Gatsby Blog engine](https://buttercms.com/gatsbyjs-blog-engine/) and [Gatsby Full CMS](https://buttercms.com/gatsbyjs-cms/) for other examples of using ButterCMS with Gatsby.
