// Given an array of objects, each object representing a coworker, organize them by skills using the 'languages' attribute, so that each language has an array of coworkers who know that language. 

const data = [
    { userId: 1, name: "Jane Doe", email: "jane@example.com", tags: ["ror", "javascript"] },
    { userId: 2, name: "John Smith", email: "john@example.com", tags: ["ror", "python"] },
    { userId: 3, name: "Sam Adams", email: "sam@example.com", tags: ["python", "javascript"] },
    { userId: 4, name: "Bob Althea", email: "bob@example.com", tags: ["javascript", "php"] },
];

let organized = {};

data.forEach(user => {
    let { tags } = user;
    tags.forEach(tag => {
        if(!organized[tag]) organized[tag] = [];
        organized[tag].push(user)
    })
})

console.log(organized);