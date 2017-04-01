+++
date = "2016-02-13T20:11:28-05:00"
title = "Faking Watercolor Bleed Using a Simple PNG"
categories = "development"
shortdesc = "Canvas? Who has time for that?"

+++

<p class="center"><a href="http://www.bu.edu/bostonia/winter-spring16/marcia-deihl-cambridge/" class="live-link">Live article</a></p>

I have a confession to make. That watercolor bleed effect on Marcia Deihl? Nothing more than a simple PNG.

I just didn't have the time to learn `<canvas>` this time around.

<!--more-->

After I finished animating in the journal entries for The Good Life of Marcia Deihl, I found the article just needed a little something else. I wished I had a nice watercolor bleed effect to go with the watercolor background of the journals. Something to bring each item in and tie the whole article together, you know?

I saw a few ideas out there using `<canvas>`, but I needed something quick and reliable. I took a close look at what the real effects did, thought about it, and realized what makes a watercolor bleed look like a watercolor bleed is two things: a fade in, and the bleed stopping at irregular points with a brushlike texture.

Enter the PNG: master of brushy textures.

I ended up going with animating in a PNG mask using the same watercolor brush as the edges of each watercolor photo, but in slightly different places. I gave it the same background color as my main article, but with an alpha value of something like .75 so you could see a bit of the image behind it. When you scroll any image into view, the mask scales  and out until it no longer covers the image, and animates that alpha value down to 0. That combination of fading in and the mask "stopping" uncovering the watercolor paper beneath it at different times did the trick for giving the impression of watercolor bleeding in.

Voila! Watercolor bleed. You could theoretically even acheive this with plain ol' CSS and HTML, if you didn't mind the effect happening on load.