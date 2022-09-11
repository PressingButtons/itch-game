export default function Mapper( ) {

    ctx = Malestrom.mapTexture.src.getContext('2d');
    
    Malestrom.createMap = function( ) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    const convertIndex = index => {
        const r = ('' + index[1]).padStart(2, '0');
        const g = ('' + index[0]).padStart(2, '0');
        return "#" r + g + '00';
    }

    const onPlot = event => {
        for(const tile of event.detail.tileset) plotTile(tile, event.detail);
        document.dispatchEvent(new Event('drawMap'));
    }
 
    const plotTile = (tile, detail) => {
        let index = tile.split('.').map( x => parseInt(x));
        let tx = (index[1] - detail.min[1]);
        let ty = (index[0] - detail.min[0]);
        const color = convertIndex(index);
        ctx.fillStyle = color;
        ctx.fillRect(detail.col + tx, detail.row + ty, 1, 1);
    }

    document.addEventListener('plot', onPlot);

}