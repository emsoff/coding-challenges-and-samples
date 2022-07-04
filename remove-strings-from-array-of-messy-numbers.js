// Challenge: Remove non-numeric values from array of strings without using regex
// Note this was a workaround for a constraint of a system we were using at the time that didn't allow regex in their CMS, which was the only place available for scripting

(() => {
    const messyNumbers = [
        '9', '9dds', 'something9', 'ccc9ccc', '99ol92'
    ];
    
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    
    const cleanNumbers = []

    messyNumbers.map(number => {
        let cleanNumber = letters.reduce((number, letter) => {
            return number.replaceAll(letter, '')
        }, number)  
        cleanNumbers.push(cleanNumber)
    })

    console.log(`The clean numbers are ${cleanNumbers}`);

})()