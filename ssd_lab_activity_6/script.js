document.addEventListener ("keydown", function (zEvent) {
    if (zEvent.ctrlKey  &&  zEvent.key === "m") {  
        var element = document.body;
        element.classList.toggle("dark-mode");
        const drndp = document.querySelectorAll('.droptarget');

        drndp.forEach(box => {
            box.style.borderColor = 'white';
        });

    }
} );

    
function getmem(memb,k){
    return memb+k.innerText;
}

function val(){
    var mem = document.querySelectorAll(".sol p");
    var memb = "";
    for (let m of mem){
        memb+=(m.textContent+", ");
    }
    // alert(memb.slice(0,-2));
    // return false;


    alert("Name: "+document.myForm.mname.value+
            "\nEmail: "+document.myForm.gemail.value+
            "\nUsername: "+document.myForm.uname.value+
            "\nTeam Lead: "+document.myForm.lead.value+
            "\nMembers: "+memb.slice(0,-2));
    return true;
}
function unameval(event){
    // event.preventDefault();
    
    let uname=event.target.value;
    let re=/(?=.*\d)(?=.*[A-Z])/;
    // alert(document.getElementByClassName("uerror").value);
    if (uname==""){
        document.getElementById("uerror").innerHTML = "" ;
        return false;
    }
    else if (re.test(uname)){
        document.getElementById("uerror").innerHTML = "Valid Username" ;
        return true;
    }
    else{
        document.getElementById("uerror").innerHTML = "Username must have Uppercase and number!" ;
        return false;
    }
}
function dsHandler(e){
    e.dataTransfer.setData("elem",e.target.id);
}

function doHandler(e){
    e.preventDefault();
}

function dpHandler(e){
    e.preventDefault();
    var elId = e.dataTransfer.getData("elem");
    e.target.appendChild(document.getElementById(elId));
}

function confirmP() {
    if (document.querySelector("[name='pwd']").value == "" ) {
        document.getElementById('message').innerHTML = '';
    }
    else if (document.querySelector("[name='pwd']").value == document.querySelector("[name='cpwd']").value) {
        document.getElementById('message').style.color = 'green';
        document.getElementById('message').innerHTML = 'matching';
    } else {
        document.getElementById('message').style.color = 'red';
        document.getElementById('message').innerHTML = 'not matching';
    }
}