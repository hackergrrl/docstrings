var ds = require('../index')
var test = require('tape')

test(function (t) {
  function foo () {
    "returns foo"
    return 'foo'
  }

  function bar(){'returns bar';return'bar'};

  function baz () {
    `multiline comments
    need love
    too`
     return 123
  }

  function quux ()
  {
    "Returns \
     quux"
  }

  function none() {}

  t.equal(ds(foo), 'returns foo')
  t.equal(ds(bar), 'returns bar')
  t.equal(ds(baz), 'multiline comments\nneed love\ntoo')
  t.equal(ds(quux), 'Returns quux')
  t.equal(ds(none), '')
  t.end()
})
