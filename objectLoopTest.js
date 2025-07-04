
const user = {
    name : "John",
    age : 25,
    email : "john@gmail.com"
};

// get and loop key in object using
// for (let key in user) {
//     console.log(`${key}: ${user[key]}`);
    
// }

/* using object.keys() with forEach*/
// Object.keys(user).forEach(key => {
//     console.log(`${key}: ${user[key]}`);
// })

/* using Object.entries() with for...of*/
for (let [key, value] of Object.entries(user)) {
    console.log(`${key}: ${value}`);
}