function authorize(req, res, next) {
  if (req.signedCookies.userId) {
    req.user = req.signedCookies.userId;
    console.log(`User ${id} authorized.`);    
    next();
  } else {
    res.redirect('/login?returnUrl=' + req.url);
  }
}

function saveUser(req, res, id) {
  res.cookie('userId', toString(id), { signed: true });
  let returnUrl = req.query.returnUrl || '/';
  console.log(`User ${id} logged in.`);
  res.redirect(returnUrl);
}

export default {
  authorize,
  saveUser
}