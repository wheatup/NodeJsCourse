async function sendTopMoviesEmail(id){
   try{
      const customer = await getCustomer(id);
      console.log(`Got customer: ${customer.name}`);
      const movies = await getTopMovies();
      console.log(`Got movies: ${JSON.stringify(movies)}`);
      const result = await sendMessage(customer, movies);
      console.log(result);
   }catch(err){
      console.error(err.message);
   }
}

function getCustomer(id){
   return new Promise((resolve, reject) => {
      console.log(`Getting customer id: ${id}...`);
      let customers = [
         {id: 1, name: 'Robin', isGold: true},
         {id: 2, name: 'Linux', isGold: false},
         {id: 3, name: 'Sebastian', isGold: true}
      ];
      setTimeout(()=>{
         resolve(customers.find(el => el.id === id));
      }, 2000);
   });
}

function getTopMovies(){
   return new Promise((resolve, reject) => {
      setTimeout(()=>{
         resolve([{id: 1, title: 'Moive 1'}, {id: 2, title: 'Movie 2'}]);
      }, 3000);
   });
}

function sendMessage(customer, message){
   return new Promise((resolve, reject) => {
      setTimeout(()=>{
         console.log(`Send ${JSON.stringify(message)} to ${customer.name}!`);
         resolve();
      }, 5000);
   });
}

sendTopMoviesEmail(2);
console.log('Done');
