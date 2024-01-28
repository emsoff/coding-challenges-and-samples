// Context: You're working on a templating framework that will utizilize brackets, occasionally within strings, for interpolation. 

// Write a function that can determine if all open brackets within a string are balanced, i.e., have a matching closing bracket. 

function isBalanced(inputString) {
    let stack = [];

    let brackets = {
        '(': ')',
        '[': ']',
        '{': '}'
    };

    // Iterate through each character in the input string
    for (let char of inputString) {
        // If the character is an opening bracket, push it onto the stack
        if (brackets[char]) {
            stack.push(char);
        }
        // If the character is a closing bracket
        else if (Object.values(brackets).indexOf(char) > -1) {
            // Pop the last opening bracket from the stack
            let lastBracket = stack.pop();
            if (brackets[lastBracket] !== char) {
                return false;
            }
        }
    }

    return stack.length === 0;
}

console.log(isBalanced("{[()]}")); // Should return true
console.log(isBalanced("{[(])}")); // Should return false
console.log(isBalanced("{{[[(())]]}}")); // Should return true
console.log(isBalanced("text ( is [ sometimes ) } included")); // Should return false