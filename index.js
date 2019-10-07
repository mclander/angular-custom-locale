'use strict';

var SECTIONS = {
    numbers: 13
};
var ITEMS = new Array(21); // 19 locale + 3 extra
ITEMS[SECTIONS.numbers] = [
    'decimal',
    'group',
    'list',
    'percentsign',
    'plussign',
    'minussign',
    'exponential',
    'superscriptingexponent',
    'perMille',
    'infinity',
    'nan',
    'timeseparator'
];

function getSectionId(section) {
    return SECTIONS[(section ||'').toLowerCase()];
}

function getItemId(sectionId, item) {
    return  (sectionId in ITEMS) ? ITEMS[sectionId].indexOf(item.toLowerCase()) : -1;
}

function setItem (locale, section, item, value) {
    var sectionId = getSectionId(section), itemId;
    if (sectionId in locale) {
        itemId = getItemId(sectionId, item);
        if (~itemId) {
            locale[sectionId][itemId] = value;
            return true
        }
    }
    return false;
}

function setItemFast(locale, sectionId, item, value) {
    if (sectionId in locale) {
        var itemId = getItemId(sectionId, item);
        if (~itemId) {
            locale[sectionId][itemId] = value;
            return true
        }
    }
    return false;
}

function getItem(locale, section, item, defaultValue) {
    var sectionId = getSectionId(section), itemId;
    if (sectionId in locale) {
        itemId = getItemId(sectionId, item);
        if (~itemId)
            return locale[sectionId][itemId];
    }
    return defaultValue;
}

function getItemFast(locale, sectionId, item, defaultValue) {
    if (sectionId in locale) {
        itemId = getItemId(sectionId, item);
        if (~itemId)
            return locale[sectionId][itemId];
    }
    return defaultValue;
}



function customizeLocale(locale, rules, noWarnings) {
    if (typeof rules !== 'object') {
        if (!noWarnings) console.warn('parameter #2 (rules) must be an Object');
        return;
    }
    for (var section in rules){
        if (rules.hasOwnProperty(section)) {
            var sectionId = getSectionId(section);
            if (sectionId in locale){
                for (var item in rules[section]){
                    if (rules[section].hasOwnProperty(item)){
                        setItemFast(locale, sectionId, item, rules[section][item]) 
                        || noWarnings 
                        || console.warn("Can't find item '" + item + "' in section '" + section + "'" );
                    }
                }
            } else if(!noWarnings) {
                console.warn("Unknown section '" + section + "' or not defined in you locale")
            }
        }
    }
    return locale;
}

module.exports = customizeLocale;
module.exports.setItem = setItem;
module.exports.getItem = getItem;


