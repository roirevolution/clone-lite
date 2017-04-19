module.exports = function clone(thing, thingValues, cloneValues) {
  if (typeof thing != 'object' || thing == null) {
    return thing;
  }

  var constructor = thing.constructor

  if (~[Date, Number, String, RegExp].indexOf(constructor)) {
    return new constructor(thing);
  }

  var copy = new constructor();
  var property;
  var value;

  (thingValues = thingValues || []).push(thing);
  (cloneValues = cloneValues || []).push(copy);

  for (property in thing) {
    if (thing.hasOwnProperty(property)) {
      copy[property] =
        cloneValues[thingValues.indexOf(thing[property])] ||
        clone(thing[property], thingValues, cloneValues);
    }
  }

  return copy;
}
