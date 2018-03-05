# React Wordcloud
Powerful React + D3 word cloud component with rich features. Based on the
original word cloud generator: https://www.jasondavies.com/wordcloud/.

![Example cloud of Twitter search results for “amazing”](http://www.jasondavies.com/wordcloud/amazing.png)

## Install
Add to `package.json` with `yarn` or `npm`.

```bash
yarn add https://github.com/chrisrzhou/react-wordcloud.git
```

## Usage

This is a simple example using minimal props.
```js
import * as React from 'react';

import ReactWordCloud from 'react-wordcloud';

const words = [
  {word: 'hello', value: 3},
  {word: 'world', value: 1},
  {word: 'github', value: 1},
  {word: 'code', value: 1},
];

const WORD_COUNT_KEY = 'value';
const WORD_KEY = 'word';

const MyWordCloud = () => {
  return (
    <div style={{width: 600, height: 400}}>
      <ReactWordCloud
	words={words}
	wordCountKey={WORD_COUNT_KEY}
	wordKey={WORD_KEY}
      />
    </div>
  );
};

export default MyWordCloud;
```

## Word Cloud Generator Example
Check out the code in this [word cloud generator](https://github.com/chrisrzhou/wordcloud-generator)
to see how to use `react-wordcloud` in production.

This generator allows you to tweak many properties of the word cloud component.

It also demonstrates how we can parse string into words, and bind click actions
on the words to highlight their occurrences in the original text.

