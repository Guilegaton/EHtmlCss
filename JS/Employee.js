function Employee()
{
    this.name="default name";
    this.salary=0.0;
    this.employeeSalary=0.0;
    this.id="default id";

    if(this.constructor === Employee){
        throw new Error("You cannot create an instance of     Abstract Class");
    }
};
