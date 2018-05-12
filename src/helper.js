function randomNumber( min = 25, max = 250 ) {
    let rand = min + Math.random() * (max + 1 - min);

    rand = Math.floor( rand );

    return rand;
}

function randomSizePX() {
    return randomNumber() + 'px';
}
function randomColor() {
    return '#' + '0123456789abcdef'.split( '' ).map( function ( v, i, a ) {
        return i > 5 ? null : a[Math.floor( Math.random() * 16 )]
    } ).join( '' );
}

export {
    randomNumber,
    randomSizePX,
    randomColor
}