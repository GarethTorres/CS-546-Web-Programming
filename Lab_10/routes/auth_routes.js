//import express, express router as shown in lecture code
import express from 'express';
import * as userData from '../data/users.js';
import { rootRedirect } from '../middleware.js';

const router = express.Router();

router.route('/').get(rootRedirect, async (req, res) => {
  //code here for GET THIS ROUTE SHOULD NEVER FIRE BECAUSE OF MIDDLEWARE #1 IN SPECS.
  return res.json({error: 'YOU SHOULD NOT BE HERE!'});
});

router      
  .route('/register')
  .get(async (req, res) => {
    //code here for GET
    res.render('register');
  })
  .post(async (req, res) => {
    try {
      const newUser = await userData.createUser(
        req.body.firstName,
        req.body.lastName,
        req.body.emailAddress,
        req.body.password,
        req.body.role
      );
      req.session.user = newUser;
      res.redirect('/protected');
    } catch (e) {
      res.status(500).render('error', {errorMessage: e});
    }
  });

router
  .route('/login')
  .get(async (req, res) => {
    res.render('login');
  })
  .post(async (req, res) => {
    try {
      const user = await userData.checkUser(req.body.emailAddress, req.body.password);
      req.session.user = user;
      if (user.role === 'admin') {
        res.redirect('/admin');
      } else {
        res.redirect('/protected');
      }
    } catch (e) {
      res.status(500).render('error', {errorMessage: e});
    }
  });

router.route('/protected').get(async (req, res) => {
  //code here for GET
  res.render('protected', {user: req.session.user});
});

router.route('/admin').get(async (req, res) => {
  //code here for GET
  if (req.session.user && req.session.user.role === 'admin') {
    res.render('admin', {user: req.session.user});
  } else {
    res.redirect('/error');
  }
});

router.route('/error').get(async (req, res) => {
  //code here for GET
  res.render('error', {errorMessage: 'You are not authorized to access this page'});
});

router.route('/logout').get(async (req, res) => {
  //code here for GET
  req.session.destroy();
  res.render('logout');
});

export default router;

