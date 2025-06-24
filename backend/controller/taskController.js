const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      where: { userId: req.user.userId },
      orderBy: { createdAt: "desc" },
    });
    res.json(tasks); 
  } catch (error) {
    return res.json(error)
  }
};

exports.createTask = async (req, res) => {
  const { title, status } = req.body;
  const task = await prisma.task.create({
    data: {
      title,
      status: status || "To Do",
      userId: req.user.userId,
    },
  });
  res.status(201).json(task);
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, status } = req.body;

  const task = await prisma.task.update({
    where:{
      id:parseInt(id)
    },
    data: { title, status },
  });
  res.json(task);
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.task.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "Task deleted" });
  } catch (error) {
    console.error("Failed to delete task:", error);
    res.status(500).json({ error: "Failed to delete task" });
  }
};

