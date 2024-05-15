const router = require('express').Router();
const { User } = require('../../models');


router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    // Set up sessions with a 'loggedIn' variable set to `true`
    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
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
