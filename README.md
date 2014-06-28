# karma-say-reporter

A Karma reporter plugin. Reports overall results by OSX "say" command.

## Installation

```
npm install --save-dev karma-say-reporter
```

## Config

Add in karma.conf.js.

All options is optional.

```js
// karma.conf.js
module.exports = function(config) {
  config.set({
    reporters: ['progress', 'say'],

    sayReporter: {
      success: "test all successs",
      fail: "test failed",
      voice: "Agnes"
    }
  });
};
```

### success

Message when it success.

default: `success`


### fail

Message when it failed.

default: `failed`


### voice

Passed to "say" command as "-v" option
