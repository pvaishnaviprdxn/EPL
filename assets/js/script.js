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

    if(loginPage.classList.contains("log-page")) {

        //function to open form modal
        function openModal() {
            login.classList.add("btn-nodisp");
            modal.classList.add("btn-disp");
        }
        //function to close form modal
        function closeModal() {
            modal.classList.remove("btn-disp");
            login.classList.remove("btn-nodisp");
        }
        login.addEventListener("click",openModal,false);
        closeMod.addEventListener("click",closeModal,false);
        
        //form validation
        var lemail=document.getElementById("email-id");
        var lpassword=document.getElementById("user-pass");
        var validEmail=false;
        var validPass=false;

        lemail.addEventListener("blur",function(){
            var email=lemail.value;
            var emailp=/^([0-9a-zA-Z\_\.\-]+)@([0-9a-zA-Z\_\.\-]+)\.([a-zA-Z]+)$/;
            var emailEr1 = document.querySelector(".email-error1");
            var emailEr2 = document.querySelector(".email-error2");
            if(email == ""){
                emailEr1.classList.add("error");
                validEmail=false;
            }
            else if(!email.match(emailp)){
                emailEr2.classList.add("error");
                validEmail=false;
            }
            else{
                emailEr1.classList.remove("error");
                emailEr2.classList.remove("error");
                validEmail=true;
            }
        },false);

        lpassword.addEventListener("blur",function(){
            var password=lpassword.value;
            var passwordp=/((?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-zA-Z])){4,15}/;
            var passEr1 = document.querySelector(".pass-error1");
            var passEr2 = document.querySelector(".pass-error2");
            if(password == ""){
                passEr1.classList.add("error");
                validPass=false;
            }
            else if(!password.match(passwordp)){
                passEr2.classList.add("error");
                validPass=false;
            }
            else{
                passEr1.classList.remove("error");
                passEr2.classList.remove("error");
                validPass="true";
            }
        },false);

        var logbtn = document.getElementById("save-login");
        logbtn.addEventListener("click",loggedIn);

        //login credentials to be stored in localstorage
        var creds = [
            { uemail:"vaishnavi@gmail.com", upassword:"vaishnavi@62" },
            { uemail:"george@gmail.com", upassword:"george@73 " },
            { uemail:"prdxn@gmail.com", upassword:"prdxn@84"}
        ];
        //function to login
        function loggedIn(e) {
            e.preventDefault();
            var i;
            for(i=0; i < creds.length; i++){
                if(lemail.value === creds[i].uemail && lpassword.value === creds[i].upassword){
                    dataStorage();
                    resetForm();
                }
            }
        }

        //storing data in localStorage
        function dataStorage(){
            var storing = JSON.stringify(creds);
            var userAccess = "users" + localStorage.length;
            localStorage.setItem(userAccess,storing);
            window.location.assign("home-page.html");
        }
        //form reset
        function resetForm() {
            document.querySelector(".login-form").reset();
        }
    }

    if(main.classList.contains("club-list")){
        searchClubs();
    }

    //club-list functionality

    function searchClubs(){
        var clublist;
        function getClubData(){
            var club = new XMLHttpRequest()
            club.open("GET","https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.clubs.json",true);
            club.send();
            club.onreadystatechange = function() {
                if(club.readyState == 4) {
                    clublist = JSON.parse(club.responseText);
                    getClubnames(clublist);
                }
            }
        }
        getClubData();
        function getClubnames(clublist){
            //console.log(clublist);
            var clubNames=clublist.clubs;
            //console.log(clubNames);
            var datalist1 = document.createElement("datalist");
            datalist1.id="list-of-clubs";
            var i;
            for(i=0;i<clubNames.length;i++){
                var option=document.createElement("option");
                option.innerHTML=clubNames[i]["name"];
                datalist1.appendChild(option);
            }
            console.log(datalist1);
            var clubListForm = document.querySelector(".clubs");
            clubListForm.appendChild(datalist1);
            console.log(clubListForm);
        }
        
    }
})























