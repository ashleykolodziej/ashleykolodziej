---
title: Why excellent markup is the foundation of accessible content
date: 2021-05-21T17:18:10.277Z
draft: false
shortdesc: Let's get back to basics for a minute here.
categories:
  - development
---
Happy Global Accessibility Awareness day, my friends!

One of the things I didn't learn until late in my career as a frontend developer was just how important HTML is to accessibility. When I first started learning to write code, HTML felt like a means to an end - something I just needed to get out of the way in order to be able to write CSS.

How wrong I was.

This post is for all the newbies out there who might be tempted to skip the fundamentals of HTML. Today, we're going to look at what exactly it is HTML does, and why that's so important for making your websites accessible.

## What is HTML, really?

HTML is a language of intent - the bridge between what you mean to say, and how the computer interprets it.

Okay, I realize that sounds a little weird.  But hear me out. As a markup language, HTML is all about telling a computer how your content is structured. 

{{< youtube -8yYuRSkSdo >}}

- - -

## Why should you care about how a computer understands your content?

Computers are the interface between your content and the rest of the world. This comes up in two contexts: search engine optimization, and accessibility.

Search engines and screen readers are both computer-based interfaces that help people access information they might not otherwise be able to access. They do two different jobs, and are aimed at two different use cases, but fundamentally, they are the same: computers that interpret human intent in content. This is why so many best practices for accessibility also happen to coincide with good SEO practice.

Using semantic HTML tags in your layout helps these tools understand your intent in organizing the content, and how to navigate it.

{{< youtube zM1ZBY1ieuw >}}

- - -

## Think about what it's like to navigate a new neighborhood.

Imagine if you suddenly placed in an unfamiliar neighborhood that you've never been in, and needed to find out how to get to the nearest store to buy a drink.

You might ask someone for directions.

You might think about some rules you know are usually true - the sun sets in the west. Streets are normally in a grid pattern. Usually, they intersect about once every block.

You might look for street signs, or traffic signals. These help you understand where you are.

- - -

## Why is HTML so important for accessibility?

HTML provides these types of rules and structure to make it possible to navigate content using a computer. Using a screen reader, you can ask HTML for directions - landmarks around the content. Where's the nearest `main` content? What are some of the most important pieces of information in this `article`, and where can I find them?

HTML also has some rules that are usually true. Well-formatted HTML headings are always ordered from `h1` to `h6`, without skipping levels. Skipping a level is kind of like when a road you thought was straight suddenly veers off into a bunch of confusing curves. It can make it difficult to understand where you are in the neighborhood, relative to where you started.

{{< youtube enP0e5oS9Z8 >}}

- - -

## How do I write more semantic HTML?

The simple answer is to always ask yourself if your *non-semantic* HTML elements are really the best choice for your content's meaning. Could your `div` be a `section` instead? In some cases, you need to add HTML to style something in a purely decorative way, and that tag doesn't have any new meaning. But in many cases, `section`, `aside`, and other elements are much better choices.

There are [over 100 elements in HTML](https://developer.mozilla.org/en-US/docs/Web/HTML/Element) - it's easy to get overwhelmed. The videos above will introduce you to the most common semantic HTML elements, so if you're not sure where to start, start with those.

- - -

**I'm always happy to connect!**

🐰 [@ashleykolodziej on Twitter](https://twitter.com/ashleykolodziej)
🐰 [Professor K Explains on YouTube](https://www.youtube.com/channel/UCEH9yYZu65uFf9CEB-aH7tg)