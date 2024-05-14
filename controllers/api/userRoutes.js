const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const {username, email, password} = req.body;
    req.session.save(() => {
      req.session.UserId = userData.id;
      req.session.loggedIn = true;

      res.json({ user: userData, message: 'You are now logged in!'});
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = user.find(user => user.email === email);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  const match = await bcrypt.compare(password, user.password);

  if (match) {
    return res.status(200).json({ message: 'login succesful' })
  } else {
    return res.status(401).json({ message: 'login failed' })
  }
});

router.post('/', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user is signing up with the admin credentials
    // Create session variables based on the logged in user
    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.loggedIn = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the provided credentials match the admin's credentials
    const isAdminUser = email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD;

    let userData;

    if (isAdminUser) {
      // If the user is an admin, set the user data accordingly
      userData = {
        id: 1, 
        name: 'Admin',
        email: process.env.ADMIN_EMAIL,
        isAdmin: true,
      };
    } else {
      // If not admin, proceed with regular user authentication
      userData = await User.findOne({ where: { email: email } });

      if (!userData || !(await userData.checkPassword(password))) {
        // Invalid credentials
        res.status(400).json({ message: 'Incorrect email or password, please try again' });
        return;
      }
    }

    // Create session variables based on the logged-in user
    req.session.userId = userData.id;
    req.session.loggedIn = true;
    
    // Send a JSON response indicating successful login
    res.json({ user: userData, message: 'You are now logged in!', redirectTo: '/' });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    // Remove the session variables
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
