function findPattern(arr){
   var start = 0, len = 1, rep = 0;

   all: for(start = 0; start < arr.length; start++){
      for(len = 1; len < arr.length - start; len++){
         for(var i = 0; i < len; i++){
            var testArr = [];
            for(rep = 0; start + i + len * rep < arr.length; rep++){
               var index = start + i + len * rep;
               testArr.push(arr[index]);
            }
            if(areAllEqual(testArr)){
               if(start + i + len * (rep - 1) === arr.length - 1){
                  break all;
               }
            }else{
               break;
            }
         }

      }
   }

   return {start: start, len: len, rep: rep};
}

function areAllEqual(arr){
   var val = arr[0];
   for(var i = 1; i < arr.length; i++){
      if(arr[i] !== val){
         return false;
      }
   }
   return true;
}

function getNext(pattern, arr){
   return arr[pattern.start + (arr.length - pattern.start) % pattern.len];
}

function process(arr){
   var pattern = findPattern(arr);
   if (pattern.start < arr.length){
      return getNext(pattern, arr);
   }
}


var seq = [0,1,0,1,0,1];
console.log(process(seq));
