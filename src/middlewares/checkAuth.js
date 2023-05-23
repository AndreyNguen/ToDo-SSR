// middleware для проверки на авторизованного пользователя.
const checkAuth = (req, res, next) => {
  if (req?.session?.user?.id) {
    return next();
  }
  res.render('Layout');
  res.sendStatus(403);
};

export default checkAuth;
