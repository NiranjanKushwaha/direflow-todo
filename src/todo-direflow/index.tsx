import { DireflowComponent } from "direflow-component";
import Todo from "./Pages/Todo";

export default DireflowComponent.create({
  component: Todo,
  configuration: {
    tagname: "todo-direflow",
  },
  properties: {
    showLimit: 0,
  },
  plugins: [
    {
      name: "font-loader",
      options: {
        google: {
          families: ["Advent Pro", "Noto Sans JP"],
        },
      },
    },
    {
      name: "external-loader",
      options: {
        paths: [
          "https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css",
        ],
      },
    },
  ],
});
