
// 获取时间显示块
let chinaTime = document.querySelector('#chinaTime') as HTMLParagraphElement
// 时间刷新1s
setInterval(function () {
    // 刷新的时候，对chinaTime的标签进行重新赋值，是农历
    chinaTime.innerText = new Date().toLocaleString('zh-CN-u-ca-chinese')
        .replace(/(\d+)\s*?年/, (_, y) => "甲乙丙丁戊己庚辛壬癸".charAt((y - 4) % 10)
            + "子丑寅卯辰巳午未申酉戌亥".charAt((y - 4) % 12))
    //这行代码的出处：https://www.mzh.ren/javascript-1-line-get-lunar-date.html
}, 1000)
