'use strict';

const urlList = [
    'Talk_devFest_2023',
    'ml_zoomcamp2023'
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

try{
    urlList.forEach(
        urlName => {

            let htmlcode = ``;
            getGithubResp(urlName)
            .then((response) => {

                const responseException = `message` in response[0];
                const responseStatus = response[0]['status'] === 403;
                if (responseException || responseStatus) { throw new Error('Max number of request has been reatched') }
                
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
                
                document.getElementById('repoList').insertAdjacentHTML("afterbegin", htmlcode);
                
            })

        }
    )
}
catch(e){ 
    console.log(e);
}
finally{
    let htmlcode = `
        <h3>trips_challenge</h3>
        <p>Data Engineering Challenge </p>
        <a href='https://github.com/srjefers/trips_challenge'>git://github.com/srjefers/trips_challenge.git</a>
        <ul>
        <li>Python</li>
        <li>Dockerfile</li>
        </ul>            
    `;
    document.getElementById('repoList').insertAdjacentHTML("afterbegin", htmlcode);
}