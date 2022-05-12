// 个人第一次重写
// 第一个目标:养成良好习惯,先整理思路注释,然后根据注释写代码
// 第二个目标:代码后面;结尾
// 第三个目标:程序运行起来
// 一,声明需要的变量,函数等.
// 获取棋盘(看html)
var bord = document.querySelector('#bord');
// 时不时的打印出来验证下.之后不留这个东西了.
// console.log(bord)
// 创建玩家(枚举)
var Player;
(function (Player) {
    Player["X"] = "x";
    Player["O"] = "o";
})(Player || (Player = {}));
;
// 当前玩家  
var cureentPlayer = Player.X;
// 所有单元格
var cells = document.querySelectorAll('.cell');
// 拿到对应单元格的类名的函数.
// 这个函数的格式是,()里面是外部可以填入函数内的数据,方便函数计算.
// {}内是计算方法,以及一些其他功能
// 释义:给我一个el参数,和name参数,并且符合参数类型
function hasClass(el, name) {
    // 释义：返回el的类中包含的name值给hasClass
    return el.classList.contains(name);
}
// 获胜的单元格数组
var winsArr = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6], //横向获胜数组
];
// 结算面板
var message = document.querySelector('#message');
// 胜利者标语
var winner = document.querySelector('#winner');
// 下棋次数
var clickNum = 0;
// 重新开始按钮元素
var restart = document.querySelector("#restart");
// 单元格
var cell = document.querySelectorAll('.cell');
// console.log(cell)
// 开始游戏（重新开始和第一次开始都一样）
// 把重新开始封装成函数，点击重来就触发这个函数。而第一次开始就直接调用一次这个函数！
startGame();
restart.addEventListener('click', startGame);
// 第一步,先完成下棋步骤
// 有了下棋的格子,在对对应的格子进行下棋
// 那么我们先获得单元格的类()
// 拿到单元格
// 获取单元格的类(先遍历)（优化后删除！）
cells.forEach(function (item) {
    // 有下棋的动作,在对下棋的格子添加类
    // 添加一个容器容纳单元格。
    var cell = item;
    //对单元格添加点击事件。
    // 释义：对单元格添加一个点击就触发的函数，每个只能触发一次
    cell.addEventListener('click', clickCell, { once: true });
});
// 下棋事件的添加
// 释义：函数为一个事件，具体类型是鼠标事件。
function clickCell(event) {
    // 对下棋的单元格类添加玩家名称类型
    // 释义：这个动作的目标是对类型添加一个玩家类.但是需要类型断言
    var target = event.target;
    target.classList.add(cureentPlayer);
    // 下完棋后,先判断是否赢了，在决定是否要切换玩家.
    // 下面做了一个获胜的函数，调用一下。
    checkWin(cureentPlayer);
    // 如果没有获胜，则棋盘加一棋子。
    clickNum++;
    // 释义:如果是=号,那是赋值,===是严格判断.是两种用法.
    // 判断之后.在赋值.
    cureentPlayer = cureentPlayer === Player.X ? Player.O : Player.X;
    //切换下一步提示
    // 先获取到对于单元格的提示的标签(css里的board,html里的bord)
    // 得知,这个标签是对整个棋盘不论什么位置都有标签,所以现在肯定是有个类标签的
    // 那么获取到这个标签的类,就对当前提示的类进行移除,并且重新添加
    var bord = document.querySelector('#bord');
    // 得到这个标签后,对这个标签类的方法进行移除玩家,不分什么玩家都移除
    bord.classList.remove(Player.O, Player.X);
    // 然后添加下一个玩家的提示
    bord.classList.add(cureentPlayer);
    // 现在下棋玩家显示及提示都正确了,那么我们需要先做一个平局或者获胜的条件.
    // 获胜条件写在了切换玩家之前。
}
;
// 做一个判断输赢平局的函数
function checkWin(player) {
    // 平局只有棋盘下满的时候才能平局,但获胜在下满之前和下满的时候都可能存在
    // 所以需要先判断是否存在输赢
    // 每次点击之后,遍历获胜数组是否都满足同一个玩家,满足就获胜,否则就继续/平局.
    // 先遍历对于的单元格数组(因为满足胜利条件后,就不在继续遍历,所以推荐使用some遍历)
    // 释义:先得到数组中的各个数组元素,因为这是数组套数组
    winsArr.some(function (item) {
        // 在对这个数组继续遍历,并拿到对于的类
        // 每次遍历只对一个数组元素遍历,所以此时只会拿到一个获胜条件中的三个单元格
        // 同一条件的第一个单元格
        var cellIndex0 = item[0];
        // 同一条件的第二个单元格
        var cellIndex1 = item[1];
        // 同一条件的第三个单元格
        var cellIndex2 = item[2];
        // 接着对这三个单元格的类进行检查,如果三个单元格的玩家一样(此时此刻),就为当前玩家获胜.
        // 为了简洁,我们有棋盘全部的遍历,且拿到了各自的单元格.
        // 并且需要拿到对应单元格的类名
        // cells[cellIndex0] (棋盘中的对应单元格)
        // 如果单元格的类名都包含了当前玩家，则返回true，否则false
        // 这里的返回时返回给了checkwin，如果是true则代表当前玩家赢了。
        if (hasClass(cells[cellIndex0], player) &&
            hasClass(cells[cellIndex1], player) &&
            hasClass(cells[cellIndex2], player)) {
            // 因为赢了，所以显示出结算面板
            // 结算面板显示。
            message.style.display = "block";
            // 结算面板的角色显示异常
            // 得到结算面板的玩家获胜标签并修改
            // console.log(cureentPlayer)
            winner.innerText = '"' + cureentPlayer + '"' + ' 赢!';
            return true;
        }
        // 这个应该是在判赢之后执行，但是现在明明赢了却提示平局！！（获胜数组没该对！横向条件少了两个）
        // 假设两个都没有赢，但是棋盘满了！就是和局
        // 那么我需要知道棋盘是否下满，两种方式，一种是所有棋盘都有X或O类，或者下棋了九次！
        // 简单而言就计数肯定简单些！那么我先尝试计数！
        // 在下棋结算之后添加下棋计数器
        // 如果棋盘满了！则提示平局
        // console.log(clickNum);
        if (clickNum >= 8) {
            message.style.display = "block";
            winner.innerText = '平局';
        }
        ;
        // 如果棋盘不满，则继续
        return false;
    });
}
// 重新开始！（重置游戏）
// 需要得到重新开始的标签及元素
// click是触发这个函数的条件，前缀是addEventlistener
function startGame() {
    restart.addEventListener('click', function () {
        // 隐藏面板
        message.style.display = "none";
        // 清空单元格的所有类
        // 先拿到单元格的所有类。
        cell.forEach(function (item) {
            //清空玩家类
            item.classList.remove(Player.O, Player.X);
            // 重置棋盘玩家及默认玩家(放哪里感觉都一样)
            bord.classList.remove(Player.O, Player.X);
            bord.classList.add(Player.X);
            cureentPlayer = Player.X;
            // 重置下棋计数器
            clickNum = 0;
            // 但是现在没法重新下棋了，因为我们添加过一个方法了！所以我需要把之前的下棋方法移除在添加!
            // item.removeEventListener('click',clickCell)
            cells.forEach(function (item) {
                // console.log(item);
                // 有下棋的动作,在对下棋的格子添加类
                // 添加一个容器容纳单元格。
                var cell = item;
                //对单元格添加点击事件。
                // 释义：对单元格添加一个点击就触发的函数，每个只能触发一次
                // 先解绑事件(发现不解绑也没出什么问题。)
                cell.removeEventListener('click', clickCell);
                cell.addEventListener('click', clickCell, { once: true });
            });
        });
    });
}
// 优化！其实重新开始游戏和第一次开始游戏都是一样的！
// 那么第一次游戏的很多遍历和重新开始的变量内容很多重复的，就可以删减掉了！
// 修改为重置游戏函数
