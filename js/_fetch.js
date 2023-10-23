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

async function getGithubResp(repoName = ''){
    let repoUrl = 'https://api.github.com/repos/srjefers/'
    
    repoUrl += repoName;
    const responseDesc = await fetch(repoUrl, myInit);
    const responseLang = await fetch(repoUrl += '/languages',myInit);

    const responseDescJSON = await responseDesc.json();
    const responseLangJSON = await responseLang.json();
    
    return [responseDescJSON, responseLangJSON];
}

urlList.every(
    urlName => {

        let htmlcode = ``;
        getGithubResp(urlName)
        .then((response) => {

            //console.log(response);
            const responseException = `message` in response[0];
            if (responseException) { throw new Error('Max number of request has been reatched') }
            
            htmlcode = `
                <h3>${response[0]['name']}</h3>
                <p>${response[0]['description']}</p>
                <a href='${response[0]['html_url']}'>${response[0]['git_url']}</a>
                <ul>
            `;

            for (const [key, value] of Object.entries(response[1])){
                htmlcode += `<li>${key}</li>`
            }
            htmlcode += `</ul>`
            //console.log(htmlcode);
            
            
            document.getElementById('repoList').insertAdjacentHTML("afterbegin", htmlcode);
        })
        .catch((err) => {
            htmlcode = `
                <h3>trips_challenge</h3>
                <p>Data Engineering Challenge </p>
                <a href='https://github.com/srjefers/trips_challenge'>git://github.com/srjefers/trips_challenge.git</a>
                <ul>
                <li>Python</li>
                <li>Dockerfile</li>
                </ul>            
            `;
            //console.log(htmlcode);


            document.getElementById('repoList').insertAdjacentHTML("afterbegin", htmlcode);
        });

    }
)