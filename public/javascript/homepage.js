
const proxyurl = "https://cors-anywhere.herokuapp.com/";
const containerEl = document.querySelector('.job-container');
const jobsEL = document.querySelector('.home-jobs');




var searchJob = function(language,city){
const apiURL = `http://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${config.APP_ID}&app_key=${config.API_KEY}&results_per_page=20&what=${language}%20developer&where=${city}&content-type=application/json`;


fetch(proxyurl+ apiURL)
.then(response =>{
    // console.log(response);
    return response.json()
}).then(data =>{
    console.log(data.results[0].description);
    console.log(data.results[0].location.display_name);
    console.log(data.results[6]);
    displayJob(data.results)
})

}
var vew = function(){
   searchJob("java","sanfrancisco")
}
vew();

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