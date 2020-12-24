/*⬇ Génération des carrés ⬇*/
function createSquare(idCount){
    let square = document.createElement('div');
    square.classList.add('square');
    square.id = 'sq'+idCount;
    idCount++;
    document.querySelector(".squares-container").appendChild(square);
}

for(i=0;i<81;i++){
    createSquare(i+1);
}
/*⬆ Fin de génération des carrés ⬆*/

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

for(j=1;j<9;j++){
    createWall(1,1.11+'%','vertical',j);
    for(i=1;i<8;i++){
        createWall(i+1,i*10*1.11+'%','vertical',j);
    }
}

for(j=1;j<9;j++){
    createWall(1,1.11+'%','horizontal',j);
    for(i=1;i<8;i++){
        createWall(i+1,i*10*1.11+'%','horizontal',j);
    }
}

let previousSquareRed = 'sq5';
document.getElementById('sq5').style.background = 'url("red_circle.png")';

let previousSquareBlue = 'sq77';
document.getElementById('sq77').style.background = 'url("blue_circle.png")';

let currentRound = 1;

let wallCountRed = 10;
let wallCountBlue = 10;

function createWallList(targetId){
    let wall = document.createElement('div');
    wall.classList.add('walls-list-item');
    document.querySelector(`#${targetId}`).appendChild(wall);
}

for(i=0;i<10;i++){
    createWallList('walls1');
}

for(i=0;i<10;i++){
    createWallList('walls2');
}

for(let vWl of document.querySelectorAll('.vertical-wall')){
    vWl.onclick = ()=>{
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

                if(currentRound % 2 != 0 && wallCountBlue > 0){
                    document.querySelector(`#sq${first_square}`).classList.add('wall-right');
                    document.querySelector(`#sq${second_square}`).classList.add('wall-right');
                    vWl.classList.add('stay-visible');
                    vWl.onclick = null;
                    currentRound++;
                    document.querySelector('h1').innerHTML = `Round ${currentRound}`;
                    wallCountBlue--;
                    document.querySelector('#walls2').removeChild(document.querySelector('#walls2').lastChild);
                } else if(currentRound % 2 == 0 && wallCountRed > 0){
                    document.querySelector(`#sq${first_square}`).classList.add('wall-right');
                    document.querySelector(`#sq${second_square}`).classList.add('wall-right');
                    vWl.classList.add('stay-visible');
                    vWl.onclick = null;
                    currentRound++;
                    document.querySelector('h1').innerHTML = `Round ${currentRound}`;
                    wallCountRed--;
                    document.querySelector('#walls1').removeChild(document.querySelector('#walls1').lastChild);
                }
            }
        }
    }
}

for(let hWl of document.querySelectorAll('.horizontal-wall')){
    hWl.onclick = ()=>{
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

                if(currentRound % 2 != 0 && wallCountBlue > 0){
                    document.querySelector(`#sq${first_square}`).classList.add('wall-bottom');
                    document.querySelector(`#sq${second_square}`).classList.add('wall-bottom');
                    hWl.classList.add('stay-visible');
                    hWl.onclick = null;
                    currentRound++;
                    document.querySelector('h1').innerHTML = `Round ${currentRound}`;
                    wallCountBlue--;
                    document.querySelector('#walls2').removeChild(document.querySelector('#walls2').lastChild);
                } else if(currentRound % 2 == 0 && wallCountRed > 0){
                    document.querySelector(`#sq${first_square}`).classList.add('wall-bottom');
                    document.querySelector(`#sq${second_square}`).classList.add('wall-bottom');
                    hWl.classList.add('stay-visible');
                    hWl.onclick = null;
                    currentRound++;
                    document.querySelector('h1').innerHTML = `Round ${currentRound}`;
                    wallCountRed--;
                    document.querySelector('#walls1').removeChild(document.querySelector('#walls1').lastChild);
                }
            }
        }
    }
}

