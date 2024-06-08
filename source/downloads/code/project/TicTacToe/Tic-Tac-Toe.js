var Player;
(function (Player) {
    Player["X"] = "x";
    Player["O"] = "o";
})(Player || (Player = {}));
var cells = document.querySelectorAll('.cell');
console.log(cells);
//let gameBord=document.querySelector('#bord')
//console.log(gameBord)
var hover = document.getElementsByName(''); //hover 棋牌变换 X ，O  这样也能获取
// console.log(hover)
var message = document.querySelector('#message');
var winner = document.querySelector('#winner');
var restart = document.querySelector('#restart');
var currentPlayer;
var step;
var winArry = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
];
// console.log(winArry[0])
// console.log(winArry[1][1])
startGame();
//重新开始
restart.addEventListener('click', startGame);
//开始函数
function startGame() {
    currentPlayer = Player.X;
    step = 0;
    message.style.display = 'none';
    cells.forEach(function (item) {
        var cell = item;
        cell.classList.remove(Player.X, Player.O, 'no-hover');
        cell.removeEventListener('click', clickCell);
        cell.addEventListener('click', clickCell, { once: true });
        checkHover();
    });
}
// cells.forEach(function(item){
//     //console.log(item)
//     let cell=item as HTMLDivElement
//     cell.addEventListener('click',clickCell,{once:true})
// })
//棋盘中单元格的click事件处理程序
function clickCell(event) {
    var target = event.target; //类型断言
    target.classList.add('no-hover', currentPlayer); //元素将永远不会成为鼠标事件的target
    //调用判赢函数，判断是否获胜
    var isWin = checkWin(currentPlayer);
    if (isWin) {
        message.style.display = 'block';
        winner.innerText = currentPlayer + ' won！！！';
        console.log('当前玩家获胜了', currentPlayer);
        return;
    }
    step++;
    if (step === 9) {
        message.style.display = 'block';
        winner.innerText = '平局';
        console.log('平局');
        return;
    }
    //切换玩家：根据当前当前玩家，得到另一个玩家
    currentPlayer = currentPlayer === Player.X ? Player.O : Player.X;
    //处理下一步提示
    checkHover();
    //gameBord.classList.remove('x','o')
    //gameBord.classList.add(currentPlayer) 
}
//实现判赢函数
function checkWin(player) {
    /*
    实现判赢函数
    1、使用some方法遍历数组，并使用some方法的返回值作为函数返回值
    2、在some方法的回调函数中，获取每种获胜情况对应的3 个单元格
    3、判断这三个单元格是否同时包含当前玩家类名
    4、如果包含，玩家获胜，返回true停止循环，
    否则继续下一次循环
     */
    var isWin = winArry.some(function (item, idex) {
        // 获取每种获胜情况对应的3 个单元格
        // console.log(item)
        // let cell1=cells[item[0]]
        // let cell2=cells[item[1]]
        // let cell3=cells[item[2]]
        // console.log(cell1,cell2,cell3)
        if (cells[item[0]].classList.contains(player) &&
            cells[item[1]].classList.contains(player) &&
            cells[item[2]].classList.contains(player)) {
            return true;
        }
        return false;
    });
    return isWin;
}
//处理下一步提示
function checkHover() {
    // for (let i = 0; i < hover.length; i++) {
    //     cells[i].setAttribute('hover', currentPlayer)
    // }
    cells.forEach(function (item, index) {
        item.setAttribute('hover', currentPlayer);
    });
}
