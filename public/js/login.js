const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#emailField').value.trim();
  const password = document.querySelector('#passField').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log in');
    }
  }
};

document
.querySelector('#login-form')
.addEventListener("click", loginFormHandler);

document
.getElementById("logButt")
.addEventListener("click", function() {
  window.location.href = "/login";
});

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const loginBtn = document.getElementById('login-btn');

  loginForm.addEventListener('submit', loginFormHandler);

  function loginFormHandler(event) {
    event.preventDefault();

    const emailField = document.getElementById('emailField');
    const passField = document.getElementById('passField');

    const email = emailField.value.trim();
    const password = passField.value.trim();

    if (email && password) {
      const userData = {
        email,
        password,
      };

      loginUser(userData);
    }
  }

  async function loginUser(userData) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log in');
    }
  }
});