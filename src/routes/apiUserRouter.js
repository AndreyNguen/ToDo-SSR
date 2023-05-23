import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../../db/models';

const userRouter = express.Router();

userRouter.post('/signup', async (req, res) => {
  try {
    const { name, email, pass } = req.body;
    const password = await bcrypt.hash(pass, 5);
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        password, name,
      },
    });
    if (!created) {
      return res.send('Email is already create');
    }
    req.session.user = user;
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500, '/post/signup');
  }
});

userRouter.post('/signin', async (req, res) => {
  try {
    const { email, pass } = req.body;
    const user = await User.findOne({ where: { email } });
    const compare = await bcrypt.compare(pass, user.password);
    if (compare) {
      req.session.user = user;
    } else {
      console.log('error');
    }
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500, '/post/signin');
  }
});

userRouter.get('/logout', (req, res) => {
  try {
    req.session.destroy();
    res.clearCookie('user_sid');
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500, 'logout');
  }
});

export default userRouter;
