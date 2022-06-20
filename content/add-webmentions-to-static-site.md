+++
date = "2022-06-19"
title = "How I added webmentions support to my static website"
categories = "development"
shortdesc = "How do you even test this if no one knows you exist?"

+++

## Step one: Choose a tech stack

I'm told this is a lot easier if you use WordPress or a CMS. I use Hugo to generate a static site, and didn't want to redesign my entire website to try out Webmentions, so I chose a few online services that paired nicely with my setup. Tech stacks are always a negotiation between personal preference, your current knowledge, how much rework you want to do, and in my case, the path of least pain. I feel very at home with HTML, CSS, npm, and GitHub Actions, so my tech stack is based around those: 

- Hugo (for content management)
- IndieLogin (for login)
- RSS (for syndication)
- GitHub Pages (for hosting)
- GitHub Actions (for deployment)
- Webmention.io (for receiving)
- Node Webmention Test Pinger (for testing receipt)
- Webmention.app (for sending)
- Webmention.rocks (for testing sending)

If you're on a static site generator, great! Keep reading, and swap out your CMS, hosting, and deploy technologies as needed. The bones of this setup will still be helpful to you.

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

Luckily, webmention.io comes with a handy dandy form at the endpoint for you to test this with. Head on over to your personalized Webmention link from above, and you'll see a simple form to send a happy little mention on over to yourself, Bob Ross-style.

The source URL will be a page that mentions something about you, and the target URL will be the page that the Webmention should be associated with. Perhaps you already have a mention out there you're aware of. If you are me, you don't because you deleted all your social media and most people didn't know you existed in the first place, making this without question the most difficult part of the entire IndieWeb implementation process.

I digress.

In these cases, perhaps it's clearest to [just Webmention yourself](https://ashleykolodziej.com/learning-to-love-hugo/). I wanted [node-webmention-testpinger](https://github.com/voxpelli/node-webmention-testpinger) to work so badly, but I'm going to be honest, I just couldn't get that to work.

In my case, the source will be this post's URL, and the target will be `https://ashleykolodziej.com/learning-to-love-hugo/`. After you submit the form and see a "pending" message, give it a refresh. With luck, you'll see it change to "Success"!

Head back on over to your dashboard at https://webmention.io/, and you'll see a brandy-new Webmention!

## Step five: Add microformat classes to your content

