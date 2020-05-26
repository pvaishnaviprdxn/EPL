/* Author: 

*/
'use strict'
window.onload = (function(){ 
    window.history.forward();
    function blockBack() {
        window.history.forward();
    }
    //selecting DOM
    var html=this.document.querySelector("html");
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
            if(email == "") {
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
            if( password == "" ){
                passEr1.classList.add("error");
                validPass=false;
            }
            else if( !password.match(passwordp) ){
                passEr2.classList.add("error");
                validPass=false;
            }
            else{
                passEr1.classList.remove("error");
                passEr2.classList.remove("error");
                validPass="true";
            }
        },false);
        //login credentials to be stored in localstorage
        var creds = [
            { uemail:"vaishnavi@gmail.com", upassword:"vaishnavi@62" },
            { uemail:"george@gmail.com", upassword:"george@73" },
            { uemail:"prdxn@gmail.com", upassword:"prdxn@84" }
        ];
        //storing data in localStorage
        function dataStorage() {
            var storing = JSON.stringify(creds);
            localStorage.setItem("User-name", storing);
        }
        dataStorage();

        var logbtn = document.getElementById("save-login");
        logbtn.addEventListener("click",loggedIn);

        function loggedIn() {
            var inputuser=JSON.parse(localStorage.getItem("User-name"));
            for(var i=0; i < inputuser.length; i++){
                if(lemail.value === inputuser[i].uemail && lpassword.value === inputuser[i].upassword){
                    localStorage.setItem("loggedUser",lemail.value);
                    window.location.assign("home-page.html");
                }
            }
        }
    }


    //Getting Json data
    if(main.classList.contains("home-page")){
        homePage();
    }
    if(main.classList.contains("club-list")){
        searchClubs();
    }else if(main.classList.contains("match-details-page")){
        matchesDetails();
    }

    //home-page functionality start here 
    function homePage() {
        if(localStorage.getItem("loggedUser") == null){
            window.location.assign("index.html");
        }
        blockBack();
        var slidei;
        slidei = 0;
        slideShowing();
        function slideShowing(slideIndex){
            var slides=document.getElementsByClassName("slides");
            var i;
            for (i = 0; i < slides.length; i++) {
                slides[i].style.opacity = 0; 
            }
            slidei++;
            if(slidei > slides.length){
                slidei=1;
            }
            slides[slidei-1].style.opacity = 1; 
            setTimeout(slideShowing, 2200);
        }
    }

    //home-page functionality end here
    //club-list functionality

    function searchClubs() {
        if(localStorage.getItem("loggedUser") == null){
            window.location.assign("index.html");
        }
        var clublist;
        var clubDetails;
        //Team names
        function getClubData(){
            var club = new XMLHttpRequest()
            club.open("GET","https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.clubs.json",true);
            club.send();
            club.onreadystatechange = function() {
                if(club.readyState == 4) {
                    clublist = JSON.parse(club.responseText);
                    var clubNames=clublist.clubs;
                    addOptioninList(clubNames)
                }
            }
        }
        //Scores result
        function getResults() {
            var y = new XMLHttpRequest();
            y.open("GET","https://raw.githubusercontent.com/openfootball/football.json/master/2019-20/en.1.json",true);
            y.send();
            y.onreadystatechange = function() {
                if(y.readyState == 4){
                    clubDetails=JSON.parse(y.responseText);
                }
            } 
        }
        getResults();
        getClubData();
        //Addin club name options in datalist
        var dropValue;
        function addOptioninList(clubNames){
            
            var datalist1= document.getElementById("list-of-clubs");
            for(var i=0;i<clubNames.length;i++){
                var option=document.createElement("option");
                var keys = clubNames[i]["key"];
                option.innerHTML= keys.toUpperCase();
                datalist1.appendChild(option);
            }
            var clubListForm = document.querySelector(".clubs");
            clubListForm.appendChild(datalist1);
            dropValue = document.getElementsByName("epl-clubs")[0];
            var club;
            dropValue.addEventListener("input",(function() {
                club = dropValue;
                club = this.value;
                displayRes(club);    
            })
            )
            var str = new URLSearchParams(location.search);
            var teamName=str.get("team-name");
            if(teamName != null && teamName != 'undefined'){
                var option1=document.createElement("option");
                option1.innerHTML=teamName;
                option1.selected=true;
                dropValue.value=option1.textContent;
                club = dropValue.value;
                displayRes(club);
            }
           
        }
        
        //display first 5 results of the club
        function displayRes(club) {
            var btns = document.getElementById("show-m");
            var listName = document.querySelector(".mainList");
            if(typeof(listName) != 'undefined' && listName != null) {
                var ul = document.querySelector('.mainList');
                ul.parentNode.removeChild(ul);
            }
            if(typeof(btns) != 'undefined' && btns != null) {
                var btns = document.getElementById("show-m");
                btns.parentNode.removeChild(btns);
            }
            
            var ullist = document.createElement("ul");
            ullist.className="mainList";
            var li;
            var count=5;
            var details = clubDetails;
            var round = details.rounds;
            var match;
            for(var i =0; i < count && i<round.length; i++) {
                match = round[i]['matches'];
                for(var k=0; k<match.length ; k++) {
                    var teamName1 = match[k].team1['key'].toUpperCase();
                    var teamName2 =match[k].team2['key'].toUpperCase();
                    if(club === teamName1 || club === teamName2){
                        li = document.createElement("li");
                        li.className="clubList"
                        li.innerHTML="<div class='detlist'><span class='dates'>"+match[k].date+"</span><div class='teams'><span class='t1'>"+match[k].team1['name']+"</span><span class='s2'>"+match[k].score1+"</span2></div><div class='score'><span class='t1'>"+match[k].team2['name']+"</span><span class='s2'>"+match[k].score2+"</span2></div></div>"; 
                    }
                } 
                ullist.appendChild(li);
            }
            var resdiv = document.querySelector(".results");
            resdiv.appendChild(ullist);  
            var btndiv=document.createElement("div");
            btndiv.id="show-m";
            var btn=document.createElement("button");
            btn.class="show-morebtn";
            btn.textContent="Show more"; 
            btndiv.appendChild(btn);
            resdiv.appendChild(btndiv);

            //show more club results functionality after clicking on button
            btn.onclick=function() {
                count=count+5;
                displayData();
            }
            function displayData() {
                for(var i =count; i < count+5 && i<round.length; i++) {
                    match = round[i]['matches'];
                    for(var k=0; k<match.length ; k++) {
                        var teamName1 = match[k].team1['key'].toUpperCase();
                        var teamName2 =match[k].team2['key'].toUpperCase();
                        if(club === teamName1 || club === teamName2){
                            li = document.createElement("li");
                            li.className="clubList"
                            li.innerHTML="<div class='detlist'><span class='dates'>"+match[k].date+"</span><div class='teams'><span class='t1'>"+match[k].team1['name']+"</span><span class='s2'>"+match[k].score2+"</span2></div><div class='score'><span class='t1'>"+match[k].team2['name']+"</span><span class='s2'>"+match[k].score2+"</span2></div></div>"; 
                        }
                    } 
                    ullist.appendChild(li); 
                }
                if(i == round.length) {
                    btn.parentNode.removeChild(btn);
                }
            }
        }
    }

    //Match-details page functionality start//
    function matchesDetails() {
        if(localStorage.getItem("loggedUser") == null){
            window.location.assign("index.html");
        }
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
                var ulist = document.querySelector(".match-details2");
                if(typeof(ulist) != 'undefined' && ulist != null){
                    var ul2 = document.querySelector('.match-details2');
                    ul2.parentNode.removeChild(ul2);
                }
                var ul = document.createElement("ul");
                ul.className = "match-details2";
                for(var j =0; j<days.length;j++){
                    if(day == days[j].name){
                        var allTeamRes=days[j].matches;
                        for(var k=0;k<allTeamRes.length;k++){
                            var li = document.createElement("li");
                            li.innerHTML = "<span class='match-date'>"+allTeamRes[k].date+"</span><div class='teams2'><span class='tname'>Teams</span><a href='#Fixme' title='"+allTeamRes[k].team1['name']+"' class='tm1 team-name1'>"+allTeamRes[k].team1['name']+"</a><a href='#FIXME' title='"+allTeamRes[k].team2['name']+"' class='tm2 team-name1'>"+allTeamRes[k].team2['name']+"</a></div><div class='scores2'><span class='tscore'>Scores</span><span class='sm1'>"+allTeamRes[k].score1+"</span><span class='sm2'>"+allTeamRes[k].score2+"</span></div>";               
                            ul.appendChild(li);
                        }
                    } 
                }
                selSection.appendChild(ul);
                var names= document.getElementsByClassName("team-name1");
                for(var k=0;k<names.length;k++){
                    names[k].addEventListener("click",function() {
                        var matchTeam=this.textContent;
                        localStorage.setItem("Team-name",matchTeam);
                        window.location.assign("club-list.html");
                        //showingRes();
                    })
                }
            } 
        }
    }
    //Match-details page functionality end//
    


    //logout function start
    var logOut = document.querySelector(".logout");
    logOut.addEventListener("click", logoutSession);
    
    function logoutSession(e) {
      localStorage.clear();
      window.location.assign("index.html");
    }

})























