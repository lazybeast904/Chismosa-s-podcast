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
      document.location.replace('/homepage');
    } else {
      alert('Failed to log in');
    }
  }
};

document
.querySelector('.login-form')
.addEventListener("click", loginFormHandler);

document
.getElementById("logButt")
.addEventListener("click", function() {
  window.location.href = "/login";
});



