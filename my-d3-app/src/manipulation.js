const timeStampToDate = (ts) => {
    let date = new Date(ts)
    return {
        year: date.getFullYear(),
        month: date.getMonth(),
        date: date.getDate(),
        day: date.getDay(),
        hr: date.getHours(),
        min: date.getMinutes(),
        sec: date.getSeconds()
    }
}

export const filterDataByDate = (datas) => {
    if (datas.length) {
        let map = {}
        for (let i = 0; i < datas[0].length; i++) {
            let dateInfo = Number(datas[0][i].first_seen_utc) * 1000 //number(timestamp)
            let obj = timeStampToDate(dateInfo)
            if (map.hasOwnProperty(obj.date) === false) {
                map[obj.date] = []
                map[obj.date].push(datas[0][i])
            } else {
                map[obj.date].push(datas[0][i])
            }
        }
        return map;
    }
}