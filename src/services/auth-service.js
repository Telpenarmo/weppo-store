import routeService from "./route-service.js";
import prisma from "./prisma-service.js";

async function authenticate(req, res, next) {
  const id = req.signedCookies.userId;
  if (id) {
    const user = await prisma.user.findUnique({ where: { id: Number(id) } });
    if (user)
      req.user = user;
  }
  next();
}

function authorize(adminOnly) {
  return (req, res, next) => {
    if (req.user) {
      if (!adminOnly || req.user.isAdmin) {
        console.log(`User ${req.user.id} authorized.`);
        next();
      } else {
        res.status(403).send("You are not permitted to access this resource.");
      }
    } else {
      res.redirect('/login?returnUrl=' + req.url);
    }
  }
}

function saveUser(req, res, id) {
  res.cookie('userId', id, { signed: true });
  let returnUrl = req.query.returnUrl || '/';
  console.log(`User ${id} logged in.`);
  res.redirect(returnUrl);
}

function forgetUser(res, id) {
  res.cookie('userId', '', { maxAge: -1, signed: true });
  console.log(`User ${id} logged out.`);
  return res.redirect(routeService.home.index);
}

export default {
  authenticate,
  authorize,
  saveUser,
  forgetUser
}