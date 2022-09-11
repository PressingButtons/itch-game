export async function loadImage(url) {
    return new Promise((resolve, reject) => {
        const image = new Image( );
        image.onload = event => {resolve(image);}
        image.error = event => {reject(iamge);}
        image.src = '/assets/' + url;
    });
}