// Change YOUR_API_KEY_HERE to your apiKey
const url =
  "https://newsapi.org/v2/top-headlines?country=us&apiKey=55607ab456ce4274b5a14ffbe87710e3";

export async function getEvents(params) {
 await fetch("http://192.168.43.209:3000/eventposting"
         ,{
             method: 'POST',
         headers: {
           Accept: 'application/json',
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(data)
          
       })
       .then(res => this.handleResponse(res))
       .catch(err => console.warn(err));
      
  let result = await fetch(url).then(response => response.json());
  return result.articles;
}
