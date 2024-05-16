const signupFormHandler = async (event) => {
    // Stop the browser from submitting the form so we can do so with JavaScript
    event.preventDefault();
  
    // Gather the data from the form elements on the page
    const name = document.querySelector('#nameField').value.trim();
    const email = document.querySelector('#emailField').value.trim();
    const password = document.querySelector('#passField').value.trim();

    console.log(name);
  
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
  
  document.getElementById("signUpForm").addEventListener('click', signupFormHandler);