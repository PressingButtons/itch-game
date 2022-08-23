export function sendError(err, message) {
    console.log(err, message);
    console.trace( );
    throw err;
}