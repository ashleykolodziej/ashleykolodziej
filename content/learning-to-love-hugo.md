+++
date = "2016-02-15T11:21:48-05:00"
title = "First Impressions: Hugo"
categories = "development"
shortdesc = "Jumping on that static CMS train like CHOO CHOO"

+++

I've been writing in Markdown for a few months now, and it's been amazing. I mean, anything that enables my Sublime Text habit is going to make me pretty happy, but I know me, and at heart I'm a designer. If you give me the ability to design, I will design. Markdown prevents me from doing that so I actually write.

So when I finally decided to tackle the long overdue task of redoing my portfolio, a static site generator seemed like the natural choice. Because let's be honest - I haven't logged into my Wordpress backend in months.

<!--more-->

## Why static?

I'll be the first to admit that static site generators sounded like some flaky fad when I heard about them a year or two ago. Why do I need that? I have Wordpress! This sounds like a lot of work. The list of complaints goes on.

For me, the ability to write in Markdown in my code editor is the big selling point. Markdown was easy for me to pick up and there was no going back once I got the hang of it. But as I thought more, I realized there were some other really nice benefits too:

- In the end, all I'm uploading is HTML, CSS, and Javascript, which means I don't have to worry about Wordpress security for my site.
- I can work on my site offline. You can do this with Wordpress as well, but it's a bit messier to set up.
- I can easily version control my entire site, including content.

To static it was.

## Attempt 1: Jekyll

I actually gave static site generators a try a few months ago. A coworker of mine was waxing romantic on Jekyll, so that was the first place I stopped. I didn't stick with it. Part of this was likely that I wasn't writing in Markdown regularly yet, but I had a tough time with a lot of other stuff:

- Getting set up was difficult. I'm not sure if I was looking at the wrong documentation or what, but it took me a solid hour or two just to get things working.
- Installing a theme was painful, and then I still had to try and figure out how to edit it. As "skeleton" as the theme was, it still had styling that was in my way.
- It felt worse than trying to work in Wordpress. Significantly worse.

I can really stick it out when I'm trying to figure out a code or design problem, but when it comes to tools and UI, I have a very low tolerance for things not going smoothly. Jekyll just wasn't right for me, and I set the issue aside for a while to deal with the holiday season.

## Next: Hugo

As I write this, I'm actually working in Hugo - I only started work on the new site last night - and love it. Some quick notes on what's working really well for me:

- Very quick and easy setup. Completely painless and I had a site up in less than five minutes.
- No assumptions made about how you want to structure your content. I was able to get my dream content structure together in about a night.
- No assumptions made about styling your content - there is even a built in function to create a new skeleton theme, and true to form it only creates the basic directories. You're responsible for creating markup and outputting content.
- Easy livereload and watch support (I'm aware Jekyll has this too, but I was never able to get that far)
- Templating for content! The `render` function makes it super easy to define a template for a small bit of content you might use in multiple places around the site. I use it to share markup for listing my related posts across different templates.

The only real issue I've run into is getting a reference of functions I have access to in Hugo all in one place. Everything is by example, which means I've had a smooth process getting things going quickly, but I'm ready to do some more creative work and wish I had a reference to see all of what I have available to me.

So far though? Hugo gets an A+ for me. I'm excited to dive in and learn more.