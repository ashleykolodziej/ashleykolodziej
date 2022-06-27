---
title: Seven HTML debugging tips for complete beginners
date: 2021-05-15T17:15:01.827Z
draft: false
shortdesc: Everyone starts somewhere.
categories:
  - development
---
I teach introductory web development classes to students who don't have any programming experience whatsoever, and one of the questions I always get is - how do I debug my code when I don't even really know how to write it just yet? 

Debugging can be overwhelming if you're new to coding or a particular language. Luckily, you don't need to know a language by heart to debug your code. Debugging is just a method of thinking and checking things step by step, one at a time, until you've discovered what's happening. Anyone can do it with the right checklist!

So with that in mind, here are my tips for debugging in HTML, including a practice problem and video explanation at the end.

## Tip 1: Talk through what you expected

When you're stuck, one of the best things you can do is to try talking through what you expected to see, step by step. Talking through what you expected is a great way to start identifying some of the places something might have gone wrong in your code. You can also try writing down some key words while you talk so you don't forget them, such as what elements aren't working like you thought they would. This will help you down the road if you need to Google it.

## Tip 2: Make sure your code is properly indented

Once you've identified the problem and talked through what you expected to see, the next thing that you can do to help get unstuck is to make sure all your code is properly indented. This is a great step to take because it will force you to go line by line and make sure everything makes sense to you, and it will naturally get you to work on the next tip, which is...

## Tip 3: Make sure all tags are closed

There's nothing like a missing close tag in HTML to throw you off! When styles are applying to more of the page than you think they should, or your layout is acting especially wonky with no clear reason in the CSS, a missing close tag is almost always the culprit. The best time to check this is while you are fixing your indentation.

## Tip 4: Check for syntax errors

HTML is pretty permissive when it comes to syntax, but you can still run into trouble if you don't have quotes around your attribute values, or you forget an equals sign, or even miss a closing `>` on a tag. These types of errors are called **syntax errors** - errors that stop your code from running correctly (or in some cases, from working altogether!). The w3c has a [simple explanation of HTML syntax](https://www.w3.org/community/webed/wiki/HTML/Training/Tag_syntax) that can help you double check for these types of errors.

## Tip 5: Use an HTML validator

Tips 1 through 4 will get the majority of HTML problems solved if you have sharp eyes. But what if you miss something, or you've written a tag that is syntactically correct, but doesn't actually exist in HTML? This is where a validator can really help you out. Validators automatically check for things like missing close tags, syntax errors, and even tags that don't exist.

So why not just jump straight to a validator? You can, but you might find some of the errors a little daunting at first. Going through these other preliminary steps can help get you in the right mindset to read and understand error messages in a validator.

[The w3c's validator service](https://validator.w3.org/) is a great tool for this that you'll want to bookmark.

## Tip 6: If the error looks weird and unfamiliar, double check your approach

If an error comes up in the validator that just plain does not make sense to you, it might be a good time to start doing some Googling and double checking your approach. Do you understand what the code is doing? Can you explain it line by line? You may have inadvertently used the wrong kind of tag. It's surprisingly easy to do!

Alternately, you may find there are no syntax errors, in which case, it's time for...

## Tip 7: Use rubber ducky debugging

If worse comes to worse and you just don't know what's going on, try explaining the problem to your nearest inanimate object - or friend. Even if they don't know how to write HTML, if you can explain your problem to someone who knows nothing about what you're doing, it might help you discover a **logical error** - or an error in the way that your code is built that isn't necessarily wrong or broken, but also doesn't solve the problem you intended to solve in the first place. If you've ever heard the term ["rubber ducky debugging"](https://en.wikipedia.org/wiki/Rubber_duck_debugging), this is what that is!

## Code along and practice debugging

The best way to learn debugging is to practice and see how others debug. If you want to try some of these steps out, check out my video, [7 Beginner-Friendly Tips for HTML Debugging on YouTube](https://youtu.be/1Q-eYG1tCG8). I've included a CodePen practice problem in the description, and I recorded myself explaining these tips step by step as I solve the problem. Try debugging your way first, and then compare it with how I did it, and see how far you can get in solving it.

Happy coding!

{{< youtube 1Q-eYG1tCG8 >}}