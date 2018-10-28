const mail = document.getElementById('mail');
const formulario = document.getElementById('formulario');
let modal = document.getElementById('myModal');
let span = document.getElementsByClassName("close")[0];


mail.addEventListener('click', ()=>{
    modal.style.display = "block";
    console.log("=----");
});
span.onclick = function() {
    modal.style.display = "none";
}