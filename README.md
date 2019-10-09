# angular-custom-locale
Helps to customization Angular 5.x-8.x locale

# Usage
Imagine that we need to change view of numbers, in whole project. And this project already use some locale. 
I.e. our components uses  in declaration `providers:  {provide: LOCALE_ID, useValue: 'ru'}`.
So let is magic begin.

```typescript
// app.module.component.ts

// Boilerplate
import customizeLocale from 'angular-custom-locale';
import { registerLocaleData } from '@angular/common';

// Imports russian locale: where numbers outputs like 1234.56 => 1 234,56 
import localeRu from '@angular/common/locales/ru';

// clone locale for safe use
import cloneDeep from 'cloneDeep';
let customizedLocaleRu = cloneDeep(localeRu);

// Some hacks (i.e. magic): mutate locale (I plan to change this beehaviour in latest versions)
customizeLocale(customizedLocaleRu, {
  numbers: {
    decimal: '.', // decimal separator, was ','
    group: '',    // number group separator, was ' '
    nan: '-'      // not a number message, was 'не число' (not a number), but I not sure, that it uses anywhere
  }
});

// And now numbers output will be like 1234.56 => 1234.56. Just a magic for no magic)
registerLocaleData(customizedLocaleRu);
// If we need change locale settings for whole project without declare locale providers, here is really dirty hack
// We can change default locale. If you know right way let me know)
registerLocaleData(customizedLocaleRu, 'en');

```

# Parameter
This is Objech where first level of keys means group name of changing 
items, 2nd level - means items names. All not case sensitive.

Now supported only one section '**number**'. If you need more group, drop me a line.

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
* Change mutation behaviour to safe
* Fixes this README (ough, my English)
* Write descriptions for "internal" but exported functions setItem & getItem
* Add warnings (or restictions for Angular 9+)

Just write me if I'll can help you,.. or you can help me (pull request or any advises) mclander@list.ru.