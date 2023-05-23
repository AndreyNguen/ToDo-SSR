import express from 'express';
import { Task, User } from '../../db/models';
import checkPriviligate from '../middlewares/checkPriviligate';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const allTasks = await Task.findAll();
    res.json(allTasks);
  } catch (error) {
    console.log(error);
    res.sendStatus(500, 'get/allTasks');
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, body } = req.body;
    const { id } = req.session.user;
    const newTask = await Task.create({ title, body, userId: id });
    const taskOfUser = await Task.findOne({
      where: { id: newTask.id },
      include: User,
    });
    res.json(taskOfUser);
  } catch (error) {
    console.log(error);
    res.sendStatus(500, '/create');
  }
});

router.delete('/:id', checkPriviligate, async (req, res) => {
  try {
    const { id } = req.params;
    const remove = await Task.destroy({ where: { id } });
    res.json(remove);
  } catch (error) {
    console.log(error);
    res.sendStatus(500, '/delete');
  }
});

router.patch('/:id', checkPriviligate, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, body } = req.body;
    const updateTask = await Task.update({ title, body }, { where: { id } });
    res.json(updateTask);
  } catch (error) {
    console.log(error);
    res.sendStatus(500, '/patch');
  }
});

export default router;
