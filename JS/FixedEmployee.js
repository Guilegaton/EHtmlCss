function FixedEmployee(id, employeeSalary, name)
{
    this.name=name;
    this.employeeSalary=employeeSalary;
    this.id=id;

    this.salary=this.employeeSalary;
}
FixedEmployee.prototype=Object.create(Employee.prototype);