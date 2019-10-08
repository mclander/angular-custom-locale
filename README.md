# angular-custom-locale
Helps to customization Angular 5.x-8.x locale

# Usage
Imagine, that we need to change view of numbers, in whole project. And this project already use some locale.
So let is magic begin.

```typescript
// app.module.component.ts

// Boilerplate
import customizeLocale from 'angular-custom-locale';
import { registerLocaleData } from '@angular/common';

// Imports russian locale: where numbers outputs like 1234.56 => 1 234,56 
import localeRu from '@angular/common/locales/ru';

// Some hacks (i.e. magic)
customizeLocale(localeRu, {
  numbers: {
    decimal: '.', // was ','
    group: '',    // was ' '
    nan: '-'      // was 'не число' (not a number), but I not sure, that it uses anywhere
  }
});

// And now numbers output will be like 1234.56 => 1234.56. Just a magic for no magic)
registerLocaleData(localeRu);
```

# Parameter
This is Objech where first leval of keys mean group name of changing 
items, 2nd level - meant items names. All not case sensitive.

Now supported nly one section 'number'. If you need more drop me a line mclander@list.ru.

List of items:

    * **decimal** - decimal separator
    * **group** - digits group separator
    * **list** - list separator
    * **percentSign** - % (percent sign)
    * **plusSign** - + (plus sign)
    * **minusSign** - - (minus sign)
    * **exponential** - exponential
    * **superscriptingExponent** - superscripting exponent
    * **perMille** - ‰ (per-mille)
    * **infinity** - ∞ (infinity sign)
    * **nan** - not a number string
    * **timeSeparator** - time separator>

# Is it legal? Or (at least) good practice?
I hope so. Angular trought 5 to 8 versions has no changes... in format of locales files.
Of course, I can't guarantee it will not changed in Angular 9 (or even 8.xx).
I just can promise to add some hack in this module if it will fired.


# Naming
Angular imports data for locales from [CLDR](http://cldr.unicode.org). So I just use 
names from xml (e.g. [here](https://github.com/unicode-org/cldr/blob/release-36/common/main/ru.xml))

```xml
...
<numbers>
   ...
  <symbols numberSystem="latn">
    <decimal>,</decimal>
    <group> </group>
    <list draft="contributed">;</list>
    <percentSign>%</percentSign>
    <plusSign draft="contributed">+</plusSign>
    <minusSign draft="contributed">-</minusSign>
    <exponential>E</exponential>
    <superscriptingExponent>×</superscriptingExponent>
    <perMille>‰</perMille>
    <infinity>∞</infinity>
    <nan>не число</nan>
    <timeSeparator draft="contributed">:</timeSeparator>
  </symbols>
...
```

# Plans

* Add more sections (on demand)
* Fixes this README (ough, my English)
* Write descriptions for "internal" but exported functions setItem & getItem
* Add warnings (or restictions for Angular 9+)

Just write me if I'll can help you,.. or you can help me. mclander@list.ru.