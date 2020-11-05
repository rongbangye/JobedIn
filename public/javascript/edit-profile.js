async function profileHandler(event) {
  event.preventDefault();

  const first_name = document.querySelector("#first-name-profile").value.trim();
  const last_name = document.querySelector("#last-name-profile").value.trim();
  const image = document.querySelector("#profile-pic");
  const city = document.querySelector("#city-profile").value.trim();
  const state = document.querySelector("#state-profile").value.trim();
  const zipCode = document.querySelector("#zipcode-profile").value.trim();
  const country = document.querySelector("#country-profile").value.trim();
  const skills = document.querySelector("#skills-profile").value.trim();
  const industry = document.querySelector("#industry-profile").value.trim();
  const school = document.querySelector("#school-profile").value.trim();
  const experience = document.querySelector("#exprience-profile").value.trim();

  console.log("image", image.files[0]);

  let d = new FormData();
  d.append("image", image.files[0]);
  console.log(d);

  const json = JSON.stringify({
    first_name,
    last_name,
    city,
    state,
    zipCode,
    country,
    skills,
    industry,
    school,
    experience,
  });

  d.append("json", json);
  const response = await fetch(`/api/profile/`, {
    method: "POST",
    body: d,
  });
  if (response.ok) {
    console.log(response);
    response.json().then((data) => {
      console.log(data);
    });
    document.location.reload();
  }
}

document
  .querySelector(".profile-form")
  .addEventListener("submit", profileHandler);
