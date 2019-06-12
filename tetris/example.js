const keypress = require('keypress');
const terminalKit = require('terminal-kit').terminal




// let first = Array(70).fill(' ',1,9);
// first[0] = '■'
// first[69] = '■'


let tetris = []

let test0 = ['■', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '■']
let test1 = ['■', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '■']
let test2 = ['■', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '■']
let test3 = ['■', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '■']
let test4 = ['■', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '■']
let test5 = ['■', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '■']
let test6 = ['■', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '■']
let test7 = ['■', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '■']
let test8 = ['■', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '■']
let test9 = ['■', '■', '■', '■', '■', '■', '■', '■', '■', '■']

tetris[0] = test0
tetris[1] = test1
tetris[2] = test2
tetris[3] = test3
tetris[4] = test4
tetris[5] = test5
tetris[6] = test6
tetris[7] = test7
tetris[8] = test8
tetris[9] = test9

// let curItem = 'rec'
// let curItem = 'nien'
// let curItem = 'rev_nien'
let curItem = 'straight'

let curItemLength = ''
let curItemHeight = ''

const clearMap = () => {
  console.clear()
  for (let i = 0; i < tetris.length - 1; i++) {
    for (let j = 1; j < tetris[i].length - 1; j++) {
      tetris[i][j] = " "
    }
  }


}

let x = 1;
let y = 3;

const createFigure = (figureName) => {
  switch (figureName) {
    case 'rec': {
      curItem = 'rec'
      curItemLength = 2
      curItemHeight = 2
      tetris[x][y] = "*"
      tetris[x][y + 1] = "*"
      tetris[x + 1][y] = "*"
      tetris[x + 1][y + 1] = "*"
      break;
    }

    case 'nien': {
      curItem = 'nien'
      curItemLength = 3
      curItemHeight = 2
      tetris[x][y] = "*"
      tetris[x + 1][y] = "*"
      tetris[x + 1][y + 1] = "*"
      tetris[x + 1][y + 2] = "*"
      break;
    }

    case 'rev_nien': {
      curItem = 'rev_nien'
      curItemLength = 3
      curItemHeight = 2
      tetris[x + 1][y] = "*"
      tetris[x + 1][y + 1] = "*"
      tetris[x + 1][y + 2] = "*"
      tetris[x][y + 2] = "*"
      break;
    }

    case 'straight': {
      curItem = 'straight'
      curItemLength = 1
      curItemHeight = 4
      tetris[x][y+1] = "*"
      tetris[x+1][y+1] = "*"
      tetris[x+2][y+1] = "*"
      tetris[x+3][y+1] = "*"
      break;
    }
  }
}

createFigure(curItem)

