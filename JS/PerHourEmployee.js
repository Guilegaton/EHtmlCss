function PerHourEmployee(id, employeeSalary, name)
{
    this.name=name;
    this.employeeSalary=employeeSalary;
    this.id=id;

    this.salary=20.8*8*this.employeeSalary;
}
PerHourEmployee.prototype=Object.create(Employee.prototype);