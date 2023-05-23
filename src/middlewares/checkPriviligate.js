import { Task } from '../../db/models';

// middleware для защиты от удаления\редактирования задач.
const checkPriviligate = async (req, res, next) => {
  const { id } = req.params;
  try {
    const foundTask = await Task.findOne({ where: { id } });
    if (foundTask?.userId === req?.session?.user?.id) {
      return next();
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
  return res.sendStatus(401);
};

export default checkPriviligate;
