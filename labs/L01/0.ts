function convertstr(str: string){
    const arr = str.split('');
    const len = arr.length;
    switch(len){
        case 0:
        case 1: return '';
        case 2: return arr[0] + arr[1] + arr[0] + arr[1];
        case 3: return arr[0] + arr[1] + arr[1] + arr[2];
        default: return arr[0] + arr[1] + arr[len-2] + arr[len-1];
    }
}


[
    'a',
    'it',
    'cat',
    'spring'
].forEach(str => {
    console.log(`convertstr('${str}')=>${convertstr(str)}`);
});