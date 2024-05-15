const router = require('express').Router();
const { User, userData } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create(req.body);

    // Set up sessions with a 'loggedIn' variable set to `true`
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
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
    const dbUserData = await User.findOne({ where: { email: req.body.email } });
  if (!userData) {
    res
    .status(400)
    .json({ message: 'Invalid login, please try again' });
    return;
  }

  const validPassword = await userData.checkPassword(req.body.password);

  if (!validPassword) {
    res
    .status(400)
    .json({ message: 'Invalid login, please try again' });
    return;
  }
  req.session.save(() => {
    req.session.dbUserData = dbUserData.id;
    req.session.logged_In = true;
   
    res.json({user: dbUserData, message: 'You are now logged in!'});
  });
  } catch (err) {
    res.status(400).json(err);
  }
})

router.get('/', async (req, res) => {
  try {
    const users = await User.findAll({});

    res.json(users);
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
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
  if (req.session.logged_in) {
    // Remove the session variables
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});


module.exports = router;