const moveFigure = (startX, startY, figureName, rotateCnt) => {
  switch (figureName) {
    case 'rec': {
      curItemHeight = 2
      tetris[startX][startY] = "*"
      tetris[startX][startY + 1] = "*"
      tetris[startX + 1][startY] = "*"
      tetris[startX + 1][startY + 1] = "*"
      break;
    }

    case 'nien': {
      switch (rotateCnt) {
        case 0: {
          console.log(`첫번째 모양`)


          curItemLength = 3
          curItemHeight = 2

          tetris[startX][startY] = "*"
          tetris[startX + 1][startY] = "*"
          tetris[startX + 1][startY + 1] = "*"
          tetris[startX + 1][startY + 2] = "*"

          break;
        }

        case 1: {
          //x좌표 왼쪽 제일 위 (3*3)
          curItemLength = 2
          curItemHeight = 3
          tetris[startX][startY] = "*"
          tetris[startX][startY + 1] = "*"
          tetris[startX + 1][startY] = "*"
          tetris[startX + 2][startY] = "*"

          break;
        }

        case 2: {

          curItemLength = 3
          curItemHeight = 2
          tetris[startX][startY] = "*"
          tetris[startX][startY + 1] = "*"
          tetris[startX][startY + 2] = "*"
          tetris[startX + 1][startY + 2] = "*"

          break;
        }

        case 3: {

          curItemLength = 2
          curItemHeight = 3
          tetris[startX - 1][startY + 1] = "*"
          tetris[startX][startY + 1] = "*"
          tetris[startX + 1][startY + 1] = "*"
          tetris[startX + 1][startY] = "*"



          break;
        }
      }
      break;
    }

    case 'rev_nien': {
      switch (rotateCnt) {
    
        case 0: {
        console.log("여기타야되00")


        clearMap()
        curItemLength = 3
        curItemHeight = 2
        tetris[startX+1][startY] = "*"
        tetris[startX+1][startY + 1] = "*"
        tetris[startX+1][startY + 2] = "*"
        tetris[startX][startY + 2] = "*"
        break;
        }

        case 1: {
      console.log("여기타야되11")

        clearMap()
        curItemLength = 2
        curItemHeight = 3
        tetris[startX][startY] = "*"
        tetris[startX + 1][startY] = "*"
        tetris[startX + 2][startY] = "*"
        tetris[startX + 2][startY + 1] = "*"


      break;
        }

        case 2: {

        clearMap()
        curItemLength = 3
        curItemHeight = 2
        console.log("여기타야되22")
        tetris[startX][startY] = "*"
        tetris[startX + 1][startY] = "*"
        tetris[startX][startY + 1] = "*"
        tetris[startX][startY + 2] = "*"

        break;
        }

        case 3: {

        clearMap()
        curItemLength = 2
        curItemHeight = 3
        console.log("여기타야되33")
        tetris[startX][startY] = "*"
        tetris[startX][startY + 1] = "*"
        tetris[startX + 1][startY + 1] = "*"
        tetris[startX + 2][startY + 1] = "*"
        break;
        }

      }
      break
    }
      

    case 'straight': {
      switch (rotateCnt) {
    
        case 0: {
          console.log("여기타야되00")


          clearMap()
          curItemLength = 1
          curItemHeight = 4
          tetris[startX][startY + 1] = "*"
          tetris[startX+1][startY + 1] = "*"
          tetris[startX+2][startY + 1] = "*"
          tetris[startX+3][startY + 1] = "*"
          break;
        }

        case 1: {
          console.log("여기타야되11")

          clearMap()
          curItemLength = 4
          curItemHeight = 1
          tetris[startX + 1][startY] = "*"
          tetris[startX + 1][startY + 1] = "*"
          tetris[startX + 1][startY + 2] = "*"
          tetris[startX + 1][startY + 3] = "*"
          break;
        }

        case 2: {

          clearMap()
          curItemLength = 1
          curItemHeight = 4
          console.log("여기타야되22")
          tetris[startX][startY] = "*"
          tetris[startX + 1][startY] = "*"
          tetris[startX + 2][startY] = "*"
          tetris[startX + 3][startY] = "*"

          break;
        }

        case 3: {

          clearMap()
          curItemLength = 4
          curItemHeight = 1
          console.log("여기타야되33")
          tetris[startX + 2][startY] = "*"
          tetris[startX + 2][startY + 1] = "*"
          tetris[startX + 2][startY + 2] = "*"
          tetris[startX + 2][startY + 3] = "*"
          break;
        }

      }
      break
    }
  }



}

