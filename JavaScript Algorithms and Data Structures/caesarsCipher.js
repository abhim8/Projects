/* Author: Abhilash Movva */
function rot13(str){
    var ecryptedString = ""
    const shiftBy = 13
    
    for (var i = 0; i < str.length; i++) {
        var ch = str[i]
        if (ch.match(/[a-z]/i)) {
            var code = str.charCodeAt(i)
            if (code >= 65 && code <= 90) {
                ch = String.fromCharCode(((code - 65 + shiftBy) % 26) + 65)
            }
            else if (code >= 97 && code <= 122) {
                ch = String.fromCharCode(((code - 97 + shiftBy) % 26) + 97)
            }
        }
        ecryptedString += ch
    }
    
    return ecryptedString
}

console.log(rot13("SERR PBQR PNZC"));
