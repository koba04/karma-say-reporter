var test        = require('tape'),
    SayReporter = require('../index')['reporter:say'][1]
;


test('setting configration', function(t) {
  t.plan(2);

  var sayReporter = new SayReporter({
    success:  "happy",
    fail:     "sad",
    voice:    "Fred"
  });

  t.deepEqual(sayReporter.config, {
    success:  "happy",
    fail:     "sad",
    voice:    "Fred"
  });

  sayReporter = new SayReporter();

  t.deepEqual(sayReporter.config, {
    success:  "success",
    fail:     "failed"
  });
});

test('buildArgs', function(t) {

  t.plan(4);

  var sayReporter = new SayReporter();

  t.deepEqual(sayReporter.buildArgs({}), [sayReporter.config.success]);
  t.deepEqual(sayReporter.buildArgs({failed: 1}), [sayReporter.config.fail]);
  t.deepEqual(sayReporter.buildArgs({error: true}), [sayReporter.config.fail]);

  sayReporter.config.voice = "Bob";
  t.deepEqual(sayReporter.buildArgs({}), ['-v', 'Bob', sayReporter.config.success]);

});
