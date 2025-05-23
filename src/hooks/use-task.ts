import useLocalStorage from "use-local-storage";
import { TASKS_KEY, type Task, type TaskState} from "../models/task";

export default function useTask() {
  const [tasks, setTasks] = useLocalStorage<Task[]>(TASKS_KEY, []);

  function prepareTask() {
    setTasks([...tasks, {
      id: Math.random().toString(36).substring(2, 9),
      title: "",
      state: "creating" as TaskState,
    }])
  }

  return {
    prepareTask,
  }
}
