var spawn = require('child_process').spawn,
    _ = require('lodash');

var SayReporter = function(config) {
  this.config = config || {};
  _.defaults(this.config, { success: "success", fail: "failed" });
};

// create argments for say command
SayReporter.prototype.buildArgs = function (result) {
  var message = (!result.failed && !result.error) ? this.config.success : this.config.fail;
  var args = this.config.voice ? ['-v', this.config.voice] : [];
  args.push(message);
  return args;
};

SayReporter.prototype.say = function(args) {
  var say = spawn('say', args);
  say.on('error', function(err) {
    console.log("[ERROR]" + err.errno);
  });
}

SayReporter.prototype.onBrowserComplete = function(browser) {
  // browser: {
  //   lastResult: {
  //     success: 24,
  //     failed: 0,
  //     skipped: 0,
  //     total: 24,
  //     totalTime: 616,
  //     netTime: 14,
  //     error: false,
  //     disconnected: false,
  //     totalTimeEnd: [Function]
  //   },
  // }
  this.say(this.buildArgs(browser.lastResult));
};

SayReporter.$inject = ['config.sayReporter'];

module.exports = {
  'reporter:say': ['type', SayReporter]
}
