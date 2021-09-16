//empty DIV  w/class="overview" where Profile Info Appears
const overview = document.querySelector(".overview");
//my GitHub username
const username = "azlyn3designs";
//displays a list of my public repos in the unordered list eleement
const repoList = document.querySelector(".repo-list");
//selects the unordered list, list item section  w/class="repo"
const allReposInfo = document.querySelector(".repos");
//selects the section element w/class="repo-data"
const repoData = document.querySelector(".repo-data");
// selects "Back to Repo Gallery" button
const viewReposButton = document.querySelector(".view-repos");
//selects the input with the placeholder "Search by name"
const filterInput = document.querySelector(".filter-repos");


//FETCH USER DATA FROM GITHUB API DOCUMENTATION & JSON FILE

//async function used to collect my profile data from GitHub acct
const getProfileInfo = async function() {
    const profileInfo = await fetch(`https://api.github.com/users/${username}`);
    const profileData = await profileInfo.json();
    //console.log(profileData);

    displayGHInfo(profileData); //calls function
};

getProfileInfo(); //calls function


//function use to display GitHub User Info
const displayGHInfo = function(profileData) {
    
    //creates new HTML DIV element & adds GitHub's user info too
    const div = document.createElement("div");
    div.classList.add("user-info");

    //creates HTML elements to populate DIV element & displays user's GitHub Profile Info
    div.innerHTML = `
        <figure>
            <img alt="user avatar" src="${profileData.avatar_url}" />
        </figure>

        <div>
            <p><strong>Name:</strong> ${profileData.name}</p>
            <p><strong>Bio:</strong> ${profileData.bio}</p>
            <p><strong>Location:</strong> ${profileData.location}</p>
            <p><strong>Number of public repos:</strong> ${profileData.public_repos}</p>
        </div>
    `;
    overview.append(div);
};


//FETCH REPO DATA FROM GITHUB API DOCUMENTATION & JSON FILE

//async function used to collect my GitHub repos
const getRepos = async function() {
    
    filterInput.classList.remove("hide"); //unhides <input> element Search box placeholder "Search by name"
    
    const reposList = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const reposData = await reposList.json();
    //console.log(reposData);

    displayRepoInfo(reposData);
};

getRepos(); //calls function

//function used to display info for each repo in user's list of repos
const displayRepoInfo = function(repos) {
    for( const repo of repos) {
        const li = document.createElement("li"); //creates unoredered list item element
        li.classList.add("repo"); //adds reop class to list item element
        li.innerHTML = `<h3>${repo.name}</h3>`; // create a h3 HTML element for repos name
        repoList.append(li); //displays & adds repo to end of list
    }
};


//DISPLAYS SPECIFIC REPO INFORMATION FOR EACH REPO USING GITHUB API DOCUMENTATION & JSON FILE

//add a click event listener w/event parameter for ul class repo-list element
repoList.addEventListener("click", function(e) {
    if(e.target.matches("h3")) {
        const repoName = e.target.innerText;
        //console.log(repoName);

        getSpecificRepoInfo(repoName); //calls async function
    }
});

//async function used to collect specific repo info
const getSpecificRepoInfo = async function(repoName) {
    const grabInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await grabInfo.json();
    //console.log(repoInfo);

    //fetches language data from json file languages_url property
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    //console.log(languageData);

    //creates any empty array to hold repos languages
    const languages = [];

    //loops through Object to retrieve specific property info
    for(const language in languageData) {
        languages.push(language);
        //console.log(languages);
    }

    displaySpecificRepoInfo(repoInfo, languages); //calls function w/parameters
};

//function used to display specific repo info
const displaySpecificRepoInfo = function(repoInfo, languages) {
    repoData.innerHTML = "";

    //create a new div HTML element
    const div = document.createElement("div");

    //new div element's structure
    div.innerHTML = `
        <h3>Name: ${repoInfo.name}</h3>
            <p>Description: ${repoInfo.description}</p>
            <p>Default Branch: ${repoInfo.default_branch}</p>
            <p>Languages: ${languages.join(", ")}</p>
            <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `;
    
    repoData.append(div);
    repoData.classList.remove("hide"); //HTML <section> element w/class="repo-data"
    allReposInfo.classList.add("hide"); //HTML <section> element w/class="repos"

    viewReposButton.classList.remove("hide"); //"BAck to Repo Gallery" Button
};


//CREATES A DYNAMIC SEARCH FOR EACH LETTER & EVENT LISTENER FOR "BACK TO REPO GALLERY" BUTTON

//creates a click Event Listener on the "Back to Repo Gallery" Button
viewReposButton.addEventListener("click", function() {
    allReposInfo.classList.remove("hide"); //HTML <section> element w/class="repos"
    repoData.classList.add("hide"); //HTML <section> w/class="repo-data"
    viewReposButton.classList.add("hide"); //"Back to Repo Gallery" Button
});

//creates a input Event Listener to Search for each letter entered into Search Box
filterInput.addEventListener("input", function(e) {
    const inputSearchText = e.target.value;
    //console.log(filterInput); //test to see if text input is captured from Search Box

    const repos = document.querySelectorAll(".repo"); //selects all elements on page w/class="repo"
    const searchTextLower = inputSearchText.toLowerCase(); //assigns search text to lowercase input value

    for(const repo of repos) {
        const inputTextLower = repo.innerText.toLowerCase(); //assigns the innerText of each repo to a lowercase value
        
        //checks to see if lowercase repo text incl. the lowercase search text
        if(inputTextLower.includes(searchTextLower)) {
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
    }
});
