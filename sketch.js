const oImgPath = "./images/o.png"
const xImgPath = "./images/x.png" 
let images = []
class Grid{
    constructor({board, tileRects, tiles}){
        this.board = board;
        this.tileRects = tileRects;
        this.tiles = tiles;
    }
}
class Tile{
    constructor({occupied, occupiedBy, position, width, height}){
        this.occupied = occupied;
        this.occupiedBy = occupiedBy;
        this.position = position;
        this.width = width;
        this.height = height;
    }
}

let mode = "OnePlayer";

let turn = "player";

let grid = new Grid(
    {
        board: [
            [0,0], //top left
            [0,1],
            [0,2],
            [1,0],
            [1,1], //middle
            [1,2],
            [2,0],
            [2,1],
            [2,2], //bottom right
        ],
        tileRects: 
        [
            [200, 20, 200, 200],
            [420, 20, 200, 200],
            [640, 20, 200, 200],
            [200, 240, 200, 200],
            [420, 240, 200, 200],
            [640, 240, 200, 200],
            [200, 460, 200, 200],
            [420, 460, 200, 200],
            [640, 460, 200, 200],
        ],
        tiles: [],
    });



function showTiles(){
    for(let i = 0; i < grid.tileRects.length; i++){
        rect(grid.tileRects[i][0], grid.tileRects[i][1], grid.tileRects[i][2], grid.tileRects[i][3]);
        let newTile = new Tile({
            occupied: false,
            occupiedBy: "",
            position: {x: grid.tileRects[i][0], y: grid.tileRects[i][1]},
            width: grid.tileRects[i][2],
            height: grid.tileRects[i][3],
        });
        grid.tiles[i] = newTile; 
    }
}

function clickedOnSquare(){
    for(let i = 0; i < grid.tiles.length; i++)
    {
        if(mouseX > grid.tiles[i].position.x &&
           mouseX <= grid.tiles[i].position.x + grid.tiles[i].width && 
           mouseY > grid.tiles[i].position.y &&
           mouseY <= grid.tiles[i].position.y + grid.tiles[i].height)
        {
            return grid.tiles[i];
        }
    }
    return null;
}

