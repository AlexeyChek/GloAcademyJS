let num = 266219;
num += '';

let prod = 1;

for (let i = 0; i < num.length; i++) {
  prod *= +num[i];
}
console.log(prod);

prod **= 3;

console.log(('' + prod).substr(0, 2));