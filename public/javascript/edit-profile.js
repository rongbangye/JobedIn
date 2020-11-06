async function profileHandler(event) {
  event.preventDefault();

  const first_name = document.querySelector("#first-name-profile").value.trim();
  const last_name = document.querySelector("#last-name-profile").value.trim();
  // const image = document.querySelector("#profile-pic");
  const city = document.querySelector("#city-profile").value.trim();
  const state = document.querySelector("#state-profile").value.trim();
  const zip_code = document.querySelector("#zipcode-profile").value.trim();
  const country = document.querySelector("#country-profile").value.trim();
  const skills = document.querySelector("#skills-profile").value.trim();
  const industry = document.querySelector("#industry-profile").value.trim();
  const education = document.querySelector("#school-profile").value.trim();
  const experience = document.querySelector("#exprience-profile").value.trim();

  const profileID = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  console.log(`/api/profile/${profileID}`);
  const response = await fetch(`/api/profiles/${profileID}`, {
    method: "PUT",
    body: JSON.stringify({
      first_name,
      last_name,
      city,
      state,
      zip_code,
      country,
      skills,
      industry,
      education,
      experience,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/profile");
  } else {
    alert(response.statusText);
  }
}

async function createProfilerHandler(event) {
  event.preventDefault();

  const first_name = document.querySelector("#first-name-profile").value.trim();
  const last_name = document.querySelector("#last-name-profile").value.trim();
  // const image = document.querySelector("#profile-pic");
  const city = document.querySelector("#city-profile").value.trim();
  const state = document.querySelector("#state-profile").value.trim();
  const zip_code = document.querySelector("#zipcode-profile").value.trim();
  const country = document.querySelector("#country-profile").value.trim();
  const skills = document.querySelector("#skills-profile").value.trim();
  const industry = document.querySelector("#industry-profile").value.trim();
  const education = document.querySelector("#school-profile").value.trim();
  const experience = document.querySelector("#exprience-profile").value.trim();

  const profileID = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const response = await fetch(`/api/profiles`, {
    method: "POST",
    body: JSON.stringify({
      first_name,
      last_name,
      city,
      state,
      zip_code,
      country,
      skills,
      industry,
      education,
      experience,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/profile");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector(".profile-form")
  .addEventListener("submit", profileHandler);

document
  .querySelector(".create-profile-form")
  .addEventListener("submit", createProfilerHandler);
