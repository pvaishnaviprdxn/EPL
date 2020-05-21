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

    //Getting Json data
    if(main.classList.contains("club-list")){
        searchClubs();
    }else if(main.classList.contains("match-details-page")){
        matchesDetails();
    }

    //club-list functionality

    function searchClubs() {
        var clublist;
        var clubDetails;
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
            var clubNames=clublist.clubs;
            var datalist1 = document.createElement("datalist");
            datalist1.id="list-of-clubs";
            for(var i=0;i<clubNames.length;i++){
                var option=document.createElement("option");
                option.innerHTML=clubNames[i]["name"];
                datalist1.appendChild(option);
            }
            var clubListForm = document.querySelector(".clubs");
            clubListForm.appendChild(datalist1);
        }


        //display result function
        function getResults() {
            var y = new XMLHttpRequest();
            y.open("GET","https://raw.githubusercontent.com/openfootball/football.json/master/2019-20/en.1.json",true);
            y.send();
            y.onreadystatechange = function() {
                if(y.readyState == 4){
                    clubDetails=JSON.parse(y.responseText);
                    console.log(clubDetails.rounds);
                    return clubDetails;
                }
            } 
        }
        getResults();
        //function to get dropdown value
        var dropValue = document.getElementsByName("epl-clubs")[0];
        dropValue.addEventListener("keyup",(function() {
            var club = this.value+" FC";
            displayRes(club);
            dropValue.resset();
        })
        )
        //display 
        function displayRes(club) {
            var ullist = document.createElement("ul");
            ullist.className="mainList";
            var li;
            var list;
            var maxCount = 0;
            var details = clubDetails;
            var round = details.rounds;
            var match;
            for(var i=0;i<round.length;i++) {
                match = round[i]['matches'];
                maxCount = 5
                for(var k=0; k<match.length ; k++) {
                    var teamName1 = match[k].team1['name'];
                    var teamName2 =match[k].team2['name'];
                        if(club === teamName1 || club === teamName2){
                            li = document.createElement("li");
                            li.className="clubList"
                            li.innerHTML="<div class='detlist'><span class='dates'>"+match[k].date+"</span><div class='teams'><span class='t1'>"+match[k].team1['name']+"</span><span class='s2'>"+match[k].score2+"</span2></div><div class='score'><span class='t1'>"+match[k].team2['name']+"</span><span class='s2'>"+match[k].score2+"</span2></div></div>"; 
                        } 
                } 
                ullist.appendChild(li);
            }
            var resdiv = document.querySelector(".results");
            resdiv.appendChild(ullist);  
        } 
        
        //displayRes();
    }

    //Match-details page functionality
    
    function matchesDetails() {
        function matchday() {
            var y = new XMLHttpRequest();
            y.open("GET","https://raw.githubusercontent.com/openfootball/football.json/master/2019-20/en.1.json",true);
            y.send();
            y.onreadystatechange = function() {
                if(y.readyState == 4){
                    var matches=JSON.parse(y.responseText);
                    //console.log(matches);
                    domElem(matches);
                }
            } 
        }
        matchday();
        function domElem(matches) {
            var matchForm = document.createElement("form");
            var select = document.createElement("select");
            select.className = "matchdayX";
            var days= matches.rounds;
            var option = document.createElement("option");
            option.innerHTML="Select matchday";
            select.appendChild(option);
            for(var i = 0; i< days.length;i++){
                option = document.createElement("option");
                option.innerHTML=days[i].name;
                select.appendChild(option);
            }
            matchForm.appendChild(select);
            var selSection = document.querySelector(".match-day-content");
            selSection.appendChild(matchForm);
            var dropValue = document.querySelector(".matchdayX");
            dropValue.addEventListener("input",(function() {
                var day = this.value;
                dayWiseResult(day,days);
            })
            )
            function dayWiseResult(day,days) {
                var ul = document.createElement("ul");
                ul.className = "match-details2";
                for(var j =0; j<days.length;j++){
                    if(day == days[j].name){
                        var allTeamRes=days[j].matches;
                        console.log(allTeamRes);
                        for(var k=0;k<allTeamRes.length;k++){
                            var li = document.createElement("li");
                            li.innerHTML = "<span class='match-date'>"+allTeamRes[k].date+"</span><div class='teams2'><span class='tname'>Teams</span><a href='#Fixme' title='"+allTeamRes[k].team1['name']+"' class='tm1'>"+allTeamRes[k].team1['name']+"</a><a href='#FIXME' title='"+allTeamRes[k].team2['name']+"' class='tm2'>"+allTeamRes[k].team2['name']+"</a></div><div class='scores2'><span class='tscore'>Scores</span><span class='sm1'>"+allTeamRes[k].score1+"</span><span class='sm2'>"+allTeamRes[k].score2+"</span></div>";               
                            console.log(li);
                            ul.appendChild(li);
                        }
                    }
                }
                selSection.appendChild(ul);
            }  

        }
    }
})























