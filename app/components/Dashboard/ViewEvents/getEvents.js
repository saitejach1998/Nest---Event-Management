

// Change YOUR_API_KEY_HERE to your apiKey
const url =
  "";

export async function getEvents(params) {
  if(params['type'] == 'global'){
    url = "http://192.168.43.209:3000/getglobalevents";
  }
  else if(params['type'] == 'local'){
    url="";
  }
  else if(params['type'] == 'self'){
    url=""
  }
  else{
    
  }

/*
  let result =  await fetch(url
         ,{
             method: 'POST',
         headers: {
           Accept: 'application/json',
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(params)
          
       })
       
       .catch(err => console.warn(err));
      
 console.log(result)
  return result.articles;
  */
}
