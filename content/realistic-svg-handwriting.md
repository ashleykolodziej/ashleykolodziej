+++
date = "2016-02-13T19:34:59-05:00"
title = "Realistic SVG Handwriting"
categories = "development"
shortdesc = "That SVG stroke isn't fooling anyone."

+++

<p class="center"><a href="http://www.bu.edu/bostonia/winter-spring16/marcia-deihl-cambridge/" class="live-link">Live article</a></p>

Fact: SVG letters will never look like real handwriting.

I knew I wanted a handwriting effect, and I knew you could animate SVGs. Some quick Googling led me to the most common technique - animate the stroke dash.

Here's the idea: if you can find the length of a line, and make a dash so large it takes up the entire length of the line, you can animate the length of that dash so it looks like it's being drawn in. Neat!

<!--more-->

The trouble with this is you get very neat lines, and handwriting isn't neat... especially handwriting from a diary. There's texture, ink bleed, and variation in width and saturation of the ink depending on how quickly you write. No SVG stroke will ever have all these things. And without these things, you get very dead, very not-handwritten looking type. Trust me, I tried. After about a half hour of tracing in Illustrator (and an undisclosed number of horrifying flashbacks to my design school days) with upsettingly bad results, I realized this was not going to work.

### Same stroke-dasharray, different angle

I really needed to be using the original source handwriting, and I needed it to look real. Not traced. I looked at my image, which nearly had a flat color background if you weren't looking too closely.

You know what else has a flat color? My SVG stroke! What if instead of animating in... I animated *out*? A quick Codepen trial with a similar image, and I realized I was on to something.

<iframe height='265' scrolling='no' title='SVG handwriting image reveal' src='//codepen.io/ashleykolodziej/embed/XXRmWv/?height=265&theme-id=0&default-tab=html,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='http://codepen.io/ashleykolodziej/pen/XXRmWv/'>SVG handwriting image reveal</a> by Ashley Kolodziej (<a href='http://codepen.io/ashleykolodziej'>@ashleykolodziej</a>) on <a href='http://codepen.io'>CodePen</a>.
</iframe>

All I needed to do was get the color close enough to the background of my image for the SVG to blend in and act as a mask. As the SVG stroke animates out, it reveals the letters in the image hidden behind it. As an added bonus, I didn't have to make the mask look good in Illustrator. All it had to do was cover the letters sufficiently. Quicker *and* better results. I couldn't have asked for more.

### Making peace with layer order and animation order

Now, if you're paying attention to that Codepen, you might have noticed that final t in Ballpoint doesn't look so hot, since the mask for the final cross on that t sits over the main line. Obviously that's not how writing works. What I ended up doing was determining - if you were writing - which areas you would "go over" twice, and creating a separate png layer for those areas. Anywhere there is a ligature, crossbar, or anything of that nature, I've carefully layered the PNG parts for that letter and the stroke that goes with it so that this doesn't happen. On the smallest bits of handwriting, it's not noticeable, but it was crucial for the header area.

What I realized when that happened was that the way I needed things layered in Illustrator for this to work correctly was not the same way I wanted them animated. Take, for example, an A. You can break that into two parts: something like an upside down V, and a crossbar. I need that V over the crossbar. If you know the DOM, you know that means that the SVG is going to put the crossbar first in code, and the V after, so that it is naturally on top. And if you go looking for lines in the SVG and putting them in an array to be animated, it's going to say animate the crossbar first and the upside down V second, which is not how we write.

The simple solution to this is just to reverse the array so the order of animation is correct, but it was sort of neat, and something I wasn't expecting to run into. Now I know, right?

### Keeping it realistic

What's the difference between a name and a scribble to my code? The speed at which you animate each stroke. It was pretty easy to turn this approach from my header into a small function. Loop through the SVG, find all the lines, animate them using the timing I like for that particular item. This made it very easy to create all the animations that followed. Everything from the scribbles, to the margin writing, to the diary after was as simple as quickly masking the letters in Illustrator and giving them a class of "animate".

I used Waypoints to call that function once the item scrolls just into view. Since some of the animations take some time, it was better to start it earlier than later.