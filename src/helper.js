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

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

export {
    randomNumber,
    randomSizePX,
    randomColor,
    guid
}