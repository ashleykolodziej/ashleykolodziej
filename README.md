Using Hugo [0.89.4](https://gohugo.io/news/0.89.4-relnotes/).

## To preview:

`hugo serve --theme=ashleykolodziej`

## To build:

`hugo --theme=ashleykolodziej`

## To compile critical CSS:

`sass --watch src/critical.scss:layouts/partials/critical.css`

Since critical CSS is inlined in the `<head>`, you'll also need to rebuild the site.

## To compile non-critical CSS:

`sass --watch src/style.scss:static/css/style.css`
