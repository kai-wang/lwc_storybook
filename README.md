# Static Site Boilerplate Example

The **Static Site** example contains the minimum code needed to get up and running with a LWR website.

## Project Setup

The directory structure looks like this:

```
scripts/
  └── start-server.mjs  // create and start server
  └── copy-slds.mjs     // copy the lightning design system from node_moudule to asset
src/
  ├── assets/           // static assets
  │   └── css/
  │       └── main.css
  └── content/          // site pages
  │   ├── about.md
  │   └── home.md
  └── layouts/          // site page layouts
      └── main_layout.njk
lwr.config.json         // lwr configuration
package.json            // npm packaging configuration
```

## Configuration

The LWR server is configured in `lwr.config.json`, at the root of the project. The **Static Site** example has two routes/pages.

```json
// lwr.config.json
{
  "lwc": {
    "modules": [
      { "dir": "$rootDir/src/modules" },
      { "npm": "lightning-base-components" }
    ]
  },
  "bundleConfig": { "exclude": ["lwc"] },
  "assets": [
    {
      "alias": "assetsDir",
      "dir": "$rootDir/src/assets",
      "urlPath": "/assets"
    },
    {
      "dir": "$rootDir/src/assets/fonts",
      "urlPath": "/fonts"
    },
    {
      "file": "$rootDir/src/assets/utilitySprite.svg",
      "urlPath": "/lightning.utilitySprite"
    }
  ],
  "routes": [
    {
      "id": "home",
      "path": "/",
      "rootComponent": "example/app",
      "layoutTemplate": "$layoutsDir/main.html",
      "bootstrap": {
        "syntheticShadow": true
      }
    }
  ]
}
```

## Running the Project

```bash
yarn install
yarn build
yarn start # prod mode and ESM format
```

Open the site at [http://localhost:3000](http://localhost:3000)

To start the project in a different mode:

-   dev: `yarn dev`
-   compat: `yarn start:compat`
-   prod-compat: `yarn start:prod-compat`
