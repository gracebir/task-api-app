import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";

const prisma = new PrismaClient();

interface CustomRequest extends Request {
  user?: any; // Change 'any' to the actual type of your user object if available
}

export const createTask = async (req: CustomRequest, res: Response) => {
  const { content } = req.body;
  const userId = req.user?.id;

  try {
    const task = await prisma.task.create({
      data: {
        content,
        isCompleted: false,
        userId,
      },
    });

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllTasks = async (req: CustomRequest, res: Response) => {
  const userId = req.user?.id;

  try {
    const tasks = await prisma.task.findMany({
      where: {
        userId,
      },
    });

    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateTask = async (req: CustomRequest, res: Response) => {
  const taskId = req.params.taskId;
  const userId = req.user?.id;
  const { isCompleted } = req.body;

  try {
    const existingTask = await prisma.task.findUnique({
      where: {
        id: parseInt(taskId),
      },
    });

    if (!existingTask || existingTask.userId !== userId) {
      return res.status(404).json({ error: "Task not found" });
    }

    const updatedTask = await prisma.task.update({
      where: {
        id: parseInt(taskId),
      },
      data: {
        isCompleted:
          isCompleted !== undefined ? isCompleted : existingTask.isCompleted,
      },
    });

    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
