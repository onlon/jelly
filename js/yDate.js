/**
 * | yDate.js | Copyright (c) 2013 yao.yl | email: redrainyi@126.com | Date: 2012-09-03 |
 */
(function(global) {
 
    var objectPrototypeToString = Object.prototype.toString;
 
    var isDate = function(value) {
        return objectPrototypeToString.call(value) === '[object Date]';
    };
 
    var cloneDate = function(pDate, process) {
        var vDate = new Date(pDate.getTime());
        var year = vDate.getFullYear(), //
        month = vDate.getMonth(), //
        date = vDate.getDate(), //
        hours = vDate.getHours(), //
        minutes = vDate.getMinutes(), // 
        seconds = vDate.getSeconds();//
        (!!process) && process(vDate, year, month, date, hours, minutes, seconds);
        return vDate;
    };
 
    var parseDate = function(dateString, pattern) {
        try {
            var matchs1 = (pattern || (dateString.length === 10 ? 'yyyy-MM-dd' : 'yyyy-MM-dd HH:mm:ss')).match(/([yMdHsm])(\1*)/g);
            var matchs2 = dateString.match(/(\d)+/g);
            if (matchs1.length === matchs2.length) {
                var $d = new Date(1970, 0, 1);
                for (var i = 0; i < matchs1.length; i++) {
                    var $i = parseInt(matchs2[i], 10);
                    switch (matchs1[i].charAt(0) || '') {
                        case 'y' :
                            $d.setFullYear($i);
                            break;
                        case 'M' :
                            $d.setMonth($i - 1);
                            break;
                        case 'd' :
                            $d.setDate($i);
                            break;
                        case 'H' :
                            $d.setHours($i);
                            break;
                        case 'm' :
                            $d.setMinutes($i);
                            break;
                        case 's' :
                            $d.setSeconds($i);
                            break;
                        default :
                            //
                    }
                }
                return $d;
            }
        } catch (err) {
            alert(err)
        }
        return null;
    };
 
    var formatDate = (function() {
        var SIGN_RG = /([yMdHsm])(\1*)/g;
        function padding(s, len) {
            var len = len - (s + "").length;
            for (var i = 0; i < len; i++) {
                s = "0" + s;
            }
            return s;
        }
        return function(value, pattern) {
            if (!isDate(value)) {
                return '';
            }
            try {
                pattern = pattern || 'yyyy-MM-dd HH:mm:ss';
                return pattern.replace(SIGN_RG, function($0) {
                    switch ($0.charAt(0)) {
                        case 'y' :
                            return padding(value.getFullYear(), $0.length);
                        case 'M' :
                            return padding(value.getMonth() + 1, $0.length);
                        case 'd' :
                            return padding(value.getDate(), $0.length);
                        case 'w' :
                            return value.getDay() + 1;
                        case 'H' :
                            return padding(value.getHours(), $0.length);
                        case 'm' :
                            return padding(value.getMinutes(), $0.length);
                        case 's' :
                            return padding(value.getSeconds(), $0.length);
                        case 'q' :
                            return Math.floor((this.getMonth() + 3) / 3);
                        default :
                            return '';
                    }
                });
            } catch (err) {
                return '';
            }
        };
    })();
 
    var getActualMaximum = function(date) {
        var vDate = new Date(date.getTime());
        vDate.setMonth(vDate.getMonth() + 1);
        vDate.setDate(0);
        return vDate.getDate();
    }
 
    var YDate = function() {
        var p0 = arguments[0];
        var p1 = arguments[1];
        if (typeof p0 === 'number' && isFinite(value)) {
            this.vDate = new Date(p0);//millis
        } else if (isDate(p0)) {
            this.vDate = new Date(p0.getTime());
        } else if (typeof p0 === 'string') {
            if (typeof p1 === 'string' || typeof p1 === 'undefined') {
                this.vDate = parseDate(p0, p1);
            }
        } else if (arguments.length == 0) {
            this.vDate = new Date();
        } else {
            throw 'YDate Constructor Error!';
        }
        this.$year = this.vDate.getFullYear();
        this.$month = this.vDate.getMonth();
        this.$date = this.vDate.getDate();
        this.$hours = this.vDate.getHours();
        this.$minutes = this.vDate.getMinutes();
        this.$seconds = this.vDate.getSeconds();
        this.$day = this.vDate.getDay();
    };
 
    YDate.prototype = {
        plusYear : function(value) {
            return new YDate(cloneDate(this.vDate, function(vDate, year, month, date, hours, minutes, seconds) {
                vDate.setFullYear(year + value);
            }));
        },
        plusMonth : function(value) {
            return new YDate(cloneDate(this.vDate, function(vDate, year, month, date, hours, minutes, seconds) {
                vDate.setMonth(month + value);
            }));
        },
        plusDate : function(value) {
            return new YDate(cloneDate(this.vDate, function(vDate, year, month, date, hours, minutes, seconds) {
                vDate.setDate(date + value);
            }));
        },
        plusHours : function(value) {
            return new YDate(cloneDate(this.vDate, function(vDate, year, month, date, hours, minutes, seconds) {
                vDate.setHours(hours + value);
            }));
        },
        plusMinutes : function(value) {
            return new YDate(cloneDate(this.vDate, function(vDate, year, month, date, hours, minutes, seconds) {
                vDate.setMinutes(minutes + value);
            }));
        },
        plusSeconds : function(value) {
            return new YDate(cloneDate(this.vDate, function(vDate, year, month, date, hours, minutes, seconds) {
                vDate.setSeconds(seconds + value);
            }));
        },
        minusYear : function(value) {
            return this.plusYears(-value);
        },
        minusMonth : function(value) {
            return this.plusMonths(-value);
        },
        minusDate : function(value) {
            return this.plusDate(-value);
        },
        minusHours : function(value) {
            return this.plusHours(-value);
        },
        minusMinutes : function(value) {
            return this.plusMinutes(-value);
        },
        minusSeconds : function(value) {
            return this.plusSeconds(-value);
        },
        setYear : function(value) {
            return new YDate(cloneDate(this.vDate, function(vDate, year, month, date, hours, minutes, seconds) {
                vDate.setFullYear(value);
            }));
        },
        setMonth : function(value) {
            return new YDate(cloneDate(this.vDate, function(vDate, year, month, date, hours, minutes, seconds) {
                vDate.setMonth(value);
            }));
        },
        setDate : function(value) {
            return new YDate(cloneDate(this.vDate, function(vDate, year, month, date, hours, minutes, seconds) {
                vDate.setDate(value);
            }));
        },
        setHours : function(value) {
            return new YDate(cloneDate(this.vDate, function(vDate, year, month, date, hours, minutes, seconds) {
                vDate.setHours(value);
            }));
        },
        setMinutes : function(value) {
            return new YDate(cloneDate(this.vDate, function(vDate, year, month, date, hours, minutes, seconds) {
                vDate.setMinutes(value);
            }));
        },
        setSeconds : function(value) {
            return new YDate(cloneDate(this.vDate, function(vDate, year, month, date, hours, minutes, seconds) {
                vDate.setSeconds(value);
            }));
        },
        getYear : function() {
            return vDate.getFullYear();
        },
        getMonth : function() {
            return vDate.getMonth();
        },
        getDate : function() {
            return vDate.getDate();
        },
        getHours : function() {
            return vDate.getHours();
        },
        getMinutes : function() {
            return vDate.getMinutes();
        },
        getSeconds : function() {
            return vDate.getSeconds();
        },
        getDayOfWeek : function() {
            return vDate.getDay();
        },
        toDate : function() {
            return cloneDate(this.vDate);
        },
        calculate : function(expression) {
 
        },
        clone : function() {
            return new YDate(cloneDate(this.vDate));
        },
        getBegin : function(field) {
            return new YDate(cloneDate(this.vDate, function(vDate, year, month, date, hours, minutes, seconds) {
                switch (field) {
                    case 'yyyy' ://year
                        vDate.setMonth(0);
                        vDate.setDate(1);
                        vDate.setHours(0);
                        vDate.setMinutes(0);
                        vDate.setSeconds(0);
                        break;
                    case 'MM' ://month
                        vDate.setDate(1);
                        vDate.setHours(0);
                        vDate.setMinutes(0);
                        vDate.setSeconds(0);
                    case 'dd' ://date
                        vDate.setHours(0);
                        vDate.setMinutes(0);
                        vDate.setSeconds(0);
                        break;
                    default :
                        //Ignore
                }
            }));
        },
        getEnd : function(field) {
            return new YDate(cloneDate(this.vDate, function(vDate, year, month, date, hours, minutes, seconds) {
                switch (field) {
                    case 'yyyy' ://year
                        vDate.setMonth(11);
                        vDate.setDate(31);
                        vDate.setHours(23);
                        vDate.setMinutes(59);
                        vDate.setSeconds(59);
                        break;
                    case 'MM' ://month
                        vDate.setDate(getActualMaximum(vDate));
                        vDate.setHours(23);
                        vDate.setMinutes(59);
                        vDate.setSeconds(59);
                    case 'dd' ://date
                        vDate.setHours(23);
                        vDate.setMinutes(59);
                        vDate.setSeconds(59);
                        break;
                    default :
                        //Ignore
                }
            }));
        },
        toString : function(pattern) {
            return formatDate(this.vDate, pattern);
        }
    };
    global.YDate = YDate;
})(window);