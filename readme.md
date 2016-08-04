#nunjucks-prepend
A `prepend()` filter for nunjucks, the rich and powerful JS template system from Mozilla.

### What's it do?
It builds out URL paths. So for instance, you want to type the location of something in your template, then prefix it with you assets directory and your domain:

```html
<link rel="stylesheet" href="{{ "css/myPage.css" | prepend(site.assetsFolder, site.domain) }}">
```

You can pass it any number of arguments to prepend to the URL. The first passed argument will show up closest to the value you are filtering.

### How do I install it?
Attach it to your nunjucks environment using `addFilter`.



```javascript
const nunjucks = require('nunjucks'),
    njPrepend = require('nunjucks-prepend');

var env = new nunjucks.Environment();
env.addFilter('prepend', njPrepend);
```

*Note: ES6 only.*