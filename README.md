# json-to-fixture

## About

Use this library to load a directory of JSON files into an easy to use fixture object that you can reference in your code.

It's quite useful for generating test data.

## Usage

Create a directory in your filesystem and fill it with *.json files, then call `makeFixture()` and pass it the path to your directory. `makeFixture()` will return an a Promise that resolves to an object with keys corresponding to the filenames in your fixture directory, and values initialized with the JSON contents of your json files.

Given the file structure:
```
+-- tests
  `-- fixtures
    `-- federationInfo.json (JSON object)
    `-- peopleList.json (JSON array)
```
```js
import makeFixture from 'json-to-fixture';

const fixtureDirectoryPath = './tests/fixtures/';
makeFixture(fixtureDirectoryPath)
  .then(fx => {
    console.log('fx: %o', fx);
    // outputs:
    // {
    //   federationInfo: {...},
    //   peopleList: [...]
    // }
  });
```
