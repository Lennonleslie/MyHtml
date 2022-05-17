
// 获取棋盘(看html)
let bord = document.querySelector('#bord') as HTMLDivElement;
// 时不时的打印出来验证下.之后不留这个东西了.
// console.log(bord)

// 创建玩家(枚举)
enum Player {
  X = 'x',
  O = 'o'
};

// 当前玩家  
let cureentPlayer: Player = Player.X

// 所有单元格
let cells = document.querySelectorAll('.cell');

// 拿到对应单元格的类名的函数.
function hasClass(el: Element, name: string) {
  return el.classList.contains(name)
}

// 获胜的单元格数组
let winsArr = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], //横向获胜数组
  [0, 3, 6], [1, 4, 7], [2, 5, 8], //横向获胜数组
  [0, 4, 8], [2, 4, 6],          //横向获胜数组
]

// 结算面板
let message = document.querySelector('#message') as HTMLDivElement;

// 胜利者标语
let winner = document.querySelector('#winner') as HTMLParagraphElement;

// 下棋次数
let clickNum: number = 0;

// 重新开始按钮元素
let restart = document.querySelector("#restart") as HTMLButtonElement;

// 单元格
let cell = document.querySelectorAll('.cell');
// console.log(cell)

// 开始游戏（重新开始和第一次开始都一样）
// 把重新开始封装成函数，点击重来就触发这个函数。而第一次开始就直接调用一次这个函数！
startGame()
restart.addEventListener('click', startGame)
// 重新开始！（重置游戏）
// 需要得到重新开始的标签及元素
// click是触发这个函数的条件，前缀是addEventlistener
function startGame() {
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
    cureentPlayer = Player.X
    // 重置下棋计数器
    clickNum = 0
    // 但是现在没法重新下棋了，因为我们添加过一个方法了！所以我需要把之前的下棋方法移除在添加!
    cells.forEach(function (item) {
      // 有下棋的动作,在对下棋的格子添加类
      // 添加一个容器容纳单元格。
      let cell = item as HTMLDivElement;
      // 对单元格添加点击事件。
      // 释义：对单元格添加一个点击就触发的函数，每个只能触发一次
      // 先解绑事件(发现不解绑也没出什么问题。)
      cell.removeEventListener('click', clickCell);
      cell.addEventListener('click', clickCell, { once: true });
    });
  })
}
// 下棋事件的添加
// 释义：函数为一个事件，具体类型是鼠标事件。
function clickCell(event: MouseEvent) {
  // 对下棋的单元格类添加玩家名称类型
  let target = event.target as HTMLDivElement
  target.classList.add(cureentPlayer);
  // 下完棋后,先判断是否赢了，在决定是否要切换玩家.
  checkWin(cureentPlayer)
  // 如果没有获胜，则棋盘加一棋子。
  clickNum++
  // 切换玩家
  cureentPlayer = cureentPlayer === Player.X ? Player.O : Player.X;
  //切换下一步提示
  let bord = document.querySelector('#bord') as HTMLDivElement;
  // 得到这个标签后,对这个标签类的方法进行移除玩家,不分什么玩家都移除
  bord.classList.remove(Player.O, Player.X)
  // 然后添加下一个玩家的提示
  bord.classList.add(cureentPlayer)
  // 现在下棋玩家显示及提示都正确了,那么我们需要先做一个平局或者获胜的条件.
};


// 做一个判断输赢平局的函数
function checkWin(player: Player) {
  winsArr.some(function (item) {
    // 在对这个数组继续遍历,并拿到对于的类
    // 每次遍历只对一个数组元素遍历,所以此时只会拿到一个获胜条件中的三个单元格
    // 同一条件的第一个单元格
    let cellIndex0 = item[0];
    // 同一条件的第二个单元格
    let cellIndex1 = item[1];
    // 同一条件的第三个单元格
    let cellIndex2 = item[2];
    // 接着对这三个单元格的类进行检查,如果三个单元格的玩家一样(此时此刻),就为当前玩家获胜.
    // 并且需要拿到对应单元格的类名
    // 如果单元格的类名都包含了当前玩家，则返回true，否则false
    // 这里的返回时返回给了checkwin，如果是true则代表当前玩家赢了。
    if (
      hasClass(cells[cellIndex0], player) &&
      hasClass(cells[cellIndex1], player) &&
      hasClass(cells[cellIndex2], player)) {
      // 因为赢了，所以显示出结算面板
      // 结算面板显示。
      message.style.display = "block";
      // 结算面板的角色显示异常
      // 得到结算面板的玩家获胜标签并修改
      // console.log(cureentPlayer)
      winner.innerText = '"' + cureentPlayer + '"' + ' 赢!'
      return true;
    }

    if (clickNum >= 8) {
      message.style.display = "block";
      winner.innerText = '平局';
    };
    // 如果棋盘不满，则继续
    return false;
  })
}

