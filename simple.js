var register_Form = document.querySelector("#registrationForm");
var allInput = register_Form.querySelectorAll("INPUT");
var addBtn = document.querySelector("#btnAdd");
var modal = document.querySelector(".model");
var closeBtn = document.querySelector(".close-icon");
addBtn.onclick=function(){
    modal.classList.add("active")
}

closeBtn.addEventListener("click",function(){
    modal.classList.remove("active");
    var i;
    for(i = 0; i < allInput.length; i++){
        allInput[i].value = "";
    }
})


/* Modal page coding here */


 var userData = [];
 var pic = document.querySelector("#profile-pic");
 var upload = document.querySelector("#upload-field");
 var empID = document.querySelector("#id");
 var fName = document.querySelector("#firstName");
 var sName = document.querySelector("#lastName");
 var sex = document.querySelector("#gender");
 var email_ID = document.querySelector("#email");
 var mobile = document.querySelector("#mobile_No")
 var city = document.querySelector("#location");
 var designation = document.querySelector("#jobTitle");
 var pincode = document.querySelector("#pinCode");
 var registerBtn = document.querySelector("#register-btn");
 var updateBtn = document.querySelector("#update-btn");
 var register_Form = document.querySelector("#registrationForm");
 var imgURL;


 registerBtn.onclick = function(e){  
    e.preventDefault();         
    registeration();
    showDataFromStorage();
    register_Form.reset('');
    closeBtn.click();
}

if(localStorage.getItem("userData") != null){
    userData = JSON.parse(localStorage.getItem("userData"));
}


function registeration(){
    userData.push({
        idEmp : empID.value,
        first_name : fName.value,
        second_Name : sName.value,
        gender : sex.value,
        email : email_ID.value,
        mob_No : mobile.value,
        address : city.value,
        job_Title : designation.value,
        pin_Code : pincode.value,
        profilePic : imgURL == undefined ? "img/profileImage.jpeg"  : imgURL
    });
    var userString = JSON.stringify(userData);
    localStorage.setItem("userData",userString);
    swal("Good job!", "Registration completed!", "success");
}

// two different decalration of function

/*   get the data from local storage to page    */

// const returnDataFromStorage = () =>{
//     userData.forEach((data,index)=>{
//         console.log(data)
//     })    
// }

// returnDataFromStorage();

var tableData = document.querySelector("#table-Data");
function showDataFromStorage(){
    tableData.innerHTML="";
    userData.forEach(function (data,index){
        tableData.innerHTML += `
        <tr index = '${index}'>
            <td>${index+1}</td>
            <td>${data.idEmp}</td>
            <td><img src="${data.profilePic}" width="40px"</td>
            <td>${data.first_name}</td>
            <td>${data.second_Name}</td>
            <td>${data.gender}</td>
            <td>${data.email}</td>
            <td>${data.mob_No}</td>
            <td>${data.address}</td>
            <td>${data.job_Title}</td>
            <td>${data.pin_Code}</td>
            <td>
                <button class="btnEye"><i class="fa fa-eye" style="font-size: 15px; "></i></button>
                <button class="btnTrash"><i class="fa fa-trash" style="font-size: 15px; "></i></button>
            </td>
        </tr>
        `;
    });

/* Start delete coding */

    var i;
    var allDel = document.querySelectorAll(".btnTrash");
    for(i=0;i<allDel.length;i++){
        allDel[i].onclick = function(){
            var tr = this.parentElement.parentElement;
            var indexID = tr.getAttribute("index");
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this imaginary file!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {
                    userData.splice(indexID,1);
                    localStorage.setItem("userData",JSON.stringify(userData));
                    tr.remove();
                  swal("Poof! Your imaginary file has been deleted!", {
                    icon: "success",
                  });
                } else {
                  swal("Your imaginary file is safe!");
                }
              });
            // userData.splice(indexID,1);
            // localStorage.setItem("userData",JSON.stringify(userData));
            // tr.remove();
        }
    }

/*      start updating coding            */

