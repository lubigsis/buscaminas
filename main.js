//------------------------------------------------------declaro variables------------------------
let board = [];
let rows = 8;
let columns = 8;
let minasCantidad = 10;
let ubicacionMinas = []; // "2-2", "3-4", "2-1"
let fichasClicked = 0; //objetivo: hacer click en todas las fichas; excepto las q' tienen minas.
let flagEnabled = false;
let gameOver = false;


//----------------------------------------------------------FUNCIONES----------------------------
function setFlag(){
    if (flagEnabled){
        flagEnabled = false;
        document.getElementById('flag-btn').style.backgroundColor = 'lightgray';
    }
    else{
        flagEnabled = true;
        document.getElementById('flag-btn').style.backgroundColor = 'darkgray';
    }
}


function clickFicha(){
    if (gameOver || this.classList.contains("ficha-clicked")) {
        return;  //q' no procese lo q' viene a continuación si se cumple la presente condición.
    }


    let ficha = this; //se refiere a la ficha que fue clickeada.
    if (flagEnabled){
        if (ficha.innerText == ''){
            ficha.innerText = '🚩';
        }
        else if (ficha.innerText == '🚩'){
            ficha.innerText = '';
        }
        return;
    }

    if (ubicacionMinas.includes(ficha.id)) {
      
        gameOver = true;
        descubroMinas();
        return;

    }
    let coords = ficha.id.split("-"); // "0-0" -> ["0", "0"]
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    checkMina(r, c);
}

function descubroMinas() {
    for (let r= 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let ficha = board[r][c];
            if (ubicacionMinas.includes(ficha.id)) {
                ficha.innerText = "💣";
                ficha.style.backgroundColor = "red";                
            }
        }
    }
}

//veo los límites para ir poniendo los números que indican las minas cerca.
function checkMina(r, c){
    if (r < 0 || r >= rows ||  c < 0  || c >= columns){
        return;
    }
    if (board[r][c].classList.contains("ficha-clicked")) { //para no clicker la misma ficha
        return;
    }
    
    board[r][c].classList.add("ficha-clicked");

    fichasClicked += 1;

    let minasEncontradas = 0;

    //---------------------Arriba 3
    minasEncontradas += checkFicha(r - 1, c - 1); //arriba - izq.
    minasEncontradas += checkFicha(r - 1, c);  //arriba
    minasEncontradas += checkFicha(r - 1, c + 1);  //arriba - der.

    //-------------------izq. y der.
    minasEncontradas += checkFicha(r, c - 1);   //izq.
    minasEncontradas += checkFicha(r, c + 1);   //der.
    
    //----------------------abajo 3
    minasEncontradas += checkFicha(r + 1, c - 1); //abajo - izq.
    minasEncontradas += checkFicha(r + 1, c);   //abajo 
    minasEncontradas += checkFicha(r + 1, c + 1); //abajo - der.
    
    if (minasEncontradas > 0) {
            board[r][c].innerText = minasEncontradas;
            board[r][c].classList.add('x' + minasEncontradas.toString());
    }
    else{
   //--------------------------------arriba 3
        checkMina(r - 1, c - 1);   //arriba - izq.
        checkMina(r - 1, c);       //arriba
        checkMina(r - 1, c + 1);   //arriba der.

    //---------------------------izq. y derecha.
        checkMina(r, c - 1);      //left
        checkMina(r, c + 1);      //right

    //--------------------------------abajo 3
         checkMina(r + 1, c - 1);    //abajo izq.
         checkMina(r + 1, c);        //abajo
         checkMina(r + 1, c + 1);    //abajo der.
    }

    if (fichasClicked == rows * columns - minasCantidad) {
        document.getElementById('minas-contador').innerText = 'LOCALIZADAS';
        gameOver = true;
    }

}


function checkFicha(r, c){
    if (r < 0 || r >= rows ||  c < 0  || c >= columns){
        return 0;
    }
    if (ubicacionMinas.includes(r.toString() + '-' + c.toString())){
        return 1;
    }
    return 0;
}


function setMinas() {  //Establezco 5 ubicaciones de minas
    ubicacionMinas.push("2-2");
    ubicacionMinas.push("2-3");
    ubicacionMinas.push("5-6");
    ubicacionMinas.push("3-4");
    ubicacionMinas.push("1-1");
  
}


function startGame() {
    document.getElementById("minas-contador").innerText = minasCantidad;
    document.getElementById('flag-btn').addEventListener('click', setFlag);
    setMinas();
 //-----------------------------------------------tablero---------------------------
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
//-------------------------------------------------------creando <div></div>-------------------------
            let ficha = document.createElement("div");
            ficha.id = r.toString() + "-" + c.toString();   //<div id="0-0"></div>
            ficha.addEventListener('click', clickFicha);
            document.getElementById("board").append(ficha);

            row.push(ficha);  //lo coloco en el array
        }
        board.push(row); //lo coloco en el tablero
    }

   // console.log(board);
}



//------------------------------------------------------------------------------------------------

window.onload = function() { //cuando cargue la página, qu llame a esa función.
    startGame();
}


