/*
**     Docstring here 
*/

document.addEventListener('DOMContentLoaded', () => {
    const width = 10
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const grid = document.querySelector('.grid')
    let nextRandomIndex = 0
    const scoreDisplay = document.querySelector('#score')
    const startButton = document.querySelector('#start-button')
    const pauseButton = document.querySelector('#pause-button')
    let timderId
    let score = 0 

   /*
   **   Array to make the L shape tetramino
   */
    const lTetramino = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width+2+1, width*2],
        [width, width*2, width*2+1, width*2+2]
    ]

    /*
    **   Array to make the T shape tetramino
    */
    const tTetramino = [
        [1, width, width+1, width+2],
        [1, width+1, width+2, width*2+1],
        [width, width+1, width+2, width*2+1], 
        [1, width, width+1, width*2+1] 
    ]

    /*
    **   Array to make the Z shape tetramino
    */
    const zTetramino = [
        [0, width, width+1, width*2+1],
        [width+1, width+2, width*2, width*2+1],
        [0, width , width+1, width*2+1], 
        [width+1, width+2, width*2, width*2+1]
    ]


    /*
    **   Array to make the O shape tetramino
    */
    const oTetramino = [
        [0,1,width, width+1],
        [0,1,width, width+1],
        [0,1,width, width+1],
        [0,1,width, width+1]
    ]

    /*
    **   Array to make the i shape tetramino
    */
    const iTetramino = [
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3],
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3]
      ]

      /*
      **       Now that we have created all of our tetraminos we 
      **       insert them all into an array and work with our
      **       tetramino array
      */

      //TODO: change variable names
      const theTetraminoes = [lTetramino, zTetramino, tTetramino, oTetramino, iTetramino]

    /*
    **   Here we are going to select a tetramino and a 
    **   position in which it is going to start
    */

    let currentPosition = 4
    let currentRotation = 0

    let random = Math.floor(Math.random()*theTetraminoes.length)

      console.log(random)
      
    let current = theTetraminoes[random][currentRotation]

    /*
    **    A function used to draw the first rotation 
    **    of the first selected tetramino
    */

    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetramino')
        })
    }

    /*
    **      A function used to remove the tertaminos from 
    **      the screen once they are no longer needed
    */

    function removeDrawn() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetramino')
        })
    }

    /*
    **  Now that we have tetraminos and are able to draw and remove
    **  them from the screen lets start making them move 
    */

    // timderId = setInterval(moveDown, 1000)

    /*
    **  While we are moving down we need to be able to 
    **  move to the sides so we must listen for keys that 
    **  will enable us to move from side to side
    */

    function controlTetramino(e) {
        //catering for when we move left
        if (e.keyCode === 37 || e.keyCode === 65){
            allowLeft()
        }
        //catering for when we move right
        else if (e.keyCode === 39 || e.keyCode === 68){
            allowRight()
        }
        //catering for when we move faster
        else if (e.keyCode === 40 || e.keyCode === 83){
            allowLeft()
        }
        //catering for when we rotate te block
        else if (e.keyCode === 38 || e.keyCode === 87){
            rotateTetramno()
        }
    }
    document.addEventListener('keyup', controlTetramino)

    function moveDown() {
        removeDrawn()
        currentPosition += width 
        draw()
        stopBlocks()
    }

    /*
    **   We need to cater for if a block hits the bottom.  We need to make sure that 
    **    we know that it is the bottom and it will stop there.  So we do checks to see
    **    what is below us the whole time
    */

    function stopBlocks() {
        if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))){
            current.forEach(index => squares[currentPosition + index].classList.add('taken'))

            /*
            **  So now that we have made a block stop we need to make a new one start falling
            **  from the top again
            */

            random = nextRandomIndex
            random = Math.floor(Math.random()*theTetraminoes.length)
            current = theTetraminoes[random][currentRotation]
            currentPosition = 4
            draw()
            drawShape()
        }
    }

    /*
    **  Now we set rules to make sure that the blocks do not 
    **  leave the set boundries for the game
    */

    function allowLeft () {
        removeDrawn()
        const isAtLeftEnd = current.some(index => (currentPosition + index) % width === 0)
        if (!isAtLeftEnd){
            currentPosition -= 1
        }
        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))){
            currentPosition += 1
        }
        draw()
    }

    function allowRight () {
        removeDrawn()
        const isAtRigtEnd = current.some(index => (currentPosition + index) % width === width - 1)
        if (!isAtRigtEnd){
            currentPosition += 1
        }
        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))){
            currentPosition -= 1
        }
        draw()
    }

    /*
    **      Catering for when a user wants to rotate the 
    **      tetramino as it is falling 
    */

    function rotateTetramno() {
        removeDrawn()
        currentRotation ++
        // if it gets to the fourth rotation the next would need 
        // to be the first rotation again
        if (currentRotation === current.length){
            currentRotation = 0
        }
        current = theTetraminoes[random][currentRotation]
        draw()
    }


    /*
    **  This is to cater for when a user sees the 
    **  next tetramino that they are going to be getting
    */

    const displaySquares = document.querySelectorAll('.mini-grid div')
    const displayWidth = 4
    let displayIndex = 0
   
    const nextTetraminoes = [
        // L tetramino
        [1, displayWidth+1, displayWidth*2+1, 2],
        // Z Tetromino
        [0, displayWidth, displayWidth+1, displayWidth*2+1], 
        // T Tetromino
        [1, displayWidth, displayWidth+1, displayWidth+2],
        // O Tetromino
        [0, 1, displayWidth, displayWidth+1], 
        // I Tetromino
        [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1] 

        // all tetrominos are in their first rotation
    ]

    /*
    **  draw the shape in the side grid now
    */

    function drawShape() {
        displaySquares.forEach(square => {
            square.classList.remove('tetramino')
        })
        nextTetraminoes[nextRandomIndex].forEach(index => {
            displaySquares[displayIndex + index].classList.add('tetramino')
        })
    }

    /*
    **  Functionallity to start and or pause the game makig use of set 
    **  and clear inteval
    */

    startButton.addEventListener('click', () => {
        if (!timderId){
            draw()
            timderId = setInterval(moveDown, 1000)
            nextRandomIndex = Math.floor(Math.random()*theTetraminoes.length)
            drawShape()
        }
    })
    pauseButton.addEventListener('click', () => {
        if (timderId){
            clearInterval(timderId)
            timderId = null
        }
    })

    /*
    **      Now we are going to cater for when the rows
    **      get filled up by blocks so we can remove them
    **      in doing this the users score needs to increase
    */

    function scoreManager() {
        for (let ind = 0; ind < 199; ind++){
            const row = [ind, ind+1, ind+2,ind+3, ind+4, ind+5, ind+6, ind+7, ind+8, ind+9]

            if (row.every(index => squares[ind].classList.contains('taken'))){
                score += 10
                scoreDisplay.innerHTML = score
                row.forEach(index => {
                    squares[index].classList.remove('taken')
                    squares[index].classList.remove('tetramino')
                })
                const removedBlocks = squares.splice(ind, width)
                squares = removedBlocks.concat(squares)
                squares.forEach(cell => grid.appendChild(cell))
            }
        }
    }
    
})