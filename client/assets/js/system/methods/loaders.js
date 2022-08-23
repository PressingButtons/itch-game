export function loadJSON(url) {
    return fetch(url).then(res => res.json( ));
}

export function loadText(url) {
    return fetch(url).then(res => res.text( ));
}

export function loadImageFromURL(url, canvas = false) {
    return fetch(url).then(res => res.blob( )).then(loadImageFromBlob).then(image => {
        if(!canvas) return image; 
        return imageToCanvas(image);
    });
}

export function loadImageFromBlob(blob, canvas = false) {
    const url = URL.createObjectURL(blob);
    return new Promise((resolve, reject) => {
        const img = new Image( );
        img.onload = event => {
            if(!canvas) resolve(img);
            else imageToCanvas(img);
        }

        img.onerror = event => {
            reject(event);
        }
        img.src = url;
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
