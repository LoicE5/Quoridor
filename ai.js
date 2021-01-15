if(numOfPlayers == 1){

    let doNotGo = {
        left: false,
        right: false,
        top: false,
        bottom: false
    }


    setInterval( ()=>{
        doNotGo = {
            left: false,
            right: false,
            top: false,
            bottom: false
        }
    },7000);

    setInterval( ()=>{

        if(tour == 'red'){

            let currentSquare = returnCurrentSquare('red');
            let ennemySquare = returnCurrentSquare('blue');
            let ennemyId = ennemySquare.id;

            let wallsAbove = getWallsAbove(ennemyId);

            console.log(wallsAbove);

            let nextSquare = {
                top: document.querySelector(`#sq${Number(getNb('sq',currentSquare.id)-9)}`),
                bottom: document.querySelector(`#sq${Number(getNb('sq',currentSquare.id)+9)}`),
                left: document.querySelector(`#sq${Number(getNb('sq',currentSquare.id)-1)}`),
                right: document.querySelector(`#sq${Number(getNb('sq',currentSquare.id)+1)}`)
            }

            let forwardOrWall = randomInt(0,1);

            if(forwardOrWall == 0){

                if(!currentSquare.classList.contains('wall-bottom') && !doNotGo.bottom){

                    click(nextSquare.bottom);

                } else {
                    if(!currentSquare.classList.contains('wall-right') && !doNotGo.right){

                        click(nextSquare.right);
                        doNotGo.bottom = true;
        
                    } else {
                        if(!nextSquare.left.classList.contains('wall-right') && !doNotGo.left){
        
                            click(nextSquare.left);
                            doNotGo.right = true;
            
                        } else if(!nextSquare.top.classList.contains('wall-bottom') && !doNotGo.top){
            
                            click(nextSquare.top);
                            doNotGo.left = true;
                            
                        }
                    }
                }

            } else if(forwardOrWall == 1){
                let whichWall = randomInt(0,wallsAbove.length);
                let middleWall = 2;

                let wallTable = [whichWall,middleWall];

                click(wallsAbove[wallTable[randomInt(0,1)]]);

            }
        }
    },1000);
}