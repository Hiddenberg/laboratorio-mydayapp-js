import { updateTask } from "./storage";
import {changeVisualTaskState, filterTasks, renderTasks, updateTasksCounter} from "./uiUtils"

export function checkFilterApplied() {
   let filter = window.location.hash;
   console.log("filter: ", filter);
   if (filter == "#/" || filter == "") {
      filter = "all"
   } else {
      filter = filter.replace("#/","");
   }

   filterTasks(filter);
}

export function initTaskEvents() {
   const taskElements = document.querySelectorAll(".task");

   taskElements.forEach(taskElement => {
      const taskId = taskElement.dataset.taskid;

      // Sub-elements
      const checkbox = taskElement.querySelector("input.toggle");
      const label = taskElement. querySelector("label");
      const textInput = taskElement.querySelector("input.edit");

      // Event handlers
      const checkboxChangeHandler = _ => {
         if (checkbox.checked) {
            changeVisualTaskState(taskElement, "completed");
            updateTask({completed: true}, taskId);
         } else {
            changeVisualTaskState(taskElement, "pending");
            updateTask({completed: false}, taskId);
         }

         updateTasksCounter();
      }

      const editKeyPressHandler = ev => {
         const keyPressed = ev.key;

         if (keyPressed == "Enter") {
            updateTask({title: textInput.value}, taskId);
            label.innerText = textInput.value;
            taskElement.classList.remove("editing");

            textInput.removeEventListener("keydown", editKeyPressHandler);
         }

         if (keyPressed == "Escape") {
            textInput.value = label.innerText;
            taskElement.classList.remove("editing");
            textInput.removeEventListener("keydown", editKeyPressHandler);
         }
      }

      const labelDblClickHandler = _ => {
         changeVisualTaskState(taskElement, "editing");

         textInput.focus();
         textInput.addEventListener("keydown", editKeyPressHandler);
      }

      // Event listeners
      checkbox.addEventListener("change", checkboxChangeHandler);
      label.addEventListener("dblclick", labelDblClickHandler);
   });
}

export const sayHello = (text) => {
  return text;
};
