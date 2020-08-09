console.log('worker');
let num = 0;
for(let i=0; i<100000000; i++){
    num += i;
}
console.log(num);
