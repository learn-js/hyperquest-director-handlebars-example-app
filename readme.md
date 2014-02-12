# Example app using hyperquest, director, handlebars and other modules from npm

This is the source code for a post on [learnjs.io](http://learnjs.io/blog/2014/02/11/hyperquest-director-handlebars-example-app/). This post is part of the **[npm recipes](http://learnjs.io/npm-recipes)** series. We're compiling the posts into a book.

Sign up for the Learn.js newsletter and you'll get the npm recipes book (and updates about new recipes) for free: [http://eepurl.com/JKhAP](http://eepurl.com/JKhAP)

### The app uses these modules:
- [hyperquest](https://www.npmjs.org/package/hyperquest) - for requesting data from the API
- [director](https://www.npmjs.org/package/director) - for routing requests to the server
- [handlebars](https://npmjs.org/package/handlebars) - for the HTML templates served to the browser
- [handlebars-layouts](https://npmjs.org/package/handlebars-layouts) - so we can have jade/django style layouts using handlebars
- [st](https://www.npmjs.org/package/st) - for serving static files
- [event-stream](https://www.npmjs.org/package/event-stream) - for working with the data stream we get back from hyperquest
- [combine-streams](https://www.npmjs.org/package/combine-streams) - for combining multiple streams into one
- [rework-npm-cli](https://www.npmjs.org/package/rework-npm-cli) - for bundling css files
- [myth](https://www.npmjs.org/package/myth) - a preprocessor for our css
- [normalize-css](https://github.com/sethvincent/normalize-css) - reset the css for the browser
- [skelestyle-typography](https://www.npmjs.org/package/skelestyle-typography) - a base set of typography css styles
- [nodemon](https://www.npmjs.org/package/nodemon) - for running a development server
