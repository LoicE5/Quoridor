/*⬇ Initialisation du localstorage avce la valeur 2 ⬇*/
window.onload = ()=>{
    if(window.localStorage.key(0) == null || window.localStorage.key(0) == undefined){
        window.localStorage.setItem('numberOfPlayers', 2);
    }
    if(window.localStorage.key(1) == null || window.localStorage.key(1) == undefined){
        window.localStorage.setItem('numberOfWalls', 10);
    }

    if(window.innerWidth < window.innerHeight){
        document.querySelector('.global').style.width = 70+'vw';
        document.querySelector('.global').style.height = 70+'vw';
    } else {
        document.querySelector('.global').style.width = 70+'vh';
        document.querySelector('.global').style.height = 70+'vh';
    }

}

window.onresize = ()=>{
    if(window.innerWidth < window.innerHeight){
        document.querySelector('.global').style.width = 70+'vw';
        document.querySelector('.global').style.height = 70+'vw';
    } else {
        document.querySelector('.global').style.width = 70+'vh';
        document.querySelector('.global').style.height = 70+'vh';
    }
}

/*⬇ Génération des carrés ⬇*/
for(i=0;i<81;i++){
    createSquare(i+1);
}

/*⬇ Génération des murs verticaux ⬇*/
for(j=1;j<9;j++){
    createWall(1,1.11+'%','vertical',j);
    for(i=1;i<8;i++){
        createWall(i+1,i*10*1.11+'%','vertical',j);
    }
}

/*⬇ Génération des murs horizontaux ⬇*/
for(j=1;j<9;j++){
    createWall(1,1.11+'%','horizontal',j);
    for(i=1;i<8;i++){
        createWall(i+1,i*10*1.11+'%','horizontal',j);
    }
}

/*⬇ Global variables declaration ⬇*/

let numOfPlayers = window.localStorage.getItem('numberOfPlayers');
console.log('Current number of players : '+numOfPlayers);

const initialWallCount = window.localStorage.getItem('numberOfWalls');

let invertedWallCount;

if(initialWallCount == 10){
    invertedWallCount = 5;
} else if(initialWallCount == 5){
    invertedWallCount = 10;
}

const line = {
    first: [1,2,3,4,5,6,7,8,9],
    second: [73,74,75,76,77,78,79,80,81],
    third: [1,10,19,28,37,46,55,64,73],
    fourth: [9,18,27,36,45,54,63,72,81]
}

const bluePath = 'url("images/blue_circle.png")';
const redPath = 'url("images/red_circle.png")';
const greenPath = 'url("images/green_circle.png")';
const purplePath = 'url("images/purple_circle.png")';

let previousSquare = {
    red: 'sq5',
    blue: 'sq77',
    green: 'sq45',
    purple: 'sq37'
}

document.getElementById('sq5').style.backgroundImage = redPath;
document.getElementById('sq77').style.backgroundImage = bluePath;
document.getElementById('sq45').style.backgroundImage = greenPath;
document.getElementById('sq37').style.backgroundImage = purplePath;

let currentRound = 1;

let wallCount = {
    red: initialWallCount,
    blue: initialWallCount,
    green: initialWallCount,
    purple: initialWallCount
};

/*⬆ Global variables declaration ⬆*/

let tour = 'blue';
prizeDraw();

/*⬇ Apparition de quelques élements en fonction de la variable numOfPlayers ⬇*/
document.querySelector('.info-wrapper>p>i').innerText = `${numOfPlayers} players`;
console.log('tour = '+tour);
document.querySelector('.info-wrapper>p>b').innerText = `It's ${tour} to play`;
if(numOfPlayers == 1 || numOfPlayers == 2){
    document.querySelector('#walls3').style.visibility = 'hidden';
    document.querySelector('#walls4').style.visibility = 'hidden';
    document.querySelector('#sq45').style.backgroundImage = '';
    document.querySelector('#sq37').style.backgroundImage = '';
} else if (numOfPlayers == 3){
    document.querySelector('#walls4').style.visibility = 'hidden';
    document.querySelector('#sq37').style.backgroundImage = '';
}

/*⬇ Changement du nombre de murs du bouton ⬇*/
document.querySelector('button.walls-set').innerText = `Set ${invertedWallCount} walls per player`;

/*⬇ Création des quotas de murs individuels ⬇*/
for(i=0;i<initialWallCount;i++){
    createWallList('walls1');
}

