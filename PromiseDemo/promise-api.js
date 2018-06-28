const p1 = new Promise((resolve, reject) => {
   console.log('Asyn operation 1...');
   setTimeout(()=>{
      console.log('Asyn operation 1 Done.');
      resolve(1);
   }, 4000);
});

const p2 = new Promise((resolve, reject) => {
   console.log('Asyn operation 2...');
   setTimeout(()=>{
      console.log('Asyn operation 2 Done');
      resolve(2);
   }, 2000);
});

Promise.all([p1, p2]).then(result => console.log(result));
Promise.race([p1, p2]).then(result => console.log(result));