const rotateFigure = (startX, startY, figureName, cnt) => {
  switch (figureName) {
    case 'nien': {
      switch (cnt) {
        case 0: {
          console.log(`첫번째 모양`)

          if (startX + 1 < tetris.length - 1 && startY + 2 < tetris[0].length - 1) {
            console.log(`여기여기여기여기타버렸음0`)

            clearMap()
            curItemLength = 3
            curItemHeight = 2

            tetris[startX][startY] = "*"
            tetris[startX + 1][startY] = "*"
            tetris[startX + 1][startY + 1] = "*"
            tetris[startX + 1][startY + 2] = "*"

            // clickCnt++
          } else {
            console.log(`회전할 수 없습니다asd.`)
          }

          // clickCnt = 1
          break;
        }

        case 1: {
          console.log(`두번째 모양`)

          if (startX - 1 >= 0 && startX + 1 < tetris.length - 1 && startY + 1 < tetris[0].length - 1) {
            console.log(`여기여기여기여기타버렸음1`)

            clearMap()
            curItemLength = 2
            curItemHeight = 3
            tetris[startX - 1][startY] = "*"
            tetris[startX - 1][startY + 1] = "*"
            tetris[startX][startY] = "*"
            tetris[startX + 1][startY] = "*"

            // clickCnt++
          } else {
            console.log(`회전할 수 없습니다qwe.`)
          }
          // clickCnt = 2
          break;
        }

        case 2: {
          console.log(`세번째 모양`)

          if (startX + 1 < tetris.length - 1 && startY + 2 < tetris[0].length - 1) {
            console.log(`여기여기여기여기타버렸음2`)

            clearMap()
            curItemLength = 3
            curItemHeight = 2
            tetris[startX][startY] = "*"
            tetris[startX][startY + 1] = "*"
            tetris[startX][startY + 2] = "*"
            tetris[startX + 1][startY + 2] = "*"

            // clickCnt++

          } else {
            console.log(`회전할 수 없습니다.`)

          }

          // clickCnt = 3
          break;
        }

        case 3: {
          console.log(`네번째 모양`)

          if (startX - 1 >= 0 && startX + 1 < tetris.length - 1 && startY + 1 < tetris[0].length - 1) {
            console.log(`여기여기여기여기타버렸음3`)

            clearMap()
            curItemLength = 2
            curItemHeight = 3
            tetris[startX - 1][startY + 1] = "*"
            tetris[startX][startY + 1] = "*"
            tetris[startX + 1][startY + 1] = "*"
            tetris[startX + 1][startY] = "*"

            // clickCnt = 0;

          } else {
            console.log(`회전할 수 없습니다dfg.`)

          }
          // clickCnt = 0
          break;
        }
      }

      break;
    }

    case 'rev_nien': {
      switch (cnt) {
        case 0: {
          console.log("여기타야되00")

          if (startX + 1 < tetris.length - 1 && startY + 2 < tetris[0].length - 1) {
            clearMap()
            curItemLength = 3
            curItemHeight = 2
            tetris[startX + 1][startY] = "*"
            tetris[startX + 1][startY + 1] = "*"
            tetris[startX + 1][startY + 2] = "*"
            tetris[startX][startY + 2] = "*"

          } else {
            console.log('회전불가능')
          }


          break;
        }

        case 1: {
          console.log("여기타야되11")
          if (startX + 2 < tetris.length - 1 && startY + 1 < tetris[0].length - 1) {
            clearMap()
            curItemLength = 2
            curItemHeight = 3
            tetris[startX][startY] = "*"
            tetris[startX + 1][startY] = "*"
            tetris[startX + 2][startY] = "*"
            tetris[startX + 2][startY + 1] = "*"


          } else {
            console.log('회전불가능')
          }


          break;
        }

        case 2: {
          if (startX + 1 < tetris.length - 1 && startY + 2 < tetris[0].length - 1) {
            clearMap()
            curItemLength = 3
            curItemHeight = 2
            console.log("여기타야되22")
            tetris[startX][startY] = "*"
            tetris[startX + 1][startY] = "*"
            tetris[startX][startY + 1] = "*"
            tetris[startX][startY + 2] = "*"


          } else {
            console.log('회전불가능')
          }


          break;
        }

        case 3: {
          if ( startX + 2 < tetris.length - 1 && startY + 2 < tetris[0].length - 1) {
            clearMap()
            curItemLength = 2
            curItemHeight = 3
            console.log("여기타야되33")
            tetris[startX][startY] = "*"
            tetris[startX][startY + 1] = "*"
            tetris[startX + 1][startY + 1] = "*"
            tetris[startX + 2][startY + 1] = "*"


          } else {
            console.log('회전불가능')
          }



          break;
        }
      }
      break;
    }

    case 'straight': {
      switch (cnt) {
    
        case 0: {
          console.log("여기타야되00")
          clearMap()
          curItemLength = 1
          curItemHeight = 4
          tetris[startX][startY + 1] = "*"
          tetris[startX+1][startY + 1] = "*"
          tetris[startX+2][startY + 1] = "*"
          tetris[startX+3][startY + 1] = "*"
          break;
        }

        case 1: {
          console.log("여기타야되11")
          clearMap()
          curItemLength = 4
          curItemHeight = 1
          tetris[startX + 1][startY] = "*"
          tetris[startX + 1][startY + 1] = "*"
          tetris[startX + 1][startY + 2] = "*"
          tetris[startX + 1][startY + 3] = "*"
          break;
        }

        case 2: {

          clearMap()
          curItemLength = 1
          curItemHeight = 4
          console.log("여기타야되22")
          tetris[startX][startY] = "*"
          tetris[startX + 1][startY] = "*"
          tetris[startX + 2][startY] = "*"
          tetris[startX + 3][startY] = "*"

          break;
        }

        case 3: {

          clearMap()
          curItemLength = 4
          curItemHeight = 1
          console.log("여기타야되33")
          tetris[startX + 2][startY] = "*"
          tetris[startX + 2][startY + 1] = "*"
          tetris[startX + 2][startY + 2] = "*"
          tetris[startX + 2][startY + 3] = "*"
          break;
        }

      }
      break
    }
  }

}
const showTetris = () => {
  console.log(`- INFOMAZTION AREA -`)
  for (let i = 0; i < tetris.length; i++) {
    for (let j = 0; j < tetris[i].length; j++) {
      if (tetris[i][j] == "*") {
        terminalKit.red(tetris[i][j] + " ")
      } else {
        terminalKit.blue(tetris[i][j] + " ")
        // process.stdout.write(first[i][j] + " ")
      }
    }
    terminalKit.blue('\n')

    // process.stdout.write('\n')

  }
}