for(let sq of document.querySelectorAll('.square')){
    sq.onclick = ()=>{

    let PSB = getNb('sq',previousSquareBlue);
    let PSR = getNb('sq',previousSquareRed);

    let fromNorth = `sq${getNb('sq',sq.id)+Number(9)}`;
    let fromSouth = `sq${getNb('sq',sq.id)-Number(9)}`;
    let fromEast = `sq${getNb('sq',sq.id)+Number(1)}`;
    let fromWest = `sq${getNb('sq',sq.id)-Number(1)}`;


    if(currentRound % 2 == 0){
        if((sq.id == `sq${getNb("sq",previousSquareRed)-1}` && !document.querySelector(`#${previousSquareRed}`).classList.contains('wall-left') && !sq.classList.contains('wall-right'))
        || (sq.id == `sq${getNb("sq",previousSquareRed)+1}` && !document.querySelector(`#${previousSquareRed}`).classList.contains('wall-right') && !sq.classList.contains('wall-left'))
        || (sq.id == `sq${getNb("sq",previousSquareRed)-9}` && !document.querySelector(`#${previousSquareRed}`).classList.contains('wall-top') && !sq.classList.contains('wall-bottom'))
        || (sq.id == `sq${getNb("sq",previousSquareRed)+9}`&& !document.querySelector(`#${previousSquareRed}`).classList.contains('wall-bottom') && !sq.classList.contains('wall-top'))){

            if(sq.style.background != ''){ // Est-ce que le carré cible est occupé ?
                if(getNb('sq',sq.id) == PSR+Number(9)) { // Vient-on du nord ? ⬆
                    document.getElementById(previousSquareRed).style.background = '';
                    document.getElementById(fromNorth).style.background = 'url("red_circle.png")';
                    previousSquareRed = fromNorth;
                } else if(getNb('sq',sq.id) == PSR-Number(9)){ // Vient-on du sud ? ⬇
                    document.getElementById(previousSquareRed).style.background = '';
                    document.getElementById(fromSouth).style.background = 'url("red_circle.png")';
                    previousSquareRed = fromSouth;
                } else if(getNb('sq',sq.id) == PSR+Number(1)){ // Vient-on de l'est ? ➡
                    document.getElementById(previousSquareRed).style.background = '';
                    document.getElementById(fromEast).style.background = 'url("red_circle.png")';
                    previousSquareRed = fromEast;
                } else if(getNb('sq',sq.id) == PSR-Number(1)){ // Vient-on de l'ouest ? ⬅
                    document.getElementById(previousSquareRed).style.background = '';
                    document.getElementById(fromWest).style.background = 'url("red_circle.png")';
                    previousSquareRed = fromWest;
                }
            } else { // On avance normalement
                document.getElementById(previousSquareRed).style.background = '';
                sq.style.background = 'url("red_circle.png")';
                previousSquareRed = sq.id;
            }
            currentRound++;
            document.querySelector('h1').innerHTML = `Round ${currentRound}`;
        }
    } else if (currentRound % 2 != 0){
            if((sq.id == `sq${getNb("sq",previousSquareBlue)-1}` && !document.querySelector(`#${previousSquareBlue}`).classList.contains('wall-left') && !sq.classList.contains('wall-right'))
            || (sq.id == `sq${getNb("sq",previousSquareBlue)+1}` && !document.querySelector(`#${previousSquareBlue}`).classList.contains('wall-right') && !sq.classList.contains('wall-left'))
            || (sq.id == `sq${getNb("sq",previousSquareBlue)-9}` && !document.querySelector(`#${previousSquareBlue}`).classList.contains('wall-top') && !sq.classList.contains('wall-bottom'))
            || (sq.id == `sq${getNb("sq",previousSquareBlue)+9}`&& !document.querySelector(`#${previousSquareBlue}`).classList.contains('wall-bottom') && !sq.classList.contains('wall-top'))){

                if(sq.style.background != ''){ // Est-ce que le carré cible est occupé ?
                    if(getNb('sq',sq.id) == PSB+Number(9)) { // Vient-on du nord ? Des murs nous bloquent-ils ?
                        document.getElementById(previousSquareBlue).style.background = '';
                        document.getElementById(fromNorth).style.background = 'url("blue_circle.png")';
                        previousSquareBlue = fromNorth;
                    } else if(getNb('sq',sq.id) == PSB-Number(9)){ // Vient-on du sud ? ⬇
                        document.getElementById(previousSquareBlue).style.background = '';
                        document.getElementById(fromSouth).style.background = 'url("blue_circle.png")';
                        previousSquareBlue = fromSouth;
                    } else if(getNb('sq',sq.id) == PSB+Number(1)){ // Vient-on de l'est ? ➡
                        document.getElementById(previousSquareBlue).style.background = '';
                        document.getElementById(fromEast).style.background = 'url("blue_circle.png")';
                        previousSquareBlue = fromEast;
                    } else if(getNb('sq',sq.id) == PSB-Number(1)){ // Vient-on de l'ouest ? ⬅
                        document.getElementById(previousSquareBlue).style.background = '';
                        document.getElementById(fromWest).style.background = 'url("blue_circle.png")';
                        previousSquareBlue = fromWest;
                    }
                } else { // On avance normalement
                    document.getElementById(previousSquareBlue).style.background = '';
                    sq.style.background = 'url("blue_circle.png")';
                    previousSquareBlue = sq.id;
                }
                currentRound++;
                document.querySelector('h1').innerHTML = `Round ${currentRound}`;
            }
        }
    }
}


function getNb(prefix,id){
    let el = id.replace(prefix,"");
    return Number(el);
}

function checkItOut(){
    // let blue = document.querySelector(`.square[style="background: url("blue_circle.png")"]`);
    // let red = document.querySelector(`.square[style="background: url("red_circle.png")"]`);

    // let blue_num = getNb('sq',blue.id);
    // let red_num = getNb('sq',red.id);

    let PSB = getNb('sq',previousSquareBlue);
    let PSR = getNb('sq',previousSquareRed);

    if(!document.getElementById(previousSquareBlue).classList.contains('wall-right')){
        document.getElementById(`sq${PSB+Number(1)}`).style.background = 'pink';
    }
}

function checkNext(id){

}

/*
let first_ligne = [1,2,3,4,5,6,7,8,9];
let second_line = [73,74,75,76,77,78,79,80,81];

let tab = [];

// Quand on pose un mur
function visite(sq){
    visite();
    // S'exécute sur les cases adjacentes, sauf si il y a des murs
    // La case est-elle dans le tableau ?
}
/*⬆ Obj : la ligne d'arrivée est-elle accessible depuis sq ? ⬆*/