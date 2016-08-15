var ds = require('../index')
var test = require('tape')

test('basics', function (t) {
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

  function withWhitespace () {

    "description"

    return 0
  }

  function none() {}

  t.equal(ds(foo), 'returns foo')
  t.equal(ds(bar), 'returns bar')
  t.equal(ds(baz), 'multiline comments\nneed love\ntoo')
  t.equal(ds(quux), 'Returns quux')
  t.equal(ds(withWhitespace), 'description')
  t.equal(ds(none), '')
  t.end()
})

test('use strict', function (t) {
  function strictAdd2 (x, y) {
    'use strict'
    'Adds two numbers together and returns their sum.'

    return x + y
  }

  t.equal(ds(strictAdd2), 'Adds two numbers together and returns their sum.')
  t.end()
})
