const test = require('tape')
const clone = require('./clone.js')

test('numbers', function(t) {
  t.equal(clone(1), 1)
  t.equal(clone(1.1), 1.1)
  t.equal(clone(-Math.E), -Math.E)
  t.equal(clone(0), 0)
  t.equal(clone(-0), -0)
  t.equal(clone(Infinity), Infinity)
  t.equal(clone(-Infinity), -Infinity)

  t.end()
})

test('stupid numbers', function(t) {
  t.equal(clone(new Number(10)).valueOf(), 10)

  t.end()
})

test('null and undefined', function(t) {
  t.equal(clone(null), null)
  t.equal(clone(undefined), undefined)
  
  t.end()
})

test('booleans', function(t) {
  t.equal(clone(true), true)
  t.equal(clone(false), false)

  t.end()
})

test('strings', function(t) {
  t.equal(clone(''), '')
  t.equal(clone('hi'), 'hi')

  t.end()
})

test('stupid strings', function(t) {
  t.equal(clone(new String('hi')).valueOf(), 'hi')

  t.end()
})

test('regular expressions', function(t) {
  t.looseEqual(clone(/abc/), /abc/)
  t.looseEqual(clone(/^[ab]c?/gui), /^[ab]c?/gui)

  t.end()
})

test('dates', function(t) {
  var now = new Date()

  t.looseEqual(clone(now), now)

  now.setDate(now.getDate() + 10)

  t.looseEqual(clone(now), now)

  t.end()
})

test('flat objects', function(t) {
  var toClone = {
    a: 1,
    b: '2',
    c: /abc/ig,
    d: new Date()
  }

  t.looseEqual(clone(toClone), toClone)

  t.end()
})

test('flat arrays', function(t) {
  var toClone = [
    1,
    '2',
    /abc/ig,
    new Date()
  ]

  t.looseEqual(clone(toClone), toClone)

  t.end()
})

test('nested objects', function(t) {
  var toClone = {
    a: {
      b: {
        c: 3,
        d: 4
      }
    },
    e: 5,
    f: {
      g: 7
    },
    h: [
      {
        i: 9
      },
      {
        j: [10]
      }
    ]
  }

  t.deepLooseEqual(clone(toClone), toClone)

  t.end()
})

test('circular references', function(t) {
  var original = {
    a: 1
  }
  var copy

  original.b = {
    c: 3,
    d: original
  }

  original.b.e = original.b

  copy = clone(original)

  t.equal(original.a, copy.a)
  t.equal(original, original.b.d)
  t.equal(original.b, original.b.e)
  t.equal(copy, copy.b.d)
  t.equal(copy.b, copy.b.e)

  t.end()
})