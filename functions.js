function createSquare(idCount){
    let square = document.createElement('div');
    square.classList.add('square');
    square.id = 'sq'+idCount;
    idCount++;
    document.querySelector(".squares-container").appendChild(square);
}

function createWall(idCount,topLeft,side,rowColumn){
    let wall = document.createElement('div');
    if(side == 'vertical'){
        wall.classList.add('vertical-wall');
        wall.classList.add(`column-${rowColumn}`);
        wall.style.top = topLeft;
    } else if (side == 'horizontal'){
        wall.classList.add('horizontal-wall');
        wall.classList.add(`row-${rowColumn}`);
        wall.style.left = topLeft;
    }
    wall.id = 'wl'+idCount;
    document.querySelector(".squares-container").appendChild(wall);
}

function movePawn(color,target){

    let element = document.querySelector(target);
    let path;

    if(color == 'red'){
        path = redPath;
    } else if(color == 'blue'){
        path = bluePath;
    } else if(color == 'green'){
        path = greenPath;
    } else if(color == 'purple'){
        path = purplePath;
    } else {
        console.log('Invalid path. You entered : '+path);
    }

    element.style.backgroundImage = path;

    if(color == 'red'){
        document.getElementById(previousSquare.red).style.backgroundImage = '';
        previousSquare.red = element.id;
    } else if(color == 'blue'){
        document.getElementById(previousSquare.blue).style.backgroundImage = '';
        previousSquare.blue = element.id;
    } else if(color == 'green'){
        document.getElementById(previousSquare.green).style.backgroundImage = '';
        previousSquare.green = element.id;
    } else if(color == 'purple'){
        document.getElementById(previousSquare.purple).style.backgroundImage = '';
        previousSquare.purple = element.id;
    }

}

function createWallList(targetId,horizon){
    let wall = document.createElement('div');
    horizon ? wall.classList.add('walls-list-horizon') : wall.classList.add('walls-list-item');
    document.querySelector(`#${targetId}`).appendChild(wall);
}

function removeWallFromWallList(color){
    let wallsId;
    
    if(color == 'red'){
        wallsId = '#walls1';
    } else if(color == 'blue'){
        wallsId = '#walls2';
    } else if(color == 'green'){
        wallsId = '#walls3';
    } else if(color == 'purple'){
        wallsId = '#walls4';
    } else {
        console.log('You entered the wrong color. You entered : '+color);
    }

    wallCount[color]--;
    document.querySelector(wallsId).removeChild(document.querySelector(wallsId).lastChild);
}

function addVerticalWall(vWl){

    let wall_id = getNb("wl",vWl.id);
    let wall_column = getNb("column-",vWl.classList[1]);

    let first_square = wall_column+Number(9*(wall_id-1));
    let second_square = first_square+Number(9);

    /*⬇ On empêche de placer un mur chavauchant un mur existant par le haut ou par le bas ⬇*/
    if((document.querySelector(`#wl${wall_id-1}.vertical-wall.column-${wall_column}`) == null // Pour le mur n°1 de la colonne
    || !document.querySelector(`#wl${wall_id-1}.vertical-wall.column-${wall_column}`).classList.contains('stay-visible'))
    && (document.querySelector(`#wl${wall_id+1}.vertical-wall.column-${wall_column}`) == null // Pour le dernier mur de la colonne
    || !document.querySelector(`#wl${wall_id+1}.vertical-wall.column-${wall_column}`).classList.contains('stay-visible'))){

        /*⬇ On empêche le croisement de murs verticaux et horieontaux ⬇*/            
        if(!document.querySelector(`#wl${wall_column}.horizontal-wall.row-${wall_id}`).classList.contains('stay-visible')){

            if(tour == 'blue' && wallCount.blue > 0){

                verticalWall(vWl,first_square,second_square);

                removeWallFromWallList('blue');

                tour = 'red'; // On passe la main au rouge

                endOfRound();

            } else if(tour == 'red' && wallCount.red > 0){

                verticalWall(vWl,first_square,second_square);

                removeWallFromWallList('red');

                if(numOfPlayers == 3 || numOfPlayers == 4){
                    tour = 'green'; // On donne la main au vert
                } else {
                    tour = 'blue'; // On donne la main au bleu
                }

                endOfRound();

            } else if(tour == 'green' && wallCount.green > 0){

                verticalWall(vWl,first_square,second_square);

                removeWallFromWallList('green');

                if(numOfPlayers == 4){
                    tour = 'purple';
                } else {
                    tour = 'blue';
                }

                endOfRound();

            } else if(tour == 'purple' && wallCount.purple > 0){

                verticalWall(vWl,first_square,second_square);

                removeWallFromWallList('purple');

                tour = 'blue';

                endOfRound();
            }
        }
    }
}

