const URL = 'https://raw.githubusercontent.com/srjefers/resume/master/js/';
const menu = document.getElementById('menu');
const miInit = {
    method: 'GET',
    cache: 'default'
};
requestJSON('data.json');

function requestJSON(archivo){
    fetch(`${URL}${archivo}`,miInit)
    .then((resp) => {
        if(resp.status != 200){

        }else{
            return resp.json();
        }
    })
    .then((data) => {
        //console.log(data);
        contruyeElementos(data);
    })
    .catch((error) => {
        console.log('error');
    });
}

let eleH1, eleH2, eleP, eleUl, eleText, eleH5, eleH3;
let objeto = document.getElementsByClassName('item');
function contruyeElementos(data){
    //---------------------
    eleUl = document.createElement('ul');

    let firstBox = document.getElementById('r_uno');

    for(const cont of data[0].interesesPersonales){
        const eleLi = document.createElement('li');
        eleText = document.createTextNode(cont);
        eleLi.appendChild(eleText);
        eleUl.appendChild(eleLi);
        firstBox.appendChild(eleUl);
    }
    
}

menu.addEventListener('click',(e)=>{
    let nav = document.getElementsByTagName('nav');
    console.log("---");
    nav[0].className += 'show';
});