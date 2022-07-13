module.exports = {
  plugins:     [
    require('autoprefixer'),
    require('postcss-import'),
    require('postcss-sassy-mixins'),
    require('postcss-simple-vars'),
    require('postcss-extend'),
    require('@tailwindcss/nesting'),
    require('postcss-nesting'),
    require('postcss-nested'),
    require('tailwindcss')
  ]
}