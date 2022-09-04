export default function TileSelector( ) {

   const listener = document.querySelector('.tileset #listener');
   const hilite = document.querySelector('.tileset #hilite');
   const squares = document.getElementById('selection_hilites');

   squares.width = 256;
   squares.height = 256;


   const tilescale = 2;
   const tilesize = Malestrom.tilesize;
   const tilelist = new Set();
   let active = false;

   const hiliteCell = (row, col) => {
        const ctx = squares.getContext('2d');
        ctx.fillStyle = 'rgba(100, 100, 255, 0.5)';
        const x = col * tilesize, y = row * tilesize;
        ctx.clearRect(x, y, tilesize, tilesize);
        ctx.fillRect(x, y, tilesize, tilesize)
   }

   const clearSquares = ( ) => {
    const ctx = squares.getContext('2d');
    ctx.clearRect(0, 0, squares.width, squares.height);
   }

   const onMouseEvent = event => {
        const rect = event.target.getBoundingClientRect( );
        const x = (event.clientX - rect.x) / tilescale;
        const y = (event.clientY - rect.y) / tilescale;
        const row = Math.floor(y / tilesize);
        const col = Math.floor(x / tilesize);
        if(event.type == 'mouseenter') {
            hilite.setAttribute('stroke', 'red');
        }

        if(event.type == 'mouseleave') {
            hilite.setAttribute('stroke', 'none');
            active = false;
        }

        if(event.type == 'mousedown') {
            active = true;
            tilelist.clear( );
            clearSquares( );
            tilelist.add(row + "." + col);
            hiliteCell(row, col)
        }

        if(event.type == 'mousemove') {
            if(active) {
                tilelist.add(row + '.' + col);
                hiliteCell(row, col)
            }
        }

        if(event.type == 'mouseup') {
            active = false;
            document.dispatchEvent(new CustomEvent('tilelist', {detail: [...tilelist]}));
        }
        hilite.setAttribute('transform', `translate(${col * tilesize}, ${row * tilesize})`);
   }

   listener.addEventListener('mouseenter', onMouseEvent);
   listener.addEventListener('mouseleave', onMouseEvent);
   listener.addEventListener('mousemove', onMouseEvent);
   listener.addEventListener('mousedown', onMouseEvent);
   listener.addEventListener('mouseup', onMouseEvent);


}
