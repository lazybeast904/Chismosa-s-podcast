const router = require('express').Router();
const { User } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const users = await User.findAll({});

    res.json(users);
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
  });


router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    // Set up sessions
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.name = dbUserData.name;
      req.session.isAdmin = dbUserData.isAdmin; 

      // res.status(200).json(dbUserData);
      res.redirect("/")
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  console.log("log in route")
  try {
    const { email, password } = req.body;

    let userData;
    userData = await User.findOne({ where: { email: email } });

    if (!userData || !(await userData.checkPassword(password))) {
      res.status(403).json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    req.session.save(() => {
    req.session.userId = userData.id;
    req.session.loggedIn = true;
    req.session.name = userData.name; 
    req.session.isAdmin = userData.isAdmin;
    // Send a JSON response indicating successful login
    // res.json({ user: userData, message: 'You are now logged in!', redirectTo: '/' });
    res.redirect("/")
  });
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

router.get('/me', (req, res) => {
  let name = "Anonymous"
  if (req.session.loggedIn){
    name = req.session.name
  }

  res.status(200).json({name})

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
