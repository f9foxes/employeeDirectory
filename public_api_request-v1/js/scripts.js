const employeeDiv  = document.getElementById('gallery');
const employeeList  = [];

fetch('https://randomuser.me/api/?results=12')
    .then(checkStatus)
    .then(res => res.json())
    .then(data => data.results)
    .then(generateEmployees)
    .catch(err => console.log("Sorry something went wrong.", err))

function checkStatus(response)  {
    if(response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

function generateEmployees(employees) {
    employees.forEach(employee => {
        employeeList.push(employee);
        const html = `
            <div class="card">
                <div class="card-img-container">
                    <img class="card-img" src="${employee.picture.small}" alt="profile picture">
                </div>
                <div class="card-info-container">
                    <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                    <p class="card-text">${employee.email}</p>
                    <p class="card-text cap">${employee.location.country}</p>
                </div>
            </div>
        `
        employeeDiv.insertAdjacentHTML('beforeend', html);
    })
}

//employeeList = the employees/ if  email matches then create card
function generateModal(email) {
    for (let i=0; i<employeeList; i++) {
        if (email === employeeList[i]) {
            const dob = new Date (employeeList[i].dob.date)
            
            const html =  `
                            <div class="modal-container">
                                <div class="modal">
                                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                                    <div class="modal-info-container">
                                        <img class="modal-img" src="${employeeList[i].picture.medium}" alt="profile picture">
                                        <h3 id="name" class="modal-name cap">${employeeList[i].name.first} ${employeeList[i].name.Last}</h3>
                                        <p class="modal-text">${employeeList[i].email}</p>
                                        <p class="modal-text cap">${employeeList[i].location.city}</p>
                                        <hr>
                                        <p class="modal-text">${employeeList[i].name.phone}</p>
                                        <p class="modal-text">${employeeList[i].location.street.number} ${employeeList[i].location.street.name}, ${employeeList[i].location.city}, ${employeeList[i].location.state} ${employeeList[i].location.postcode}</p>
                                        <p class="modal-text">Birthday: ${dob}</p>
                                    </div>
                                </div>
                            </div> 
                        `
        }
    }
}

employeeDiv.addEventListener('click', e => {
    console.log(e.target);
})