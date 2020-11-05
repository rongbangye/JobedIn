
const proxyurl = "https://cors-anywhere.herokuapp.com/";
const containerEl = document.querySelector('.job-container');
const jobsEL = document.querySelector('.home-jobs');
const searchBtn = document.querySelector('#search-form');
const locationEL = document.querySelector('#location');
const languageEL = document.querySelector('#language');




var searchJob = function(language,city){
const apiURL = `http://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${config.APP_ID}&app_key=${config.API_KEY}&results_per_page=20&what=${language}%20developer&where=${city}&content-type=application/json`;


fetch(proxyurl+ apiURL)
.then(response =>{
    return response.json()
}).then(data =>{
    
    displayJob(data.results)
})

}


const displayJob = function(jobs){

    let jobEL=document.createElement("ul");
    // jobEL.addClass("m-2 p-3 border bg-light");
   jobs.forEach(job=>{
        
        jobEL.innerHTML+= `
        <li>
        <div class="d-flex justify-content-between">
        <div> <h4>${job.title}</h4>
              <p class="company-location"><i class="fas fa-map-marker-alt mr-2"></i>${job.location.display_name}</p>
              <p class="company-name">${job.company.display_name}</p>
        </div>
        
        <div><a href="${job.redirect_url}">Apply</a></div>
         
        </div>
        <div>
            <p class="text-secondary">${job.description}</p>
         </div>
    </li>
      `
    });

    jobsEL.appendChild(jobEL)
}
var formSubmitHandler = function (event) {
    event.preventDefault();
    // get value from input element
    var location = locationEL.value.trim();
    var language = languageEL.value.trim();
  
    if (language && location) {
      searchJob(language,location);
  
      languageEL.value = "";
      locationEL.value = "";
    } else {
      alert("Please enter a correct city name or location");
    }
  };

searchBtn.addEventListener('submit',formSubmitHandler)