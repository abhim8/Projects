/* Author: Abhilash Movva */

function palindrome(str) {
    const arr = str.split('');
    const reverseArr = arr.reverse();
    const reverseString = reverseArr.join('');
    
    if(str===reverseString)
        return true
    else
        return false
}  

function palindromeUsingRegex(str){
    var re = /[\W_]/g;
    var lowRegStr = str.toLowerCase().replace(re, '');
    var reverseStr = lowRegStr.split('').reverse().join(''); 
    return reverseStr === lowRegStr;
}

function palindromeUsingLoops(str) {
    var len = str.length;
    var mid = Math.floor(len/2);
    for ( var i = 0; i < mid; i++ ) {
        if (str[i] !== str[len - 1 - i]) {
            return false;
        }
    }

    return true;
}

console.log(palindrome("eye"))
