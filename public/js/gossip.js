const gossipFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#titleField').value.trim();
  const source = document.querySelector('#sourceField').value.trim();
  const story = document.querySelector('#storyField').value.trim();
  const userField = document.querySelector('#anon');

  let user;
  if (userField.checked) {
    user = 'Anonymous';
  } else {
    const response = await fetch('/api/users/me', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const userData = await response.json();
    user = userData.name;
  }

  if (title && source && story) {
    const response = await fetch('/api/gossip', {
      method: 'POST',
      body: JSON.stringify({ title, source, story, user }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      alert('Thank you for your gossip!');
      document.location.replace('/');
    } else {
      alert('Failed to Post Story');
    }
  } else {
    alert('Please fill out all required fields.');
  }
};

document.querySelector('#gossipForm').addEventListener('submit', gossipFormHandler);