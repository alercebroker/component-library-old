# component-library

# Component library with nuxt

## To use with nuxt

#### 1. In library

Make sure you have components property enabled in `nuxt.config.js`
Create a nuxt.js file with the following contents

```js
import { join } from 'path'

export default function () {
  const { nuxt } = this

  // Make sure components is enabled
  if (!nuxt.options.components) {
    throw new Error(
      'please set `components: true` inside `nuxt.config` and ensure using `nuxt >= 2.13.0`'
    )
  }

  this.nuxt.hook('components:dirs', (dirs) => {
    // Add ./components dir to the list
    dirs.push({
      path: join(__dirname, './components'),
      prefix: 'alerce',
    })
  })
}
```

If using Nuxt Property Decorators add this to `nuxt.config.js`
```js
build: {
    babel: {
      presets({ isServer }) {
        return [['@nuxt/babel-preset-app', { loose: true }]]
      },
    },
  }
```

And if using ESLint add this to `eslintrc.js`
```js
parserOptions: {
    ecmaFeatures: { legacyDecorators: true },
}
```
#### 2. In App

##### Nuxt
Add your library to buildModules in `nuxt.config.js`
```js
buildModules: [
	...
	'your-component-library/nuxt'
]
```

Now you can use it in your components
```vue
~/layouts/default.vue

<template>
	<v-app>
		<alerce-a-header />
		<nuxt/>
		<alerce-a-footer />
	</v-app>
</template>

<script>
export default {}
</script>
```
And that's it. No need to import any component, just use them directly with the specified prefix.

**Important Note**
When testing the library locally with `npm link` then external libraries used in your component library like Vuetify won't load in your app. To be able to use your library locally, then add this to build property in `nuxt.config.js`
```js
extend(config) {
      if (process.env.NODE_ENV !== 'production') {
        config.resolve.modules.unshift(
          path.resolve(__dirname, './node_modules')
        )
      }
    },
```
##### Vue

```vue
~/src/App.vue

<template>
	<v-app>
		<alerce-a-header />
		<router-view />
		<alerce-a-footer />
	</v-app>
</template>

<script>
import AHeader from 'alerce-vue/components/misc/AHeader.vue'
import AFooter from 'alerce-vue/components/misc/AFooter.vue'
export default {
	components: {
		AHeader,
		AFooter
	}
}
</script>
```

**Important Note**
When testing the library locally with `npm link` then external libraries used in your component library like Vuetify won't load in your app. To be able to use your library locally, then add this to module exports in `vue.config.js`
```js
const path = require('path');

module.exports = {
  chainWebpack: config => {
    if (process.env.NODE_ENV !== "production") {
      config.resolve.modules.prepend(path.resolve(__dirname, "./node_modules"));
    }
  }
}
```

## Using Vue-Styleguidist in the library
TO-DO

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
