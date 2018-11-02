let prevScrollpos = window.pageYOffset;

window.addEventListener('scroll', () => {
    let currentScrollPos = window.pageYOffset;
    if(window.matchMedia("(max-width: 1024px)").matches){
        if (prevScrollpos > currentScrollPos) {
            document.getElementById("nav").style.top = "5em";
        } else {
            document.getElementById("nav").style.top = "-3em";
        }
    }else{
        
    document.getElementById("nav").style.top = "0em";        
    }

    prevScrollpos = currentScrollPos;
});
