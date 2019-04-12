export const APIURL = "https://192.168.1.31:44352/api";
// export const APIURL = "https://webapi-sharkwest.azurewebsites.net/api";


// fetch(APIURL + '/Account/Check', {
//     method: 'POST',
//     async: false,²
//     headers: {
//         'Content-Type': 'application/json',
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Methods': 'POST'
//     },
//     body: JSON.stringify({
//         login: 'robrinne',
//         password: 'robrinne'
//     })
// })
// .then(results => 
// {
//     return results.json();
// })
// .then(data =>
// {
//     console.log('Connection IN');
// })
// .catch(function(error) {
//     console.log("Une erreur est survenue lors de l'opération fetch : " + error.message);
//     throw error;
// });