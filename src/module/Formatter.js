"use strict";

//Base class for the three formatters
class Formatter {
    #formated; #format; #utc;

    constructor(format, utc) {
        this.#format = format;
        this.#utc = utc;
    }

    static zeroFormat(n, ln) {
        while (n.length < (ln || 2)) n = "0" + n;
        return n;
    }

    static clean(formated) {return formated.replaceAll(/(\\x01%\\x01)/g, "%");}

    isUtc() {return this.#utc;}

    getFormat() {return this.#format;}

    getCache() {return this.#formated;}

    setCache(cache) {this.#formated = cache;}

    format() {
        this.#formated = this.#format;
        this.#formated = this.#formated.replaceAll(/(%%)/g, "\x01%\x01");
        return false;
    }
}

//Only formats dates
class DateFormatter extends Formatter {
    static #months = {
        long: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "Noemvber", "December"],
        short: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    }
    static #days = {
        long: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        short: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    }

    constructor(format, utc) {super(format, utc);}

    format(date) {
        date = date || new Date();
        super.format();
        return DateFormatter.clean(this.#_format(date));
    }

    #_format(date) {
        //Year
        super.setCache(super.getCache().replaceAll(/(%Y)/g, super.isUtc() ? date.getUTCFullYear() : date.getFullYear()));
        super.setCache(super.getCache().replaceAll(/(%y)/g, date.getYear()));
        super.setCache(super.getCache().replaceAll(/(%J)/g, () => {
            let count = super.isUtc() ? date.getUTCDate() : date.getDate();
            for (let i = (super.isUtc() ? date.getUTCMonth() : date.getMonth()); i > 0; i--) {
                if (i != 1) {
                    if ((i <= 6 && (i % 2) == 0) || (i >= 7 && (i % 2) == 1)) {count += 31;} else {count += 30;}
                } else {
                    if (((super.isUtc() ? date.getUTCFullYear() : date.getFullYear()) % 4) == 0) {count += 29;} else {count += 28;}
                }
            }
            return count;
        }));

        //Month
        super.setCache(super.getCache().replaceAll(/(%M)/g, DateFormatter.zeroFormat((super.isUtc() ? date.getUTCMonth() : date.getMonth()) + 1)));
        super.setCache(super.getCache().replaceAll(/(%m)/g, (super.isUtc() ? date.getUTCMonth() : date.getMonth()) + 1));
        super.setCache(super.getCache().replaceAll(/(%B)/g, DateFormatter.#months.long[super.isUtc() ? date.getUTCMonth() : date.getMonth()]));
        super.setCache(super.getCache().replaceAll(/(%b)/g, DateFormatter.#months.short[super.isUtc() ? date.getUTCMonth() : date.getMonth()]));

        //Day
        super.setCache(super.getCache().replaceAll(/(%D)/g, DateFormatter.zeroFormat(super.isUtc() ? date.getUTCDate() : date.getDate())));
        super.setCache(super.getCache().replaceAll(/(%d)/g, super.isUtc() ? date.getUTCDate() : date.getDate()));

        //Weekday
        super.setCache(super.getCache().replaceAll(/(%A)/g, DateFormatter.#days.long[super.isUtc() ? date.getUTCDay() : date.getDay()]));
        super.setCache(super.getCache().replaceAll(/(%a)/g, DateFormatter.#days.short[super.isUtc() ? date.getUTCDay() : date.getDay()]));
        super.setCache(super.getCache().replaceAll(/(%W)/g, (super.isUtc() ? date.getUTCDay() : date.getDay()) + 1));
        return super.getCache();
    }
}

//Only formats time
class TimeFormatter extends Formatter {
    constructor(format, utc) {super(format, utc);}

    format(date) {
        date = date || new Date();
        super.format();
        return TimeFormatter.clean(this.#_format(date));
    }

    #_format(date) {
        //Hours
        super.setCache(super.getCache().replaceAll(/(%H)/g, TimeFormatter.zeroFormat(super.isUtc() ? date.getUTCHours() : date.getHours())));
        super.setCache(super.getCache().replaceAll(/(%I)/g, TimeFormatter.zeroFormat((super.isUtc() ? date.getUTCHours() : date.getHours()) > 12 ? (super.isUtc() ? date.getUTCHours() : date.getHours()) - 12 : (super.isUtc() ? date.getUTCHours() : date.getHours()))));
        super.setCache(super.getCache().replaceAll(/(%h)/g, super.isUtc() ? date.getUTCHours() : date.getHours()));
        super.setCache(super.getCache().replaceAll(/(%i)/g, (super.isUtc() ? date.getUTCHours() : date.getHours()) > 12 ? (super.isUtc() ? date.getUTCHours() : date.getHours()) - 12 : (super.isUtc() ? date.getUTCHours() : date.getHours())));

        //Minutes
        super.setCache(super.getCache().replaceAll(/(%K)/g, TimeFormatter.zeroFormat(super.isUtc() ? date.getUTCMinutes() : date.getMinutes())));
        super.setCache(super.getCache().replaceAll(/(%k)/g, super.isUtc() ? date.getUTCMinutes() : date.getMinutes()));

        //Seconds
        super.setCache(super.getCache().replaceAll(/(%S)/g, TimeFormatter.zeroFormat(super.isUtc() ? date.getUTCSeconds() : date.getSeconds())));
        super.setCache(super.getCache().replaceAll(/(%s)/g, super.isUtc() ? date.getUTCSeconds() : date.getSeconds()));

        //Tenths of a second
        super.setCache(super.getCache().replaceAll(/(%L)/g, Math.round(super.isUtc() ? date.getUTCMilliseconds() : date.getMilliseconds() / 100)));

        //Hundredths of a second
        super.setCache(super.getCache().replaceAll(/(%Q)/g, TimeFormatter.zeroFormat(Math.round(super.isUtc() ? date.getUTCMilliseconds() : date.getMilliseconds() / 10), 2)));
        super.setCache(super.getCache().replaceAll(/(%q)/g, Math.round(super.isUtc() ? date.getUTCMilliseconds() : date.getMilliseconds()) / 10));

        //Miliseconds
        super.setCache(super.getCache().replaceAll(/(%F)/g, TimeFormatter.zeroFormat(super.isUtc() ? date.getUTCMilliseconds() : date.getMilliseconds(), 3)));
        super.setCache(super.getCache().replaceAll(/(%f)/g, super.isUtc() ? date.getUTCMilliseconds() : date.getMilliseconds()));

        //AM or PM
        super.setCache(super.getCache().replaceAll(/(%P)/g, (super.isUtc() ? date.getUTCHours() : date.getHours()) > 12 ? "PM" : "AM"));
        super.setCache(super.getCache().replaceAll(/(%p)/g, (super.isUtc() ? date.getUTCHours() : date.getHours()) > 12 ? "pm" : "am"));

        //Timezone offset
        super.setCache(super.getCache().replaceAll(/(%T)/g, date.getTimezoneOffset() >= 0 ? "+" + TimeFormatter.zeroFormat(Math.floor(((date.getTimezoneOffset() + 1) / 60) - (1 / 60))) : "-" + TimeFormatter.zeroFormat(Math.floor(Math.abs(date.getTimezoneOffset()) / 60))));
        super.setCache(super.getCache().replaceAll(/(%t)/g, date.getTimezoneOffset() >= 0 ? "+" + Math.floor(((date.getTimezoneOffset() + 1) / 60) - (1 / 60)) : "-" + Math.floor(Math.abs(date.getTimezoneOffset()) / 60)));
        return super.getCache();
    }
}

//Formats dates and time (Slowest)
class UniversalFormatter extends Formatter {
    static #months = {
        long: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "Noemvber", "December"],
        short: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    }
    static #days = {
        long: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        short: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    }

    constructor(format, utc) {super(format, utc);}

    format(date) {
        date = date || new Date();
        super.format();
        return UniversalFormatter.clean(this.#_format(date));
    }

    #_format(date) {
        //Year
        super.setCache(super.getCache().replaceAll(/(%Y)/g, super.isUtc() ? date.getUTCFullYear() : date.getFullYear()));
        super.setCache(super.getCache().replaceAll(/(%y)/g, date.getYear()));
        super.setCache(super.getCache().replaceAll(/(%J)/g, () => {
            let count = super.isUtc() ? date.getUTCDate() : date.getDate();
            for (let i = (super.isUtc() ? date.getUTCMonth() : date.getMonth()); i > 0; i--) {
                if (i != 1) {
                    if ((i <= 6 && (i % 2) == 0) || (i >= 7 && (i % 2) == 1)) {count += 31;} else {count += 30;}
                } else {
                    if (((super.isUtc() ? date.getUTCFullYear() : date.getFullYear()) % 4) == 0) {count += 29;} else {count += 28;}
                }
            }
            return count;
        }));

        //Month
        super.setCache(super.getCache().replaceAll(/(%M)/g, UniversalFormatter.zeroFormat((super.isUtc() ? date.getUTCMonth() : date.getMonth()) + 1)));
        super.setCache(super.getCache().replaceAll(/(%m)/g, (super.isUtc() ? date.getUTCMonth() : date.getMonth()) + 1));
        super.setCache(super.getCache().replaceAll(/(%B)/g, UniversalFormatter.#months.long[super.isUtc() ? date.getUTCMonth() : date.getMonth()]));
        super.setCache(super.getCache().replaceAll(/(%b)/g, UniversalFormatter.#months.short[super.isUtc() ? date.getUTCMonth() : date.getMonth()]));

        //Day
        super.setCache(super.getCache().replaceAll(/(%D)/g, UniversalFormatter.zeroFormat(super.isUtc() ? date.getUTCDate() : date.getDate())));
        super.setCache(super.getCache().replaceAll(/(%d)/g, super.isUtc() ? date.getUTCDate() : date.getDate()));

        //Weekday
        super.setCache(super.getCache().replaceAll(/(%A)/g, UniversalFormatter.#days.long[super.isUtc() ? date.getUTCDay() : date.getDay()]));
        super.setCache(super.getCache().replaceAll(/(%a)/g, UniversalFormatter.#days.short[super.isUtc() ? date.getUTCDay() : date.getDay()]));
        //Hours
        super.setCache(super.getCache().replaceAll(/(%H)/g, UniversalFormatter.zeroFormat(super.isUtc() ? date.getUTCHours() : date.getHours())));
        super.setCache(super.getCache().replaceAll(/(%I)/g, UniversalFormatter.zeroFormat((super.isUtc() ? date.getUTCHours() : date.getHours()) > 12 ? (super.isUtc() ? date.getUTCHours() : date.getHours()) - 12 : (super.isUtc() ? date.getUTCHours() : date.getHours()))));
        super.setCache(super.getCache().replaceAll(/(%h)/g, super.isUtc() ? date.getUTCHours() : date.getHours()));
        super.setCache(super.getCache().replaceAll(/(%i)/g, (super.isUtc() ? date.getUTCHours() : date.getHours()) > 12 ? (super.isUtc() ? date.getUTCHours() : date.getHours()) - 12 : (super.isUtc() ? date.getUTCHours() : date.getHours())));

        //Minutes
        super.setCache(super.getCache().replaceAll(/(%K)/g, UniversalFormatter.zeroFormat(super.isUtc() ? date.getUTCMinutes() : date.getMinutes())));
        super.setCache(super.getCache().replaceAll(/(%k)/g, super.isUtc() ? date.getUTCMinutes() : date.getMinutes()));

        //Seconds
        super.setCache(super.getCache().replaceAll(/(%S)/g, UniversalFormatter.zeroFormat(super.isUtc() ? date.getUTCSeconds() : date.getSeconds())));
        super.setCache(super.getCache().replaceAll(/(%s)/g, super.isUtc() ? date.getUTCSeconds() : date.getSeconds()));

        //Tenths of a second
        super.setCache(super.getCache().replaceAll(/(%L)/g, Math.round(super.isUtc() ? date.getUTCMilliseconds() : date.getMilliseconds() / 100)));

        //Hundredths of a second
        super.setCache(super.getCache().replaceAll(/(%Q)/g, UniversalFormatter.zeroFormat(Math.round(super.isUtc() ? date.getUTCMilliseconds() : date.getMilliseconds() / 10), 2)));
        super.setCache(super.getCache().replaceAll(/(%q)/g, Math.round(super.isUtc() ? date.getUTCMilliseconds() : date.getMilliseconds()) / 10));

        //Miliseconds
        super.setCache(super.getCache().replaceAll(/(%F)/g, UniversalFormatter.zeroFormat(super.isUtc() ? date.getUTCMilliseconds() : date.getMilliseconds(), 3)));
        super.setCache(super.getCache().replaceAll(/(%f)/g, super.isUtc() ? date.getUTCMilliseconds() : date.getMilliseconds()));

        //AM or PM
        super.setCache(super.getCache().replaceAll(/(%P)/g, (super.isUtc() ? date.getUTCHours() : date.getHours()) > 12 ? "PM" : "AM"));
        super.setCache(super.getCache().replaceAll(/(%p)/g, (super.isUtc() ? date.getUTCHours() : date.getHours()) > 12 ? "pm" : "am"));

        //Timezone offset
        super.setCache(super.getCache().replaceAll(/(%T)/g, date.getTimezoneOffset() >= 0 ? "+" + UniversalFormatter.zeroFormat(Math.floor(((date.getTimezoneOffset() + 1) / 60) - (1 / 60))) : "-" + UniversalFormatter.zeroFormat(Math.floor(Math.abs(date.getTimezoneOffset()) / 60))));
        super.setCache(super.getCache().replaceAll(/(%t)/g, date.getTimezoneOffset() >= 0 ? "+" + Math.floor(((date.getTimezoneOffset() + 1) / 60) - (1 / 60)) : "-" + Math.floor(Math.abs(date.getTimezoneOffset()) / 60)));
        return super.getCache();
    }
}

export {DateFormatter, TimeFormatter, UniversalFormatter as default};