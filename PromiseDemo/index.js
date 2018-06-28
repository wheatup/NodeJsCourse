// console.log('Before');
// getUser(1, (user) => {
//    getRepositories(user.gitHubUsername, (repos) => {
//       getCommits(repos[0], (commits) => {
//          console.log(commits);
//       });
//    });
// });
// console.log('After');

// getUser(1)
//    .then(user => getRepositories(user.gitHubUsername))
//    .then(repos => getCommits(repos[0]))
//    .then(commits => console.log(commits))
//    .catch(err => console.error(err.message));

// 异步方法
async function displayCommits(){
   try{
      const user = await getUser(1);
      const repos = await getRepositories(user.gitHubUsername);
      const commits = await getCommits(repos[0]);
      console.log(commits);
   }catch(err){
      console.log(err.message);
   }
}

displayCommits();

function getUser(id) {
   return new Promise((resolve, reject) => {
      console.log('Reading a user from a database...');
      setTimeout(() => {
         if(Math.random() > 0){
            resolve({
               id: id,
               gitHubUsername: 'mosh'
            });
         }else{
            reject(new Error('Oops, something went wrong.'));
         }
      }, 2000);
   });
}

function getRepositories(username) {
   return new Promise((resolve, reject) => {
      console.log('Calling GitHub API...');
      setTimeout(() => {
         if(Math.random() > 0){
            resolve(['repo1', 'repo2', 'repo3']);
         }else{
            reject(new Error('Oops, something went wrong.'));
         }
      }, 2000);
   });
}

function getCommits(repo) {
   return new Promise((resolve, reject) => {
      console.log('Calling GitHub API Again...');
      setTimeout(() => {
         if(Math.random() > 0){
            resolve(['commit']);
         }else{
            reject(new Error('Oops, something went wrong.'));
         }
      }, 2000);
   });
}
