export function loadJSON(url) {
    return fetch(url).then(res => res.json( ));
}

export function loadText(url) {
    return fetch(url).then(res => res.text( ));
}

export function loadImage(url, canvas = false) {
    return new Promise((resolve, reject) => {
        const img = new Image( );
        img.onload = event => {
            if(!canvas) resolve(img);
            else imageToCanvas(img);
        }

        img.onerror = event => {
            reject(event);
        }
    });
}

function imageToCanvas(image) {
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    canvas.getContext('2d').imageSmoothingEnabled = false;
    canvas.getContext('2d').drawImage(image, 0, 0);
    return canvas;
}