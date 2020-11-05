
const proxyurl = "https://cors-anywhere.herokuapp.com/";
const containerEl = document.querySelector('.job-container');




var searchJob = function(language,city){
const apiURL = `http://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=${config.APP_ID}&app_key=${config.API_KEY}&results_per_page=20&what=${language}%20developer&where=${city}&content-type=application/json`;


fetch(proxyurl+ apiURL)
.then(response =>{
    // console.log(response);
    return response.json()
}).then(data =>{
    console.log(data);
    displayJob(data)
})

}
var vew = function(){
   searchJob("java","london")
}
vew();