import express from 'express';
import { Task, User } from '../../db/models';
import checkAuth from '../middlewares/checkAuth';
import checkNoAuth from '../middlewares/checkNoAuth';

const indexRouter = express.Router();

indexRouter.get('/', checkAuth, async (req, res) => {
  try {
    const allTasks = await Task.findAll({
      order: [['createdAt', 'DESC']],
      include: User,
    });
    const initState = { allTasks };
    res.render('Layout', initState);
  } catch (error) {
    console.log(error);
    res.sendStatus(500, '/get/allTasks');
  }
});

indexRouter.get('/signup', checkNoAuth, (req, res) => {
  try {
    res.render('Layout');
  } catch (error) {
    console.log(error);
    res.sendStatus(500, 'render signup');
  }
});

indexRouter.get('/signin', checkNoAuth, (req, res) => {
  try {
    res.render('Layout');
  } catch (error) {
    console.log(error);
    res.sendStatus(500, 'render signin');
  }
});

export default indexRouter;
