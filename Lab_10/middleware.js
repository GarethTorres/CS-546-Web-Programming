/*
You can choose to define all your middleware functions here, 
export them and then import them into your app.js and attach them that that.
add.use(myMiddleWare()). you can also just define them in the app.js if you like as seen in lecture 10's lecture code example. If you choose to write them in the app.js, you do not have to use this file. 
*/


// Logging Middleware
function logging(req, res, next) {
  const timestamp = new Date().toUTCString();
  const method = req.method;
  const route = req.originalUrl;
  const isAuthenticated = req.session.user ? 'Authenticated User' : 'Non-Authenticated User';
  console.log(`[${timestamp}]: ${method} ${route} (${isAuthenticated})`);
  next();
}

// Middleware for root route
function rootRedirect(req, res, next) {
  if (req.session.user) {
    if (req.session.user.role === 'admin' && !req.originalUrl.startsWith('/admin')) {
      res.redirect('/admin');
    } else if (!req.originalUrl.startsWith('/protected')) {
      res.redirect('/protected');
    } else {
      next();
    }
  } else if (!req.originalUrl.startsWith('/login')) {
    res.redirect('/login');
  } else {
    next();
  }
}

// Middleware for login and register routes
function loginRedirect(req, res, next) {
  if (req.session.user) {
    if (req.session.user.role === 'admin' && !req.originalUrl.startsWith('/admin')) {
      res.redirect('/admin');
    } else if (!req.originalUrl.startsWith('/protected')) {
      res.redirect('/protected');
    } else {
      next();
    }
  } else {
    next();
  }
}

function registerRedirect(req, res, next) {
  console.log(req.body);
  if (req.session.user) {
    if (req.session.user.role === 'admin' && !req.originalUrl.startsWith('/admin')) {
      res.redirect('/admin');
    } else if (!req.originalUrl.startsWith('/protected')) {
      res.redirect('/protected');
    } else {
      next();
    }
  } else {
    next();
  }
}

// Middleware for protected and admin routes
function protect_ed(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
}

function admin(req, res, next) {
  if (req.session.user && req.session.user.role === 'admin') {
    next();
  } else {
    res.status(403).render('error', { message: 'You do not have permission to view this page' });
  }
}

// Middleware for logout route
function logout(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
}

export {
  logging,
  rootRedirect,
  loginRedirect,
  registerRedirect,
  protect_ed,
  admin,
  logout,
};
