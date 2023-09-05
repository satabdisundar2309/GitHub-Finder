const url = "https://api.github.com/users/";
const get = (element) => document.getElementById(`${element}`);
const input = get("input");
const btn = get("btn");
const noResults = get("noResults");
const userImage = get("userImage");
const Name = get("name");
const username = get("username");
const date = get("date");
const repos = get("repos");
const followers = get("followers");
const following = get("following");
const profileBio = get("profileBio");
const newLocation = get("location");
const website = get("website");
const twitter = get("twitter");
const company = get("company");
const profileContainer = document.querySelector(".profileContainer");
const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// adding event listeners
btn.addEventListener("click", () => {
  if (input.value !== "") {
    getUserData(url + input.value);
  }
});

input.addEventListener("keydown", (e) => {
  // console.log(e.key);
  if (e.key === "Enter") {
    if (input.value !== "") {
      getUserData(url + input.value);
    }
  }
});
let problem;
async function getUserData(githubUrl) {
  try {
    const response = await fetch(githubUrl);
    const data = await response.json();
    if (!data) {
      throw data;
    } else {
      updateProfile(data);
      input.value = "";
    }
  } catch (err) {
    noResults.style.scale = 1;
    profileContainer.style.scale = 0;
    setTimeout(() => {
      noResults.style.scale = 0;
    }, 2000);
    input.value = "";
  }
}

// updating in the UI
let dateSegment;
function updateProfile(data) {
  noResults.style.scale = 0;
  function checkNull(apiItem, domItem) {
    if (apiItem === "" || apiItem === null) {
      domItem.style.opacity = 0.5;
      domItem.previousElementSibling.style.opacity = 0.5;
      return false;
    } else {
      domItem.style.opacity = 1;
      domItem.previousElementSibling.style.opacity = 1;
      return true;
    }
  }
  profileContainer.style.scale = 1;

  userImage.src = `${data.avatar_url}`;
  Name.innerText = data?.name;
  username.innerText = `@${data?.login}`;
  username.href = data?.html_url;
  dateSegment = data?.created_at.split("T").shift().split("-");
  date.innerText = `Joined ${dateSegment[2]} ${month[dateSegment[1] - 1]} ${
    dateSegment[0]
  }`;

  profileBio.innerText =
    data?.bio === null ? "This Profile has no Bio" : data?.bio;

  repos.innerText = data?.public_repos;
  repos.href = data?.repos_url;
  followers.innerText = data?.followers;
  followers.href = data?.followers_url;
  following.innerText = data?.following;
  following.href = data?.following_url;

  newLocation.innerText = checkNull(data?.location, newLocation)
    ? data?.location
    : "Not Available";

  website.innerText = checkNull(data?.blog, website)
    ? data?.blog
    : "Not Available";

  website.href = checkNull(data?.blog, website) ? data?.blog : "#";

  twitter.innerText = checkNull(data?.twitter_username, twitter)
    ? data?.twitter_username
    : "Not Available";

  twitter.href = checkNull(data?.twitter_username, twitter)
    ? `https://twitter.com/${data?.twitter_username}`
    : "#";

  company.innerText = checkNull(data?.company, company)
    ? data?.company
    : "Not Available";
}

// darkmode
const wrapper = document.querySelector(".wrapper");
const searchContainer = document.querySelector(".searchContainer");
const statsContainer = document.querySelector(".statsContainer");
const profileFooter = document.querySelector(".profileFooter");
const bottomIcons = document.querySelectorAll(".bottomIcon");
const profileA = document.querySelector(".profileA");
const modeBtn = get("modeBtn");
const modeText = get("modeText");
const modeIcon = get("modeIcon");
let darkMode = false;

modeBtn.addEventListener("click", () => {
  if (darkMode === false) {
    enableDarkMode();
  } else {
    enableLightMode();
  }
});
function enableDarkMode() {
  wrapper.style.backgroundColor = "#141D2F";
  wrapper.style.color = "white";
  searchContainer.style.backgroundColor = "#1E2A47";
  searchContainer.style.boxShadow = "rgba(70,88,109,0.15)";
  input.style.color = "white";
  profileContainer.style.backgroundColor = "#1E2A47";
  profileContainer.style.boxShadow = "rgba(70,88,109,0.15)";
  Name.style.color = "white";
  statsContainer.style.backgroundColor = "#141D2F";
  followers.style.color = "white";
  following.style.color = "white";
  repos.style.color = "white";
  profileFooter.style.color = "white";
  bottomIcons.forEach((x) => {
    x.style.filter = "brightness(1000%)";
  });
  website.style.color = "white";
  twitter.style.color = "white";
  modeText.innerText = "LIGHT";
  modeText.style.color = "white";
  modeIcon.src = "./Images/sun-icon.svg";
  darkMode = true;
}
function enableLightMode() {
  wrapper.style.backgroundColor = "#F6F8FF";
  wrapper.style.color = "#4B6A9B";
  searchContainer.style.backgroundColor = "#FEFEFE";
  searchContainer.style.boxShadow = "rgba(70, 88, 109, 0.25)";
  input.style.color = "#4B6A9B";
  profileContainer.style.backgroundColor = "#FEFEFE";
  profileContainer.style.boxShadow = "rgba(70, 88, 109, 0.25)";
  Name.style.color = "#2B3442";
  statsContainer.style.backgroundColor = "#F6F8FF";
  followers.style.color = "#2B3442";
  following.style.color = "#2B3442";
  repos.style.color = "#2B3442";
  profileFooter.style.color = "#4B6A9B";
  bottomIcons.forEach((x) => {
    x.style.filter = "brightness(100%)";
  });
  website.style.color = "#4B6A9B";
  twitter.style.color = "#4B6A9B";
  modeText.innerText = "DARK";
  modeText.style.color = "#4B6A9B";
  modeIcon.src = "./Images/moon-icon.svg";
  darkMode = false;
}
