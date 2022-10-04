export function converToCanvas(image) {
    const ctx = document.createElement('canvas').getContext('2d');
    ctx.canvas.width = image.width;
    ctx.canvas.height = image.height;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(image, 0, 0);
    return ctx;  
}

export function loadImage(url) {
    return new Promise(function(resolve, reject) {
        const image = new Image( );
        image.onload = event => resolve(converToCanvas(image));
        image.onerror = event => reject(event);
        image.src = url;
    });
}
