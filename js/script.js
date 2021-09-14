//empty DIV  w/class="overview" where Profile Info Appears
const overview = document.querySelector(".overview");
//my GitHub username
const username = "azlyn3designs";
//displays a list of my public repos in the unordered list eleement
const repoList = document.querySelector(".repo-list")

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

//async function used to collect my GitHub repos
const getRepos = async function() {
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