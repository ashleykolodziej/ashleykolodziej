+++
date = "2022-06-19"
title = "How I added webmentions support to my static website"
categories = "development"
shortdesc = "This post is in progress as I test webmentions!"

+++

## Step one: Choose a tech stack

Things get easier if you use WordPress or a CMS. I use Hugo to generate a static site, and didn't want to redesign my entire website to try out Webmentions, so I decided to go with https://webmention.io/ for handling the mentions.

## Step two: Add IndieAuth

Logging into Webmention.io is super easy - just use your URL! - _if_ you have IndieLogin set up. Fortunately, it's super easy to [set up your site to work with IndieLogin](https://indielogin.com/setup). Just add `rel="me"` to your social media links, and you'll be able to authenticate with your existing social media services.

## Step three: Connect Webmention.io to your site

When you log in, you'll find a settings page with some code somewhat like this, but specific to your username:

```
<link rel="webmention" href="https://webmention.io/username/webmention" />
<link rel="pingback" href="https://webmention.io/username/xmlrpc" />
```

I added that code into the head tag of my website.

## Step four: Test that your Webmention shows elsewhere

The next easiest thing you can do is test that your new webmentions functionality shows up for someone else. I used [Webmention Rocks](https://webmention.rocks/) to do this. Each of the links on their homepage tests a different type of HTML that could be used to create a Webmention. I'm going to use Test 6, the [a tag discovery test](https://webmention.rocks/test/6), to find out if this post correctly sends a Webmention through Webmention.io. If I did it correctly, now that I've linked to it here, I should see a new comment on the test post referencing this page.

### How long will it take to show?

I'm unsure. Let's see - it'll be about 10:45am when I publish.
