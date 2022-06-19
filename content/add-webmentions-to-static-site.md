+++
date = "2022-06-19"
title = "How I added webmentions support to my static website"
categories = "development"
shortdesc = "This post is in progress as I test webmentions!"

+++

## Step one: Choose a tech stack

Things get easier if you use WordPress or a CMS. I use Hugo to generate a static site, and didn't want to redesign my entire website to try out Webmentions, so I decided to go with https://webmention.io/ for handling the mentions.

Here's my personal stack for this website:

- Hugo
- Webmention.io
- IndieLogin
- RSS
- GitHub Pages
- GitHub Actions

## Step two: Add IndieLogin

Logging into Webmention.io is super easy - just use your URL! - _if_ you have IndieLogin set up. Fortunately, it's super easy to [set up your site to work with IndieLogin](https://indielogin.com/setup). Just add `rel="me"` to your social media links, and you'll be able to authenticate with your existing social media services.

## Step three: Connect Webmention.io to your site

When you log in, you'll find a settings page with some code somewhat like this, but specific to your username:

```html
<link rel="webmention" href="https://webmention.io/username/webmention" />
<link rel="pingback" href="https://webmention.io/username/xmlrpc" />
```

I added my personalized version of that code into the head tag of my website.

## Step four: Test that a Webmention elsewhere shows for you

(tbd)

## Step five: Add an h-card

An h-card lets the web know (programmatically) who you are as a person. This standardized markup is what allows other websites using Webmentions to show your name and avatar next to mentions or comments. I used [MDN's excellent h-card example](https://developer.mozilla.org/en-US/docs/Web/HTML/microformats#h-card) as a starting point for a card to add my own to the bottom of all my posts. It's pretty simple to build and modify&mdash;just add any [h-card supported property](https://microformats.org/wiki/h-card) as a class to your HTML, and other IndieWeb users will get a nicely structured JSON object about you and who you are when you send a Webmention.

I chose to leave out the physical address and keep my email discoverable, and add a `rel="author"` attribute since I use this website to write articles. I also followed [Aaron Parecki's lead regarding bios](https://aaronparecki.com/2012/08/17/2/) by using the `p-note` class to wrap around my entire bio.

I was also curious if the parser would pick up any data that is generally structured with these types of classes, so I added a `p-pronouns` class to see if it would.

```html
<aside class="h-card">
	<h2>About the author</h2>
	<img class="u-photo" src="https://ashleykolodziej.com/img/profile.jpg" alt="A white woman with with glasses and long, curled blonde hair at a park, wearing a colorful dress and smiling." />
	<p class="p-note">
		<a rel="author" class="p-name u-url" href="https://ashleykolodziej.com">Ashley Kolodziej</a> (<span class="p-pronouns">she/her/hers</span>) is an <span class="p-job-title">Associate Creative Director</span> in <a href="https://www.bu.edu/interactive-design/" class="p-org">Boston University's Interactive Design department</a>. She is currently working on her Master's degree in User-Centered Design at Brandeis University and teaches classes in design and web development. You can reach her at <a class="u-email" href="mailto:ashley@lastletterdesign.com">ashley@lastletterdesign.com</a>.
	</p>
</aside>

```

## Step six: Add RSS support

You'll need an RSS feed for the next step. Since I'm using Hugo, I followed 

## Step seven: Test that your Webmention shows elsewhere

<!--The next easiest thing you can do is test that your new webmentions functionality shows up for someone else. I used [James Mead's awesome instructions](https://jamesmead.org/blog/2020-10-13-sending-webmentions-from-a-static-website) to do this with https://webmention.app/. -->

To test if the Webmention actually shows on test content, I used https://webmention.rocks. Each of the links on their homepage tests a different type of HTML that could be used to create a Webmention. I'm going to use Test 6, the [a tag discovery test](https://webmention.rocks/test/6), to find out if this post correctly sends a Webmention through Webmention.io. If I did it correctly, now that I've linked to it here, I should see a new comment on the test post referencing this page.

### How long will it take to show?

I'm unsure. Let's see - it'll be about 10:45am when I publish.
