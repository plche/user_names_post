function getUsers() {
    fetch('http://127.0.0.1:5000/users')
        .then(res =>  res.json())
        .then(data => {
            let users = document.getElementById('users');
            users.innerHTML =''

            for(let i = 0; i < data.length; i++) { 
                let row = document.createElement('tr');

                let name = document.createElement('td');
                name.innerHTML = data[i].user_name;
                row.appendChild(name);
                
                let email = document.createElement('td');
                email.innerHTML = data[i].email;
                row.appendChild(email);
                users.appendChild(row);
            }
        })
}
getUsers();

let addUserForm = document.getElementById('addUserForm');
addUserForm.onsubmit = function(e) {
    // "e" es el evento JS que ocurre cuando enviamos el formulario
    // e.preventDefault() es un método que detiene la naturaleza predeterminada de JavaScript
    e.preventDefault();
    // crea el objeto FormData desde JavaScript y envíalo a través de una solicitud post fetch
    let form = new FormData(addUserForm);
    // así es como configuramos una solicitud post y enviamos los datos del formulario
    fetch("http://127.0.0.1:5000/create/user", {method: 'POST', body: form})
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // listemos nuevamente a los usuarios
            getUsers();
            // limpiemos el formulario
            addUserForm.reset();
            // ubiquemos el cursor en el campo input para un nuevo registro
            addUserForm.firstElementChild.nextElementSibling.focus();
            addUserForm.firstElementChild.nextElementSibling.select();
        })
}