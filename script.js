function Departaments() {
    const department = document.getElementById("department")

    const xhr = new XMLHttpRequest()

    xhr.open("GET", "./Data/departments.json", true)
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const text = xhr.responseText
            const departments = JSON.parse(text)
            console.log(departments)

            departments.sort((d1, d2) => d1.name.localeCompare(d2.name))
                .forEach(dpto => {
                    department.append(new Option(dpto.name, dpto.code))
                })
        }

    }
    xhr.send(null)

}


document.getElementById('department').addEventListener('change', () => {

    const code = document.getElementById('department').value
    const xhr = new XMLHttpRequest()
    xhr.open("GET", "./Data/towns.json", true)

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const text = xhr.responseText
            const city = JSON.parse(text)
            console.log(city)

            const selectCity = document.getElementById('city')
            selectCity.innerHTML = ""
            city.filter(muni => muni.department === code).sort((c1, c2) => c1.name.localeCompare(c2.name))
                .forEach(muni => {
                    selectCity.append(new Option(muni.name, muni.code))
                })

        }
    }
    xhr.send(null)

})

var employees = [];




document.getElementById('btn').addEventListener('click', ()=>{


    if(document.getElementById('Name').value != "" && document.getElementById('LastName').value != "" && document.getElementById('Salary').value != ""&& document.getElementById('department').value != "" && document.getElementById('Salary').value != ""){

    const name = document.getElementById('Name').value;
    const lastname = document.getElementById('LastName').value;
    const salary = document.getElementById('Salary').value;
    let departmentCode = document.getElementById("department").value
    const department = departments.find(dpto => dpto.code === departmentCode).name
    let cityCode = document.getElementById("city").value
    const city = city.find(municipio => municipio.code === cityCode).name

  

    employees.push({"id":employees.length, "FullName":name +' '+lastname, "Salary":salary, 'Department':department, 'City':city})

    
    showInfo();

    document.getElementById('Name').value = "";
    document.getElementById('LastName').value = "";
    document.getElementById('Salary').value = "";
    document.getElementById('department').value = "";
    document.getElementById('city').value = "";
    

    console.log("Agregando " + JSON.stringify(employees));
    }
    else{
        alert("Termine de llenar los espacios");
    }
    


})

function showInfo() {
    document.getElementById('tBody').innerHTML = "";

    employees.forEach( (employees, index) => {
    const name = document.createTextNode(employees.FullName).value
    const salary = document.createTextNode(employees.Salary)
    const department = document.createTextNode(employees.department)
    const city = document.createTextNode(employees.City)


    const row = document.createElement("tr")

    const colName = document.createElement("td")
    colName.append(document.createTextNode(name))
    row.append(colName)

    const colLastSalary = document.createElement("td")
    colLastSalary.append(document.createTextNode(salary))
    row.append(colLastSalary)


    const colDepartment = document.createElement("td")
    colDepartment.append(document.createTextNode(department))
    row.append(colDepartment)

    const colCity = document.createElement("td")
    colCity.append(document.createTextNode(city))
    row.append(colCity)

    document.getElementById("tBody").append(row)
    });
    
    
    

}