function verticalWall(vWl,first_square,second_square){
    document.querySelector(`#sq${first_square}`).classList.add('wall-right');
    document.querySelector(`#sq${second_square}`).classList.add('wall-right');
    vWl.classList.add('stay-visible');
    vWl.onclick = null;
}

function addHorizontalWall(hWl){
    let wall_id = getNb("wl",hWl.id);
    let wall_row = getNb("row-",hWl.classList[1]);

    let first_square = wall_id+Number(9*(wall_row-1));
    let second_square = first_square+Number(1);

    console.log(document.querySelector(`#wl${wall_id-1}.horizontal-wall.row-${wall_row}`));

    /*⬇ On empêche de placer un mur chavauchant un mur existant par la droite ou par la gauche ⬇*/
    if((document.querySelector(`#wl${wall_id-1}.horizontal-wall.row-${wall_row}`) == null // Pour le mur n°1 de la ligne
    || !document.querySelector(`#wl${wall_id-1}.horizontal-wall.row-${wall_row}`).classList.contains('stay-visible'))
    && (document.querySelector(`#wl${wall_id+1}.horizontal-wall.row-${wall_row}`) == null // Pour le dernier mur de la ligne
    || !document.querySelector(`#wl${wall_id+1}.horizontal-wall.row-${wall_row}`).classList.contains('stay-visible'))){

        /*⬇ On empêche le croisement de murs verticaux et horizontaux ⬇*/
        if(!document.querySelector(`#wl${wall_row}.vertical-wall.column-${wall_id}`).classList.contains('stay-visible')){

            if(tour == 'blue' && wallCount.blue > 0){

                horizontalWall(hWl,first_square,second_square);

                removeWallFromWallList('blue');

                tour = 'red'; // On passe la main au rouge

                endOfRound();

            } else if(tour == 'red' && wallCount.red > 0){

                horizontalWall(hWl,first_square,second_square);

                removeWallFromWallList('red');

                if(numOfPlayers == 3 || numOfPlayers == 4){
                    tour = 'green'; // On donne la main au vert
                } else {
                    tour = 'blue'; // On donne la main au bleu
                }

                endOfRound();

            } else if(tour == 'green' && wallCount.green > 0){

                horizontalWall(hWl,first_square,second_square);

                removeWallFromWallList('green');

                if(numOfPlayers == 4){
                    tour = 'purple'; // On donne la main au violet
                } else {
                    tour = 'blue'; // On donne la main au bleu
                }

                endOfRound();

            } else if(tour == 'purple' && wallCount.purple > 0){

                horizontalWall(hWl,first_square,second_square);

                removeWallFromWallList('purple');

                tour = 'blue'; // On donne la main au bleu

                endOfRound();
            }

        }
    }
}

function horizontalWall(hWl,first_square,second_square){
    document.querySelector(`#sq${first_square}`).classList.add('wall-bottom');
    document.querySelector(`#sq${second_square}`).classList.add('wall-bottom');
    hWl.classList.add('stay-visible');
    hWl.onclick = null;
}

function getNb(prefix,id){
    let el = id.replace(prefix,"");
    return Number(el);
}

function endOfRound(){
    currentRound++;
    document.querySelector('.info-wrapper>h1').innerHTML = `Round ${currentRound}`;
    document.querySelector('.info-wrapper>p>b').innerText = `It's ${tour} to play`;
}

function switchNumOfPlayers(value){
    if(typeof value != 'number' || value > 4){
        console.log('You entered an invalid number of players');
    } else {
        window.localStorage.setItem('numberOfPlayers', value);
        location.reload();
    }
}