for(i=0;i<initialWallCount;i++){
    createWallList('walls2');
}

for(i=0;i<initialWallCount;i++){
    createWallList('walls3',true);
}

for(i=0;i<initialWallCount;i++){
    createWallList('walls4',true);
}
/*⬆ Création des quotas de murs individuels ⬆*/

/*⬇ Ajouter un mur vertical ⬇*/
for(let vWl of document.querySelectorAll('.vertical-wall')){
    vWl.onclick = ()=>{
        addVerticalWall(vWl);
    }
}

/*⬇ Ajouter un mur horizontal ⬇*/
for(let hWl of document.querySelectorAll('.horizontal-wall')){
    hWl.onclick = ()=>{
        addHorizontalWall(hWl);
    }
}

for(let sq of document.querySelectorAll('.square')){
    sq.onclick = ()=>{

    let PSB = getNb('sq',previousSquare.blue);
    let PSR = getNb('sq',previousSquare.red);

    let fromNorth = `sq${getNb('sq',sq.id)+Number(9)}`;
    let fromSouth = `sq${getNb('sq',sq.id)-Number(9)}`;
    let fromEast = `sq${getNb('sq',sq.id)+Number(1)}`;
    let fromWest = `sq${getNb('sq',sq.id)-Number(1)}`;

    let fromNorthId = `#${fromNorth}`;
    let fromSouthId = `#${fromSouth}`;
    let fromWestId = `#${fromWest}`;
    let fromEastId = `#${fromEast}`;

    let sqId = `#${sq.id}`;


    if (tour == 'blue'){
            if((sq.id == `sq${getNb("sq",previousSquare.blue)-1}` && !document.querySelector(`#${previousSquare.blue}`).classList.contains('wall-left') && !sq.classList.contains('wall-right'))
            || (sq.id == `sq${getNb("sq",previousSquare.blue)+1}` && !document.querySelector(`#${previousSquare.blue}`).classList.contains('wall-right') && !sq.classList.contains('wall-left'))
            || (sq.id == `sq${getNb("sq",previousSquare.blue)-9}` && !document.querySelector(`#${previousSquare.blue}`).classList.contains('wall-top') && !sq.classList.contains('wall-bottom'))
            || (sq.id == `sq${getNb("sq",previousSquare.blue)+9}`&& !document.querySelector(`#${previousSquare.blue}`).classList.contains('wall-bottom') && !sq.classList.contains('wall-top'))){

                if(sq.style.backgroundImage != ''){ // Est-ce que le carré cible est occupé ?
                    if(getNb('sq',sq.id) == PSB+Number(9)) { // Vient-on du nord ? Des murs nous bloquent-ils ?
                        movePawn('blue',fromNorthId);
                    } else if(getNb('sq',sq.id) == PSB-Number(9)){ // Vient-on du sud ? ⬇
                        movePawn('blue',fromSouthId);
                    } else if(getNb('sq',sq.id) == PSB+Number(1)){ // Vient-on de l'est ? ➡
                        movePawn('blue',fromEastId);
                    } else if(geÒtNb('sq',sq.id) == PSB-Number(1)){ // Vient-on de l'ouest ? ⬅
                        movePawn('blue',fromWestId);
                    }
                } else { // On avance normalement
                    movePawn('blue',sqId);
                }

                checkIfWon('blue');

                nextPlayer();

                endOfRound();

            }
        } else if(tour == 'red'){
            if((sq.id == `sq${getNb("sq",previousSquare.red)-1}` && !document.querySelector(`#${previousSquare.red}`).classList.contains('wall-left') && !sq.classList.contains('wall-right'))
            || (sq.id == `sq${getNb("sq",previousSquare.red)+1}` && !document.querySelector(`#${previousSquare.red}`).classList.contains('wall-right') && !sq.classList.contains('wall-left'))
            || (sq.id == `sq${getNb("sq",previousSquare.red)-9}` && !document.querySelector(`#${previousSquare.red}`).classList.contains('wall-top') && !sq.classList.contains('wall-bottom'))
            || (sq.id == `sq${getNb("sq",previousSquare.red)+9}`&& !document.querySelector(`#${previousSquare.red}`).classList.contains('wall-bottom') && !sq.classList.contains('wall-top'))){
    
                if(sq.style.backgroundImage != ''){ // Est-ce que le carré cible est occupé ?
                    if(getNb('sq',sq.id) == PSR+Number(9)) { // Vient-on du nord ? ⬆
                        movePawn('red',fromNorthId);
                    } else if(getNb('sq',sq.id) == PSR-Number(9)){ // Vient-on du sud ? ⬇
                        movePawn('red',fromSouthId);
                    } else if(getNb('sq',sq.id) == PSR+Number(1)){ // Vient-on de l'est ? ➡
                        movePawn('red',fromEastId);
                    } else if(getNb('sq',sq.id) == PSR-Number(1)){ // Vient-on de l'ouest ? ⬅
                        movePawn('red',fromWestId);
                    }
                } else { // On avance normalement
                    movePawn('red',sqId);
                }

                checkIfWon('red');

                nextPlayer();

                endOfRound();

            } 
        } else if(tour == 'green'){
            if((sq.id == `sq${getNb("sq",previousSquare.green)-1}` && !document.querySelector(`#${previousSquare.green}`).classList.contains('wall-left') && !sq.classList.contains('wall-right'))
            || (sq.id == `sq${getNb("sq",previousSquare.green)+1}` && !document.querySelector(`#${previousSquare.green}`).classList.contains('wall-right') && !sq.classList.contains('wall-left'))
            || (sq.id == `sq${getNb("sq",previousSquare.green)-9}` && !document.querySelector(`#${previousSquare.green}`).classList.contains('wall-top') && !sq.classList.contains('wall-bottom'))
            || (sq.id == `sq${getNb("sq",previousSquare.green)+9}`&& !document.querySelector(`#${previousSquare.green}`).classList.contains('wall-bottom') && !sq.classList.contains('wall-top'))){
    
                if(sq.style.backgroundImage != ''){ // Est-ce que le carré cible est occupé ?
                    if(getNb('sq',sq.id) == PSR+Number(9)) { // Vient-on du nord ? ⬆
                        movePawn('green',fromNorthId);
                    } else if(getNb('sq',sq.id) == PSR-Number(9)){ // Vient-on du sud ? ⬇
                        movePawn('green',fromSouthId);
                    } else if(getNb('sq',sq.id) == PSR+Number(1)){ // Vient-on de l'est ? ➡
                        movePawn('green',fromEastId);
                    } else if(getNb('sq',sq.id) == PSR-Number(1)){ // Vient-on de l'ouest ? ⬅
                        movePawn('green',fromWestId);
                    }
                } else { // On avance normalement
                    movePawn('green',sqId);
                }

                checkIfWon('green');

                nextPlayer();

                endOfRound();

            }
        } else if(tour == 'purple'){
            if((sq.id == `sq${getNb("sq",previousSquare.purple)-1}` && !document.querySelector(`#${previousSquare.purple}`).classList.contains('wall-left') && !sq.classList.contains('wall-right'))
            || (sq.id == `sq${getNb("sq",previousSquare.purple)+1}` && !document.querySelector(`#${previousSquare.purple}`).classList.contains('wall-right') && !sq.classList.contains('wall-left'))
            || (sq.id == `sq${getNb("sq",previousSquare.purple)-9}` && !document.querySelector(`#${previousSquare.purple}`).classList.contains('wall-top') && !sq.classList.contains('wall-bottom'))
            || (sq.id == `sq${getNb("sq",previousSquare.purple)+9}`&& !document.querySelector(`#${previousSquare.purple}`).classList.contains('wall-bottom') && !sq.classList.contains('wall-top'))){
    
                if(sq.style.backgroundImage != ''){ // Est-ce que le carré cible est occupé ?
                    if(getNb('sq',sq.id) == PSR+Number(9)) { // Vient-on du nord ? ⬆
                        movePawn('purple',fromNorthId);
                    } else if(getNb('sq',sq.id) == PSR-Number(9)){ // Vient-on du sud ? ⬇
                        movePawn('purple',fromSouthId);
                    } else if(getNb('sq',sq.id) == PSR+Number(1)){ // Vient-on de l'est ? ➡
                        movePawn('purple',fromEastId);
                    } else if(getNb('sq',sq.id) == PSR-Number(1)){ // Vient-on de l'ouest ? ⬅
                        movePawn('purple',fromWestId);
                    }
                } else { // On avance normalement
                    movePawn('purple',sqId);
                }

                checkIfWon('purple');

                nextPlayer();

                endOfRound();

            }
        }

    }
}
