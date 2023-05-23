// middleware для проверки на авторизованного пользователя.
const checkNoAuth = (req, res, next) => {
  if (!req?.session?.user?.id) {
    return next();
  }
  return res.sendStatus(403);
};

export default checkNoAuth;
