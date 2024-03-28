document.addEventListener('DOMContentLoaded', () => {
    const registerBtn = document.getElementById('registerBtn');
    const loginBtn = document.getElementById('loginBtn');
  
    registerBtn.addEventListener('click', () => {
      const nombre_usuario = prompt('Enter your name:');
      const contrasena = prompt('Enter your password:');
      fetch(`http://localhost:3000/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre_usuario,
          contrasena
        })
      })
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error('Registration failed');
        }
      })
      .then((data) => {
        alert('Registration successful');
      })
      .catch((error) => {
        alert(error.message);
      });
    });
  
    loginBtn.addEventListener('click', () => {
      const nombre_usuario = prompt('Enter your name:');
      const contrasena = prompt('Enter your password:');
      fetch(`http://localhost:3000/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre_usuario,
          contrasena
        })
      })
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error('Login failed');
        }
      })
      .then((data) => {
        alert('You have access');
      })
      .catch((error) => {
        alert(error.message);
      });
    });
  });