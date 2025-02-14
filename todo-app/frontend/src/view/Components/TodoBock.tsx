import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Done from "../../assets/Vector.svg";
import Delete from "../../assets/TrashSimple.svg";
import Edit from "../../assets/edit.svg";
import { Todo } from "../../types/todo.interface";
import { useTodo } from "../../hooks/useTodo";

const TodoSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Title is required"),
});

function TodoBlock({ todo }: { todo: Todo }) {
  const { updateTodo, removeTodo } = useTodo();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="rounded-sm p-10 bg-[#15101C] text-white flex justify-between">
      {isEditing ? (
        <Formik
          initialValues={{ title: todo.title }}
          validationSchema={TodoSchema}
          onSubmit={(values, { setSubmitting }) => {
            if (values.title.trim() && values.title !== todo.title) {
              updateTodo(todo.id, { title: values.title, completed: todo.completed });
            }
            setIsEditing(false);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="flex gap-2">
              <Field
                name="title"
                className="bg-transparent border-b border-white focus:outline-none"
                autoFocus
              />
              <button type="submit" disabled={isSubmitting} className="text-green-400">
                ✅
              </button>
              <button type="button" onClick={() => setIsEditing(false)} className="text-red-400">
                ❌
              </button>
              <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
            </Form>
          )}
        </Formik>
      ) : (
        <span
          className={todo.completed ? "line-through text-gray-400" : ""}
          onDoubleClick={() => setIsEditing(true)}
        >
          {todo.title}
        </span>
      )}

      <div className="flex gap-2">
        <img src={Done} width={30} data-action="toggle" onClick={() => updateTodo(todo.id, { title: todo.title, completed: !todo.completed })} />
        <img src={Edit} width={30} data-action="edit" onClick={() => setIsEditing(true)} />
        <img src={Delete} data-action="delete" onClick={() => removeTodo(todo.id)} />
      </div>
    </div>
  );
}

export default TodoBlock;
