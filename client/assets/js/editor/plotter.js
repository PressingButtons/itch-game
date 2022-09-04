export default function Plotter( ) {

    const listener = document.querySelector('#workspace #listener');
    const stamp = document.querySelector('#workspace #stamp');
    const tilescale = 1;
    const tilesize = Malestrom.tilesize;

    stamp.style.borderColor = 'transparent';

    stamp.width = 16;
    stamp.height = 16;

    const drawTile = (index, min) => {
        const src = index.map(x => x * tilesize);
        const pos = index.map((x, i) => (x - min[i]) * tilesize);
        stamp.getContext('2d').drawImage(Malestrom.tileTexture.src, ...src, tilesize, tilesize, ...pos, tilesize, tilesize);
    }

    const drawTiles = tiles => {
        const size = getSize(tiles.slice( ));
        resizeStamp(size.value);
        for(const tile of tiles) drawTile(tile.split('.').map(x => parseInt(x)).reverse( ), size.min);
    }

    const getMax = (max, value) => {
        if(!max) return value.map(x => x + 1);
        return max.map((x, i) => Math.max(x, value[i] + 1));
    }

    const getMin = (min, value) => {
        if(!min) return value; 
        return min.map((x, i) => Math.min(x, value[i]));
    }

    const getSize = (tiles, min, max) => {
        const tile = tiles.pop( ).split('.').map( x => parseInt(x));
        min = getMin(min, tile);
        max = getMax(max, tile);
        if(tiles.length > 0) return getSize(tiles, min, max);
        else return {
            max: max,
            min: min,
            value: max.map((x, i) => (x - min[i]) * tilesize)
        }
    }

    const mouseListener = event => {
        const rect = event.target.getBoundingClientRect( );
        const x = (event.clientX - rect.x) / tilescale;
        const y = (event.clientY - rect.y) / tilescale;
        const row = Math.floor(y / tilesize);
        const col = Math.floor(x / tilesize);

        if(event.type == 'mouseenter') {
            stamp.style.borderColor = 'red';
        }

        if(event.type == 'mouseleave') {
            stamp.style.borderColor = 'transparent';
        }

        stamp.style.left = col * tilesize + 'px';
        stamp.style.top  = row * tilesize + 'px';

    }

    const onTileSelect = event => {
        const tiles = event.detail;
        drawTiles(tiles);
    }

    const resizeStamp = size => {
        stamp.width = size[1];
        stamp.height = size[0];
    }

    listener.addEventListener('mousemove', mouseListener);
    listener.addEventListener('mousedown', mouseListener);
    listener.addEventListener('mouseup', mouseListener);
    listener.addEventListener('mouseenter', mouseListener);

    document.addEventListener('tilelist', onTileSelect);

}

