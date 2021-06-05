function EmployeeCollection() {
    this.collection = [];

    let iterator = 0;

    const rangeIterator = {
       next: function() {
           let result;
           if (iterator < this.collection.length) {
               result = { value: this.collection[iterator], done: false }
               iterator++;
               return result;
           }
       }
    };
}

EmployeeCollection.prototype.add = function(employee)
{
    this.collection.push(employee);
}

EmployeeCollection.prototype.addRange=function(employees)
{
    Array.prototype.push.apply(this.collection,employees)
}

EmployeeCollection.prototype.sort=function()
{
    let arr = [...this.collection];
    return arr.sort((a, b) => {
        if(a.salary < b.salary){
            return 1;
        }
        else if(a.salary === b.salary){
            return (a.name > b.name) ? 1 : -1;
        }
        else{
            return -1;
        }
    })
}

EmployeeCollection.prototype.getByEmployeesInfo=function()
{
    let result = [];
    this.collection.forEach(element =>{
        result.push({id: element.id, name: element.name, salary: element.salary })
    });

    return result;
}

EmployeeCollection.prototype.getTopFiveNames=function()
{
    let result = [];
    for(let i = 0; i < 5 && i < this.collection.length; i++){
        result.push(this.collection[i].name);
    }

    return result;
}

EmployeeCollection.prototype.getLastThreeIds=function()
{
    let result = [];
    let arr = this.collection.reverse();
    for(let i = 0; i < 3 && i < this.collection.length; i++){
        result.push(this.collection[i].id);
    }

    this.collection.reverse();

    return result;
}