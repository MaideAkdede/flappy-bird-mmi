let mix = require('laravel-mix')

mix.js('src/js/main.js', 'dist/js/')
    .sass('src/scss/main.scss', 'dist/css/')
    .copyDirectory('src/resources', 'dist/resources');