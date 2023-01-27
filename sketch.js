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
    constructor({occupied, position, width, height}){
        this.occupied = occupied;
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
            position: {x: grid.tileRects[i][0], y: grid.tileRects[i][1]},
            width: grid.tileRects[i][2],
            height: grid.tileRects[i][3],
        });
        grid.tiles[i] = newTile; 
    }
}

function clickedOnSquare(){
    console.log(grid.tiles[0]);
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
    console.log("deez");
}
function setup(){
    let onePlayer = createButton("One Player Mode");
    onePlayer.position(5,0);
    onePlayer.mousePressed(() => 
    {
        mode = "OnePlayer";
    });
    let twoPlayer = createButton("Two Player Mode")
    twoPlayer.position(5,30);
    twoPlayer.mousePressed(() => 
    {
        mode = "TwoPlayer";
    });
    createCanvas(1080,720);
    background(0);
    showTiles();

}
function mousePressed(){
    let square = clickedOnSquare()
    if(square){
        if(mode == "OnePlayer"){
            square.occupied = true;
            image(xImage, square.position.x, square.position.y);
            turn = "computer";

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
    let tile;
    do{
        tile = random(grid.tiles);
    }while(tile.occupied);

    return tile;
}
function draw(){
    if(turn == "computer"){
        console.log("working");
        let square = pickRandomSquare();
        image(oImage, square.position.x, square.position.y);
        square.occupied = true;
        turn = "player";
    }
    //image(xImage, grid.tileRects[0][0], grid.tileRects[0][1]);
}
