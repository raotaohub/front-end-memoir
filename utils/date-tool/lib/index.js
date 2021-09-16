const C = require('./constant')
const dayjs =require('dayjs')

const dateTool = {}

function getTimestamp(date) {
    return date ? new Date(date) : Date.now()
}

function isDate(d) {
    return d instanceof Date
}

function prettyUnit(u) {
    const special = {
        M: C.M,
        y: C.Y,
        w: C.W,
        d: C.D,
        D: C.DATE,
        h: C.H,
        m: C.MIN,
        s: C.S,
        ms: C.MS,
        Q: C.Q
    };
    return special[u] || String(u || '').toLowerCase().replace(/s$/, '');
};

class DateTool {
    constructor(date) {
        this.$d = this.init(date)
    }

    init(date) {
        let $d = date
        if (!isDate(date)) {
            $d = new Date()
        }
        this.$y = $d.getFullYear()
        this.$M = $d.getMonth()
        this.$D = $d.getDate()
        this.$W = $d.getDay()
        this.$H = $d.getHours()
        this.$m = $d.getMinutes()
        this.$s = $d.getSeconds()
        this.$ms = $d.getMilliseconds()
        return $d
    }

    valueOf(){
        return this.$d.getTime();
    }

    unix(){
        return Math.floor(this.valueOf() / 1000)
    }

    format(tiem , fomat = 'yyyy-MM-dd hh:mm:ss'){

    }

    add(number,unit){
        if (isNaN(number)) return this.$d
        console.log(number)
        const n = Number(number)
        console.log(prettyUnit(unit))

        if (unit === C.M) {
            return this.set(C.M, this.$M + number);
        }

        if (unit === C.Y) {
            return this.set(C.Y, this.$y + number);
        }

        if (unit === C.D) {
            return this.set(C.D, this.$d + number);
        }

        return
    }

    subtract(number,unit){

    }

    month(){
        let now = this.$d; //当前日期
        let nowMonth = now.getMonth(); //当前月
        let nowYear = now.getFullYear(); //当前年
        let monthStartTime = new Date(nowYear, nowMonth, 1);
        let monthEndTime = new Date(nowYear, nowMonth + 1, 0);
        monthEndTime.setHours(23);
        monthEndTime.setMinutes(59);
        monthEndTime.setSeconds(59);
    }
}

let date = new DateTool()

console.log('add',date.add())
