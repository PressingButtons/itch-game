const MAP_COLUMNS = 80;
const MAP_ROWS = 45;
const TILESIZE = 16;
const tiles = { };

let hasMap = false;

// PRIVATE FUNCTIONS ==============================================================================

function convertToTilespace(n) {
    return Math.floor(n / TILESIZE);
}

function getData(canvas, i) {
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(i * MAP_COLUMNS, 0, MAP_COLUMNS, MAP_ROWS);
    return imageData.data;
}

function getTileID(i) {
    const index = Math.floor(i / 4);
    const col = index % MAP_COLUMNS;
    const row = Math.floor(index / MAP_COLUMNS);
    return row + '.' + col;
}

function getTilePosition(y, x) {
    const row = Math.floor(y / TILESIZE);
    const col = Math.floor(x / TILESIZE);
    return {
        id: row + '.' + col,
        row: row,
        col: col,
        get value( ) {
            return tiles[this.id]
        }
    }
}

function getTileValue(i, ar) {
    if(ar[0] == 0) return null;
    return {
        id: getTileID(i),
        value: ar[0]
    }
}

//resolving Position
function resolveLeft(object) {
    const top = convertToTilespace(object.top);
    const bot = convertToTilespace(object.bottom);   
    const left = convertToTilespace(object.left);
    if(tiles[top + '.' + left] == 1 || tiles[bot + '.' + left] == 1) {
        object.left = (left + 1) * TILESIZE;
        if(object.velocity && object.velocity.x < 0) object.velocity.x = 0;
        return;
    }
}

function resolveRight(object) {
    const top = convertToTilespace(object.top);
    const bot = convertToTilespace(object.bottom);   
    const right = convertToTilespace(object.right);
    if(tiles[top + '.' + right] == 1 || tiles[bot + '.' + right] == 1) {
        object.right = right * TILESIZE - 1;
        if(object.velocity && object.velocity.x > 0) object.velocity.x = 0;
        return;
    }
}

function resolveTop(object) {
    const top = convertToTilespace(object.top);
    const left = convertToTilespace(object.left);
    const right = convertToTilespace(object.right);
    if(tiles[top + '.' + left] == 1 || tiles[top + '.' + right] == 1) {
        object.top = (top + 1) * TILESIZE;
        if(object.velocity && object.velocity.y < 0) object.velocity.y = 0;
    }
}

function resolveBottom(object) {
    const bot = convertToTilespace(object.bottom);
    const left = convertToTilespace(object.left);
    const right = convertToTilespace(object.right);
    if(tiles[bot+ '.' + left] == 1 || tiles[bot + '.' + right] == 1) {
        object.top = bot * TILESIZE - Maestrom.Constants.GRAVITY
        if(object.velocity && object.velocity.y < 0) object.velocity.y = 0;
    }
}
//resolving end

function setTiles(data) {
    for(let i = 0; i < data.length; i += 4) {
        const tile = getTileValue(i, data.subarray(i, i + 4));
        if(tile) tiles[tile.id] = tile.value
    }
}

// EXPORT FUNCTIONS ================================================================================

export function clear( ) {
    for(let tile in tiles) delete tiles[tile];
    hasMap = false;
}

export function getTile(row, col) {
    const id = row + '.' + col;
    if(tiles[id]) return tiles[id];
    return null;
}

export function readMap(canvas, i) {
    clear( );
    const data = getData(canvas, i);
    setTiles(data);
    hasMap = true;
}

export function resolveX(object) {
    resolveLeft(object);
    resolveRight(object);
}

export function resolveY(object) {
    resolveTop(object);
    resolveBottom(object)
}