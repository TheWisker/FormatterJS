class Formater {
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

class DateFormater extends Formater {
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
        return DateFormater.clean(this.#_format(date));
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
        super.setCache(super.getCache().replaceAll(/(%M)/g, DateFormater.zeroFormat((super.isUtc() ? date.getUTCMonth() : date.getMonth()) + 1)));
        super.setCache(super.getCache().replaceAll(/(%m)/g, (super.isUtc() ? date.getUTCMonth() : date.getMonth()) + 1));
        super.setCache(super.getCache().replaceAll(/(%B)/g, DateFormater.#months.long[super.isUtc() ? date.getUTCMonth() : date.getMonth()]));
        super.setCache(super.getCache().replaceAll(/(%b)/g, DateFormater.#months.short[super.isUtc() ? date.getUTCMonth() : date.getMonth()]));

        //Day
        super.setCache(super.getCache().replaceAll(/(%D)/g, DateFormater.zeroFormat(super.isUtc() ? date.getUTCDate() : date.getDate())));
        super.setCache(super.getCache().replaceAll(/(%d)/g, super.isUtc() ? date.getUTCDate() : date.getDate()));

        //Weekday
        super.setCache(super.getCache().replaceAll(/(%A)/g, DateFormater.#days.long[super.isUtc() ? date.getUTCDay() : date.getDay()]));
        super.setCache(super.getCache().replaceAll(/(%a)/g, DateFormater.#days.short[super.isUtc() ? date.getUTCDay() : date.getDay()]));
        super.setCache(super.getCache().replaceAll(/(%W)/g, (super.isUtc() ? date.getUTCDay() : date.getDay()) + 1));
        return super.getCache();
    }
}

class TimeFormater extends Formater {
    constructor(format, utc) {super(format, utc);}

    format(date) {
        date = date || new Date();
        super.format();
        return TimeFormater.clean(this.#_format(date));
    }

    #_format(date) {
        //Hours
        super.setCache(super.getCache().replaceAll(/(%H)/g, TimeFormater.zeroFormat(super.isUtc() ? date.getUTCHours() : date.getHours())));
        super.setCache(super.getCache().replaceAll(/(%I)/g, TimeFormater.zeroFormat((super.isUtc() ? date.getUTCHours() : date.getHours()) > 12 ? (super.isUtc() ? date.getUTCHours() : date.getHours()) - 12 : (super.isUtc() ? date.getUTCHours() : date.getHours()))));
        super.setCache(super.getCache().replaceAll(/(%h)/g, super.isUtc() ? date.getUTCHours() : date.getHours()));
        super.setCache(super.getCache().replaceAll(/(%i)/g, (super.isUtc() ? date.getUTCHours() : date.getHours()) > 12 ? (super.isUtc() ? date.getUTCHours() : date.getHours()) - 12 : (super.isUtc() ? date.getUTCHours() : date.getHours())));

        //Minutes
        super.setCache(super.getCache().replaceAll(/(%K)/g, TimeFormater.zeroFormat(super.isUtc() ? date.getUTCMinutes() : date.getMinutes())));
        super.setCache(super.getCache().replaceAll(/(%k)/g, super.isUtc() ? date.getUTCMinutes() : date.getMinutes()));

        //Seconds
        super.setCache(super.getCache().replaceAll(/(%S)/g, TimeFormater.zeroFormat(super.isUtc() ? date.getUTCSeconds() : date.getSeconds())));
        super.setCache(super.getCache().replaceAll(/(%s)/g, super.isUtc() ? date.getUTCSeconds() : date.getSeconds()));

        //Tenths of a second
        super.setCache(super.getCache().replaceAll(/(%L)/g, Math.round(super.isUtc() ? date.getUTCMilliseconds() : date.getMilliseconds() / 100)));

        //Hundredths of a second
        super.setCache(super.getCache().replaceAll(/(%Q)/g, TimeFormater.zeroFormat(Math.round(super.isUtc() ? date.getUTCMilliseconds() : date.getMilliseconds() / 10), 2)));
        super.setCache(super.getCache().replaceAll(/(%q)/g, Math.round(super.isUtc() ? date.getUTCMilliseconds() : date.getMilliseconds()) / 10));

        //Miliseconds
        super.setCache(super.getCache().replaceAll(/(%F)/g, TimeFormater.zeroFormat(super.isUtc() ? date.getUTCMilliseconds() : date.getMilliseconds(), 3)));
        super.setCache(super.getCache().replaceAll(/(%f)/g, super.isUtc() ? date.getUTCMilliseconds() : date.getMilliseconds()));

        //AM or PM
        super.setCache(super.getCache().replaceAll(/(%P)/g, (super.isUtc() ? date.getUTCHours() : date.getHours()) > 12 ? "PM" : "AM"));
        super.setCache(super.getCache().replaceAll(/(%p)/g, (super.isUtc() ? date.getUTCHours() : date.getHours()) > 12 ? "pm" : "am"));

        //Timezone offset
        super.setCache(super.getCache().replaceAll(/(%T)/g, date.getTimezoneOffset() >= 0 ? "+" + TimeFormater.zeroFormat(Math.floor(((date.getTimezoneOffset() + 1) / 60) - (1 / 60))) : "-" + TimeFormater.zeroFormat(Math.floor(Math.abs(date.getTimezoneOffset()) / 60))));
        super.setCache(super.getCache().replaceAll(/(%t)/g, date.getTimezoneOffset() >= 0 ? "+" + Math.floor(((date.getTimezoneOffset() + 1) / 60) - (1 / 60)) : "-" + Math.floor(Math.abs(date.getTimezoneOffset()) / 60)));
        return super.getCache();
    }
}

class UniversalFormater extends Formater {
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
        return UniversalFormater.clean(this.#_format(date));
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
        super.setCache(super.getCache().replaceAll(/(%M)/g, UniversalFormater.zeroFormat((super.isUtc() ? date.getUTCMonth() : date.getMonth()) + 1)));
        super.setCache(super.getCache().replaceAll(/(%m)/g, (super.isUtc() ? date.getUTCMonth() : date.getMonth()) + 1));
        super.setCache(super.getCache().replaceAll(/(%B)/g, UniversalFormater.#months.long[super.isUtc() ? date.getUTCMonth() : date.getMonth()]));
        super.setCache(super.getCache().replaceAll(/(%b)/g, UniversalFormater.#months.short[super.isUtc() ? date.getUTCMonth() : date.getMonth()]));

        //Day
        super.setCache(super.getCache().replaceAll(/(%D)/g, UniversalFormater.zeroFormat(super.isUtc() ? date.getUTCDate() : date.getDate())));
        super.setCache(super.getCache().replaceAll(/(%d)/g, super.isUtc() ? date.getUTCDate() : date.getDate()));

        //Weekday
        super.setCache(super.getCache().replaceAll(/(%A)/g, UniversalFormater.#days.long[super.isUtc() ? date.getUTCDay() : date.getDay()]));
        super.setCache(super.getCache().replaceAll(/(%a)/g, UniversalFormater.#days.short[super.isUtc() ? date.getUTCDay() : date.getDay()]));
        //Hours
        super.setCache(super.getCache().replaceAll(/(%H)/g, UniversalFormater.zeroFormat(super.isUtc() ? date.getUTCHours() : date.getHours())));
        super.setCache(super.getCache().replaceAll(/(%I)/g, UniversalFormater.zeroFormat((super.isUtc() ? date.getUTCHours() : date.getHours()) > 12 ? (super.isUtc() ? date.getUTCHours() : date.getHours()) - 12 : (super.isUtc() ? date.getUTCHours() : date.getHours()))));
        super.setCache(super.getCache().replaceAll(/(%h)/g, super.isUtc() ? date.getUTCHours() : date.getHours()));
        super.setCache(super.getCache().replaceAll(/(%i)/g, (super.isUtc() ? date.getUTCHours() : date.getHours()) > 12 ? (super.isUtc() ? date.getUTCHours() : date.getHours()) - 12 : (super.isUtc() ? date.getUTCHours() : date.getHours())));

        //Minutes
        super.setCache(super.getCache().replaceAll(/(%K)/g, UniversalFormater.zeroFormat(super.isUtc() ? date.getUTCMinutes() : date.getMinutes())));
        super.setCache(super.getCache().replaceAll(/(%k)/g, super.isUtc() ? date.getUTCMinutes() : date.getMinutes()));

        //Seconds
        super.setCache(super.getCache().replaceAll(/(%S)/g, UniversalFormater.zeroFormat(super.isUtc() ? date.getUTCSeconds() : date.getSeconds())));
        super.setCache(super.getCache().replaceAll(/(%s)/g, super.isUtc() ? date.getUTCSeconds() : date.getSeconds()));

        //Tenths of a second
        super.setCache(super.getCache().replaceAll(/(%L)/g, Math.round(super.isUtc() ? date.getUTCMilliseconds() : date.getMilliseconds() / 100)));

        //Hundredths of a second
        super.setCache(super.getCache().replaceAll(/(%Q)/g, UniversalFormater.zeroFormat(Math.round(super.isUtc() ? date.getUTCMilliseconds() : date.getMilliseconds() / 10), 2)));
        super.setCache(super.getCache().replaceAll(/(%q)/g, Math.round(super.isUtc() ? date.getUTCMilliseconds() : date.getMilliseconds()) / 10));

        //Miliseconds
        super.setCache(super.getCache().replaceAll(/(%F)/g, UniversalFormater.zeroFormat(super.isUtc() ? date.getUTCMilliseconds() : date.getMilliseconds(), 3)));
        super.setCache(super.getCache().replaceAll(/(%f)/g, super.isUtc() ? date.getUTCMilliseconds() : date.getMilliseconds()));

        //AM or PM
        super.setCache(super.getCache().replaceAll(/(%P)/g, (super.isUtc() ? date.getUTCHours() : date.getHours()) > 12 ? "PM" : "AM"));
        super.setCache(super.getCache().replaceAll(/(%p)/g, (super.isUtc() ? date.getUTCHours() : date.getHours()) > 12 ? "pm" : "am"));

        //Timezone offset
        super.setCache(super.getCache().replaceAll(/(%T)/g, date.getTimezoneOffset() >= 0 ? "+" + UniversalFormater.zeroFormat(Math.floor(((date.getTimezoneOffset() + 1) / 60) - (1 / 60))) : "-" + UniversalFormater.zeroFormat(Math.floor(Math.abs(date.getTimezoneOffset()) / 60))));
        super.setCache(super.getCache().replaceAll(/(%t)/g, date.getTimezoneOffset() >= 0 ? "+" + Math.floor(((date.getTimezoneOffset() + 1) / 60) - (1 / 60)) : "-" + Math.floor(Math.abs(date.getTimezoneOffset()) / 60)));
        return super.getCache();
    }
}

function format(date, format, utc) {
    months = {
        long: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "Noemvber", "December"],
        short: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    }
    days = {
        long: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        short: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    }

    function zeroFormat(n, ln) {
        while (n.length < (ln || 2)) n = "0" + n;
        return n;
    }
    
    //Literal
    format = format.replaceAll(/(%%)/g, "%");

    //Year
    format = format.replaceAll(/(%Y)/g, utc ? date.getUTCFullYear() : date.getFullYear());
    format = format.replaceAll(/(%y)/g, date.getYear());
    format = format.replaceAll(/(%J)/g, () => {
        let count = utc ? date.getUTCDate() : date.getDate();
        for (let i = (utc ? date.getUTCMonth() : date.getMonth()); i > 0; i--) {
            if (i != 1) {
                if ((i <= 6 && (i % 2) == 0) || (i >= 7 && (i % 2) == 1)) {count += 31;} else {count += 30;}
            } else {
                if (((utc ? date.getUTCFullYear() : date.getFullYear()) % 4) == 0) {count += 29;} else {count += 28;}
            }
        }
        return count;
    });

    //Month
    format = format.replaceAll(/(%M)/g, zeroFormat((utc ? date.getUTCMonth() : date.getMonth()) + 1));
    format = format.replaceAll(/(%m)/g, (utc ? date.getUTCMonth() : date.getMonth()) + 1);
    format = format.replaceAll(/(%B)/g, months.long[utc ? date.getUTCMonth() : date.getMonth()]);
    format = format.replaceAll(/(%b)/g, months.short[utc ? date.getUTCMonth() : date.getMonth()]);

    //Day
    format = format.replaceAll(/(%D)/g, zeroFormat(utc ? date.getUTCDate() : date.getDate()));
    format = format.replaceAll(/(%d)/g, utc ? date.getUTCDate() : date.getDate());

    //Weekday
    format = format.replaceAll(/(%A)/g, days.long[utc ? date.getUTCDay() : date.getDay()]);
    format = format.replaceAll(/(%a)/g, days.short[utc ? date.getUTCDay() : date.getDay()]);
    format = format.replaceAll(/(%W)/g, (utc ? date.getUTCDay() : date.getDay()) + 1);

    //Hours
    format = format.replaceAll(/(%H)/g, zeroFormat(utc ? date.getUTCHours() : date.getHours()));
    format = format.replaceAll(/(%I)/g, zeroFormat((utc ? date.getUTCHours() : date.getHours()) > 12 ? (utc ? date.getUTCHours() : date.getHours()) - 12 : (utc ? date.getUTCHours() : date.getHours())));
    format = format.replaceAll(/(%h)/g, utc ? date.getUTCHours() : date.getHours());
    format = format.replaceAll(/(%i)/g, (utc ? date.getUTCHours() : date.getHours()) > 12 ? (utc ? date.getUTCHours() : date.getHours()) - 12 : (utc ? date.getUTCHours() : date.getHours()));
    
    //Minutes
    format = format.replaceAll(/(%K)/g, zeroFormat(utc ? date.getUTCMinutes() : date.getMinutes()));
    format = format.replaceAll(/(%k)/g, utc ? date.getUTCMinutes() : date.getMinutes());

    //Seconds
    format = format.replaceAll(/(%S)/g, zeroFormat(utc ? date.getUTCSeconds() : date.getSeconds()));
    format = format.replaceAll(/(%s)/g, utc ? date.getUTCSeconds() : date.getSeconds());

    //Tenths of a second
    format = format.replaceAll(/(%L)/g, Math.round(utc ? date.getUTCMilliseconds() : date.getMilliseconds() / 100));

    //Hundredths of a second
    format = format.replaceAll(/(%Q)/g, zeroFormat(Math.round(utc ? date.getUTCMilliseconds() : date.getMilliseconds() / 10), 2));
    format = format.replaceAll(/(%q)/g, Math.round(utc ? date.getUTCMilliseconds() : date.getMilliseconds()) / 10);
    
    //Miliseconds
    format = format.replaceAll(/(%F)/g, zeroFormat(utc ? date.getUTCMilliseconds() : date.getMilliseconds(), 3));
    format = format.replaceAll(/(%f)/g, utc ? date.getUTCMilliseconds() : date.getMilliseconds());

    //AM or PM
    format = format.replaceAll(/(%P)/g, (utc ? date.getUTCHours() : date.getHours()) > 12 ? "PM" : "AM");
    format = format.replaceAll(/(%p)/g, (utc ? date.getUTCHours() : date.getHours()) > 12 ? "pm" : "am");

    //Timezone offset
    format = format.replaceAll(/(%T)/g, date.getTimezoneOffset() >= 0 ? "+" + zeroFormat(Math.floor(((date.getTimezoneOffset() + 1) / 60) - (1 / 60))) : "-" + zeroFormat(Math.floor(Math.abs(date.getTimezoneOffset()) / 60)));
    format = format.replaceAll(/(%t)/g, date.getTimezoneOffset() >= 0 ? "+" + Math.floor(((date.getTimezoneOffset() + 1) / 60) - (1 / 60)) : "-" + Math.floor(Math.abs(date.getTimezoneOffset()) / 60));

    return format;
};

export {DateFormater, TimeFormater, UniversalFormater as default, format};