let oImage;
let xImage;
function preload(){
    oImage = loadImage(oImgPath);
    xImage = loadImage(xImgPath);
}
function loadSymbol(){
    if(mode == "TwoPlayer"){
        console.log("deez");
    }
}
function setup(){
    let onePlayer = createButton("One Player Mode");
    onePlayer.position(5,0);
    onePlayer.mousePressed(() => 
    {
        mode = "OnePlayer";
        resetGame();
    });
    let twoPlayer = createButton("Two Player Mode")
    twoPlayer.position(5,30);
    twoPlayer.mousePressed(() => 
    {
        mode = "TwoPlayer";
        resetGame();
    });
    createCanvas(1080,720);
    background(0);
    showTiles();

}
function getOccupiedTiles(){
    let tiles = 
    {
        0: null,
        1: null,
        2: null, //top row ends
        3: null,
        4: null, 
        5: null, //2nd row ends
        6: null,
        7: null,
        8: null, //3rd row ends
    };
    for(let i = 0; i < grid.tiles.length; i++){
        if(grid.tiles[i].occupied){
            tiles[i] = grid.tiles[i];
        }
    }
    return tiles;
}
function resetGame(){
    setup();
    for(let i = 0; i < grid.tiles.length; i++){
        grid.tiles[i].occupied = false;
    }
}
function mousePressed(){
    let square = clickedOnSquare()
    if(square){
        if(mode == "OnePlayer"){
            if(!allTilesOccupied()){
                square.occupied = true;
                square.occupiedBy = "player"
                image(xImage, square.position.x, square.position.y);
                turn = "computer";
            }
            else{
                displayResults();
                turn = "gameover"
            }
        }
        else if(mode == "TwoPlayer"){

        }
    }
    else if(square && turn == "player" && mode == "TwoPlayer"){
        image(oImage, square.position.x, square.position.y);

    }
}
function allTilesOccupied(){
    let counter = 0;
    for(let i = 0; i < grid.tiles.length; i++){
        if(!grid.tiles[i].occupied){
            counter++;
        }
    }
    if(counter == 0){
        return true;
    }
    else{
        return false;
    }
}
function pickRandomSquare(){
    let tile = null;
    do{
        tile = random(grid.tiles);
    }while(tile.occupied);
    return tile;
}
function guessBestSquare(){
    let occupiedTiles = getOccupiedTiles();
    console.log(occupiedTiles);
    if(occupiedTiles[0]){
        if(occupiedTiles[1]){
            return !occupiedTiles[2] ? grid.tiles[2] : pickRandomSquare();
        }
        else if(occupiedTiles[2]){
            return !occupiedTiles[1] ? grid.tiles[1] : pickRandomSquare();
        }
        else if(occupiedTiles[3]){
            return !occupiedTiles[6] ? grid.tiles[6] : pickRandomSquare();
        }
        else if(occupiedTiles[4]){
            return !occupiedTiles[8] ? grid.tiles[8] : pickRandomSquare();
        }
        else if(occupiedTiles[5]){
            return pickRandomSquare();
        }
        else if(occupiedTiles[6]){
            return !occupiedTiles[3] ? grid.tiles[3] : pickRandomSquare();
        }
        else if(occupiedTiles[7]){
            return pickRandomSquare();
        }
        else if(occupiedTiles[8]){
            return !occupiedTiles[4] ? grid.tiles[4] : pickRandomSquare();
        }
        else{
            return pickRandomSquare();
        }
    }
    else if(occupiedTiles[1]){
        if(occupiedTiles[0]){
            return !occupiedTiles[2] ? grid.tiles[2] : pickRandomSquare();
        }
        else if(occupiedTiles[2]){
            return !occupiedTiles[0] ? grid.tiles[0] : pickRandomSquare();
        }
        else if(occupiedTiles[3]){
            return pickRandomSquare();
        }
        else if(occupiedTiles[4]){
            return !occupiedTiles[7] ? grid.tiles[7] : pickRandomSquare();
        }
        else if(occupiedTiles[5]){
            return pickRandomSquare();
        }
        else if(occupiedTiles[6]){
            return pickRandomSquare();
        }
        else if(occupiedTiles[7]){
            return !occupiedTiles[4] ? grid.tiles[4] : pickRandomSquare();
        }
        else if(occupiedTiles[8]){
            return pickRandomSquare();
        }
        else{
            return pickRandomSquare();
        }
    }
    else if(occupiedTiles[2]){
        if(occupiedTiles[0]){
            return !occupiedTiles[1] ? grid.tiles[1] : pickRandomSquare();
        }
        else if(occupiedTiles[1]){
            return !occupiedTiles[0] ? grid.tiles[0] : pickRandomSquare();
        }
        else if(occupiedTiles[3]){
            return pickRandomSquare();
        }
        else if(occupiedTiles[4]){
            return !occupiedTiles[6] ? grid.tiles[6] : pickRandomSquare();
        }
        else if(occupiedTiles[5]){
            return !occupiedTiles[8] ? grid.tiles[8] : pickRandomSquare();
        }
        else if(occupiedTiles[6]){
            return !occupiedTiles[4] ? grid.tiles[4] : pickRandomSquare();
        }
        else if(occupiedTiles[7]){
            return !occupiedTiles[4] ? grid.tiles[4] : pickRandomSquare();
        }
        else if(occupiedTiles[8]){
            return !occupiedTiles[5] ? grid.tiles[5] : pickRandomSquare();
        }
        else{
            return pickRandomSquare();
        }
    }
    else if(occupiedTiles[3]){
        if(occupiedTiles[0]){
            return !occupiedTiles[6] ? grid.tiles[6] : pickRandomSquare();
        }
        else if(occupiedTiles[1]){
            return pickRandomSquare();
        }
        else if(occupiedTiles[2]){
            return pickRandomSquare();
        }
        else if(occupiedTiles[4]){
            return !occupiedTiles[5] ? grid.tiles[5] : pickRandomSquare();
        }
        else if(occupiedTiles[5]){
            return !occupiedTiles[4] ? grid.tiles[4] : pickRandomSquare();
        }
        else if(occupiedTiles[6]){
            return !occupiedTiles[0] ? grid.tiles[0] : pickRandomSquare();
        }
        else if(occupiedTiles[7]){
            return pickRandomSquare();
        }
        else if(occupiedTiles[8]){
            return pickRandomSquare();
        }
        else{
            return pickRandomSquare();
        }
    }
    else if(occupiedTiles[4]){
        if(occupiedTiles[0]){
            if(!occupiedTiles[8]){
                return grid.tiles[8];
            }
        }
        if(occupiedTiles[1]){
            if(!occupiedTiles[7]){
                return grid.tiles[7];
            }
        }
        if(occupiedTiles[2]){
            if(!occupiedTiles[6]){
                return grid.tiles[6];
            }
        }
        if(occupiedTiles[3]){
            if(!occupiedTiles[5]){
                return grid.tiles[5];
            }
        }
        if(occupiedTiles[5]){
            if(!occupiedTiles[8]){
                return grid.tiles[8];
            }
        }
        if(occupiedTiles[6]){
            if(!occupiedTiles[2]){
                return grid.tiles[2];
            }
        }
        if(occupiedTiles[7]){
            if(!occupiedTiles[1]){
                return grid.tiles[1];
            }
        }
        if(occupiedTiles[8]){
            if(!occupiedTiles[0]){
                return grid.tiles[0];
            }
        }
    }
    return pickRandomSquare();
}
function draw(){
    getOccupiedTiles();
    if(turn == "computer"){
        console.log("working");
        if(!allTilesOccupied()){
            let square = guessBestSquare();
            image(oImage, square.position.x, square.position.y);
            square.occupied = true;
            square.occupiedBy = "computer";
            turn = "player";
        }
        else{
            displayResults();
            turn = "gameover";
        }
    }
    //image(xImage, grid.tileRects[0][0], grid.tileRects[0][1]);
}
function displayResults(){
    console.log("results");
}
