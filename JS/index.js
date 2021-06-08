
document.getElementById("ajax-btn").addEventListener("click", submit);
document.getElementsByClassName("btn-get-names")[0].addEventListener("click", getTopNames);
document.getElementsByClassName("btn-get-ids")[0].addEventListener("click", getLastIds);
document.getElementsByClassName("btn-sort")[0].addEventListener("click", sort);
document.getElementsByClassName("btn-up")[0].addEventListener("click", countUp);
document.getElementsByClassName("btn-down")[0].addEventListener("click", countDown);

var employeeCollection;

function setAjaxData(){
    let coll = new EmployeeCollection();

    let callback = function(err, data) {
        if (err !== null) {
          alert('Something went wrong: ' + err);
        } else {
            coll.addRange(buildEmployees(data));
            renderEmployeeCollection(coll.collection);
            employeeCollection = coll;
        }
    };
    getJSON('https://raw.githubusercontent.com/Guilegaton/EHtmlCss/Js-Task2/Resources/loadData.json',callback);
}

function getJSON(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
};

var loaderFlag = true;

function submit(event) {
    if(loaderFlag){
        try{
            let json = document.getElementById("json-input").value
            let arr = deserializeJson(json);
            let coll = new EmployeeCollection();
            coll.addRange(arr);
            renderEmployeeCollection(coll.collection);
            employeeCollection = coll;
            document.getElementsByClassName("error-box")[0].style.display = "none";
        }
        catch{
            document.getElementById("json-input").value = "";
            document.getElementsByClassName("error-box")[0].style.display = "block";
        }
    }
    else{
        setAjaxData();
    }
}

function renderEmployeeCollection(arr){
    let tableBody = document.getElementById("employee-table").getElementsByTagName("tbody")[0];

    for(let i = 0; i < tableBody.children.length;){
        tableBody.children[i].remove();
    }

    arr.forEach(element => {
        let row = tableBody.appendChild(document.createElement('tr'));
        let idTableData = row.appendChild(document.createElement('td'));
        idTableData.textContent = element.id;
        let nameTableData = row.appendChild(document.createElement('td'));
        nameTableData.textContent = element.name;
        let salaryTableData = row.appendChild(document.createElement('td'));
        salaryTableData.textContent = element.salary;
    })
}

function deserializeJson(json){
    let employees = JSON.parse(json);
    let arr = buildEmployees(employees);
    return arr;
}

function buildEmployees(employees){
    let arr = [];
    for(let i = 0; i < employees.length; i++){
        let element = employees[i];
        let result;
        if(element.type == "FixedEmployee"){
            arr.push(new FixedEmployee(element.id, element.salary, element.name));
        }
        else if(element.type == "PerHourEmployee"){
            arr.push(new PerHourEmployee(element.id, element.salary, element.name));
        }
        else{
            throw "Invalid json";
        }
    }

    return arr;
}

function countUp(event){
    let counter = document.getElementById("count-input");
    counter.value++;
}

function countDown(event){
    let counter = document.getElementById("count-input");
    counter.value--;
}

function getLastIds(){
    let count = document.getElementById("count-input").value;
    renderList(employeeCollection.getLastIds(count));
}

function getTopNames(){
    let count = document.getElementById("count-input").value;
    renderList(employeeCollection.getTopNames(count));
}

function sort(){
    renderEmployeeCollection(employeeCollection.sort());
}

function renderList(arr){
    let list = document.getElementsByClassName("list")[0];
    
    for(let i = 0; i < list.children.length;){
        list.children[i].remove();
    }

    for(let i = 0; i < arr.length; i++){
        let li = list.appendChild(document.createElement('li'));
        let span = li.appendChild(document.createElement('span'));
        span.textContent = i + 1;
        li.textContent = arr[i];
    }
}

function showMe (box) {

    var chboxs = document.getElementsByName("switch");
    var vis = "block";
    loaderFlag = true;
    for(var i=0;i<chboxs.length;i++) { 
        if(chboxs[i].checked){
            loaderFlag = false;
            vis = "none";
            break;
        }
    }
    document.getElementById(box).style.display = vis;
}