function checkIfWon(color){
    if(color == 'blue'){
        for (let i = 0; i < line.first.length; i++){
            if(document.querySelector(`#sq${line.first[i]}`).style.backgroundImage == bluePath){
                alert(`${color} won the game !`);
                location.reload();
            }
        }
    } else if(color == 'red'){
        for (let i = 0; i < line.second.length; i++){
            if(document.querySelector(`#sq${line.second[i]}`).style.backgroundImage == redPath){
                alert(`${color} won the game !`);
                location.reload();
            }
        }
    } else if(color == 'green'){
        for (let i = 0; i < line.third.length; i++){
            if(document.querySelector(`#sq${line.third[i]}`).style.backgroundImage == greenPath){
                alert(`${color} won the game !`);
                location.reload();
            }
        }
    } else if(color == 'purple'){
        for (let i = 0; i < line.fourth.length; i++){
            if(document.querySelector(`#sq${line.fourth[i]}`).style.backgroundImage == purplePath){
                alert(`${color} won the game !`);
                location.reload();
            }
        }
    }
}

function setWallsCount(){
    
    if(window.localStorage.getItem('numberOfWalls') == 5){
        window.localStorage.setItem('numberOfWalls', 10);
        location.reload();
    } else if(window.localStorage.getItem('numberOfWalls') == 10){
        window.localStorage.setItem('numberOfWalls', 5);
        location.reload();
    }
    
}

function randomInt(min,max){
	return Math.floor((Math.random() * (max+1-min)) + min);
}

function click(selector){
    let element;

    if(typeof selector == 'string'){
        element = document.querySelector(selector);
    } else {
        element = selector;
    }

    let evt = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: 20
    });

    element.dispatchEvent(evt);
}

function returnCurrentSquare(color){
    let element;

    if(color == 'red'){
        for(let i=0;i<document.querySelectorAll('.square').length;i++){
            if(document.querySelectorAll('.square')[i].style.backgroundImage == redPath){
                element = document.querySelectorAll('.square')[i];
            }
        }
    } else if(color == 'blue'){
        for(let i=0;i<document.querySelectorAll('.square').length;i++){
            if(document.querySelectorAll('.square')[i].style.backgroundImage == bluePath){
                element = document.querySelectorAll('.square')[i];
            }
        }
    }

    return element;

}

function nextPlayer(){
    if(tour == 'blue'){
        tour = 'red';
    } else if(tour == 'red'){
        if(numOfPlayers == 3 || numOfPlayers == 4){
            tour = 'green'; // On donne la main au vert
        } else {
            tour = 'blue'; // On donne la main au bleu
        }
    } else if(tour == 'green'){
        if(numOfPlayers == 4){
            tour = 'purple';
        } else {
            tour = 'blue';
        }
    } else if(tour == 'purple'){
        tour = 'blue';
    }
}

function capitalizeFirstLetter(string) {
    // Function imported from StackOverflow - Author: Steve Harrison

    return string.charAt(0).toUpperCase() + string.slice(1);
}

function prizeDraw(){
    let random;

    if(numOfPlayers == 2){
        random = randomInt(1,2);
    } else if(numOfPlayers == 3){
        random = randomInt(1,3);
    } else if(numOfPlayers == 4){
        random = randomInt(1,4);
    }

    if(random == 1){
        tour = 'blue';
    } else if(random == 2){
        tour = 'red';
    } else if(random == 3){
        tour = 'green';
    } else if(random == 4){
        tour = 'purple';
    }

    if(random){
        alert(`Prize Draw !\n\n ${capitalizeFirstLetter(tour)} starts the game !`);
    }

}

function getWallsAbove(id){
    let number = getNb('sq',id);
    let firstDigit = Number(number.toString().charAt(0));
    let rowIndex = Number(firstDigit+1);

    let theWallsAbove = [document.querySelector(`div#wl3.horizontal-wall.row-${rowIndex}`),document.querySelector(`div#wl5.horizontal-wall.row-${rowIndex}`),document.querySelector(`div#wl7.horizontal-wall.row-${rowIndex}`)];

    return theWallsAbove;

}