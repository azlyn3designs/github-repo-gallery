//empty DIV  w/class="overview" where Profile Info Appears
const overview = document.querySelector(".overview");
//my GitHub username
const username = "azlyn3designs";

//async function used to collect my profile data from GitHub acct
const getProfileInfo = async function() {
    const profileInfo = await fetch(`https://api.github.com/users/${username}`);
    const profileData = await profileInfo.json();
    console.log(profileData);

    displayGHInfo(profileData);
};

getProfileInfo();


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
    overview.append(div)
};
