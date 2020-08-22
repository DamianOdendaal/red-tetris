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
    let current = theTetraminoes[0][0]

    /*
    **    A function used to draw the first rotation 
    **    of the first selected tetramino
    */

    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetramino')
        })
    }

    draw()

})