var allEdit = document.querySelectorAll(".btnEye");
for(i = 0; i < allEdit.length; i++){
    allEdit[i].onclick = function(){
         var tr = this.parentElement.parentElement;
         var td = tr.getElementsByTagName("TD");
         //var td = td.querySelectorAll("TD");
         var trIndex = tr.getAttribute("index");
         var imgTag = td[2].getElementsByTagName("IMG");
         var profilePhoto = imgTag[0].src;
         var emp_ID = td[1].innerHTML;
         var firstName = td[3].innerHTML;
         var lastName = td[4].innerHTML;
         var empGender = td[5].innerHTML;
         var mail = td[6].innerHTML;
         var mobileNo = td[7].innerHTML;
         var location = td[8].innerHTML;
         var title_Job = td[9].innerHTML;
         var codepin = td[10].innerHTML;
         addBtn.click();
         registerBtn.disabled = true;
         updateBtn.disabled = false;
         empID.value = emp_ID;
         fName.value = firstName;
         sName.value = lastName;
         sex.value = empGender;
         email_ID.value = mail;
         mobile.value = mobileNo;
         city.value = location;
         designation.value = title_Job;
         pincode.value = codepin;
         pic.src = profilePhoto;
         updateBtn.onclick = function(e){
            userData[trIndex] = {
                idEmp : empID.value,
                first_name : fName.value,
                second_Name : sName.value,
                gender : sex.value,
                email : email_ID.value,
                mob_No : mobile.value,
                address : city.value,
                job_Title : designation.value,
                pin_Code : pincode.value,
                profilePic : upload.value == "" ? pic.src  : imgURL
            }
            localStorage.setItem("userData",JSON.stringify(userData));
         }
    }
}

}

showDataFromStorage();

// Image Processing coding

upload.onchange=function(){
    if(upload.files[0].size<=1024000){

        var f_Reader = new FileReader();
        f_Reader.onload = function(e){
            imgURL = e.target.result;
            pic.src = imgURL;
        }
        f_Reader.readAsDataURL(upload.files[0]);

    }
    else{
        alert("This file is too big.");
    }
}


//    search box start coding

var searchBox = document.querySelector("#empID");
searchBox.oninput = function(){
    searchFunction();
}

function searchFunction(){
    var tr = tableData.querySelectorAll("TR");
    var filter = searchBox.value.toLowerCase();
    var i;
    for(i = 0; i < tr.length; i++){
        var idBySearch = tr[i].getElementsByTagName("TD")[1].innerHTML;
        
        // IF TOU WANT TO SEARCH BY ANY FIELD

        // var FirstNameBySearch = tr[i].getElementsByTagName("TD")[3].innerHTML;
        // var lastNameBySearch = tr[i].getElementsByTagName("TD")[4].innerHTML;
        // var genderBySearch = tr[i].getElementsByTagName("TD")[5].innerHTML;
        // var mailBySearch = tr[i].getElementsByTagName("TD")[6].innerHTML;
        // var mobileBySearch = tr[i].getElementsByTagName("TD")[7].innerHTML;
        // var cityBySearch = tr[i].getElementsByTagName("TD")[8].innerHTML;
        // var positionBySearch = tr[i].getElementsByTagName("TD")[9].innerHTML;
        // var pincodeBySearch = tr[i].getElementsByTagName("TD")[10].innerHTML;
        if(idBySearch.toLowerCase().indexOf(filter) > -1){
            tr[i].style.display ="";
        }
       
        // IF TOU WANT TO SEARCH BY ANY FIELD

        // else if(FirstNameBySearch.toLowerCase().indexOf(filter) > -1){
        //     tr[i].style.display ="";
        // }
        // else if(lastNameBySearch.toLowerCase().indexOf(filter) > -1){
        //     tr[i].style.display ="";
        // }
        // else if(genderBySearch.toLowerCase().indexOf(filter) > -1){
        //     tr[i].style.display ="";
        // }
        // else if(mailBySearch.toLowerCase().indexOf(filter) > -1){
        //     tr[i].style.display ="";
        // }
        // else if(mobileBySearch.toLowerCase().indexOf(filter) > -1){
        //     tr[i].style.display ="";
        // }
        // else if(cityBySearch.toLowerCase().indexOf(filter) > -1){
        //     tr[i].style.display ="";
        // }
        // else if(positionBySearch.toLowerCase().indexOf(filter) > -1){
        //     tr[i].style.display ="";
        // }
        // else if(pincodeBySearch.toLowerCase().indexOf(filter) > -1){
        //     tr[i].style.display ="";
        // }
        else{
            tr[i].style.display = "none";
        }
    }
}


// Clear all data coding

var delBtn = document.querySelector("#btnClear");
var delCheckBox = document.querySelector("#delAllData");
delBtn.addEventListener('click',()=>{
    if(delCheckBox.checked == true){
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                localStorage.removeItem("userData");
                window.location = location.href;
              swal("Poof! Your imaginary file has been deleted!", {
                icon: "success",
              });
            } else {
              swal("Your imaginary file is safe!");
            }
          });
    }
    else{
        swal("Check the Box!", "First click the checkbox for deleting all the data!", "warning");
    }
})