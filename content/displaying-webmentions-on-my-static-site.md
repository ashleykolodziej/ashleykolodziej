---
title: Displaying webmentions on my static site
date: 2022-06-25T23:35:23.408Z
draft: true
shortdesc: This is a draft!
categories:
  - development
---

- Log into https://webmention.io/

Use fetch to display. I added this to my Hugo theme:

```javascript
fetch("https://webmention.io/api/count?target=https://example.com/page/100")
    .then(response => response.json())
    .then(responseJson => console.log(responseJson));
```

My list looked like:

```json
{
  "count": 6,
  "type": {
    "bookmark": 1,
    "mention": 2,
    "rsvp-maybe": 1,
    "rsvp-no": 1,
    "rsvp-yes": 1
  }
}
```