console.clear()
showTetris()






// make `process.stdin` begin emitting "keypress" events
keypress(process.stdin);
let clickCnt = 1;

// listen for the "keypress" event
process.stdin.on('keypress', async function (ch, key) {
  // console.log(ch)

  with (key) {
    switch (name) {
      case 'up': {
        console.clear()

        if (clickCnt > 3) {
          clickCnt = 0
        }
        rotateFigure(x, y, curItem, clickCnt)
        clickCnt++

        showTetris()

        break;

      }
      case 'down': {
        console.clear()

        if (x + 1 + curItemHeight < tetris.length) {

          clearMap()

          x = x + 1

          moveFigure(x, y, curItem, clickCnt - 1)
          showTetris()

        } else {
          // console.log('더이상 이동할 수 없습니다.')
          showTetris()

        }
        console.log('DOWN');
        break;
      }
      case 'left': {

        console.clear()

        if (y - 1 != 0) {
          console.log(`y -->> ${y}`)

          clearMap()

          y = y - 1


          console.log(clickCnt - 1)
          moveFigure(x, y, curItem, clickCnt - 1)


          showTetris()

        } else {
          console.log(`y -->> ${y}`)
          console.log('더이상 이동할 수 없습니다.')
          showTetris()


        }



        //  x -= 1


        console.log('LEFT');
        break;
      }
      case 'right': {
        console.clear()

        if (y + 1 != tetris.length - curItemLength) {

          clearMap(curItem)

          y = y + 1

          moveFigure(x, y, curItem, clickCnt - 1)
          showTetris()

        } else {
          // console.log('더이상 이동할 수 없습니다.')
          showTetris()


        }
        console.log('RIGHT');
        break;
      }

      case 'space': console.log('SPACE'); break;

      default: console.log(`${name}는 유효하지 않는 키 입니다.`); break;
    }
  }
  if (key && key.ctrl && key.name == 'c') {
    process.stdin.pause();
    console.log('테트리스를 종료합니다.')
  }
});

process.stdin.setRawMode(true);
process.stdin.resume();








// console.log(tetrisMap)

// const array = Array(100).fill(null).map(() => Array());
// console.log(array);    //[[],[],[],[]]

// const array = Array.from(Array(4),()=> Array());
// console.log(array);    //[[],[],[],[]]