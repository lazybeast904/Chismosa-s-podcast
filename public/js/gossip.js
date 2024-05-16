const gossipFormHandler = async (event) => {
    // Stop the browser from submitting the form so we can do so with JavaScript
    event.preventDefault();
    // Gather the data from the form elements on the page
    const title = document.querySelector('#titleField').value.trim();
    const source = document.querySelector('#sourceField').value.trim();
    const story = document.querySelector('#storyField').value.trim();
    const userField = document.querySelector('#userField');

    let user;
    if (userField.checked) {
        user = 'Anonymous';
    } else {
      const me = await fetch('/api/users/me', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      const me2 = await me.json()
        user = me2.name;
    }

    if (title && source && story) {
      // Send the e-mail and story to the server
      const response = await fetch('/api/gossip', {
        method: 'POST',
        body: JSON.stringify({ title, source, story, user}),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to Post Story');
      }
    }
  };
  
  document.getElementById("gossipForm").addEventListener('click', gossipFormHandler);