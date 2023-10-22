'use strict';

const urlList = [
    'Talk_devFest_2023',
    'trips_challenge'
]
const myInit = {
    method: "GET",
    mode: "cors",
    cache: "default"
};

async function getGithubResp(repoName = '', myInit){
    let repoUrl = 'https://api.github.com/repos/srjefers/'
    
    repoUrl += repoName;
    const responseDesc = await fetch(repoUrl, myInit);
    const responseLang = await fetch(repoUrl += '/languages',myInit);

    const responseDescJSON = await responseDesc.json();
    const responseLangJSON = await responseLang.json();
    
    return [responseDescJSON, responseLangJSON];
}

urlList.forEach(
    urlName => {
        let htmlcode = ``;
        getGithubResp(urlName)
        .then((response) => {

            console.log(response[1]);
            htmlcode = `
                <h3>${response[0]['name']}</h3>
                <p>${response[0]['description']}</p>
                <a href='${response[0]['html_url']}'>${response[0]['git_url']}</a>
                <ul>
                    ${response[1]}
                </ul>
            `;
            document.getElementById('repoList').insertAdjacentHTML("afterbegin", htmlcode);
        
        })
        .catch((err) => {console.log(err)});

        
    }
)
