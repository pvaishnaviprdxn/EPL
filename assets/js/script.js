/* Author: 

*/
'use strict'
window.onload = (function(){
    window.history.forward();
    function blockBack() {
        window.history.forward();
    }

    //selecting DOM
    var main=this.document.querySelector("main");
    
    //index-page/login-page functionality starts here
    var loginPage = document.querySelector(".container");
    var login = document.querySelector(".login-btn");
    var modal = document.getElementById("form-modal");
    var closeMod = document.getElementById("close");

    if(loginPage.classList.contains("log-page")){
        function openModal() {
            modal.classList.add("btn-disp");
        }
        function closeModal() {
            closeMod.classList.add("nobtn-disp");
        }

        login.addEventListener("click",openModal,false);
        closeMod.addEventListener("click",closeModal,false);
        
        
    }

})























