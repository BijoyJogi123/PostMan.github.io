console.log("hellow this is  projcet 6 a postman application ");
let addedParamCount = 0;

///utitlity function
//1.utitlity function to get DOM elemenet from string 
function getElementFromString(str) {

    let div = document.createElement('div');
    div.innerHTML = str;
    return div.firstElementChild;
}

//2.utility function to confirmation of delete button
/*function confirmAction() {
    let conferMation = confirm("Are you sure you want to delete it!");
    if (conferMation) {

        alert("You successfully deleted");

    }
    else {
        alert("Action Canceled");
    }

}*/




//counting the parameters of index 



//hide the parameter box intially



let RequestJsonBox = document.getElementById('jsonRadio');

RequestJsonBox.addEventListener("click", () => {
    document.getElementById("ParameterBox").style.display = 'none';
    document.getElementById("RequestJsonBox").style.display = 'block';

})

let parametersbox = document.getElementById('ParameterRadio');

parametersbox.addEventListener("click", () => {
    document.getElementById("RequestJsonBox").style.display = 'none';
    document.getElementById("ParameterBox").style.display = 'block';
})

//if the user click on + button more parameter will add in document
let addParameter = document.getElementById('addPara');

addParameter.addEventListener("click", (p) => {
    p.preventDefault();

    let addParams = document.getElementById("param");
    let string = `
    
    <form class="row g-3 my-3">

    <label for="Url" class="col-sm-2 col-form-label">parameter${addedParamCount + 2}</label>
    <div class="col-md-4">
      <input type="text" class="form-control" id="parameterKey${addedParamCount + 2}" placeholder="Enter parameter 1 key">
    </div>

    <div class="col-md-4">
      <input type="text" class="form-control" id="parameterValue${addedParamCount + 2}" placeholder="Enter parameter 1 value">
    </div>
    <button class="btn btn-primary col deleteParam">-</button>
  </form>
 `;

    //convert the element string to DOM

    let paramElement = getElementFromString(string);
    addParams.appendChild(paramElement);

    //add an eventListner to remove the parameter on clicking '-' button
    let deleteParam = document.getElementsByClassName("deleteParam");
    for (item of deleteParam) {
        item.addEventListener('click', (e) => {

            confirmation = confirm("Are you sure you want to delete it");

            e.target.parentElement.remove();

        })

    }

    addedParamCount++;


})

//if the user clicks onsubmit button 

let submit = document.getElementById("submitBtn");
submit.addEventListener("click", () => {
    //show please wait in the response box to request patience from the user
    document.getElementById('responsePrism').innerHTML  ="Please wait...fetching responce";

    let url = document.getElementById('urlField').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;
    
    if(contentType=='Parameter'){
        data={};
        for(let i=0;i<addedParamCount+1;i++){
                if(document.getElementById('parameterKey'+(i+1))!=undefined){

                    let key = document.getElementById('parameterKey'+(i+1)).value;
                    let value = document.getElementById('parameterValue'+(i+1)).value;
                    data[key]=value;
                 }
             }
             data=JSON.stringify(data);

    }
    else{
        data=document.getElementById('requestJsonText').value;

    }


    //log all the value in the console for debugging
    console.log(url);
    console.log(requestType);
    console.log(contentType);
    console.log("data is ",data);



    if (requestType=='GET'){
        fetch(url, {
            method: 'GET',   
        })
        .then(response=> response.text())
        .then((text) =>{
            // document.getElementById('responseJsonText').value = text;
            document.getElementById('responsePrism').innerHTML = text;
           
            
        });
    }

    else{
        fetch(url, {
            method: 'POST', 
             body: data,
             headers: {
                'Content-type': 'application/json; charset=UTF-8',
              }
        })
        .then(response=> response.text())
        .then((text) =>{
            document.getElementById('responsePrism').innerHTML = text;
           
           
        });
    }
   
})
