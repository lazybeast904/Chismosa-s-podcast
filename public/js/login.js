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
      const data = await response.json();
      alert(data.message);
      // Redirect to the specified URL after successful login
      window.location.href = data.redirectTo || '/';
    } else {
      alert('Failed to log in');
    }
  }
};

document.querySelector('#login-form').addEventListener('submit', loginFormHandler);

const signupFormHandler = async (event) => {
  // Stop the browser from submitting the form so we can do so with JavaScript
  event.preventDefault();

  // Gather the data from the form elements on the page
  const name = document.querySelector('#userSignup').value.trim();
  const email = document.querySelector('#emailSignup').value.trim();
  const password = document.querySelector('#passwordSignup').value.trim();

  if (name && email && password) {
    // Send the e-mail and password to the server
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to log in');
    }
  }
};

document.getElementById("logButt").addEventListener("click", function() {
  window.location.href = "/login";
});

// document
//   .querySelector('.login-form')
//   .addEventListener('submit', loginFormHandler);

document.getElementById("signUpForm").addEventListener('click', signupFormHandler);
