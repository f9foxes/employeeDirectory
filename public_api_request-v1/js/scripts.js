const employeeDiv  = document.getElementById('gallery');
const employeeList  = [];
const modalBtn = document.getElementById('modal-close-btn')

// Gets an array of 12 employee objects and passes it to generateEmployees function.
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

//Generates cards for 12 employees and inserts them on page.
function generateEmployees(employees) {
    employees.forEach(employee => {
        //Add each employee object to employeeList array.
        employeeList.push(employee);
        const html = `
            <div class="card">
                <div class="card-img-container">
                    <img class="card-img" src="${employee.picture.medium}" alt="profile picture">
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

//Generates and displays a modal container of the employee card that was clicked
function generateModal(srcUrl) {
    for (let i=0; i<employeeList.length; i++) {
        if (srcUrl === employeeList[i].picture.medium) {
            const dob = new Date(employeeList[i].dob.date);
            const day = dob.getDate();
            const month = dob.getMonth()+1;
            const year = dob.getFullYear();
            const bDay = `${month}/${day}/${year}`;
            const cell =  employeeList[i].cell.replace(/\D+/g, '')
                            .replace(/(\d{3})(\d{3})(\d{2})/, '($1) $2-$3');
            const html =  `
                            <div class="modal-container">
                                <div class="modal">
                                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                                    <div class="modal-info-container">
                                        <img class="modal-img" src="${employeeList[i].picture.medium}" alt="profile picture">
                                        <h3 id="name" class="modal-name cap">${employeeList[i].name.first} ${employeeList[i].name.last}</h3>
                                        <p class="modal-text">${employeeList[i].email}</p>
                                        <p class="modal-text cap">${employeeList[i].location.city}</p>
                                        <hr>
                                        <p class="modal-text">${cell}</p>
                                        <p class="modal-text">${employeeList[i].location.street.number} ${employeeList[i].location.street.name}, ${employeeList[i].location.city}, ${employeeList[i].location.state} ${employeeList[i].location.postcode}</p>
                                        <p class="modal-text">Birthday: ${bDay}</p>
                                    </div>
                                </div>
                            </div> 
                        `;
            employeeDiv.insertAdjacentHTML('beforeend', html);
        } 
    } 
}

// Listen for click event inside #gallery div.
employeeDiv.addEventListener('click', e => {
    // Remove Modal Container when button clicked.
    if(e.target.tagName === 'STRONG' || e.target.tagName === 'BUTTON') {
        const container = document.querySelector('.modal-container');
        container.remove();     
    // If the click is on an employee card, 
    //  then call generateModal and pass the img url as an argument 
    } else  if (employeeDiv.contains(e.target)){
                const cardDiv = e.target.closest('.card');
                if (cardDiv) {
                    const imgEl = cardDiv.firstElementChild.firstElementChild;
                    const img  = imgEl.src;
                    generateModal(img)
                } 
    }
})

