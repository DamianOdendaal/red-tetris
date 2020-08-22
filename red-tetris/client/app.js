/*
**     Docstring here 
*/

document.addEventListener('DOMContentLoaded', () => {
    const width = 10
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const grid = document.querySelector('.grid')

    const scoreDisplay = document.querySelector('#score')
    const startButton = document.querySelector('#start-button')

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

    timderId = setInterval(moveDown, 1000)

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

           random = Math.floor(Math.random()*theTetraminoes.length)
           current = theTetraminoes[random][currentRotation]
           currentPosition = 4
           draw()
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



})