First, identify the type of content, and then take a look at the [Microformats specification](https://microformats.org/wiki/Main_Page#Specifications). In my case, it's a blog post, so I chose to use the [h-entry microformat](https://microformats.org/wiki/h-entry). After taking a look at my markup, I needed to add an `h-entry` class around my entire blog post, a `p-name` class to my title, a `p-author` to show that I am (indeed) the author of the post, an `h-card` which talks a bit more about me (I'll expand on that in a moment), a `u-url` class as well as my permalink, and a `dt-published` class.

## Step six: Add an h-card

An h-card lets the web know (programmatically) who you are as a person. This standardized markup is what allows other websites using Webmentions to show your name and avatar next to mentions or comments. I used [MDN's excellent h-card example](https://developer.mozilla.org/en-US/docs/Web/HTML/microformats#h-card) as a starting point for a card to add my own to the bottom of all my posts. It's pretty simple to build and modify&mdash;just add any [h-card supported property](https://microformats.org/wiki/h-card) as a class to your HTML, and other IndieWeb users will get a nicely structured JSON object about you and who you are when you send a Webmention.

I chose to leave out the physical address and keep my email discoverable, and add a `rel="author"` attribute since I use this website to write articles. I also followed [Aaron Parecki's lead regarding bios](https://aaronparecki.com/2012/08/17/2/) by using the `p-note` class to wrap around my entire bio.

I was curious if the parser would pick up any data that is generally structured with these types of classes, so I added a `p-pronouns` class, which isn't officially supported, to see if it would.

```html
<aside class="p-author h-card">
    <h2>About the author</h2>
    <img class="u-photo" src="https://ashleykolodziej.com/img/profile.jpg" alt="A white woman with with glasses and long, curled blonde hair at a park, wearing a colorful dress and smiling." />
    <p class="p-note">
        <a rel="author" class="p-name u-url" href="https://ashleykolodziej.com">Ashley Kolodziej</a> (<span class="p-pronouns">she/her/hers</span>) is an <span class="p-job-title">Associate Creative Director</span> in <a href="https://www.bu.edu/interactive-design/" class="p-org">Boston University's Interactive Design department</a>. She is currently working on her Master's degree in User-Centered Design at Brandeis University and teaches classes in design and web development. You can reach her at <a class="u-email" href="mailto:ashley@lastletterdesign.com">ashley@lastletterdesign.com</a>.
    </p>
</aside>

```

## Step seven: Test your h-card

The [pin13 microformats parser](http://pin13.net/mf2/) lets you test either a live URL or the HTML. When I tested this blog post, I was excited to see that I was right&mdash;my pronouns were listed among the properties!

It's up to the folks who implement webmentions on their websites what they want to do with the data from here, and as always, you should check if something existing can be used in the spec to mark up your data. But I didn't see anything at a glance that seemed appropriate for pronouns, so I'm happy to leave it. It's also neat to see that the parser automatically grabbed the `src` and `alt` attributes from my photo and structured them nicely in the JSON.

```json
{

    "items": [
        {
            "type": [
                "h-card"
            ],
            "properties": {
                "note": [
                    "Ashley Kolodziej (she/her/hers) is an Associate Creative Director in Boston University's Interactive Design department. She is currently working on her Master's degree in User-Centered Design at Brandeis University and teaches classes in design and web development. You can reach her at ashley@lastletterdesign.com."
                ],
                "name": [
                    "Ashley Kolodziej"
                ],
                "pronouns": [
                    "she/her/hers"
                ],
                "job-title": [
                    "Associate Creative Director"
                ],
                "org": [
                    "Boston University's Interactive Design department"
                ],
                "photo": [
                    {
                        "value": "https://ashleykolodziej.com/img/profile.jpg",
                        "alt": "A white woman with with glasses and long, curled blonde hair at a park, wearing a colorful dress and smiling."
                    }
                ],
                "url": [
                    "https://ashleykolodziej.com"
                ],
                "email": [
                    "mailto:ashley@lastletterdesign.com"
                ]
            }
        }
    ],

}
```

## Step eight: Add RSS support, if you don't have it

You'll need an RSS feed for the next step. Since I'm using Hugo, I followed [Justin James's excellent instructions](https://digitaldrummerj.me/hugo-create-rss-feed/) to add an RSS feed template to my Hugo theme. Adding the default template will enable a feed for every content type, [like so](/index.xml), and it will also automatically enable feeds based on a category, such as [this site's design RSS feed](/categories/design/index.xml). Right now, I don't have images in the feed. I'll add images to my RSS feed later, since I don't need that to test Webmentions.

## Step nine: Set up automatic Webmentions notifications

A good next step is to test that your new Webmentions functionality shows up properly for someone else. I took inspiration from [James Mead's awesome instructions](https://jamesmead.org/blog/2020-10-13-sending-webmentions-from-a-static-website) to do this with https://webmention.app/.

In his instructions, James abstracted the sending script to [its own GitHub repo](https://github.com/floehopper/send-webmentions) and watched for changes to the RSS feed. But since I'm already [building Hugo with a GitHub Action to host on GitHub Pages](https://gohugo.io/hosting-and-deployment/hosting-on-github/#build-hugo-with-github-action), I know exactly when my RSS feed has been rebuilt, and it's at the end of my action. That's the approach I'm going to take here.

First, install the webmention.app CLI by running `npm install @remy/webmention --save-dev` in your project's folder. I used this to test Webmentions locally before adding them to the GitHub action.

Then, run `npx webmention https://your-rss-link-here.xml --limit 1 --debug` using your RSS feed URL to see if your latest post has a valid webmention without actually sending it. Once you've verified you have valid Webmentions to send out, you can add the CLI command to your GitHub Actions script.

The action itself is very simple&mdash;just add the same commands you'd run locally. Don't forget to switch out the URL if you're an avid copy/paster like I am.

```yml
- name: Install Dependencies
  run: npm install
- name: Test Webmentions
  run: npx webmention https://your-rss-link-here.xml --limit 1 --send
```

## Step ten: Test that your Webmention shows elsewhere

To test if the Webmention actually shows on test content, I used https://webmention.rocks. Each of the links on their homepage tests a different type of HTML that could be used to create a Webmention. I'm going to use Test 6, the [a tag discovery test](https://webmention.rocks/test/6), to find out if this post correctly sends a Webmention through Webmention.io. If I did it correctly, now that I've linked to it here, I should see a new comment on the test post referencing this page. This will happen immediately, so if you don't see it right away, check out your action logs or try a dry run locally.

Realistically, this took me several tries to figure out. Take a close look at your microformats, and use the [microformats parser](http://pin13.net/mf2/) to help with debugging. One thing I found out as a result of this is that it looks like Webmentions don't duplicate if you push them out multiple times using webmention.app&mdash;they just update.

## Bonus time: Add support to Hugo for inline attributes

If you want to add classes to your Markdown, you can update [Hugo's Markdown renderer, Goldmark](https://gohugo.io/getting-started/configuration-markup#goldmark), to do that. Set `block` to `true`, and then add your attributes or classes to any block you like in your Markdown. I'm considering using this to add `h-cite` and `u-in-reply-to` classes to [add context around my mentions](https://indieweb.org/in-reply-to) where it makes sense, such as where I'm extending an idea. My thinking is this is generally similar to displaying a tweet. I don't know if this is actually a good idea since this is my first time trying this out, though. If you've got any thoughts on that, let me know.

## But wait, your Webmentions aren't showing on your site!

That's absolutely right! I'm not at the point where I am actually showing the data for Webmentions on my site yet. That's because Webmentions can cover _anything_ you might do on a social media site. Liking, retweeting, bookmarking, citing, referencing, replying, commenting... the list goes on, and the data can too. Some of these deserve a slightly different user interface treatment, and I don't know what that is for me yet. I do know it deserves its own post, and from here, you can choose how your mentions show on your website. Happy mentioning!
