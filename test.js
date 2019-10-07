var localeRu = require('../a7-test/node_modules/@angular/common/locales/ru').default;
var localeEn = require('../a7-test/node_modules/@angular/common/locales/en').default;
var test = require('.');

console.log(test.getItem(localeRu, 'numbers', 'percentsign'));

test(localeRu, {
    numbers: {
      decimal: '.', // was ','
      group: '',    // was ' '
      nan: '-'      // was 'не число' (not a number), but I not sure, that it uses anywhere
    }
  });
  
var items = [
    'decimal',
    'group',
    'list',
    'percentSign',
    'plusSign',
    'minusSign',
    'exponential',
    'superscriptingExponent',
    'perMille',
    'infinity',
    'nan',
    'timeSeparator'
]
console.log(localeRu[13], localeEn[13]);