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

function startGame() {
    document.getElementById("minas-contador").innerText = minasCantidad;
    

 //-----------------------------------------------tablero---------------------------
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
//-------------------------------------------------------creando <div></div>-------------------------
            let ficha = document.createElement("div");
            ficha.id = r.toString() + "-" + c.toString();   //<div id="0-0"></div>
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


