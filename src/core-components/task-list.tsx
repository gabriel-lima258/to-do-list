import Button from "../components/button";
import TaskItem from "./task-item";
import PlusIcon from "../assets/icons/plus.svg?react";
import useTasks from "../hooks/use-tasks";
import useTask from "../hooks/use-task";

export default function TaskList() {
  const { tasks } = useTasks();
  const { prepareTask } = useTask();

  function handleNewTask() {
    prepareTask();
  }

  return (
    <>
      <section>
        <Button icon={PlusIcon} className="w-full" onClick={handleNewTask}>
          Nova tarefa
        </Button>
      </section>
      <section className="space-y-2">
        <TaskItem/>
        <TaskItem/>
        <TaskItem/>
        <TaskItem/>
      </section>
    </>
  )
}