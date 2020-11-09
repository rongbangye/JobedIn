const proxyurl = "https://cors-anywhere.herokuapp.com/";
const containerEl = document.querySelector(".job-container");
const jobsEL = document.querySelector(".home-jobs");
const searchBtn = document.querySelector("#search-form");
const locationEL = document.querySelector("#location");
const languageEL = document.querySelector("#language");
const {APP_ID,API_KEY} = config;

var searchJob = function (language, city) {
  const apiURL = `http://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${APP_ID}&app_key=${API_KEY}&results_per_page=10&what=${language}%20developer&where=${city}&content-type=application/json`;

  fetch(proxyurl + apiURL)
    .then((response) => {
      return response.json();
    })  
    .then((data) => {
      displayJob(data.results);
    });
};

const displayJob = function (jobs) {
  // clear area first
  jobsEL.textContent = "";

  let jobEL = document.createElement("ul");
  jobs.forEach((job) => {
    jobEL.innerHTML += `
        <li>
        <div class="d-flex justify-content-between">
        <div> <h4>${job.title}</h4>
              <p class="company-location"><i class="fas fa-map-marker-alt mr-2"></i>${job.location.display_name}</p>
              <p class="company-name">${job.company.display_name}</p>
        </div>
        
        <div><a href="${job.redirect_url}" target="_blank">Apply</a></div>
         
        </div>
        <div>
            <p class="text-secondary">${job.description}</p>
         </div>
    </li>
      `;
  });

  jobsEL.appendChild(jobEL);
};
const formSubmitHandler = function (event) {
  event.preventDefault();
  // get value from input element
  var location = locationEL.value.trim();
  var language = languageEL.value.trim();

  if (language && location) {
    // search job
    searchJob(language, location);

    // save to local storage
    saveToLocalStorage(language, location);
    languageEL.value = "";
    locationEL.value = "";
  } else {
    alert("Please enter a correct city name or location");
  }
};

const saveToLocalStorage = function (language, city) {
  localStorage.setItem("searchedCity", city.toString());
  localStorage.setItem("searchedLanguage", language.toString());
};

//----- FUNCTION- LOAD PAGE ------------------------------------------------

const loadPage = function () {
    // get the last searched country name from localstorage
    var lastSearchedCity = localStorage.getItem("searchedCity");
    var lastSearchedLanguage = localStorage.getItem("searchedLanguage");
  
    // get the data for the last searched country
    if (lastSearchedCity&& lastSearchedLanguage) {
      searchJob(lastSearchedLanguage,lastSearchedCity);
    } else {
      searchJob("java","sanfrancisco");
    }
    // if there was no searched country before search for USA
  };
loadPage();

searchBtn.addEventListener("submit", formSubmitHandler);
