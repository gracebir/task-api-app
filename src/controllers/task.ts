import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";

const prisma = new PrismaClient();

export const createTask = async (req: Request, res: Response) => {
  const { content } = req.body;
  const userId = parseInt(req.params.userId);
    
  try {
    if(!content) return res.status(400).json({error: "content can not be empty"})
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

export const getAllTasks = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.taskId);

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

export const updateTask = async (req: Request, res: Response) => {
  const taskId = req.params.taskId;

  const { isCompleted } = req.body;

  try {
    const existingTask = await prisma.task.findUnique({
      where: {
        id: parseInt(taskId),
      },
    });

    if (!existingTask) {
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
