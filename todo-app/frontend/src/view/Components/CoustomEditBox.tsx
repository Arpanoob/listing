import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useTodo } from "../../hooks/useTodo";

const TodoSchema = Yup.object().shape({
  title: Yup.string().trim().min(5, "Task cannot be less than 5").max(50,"max 50").required("Task is required"),
});

function CustomEditBox() {
  const { createTodo } = useTodo();

  return (
    <Formik
      initialValues={{ title: "" }}
      validationSchema={TodoSchema}
      onSubmit={(values, { resetForm }) => {
        createTodo(values.title);
        resetForm(); 
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-row items-center">
          <div className="relative">
            <Field
              name="title"
              className="w-[381px] h-[40px] border border-[#9E78CF] rounded-sm placeholder-[#777777] p-5 text-white bg-transparent focus:outline-none"
              placeholder="Add New Task"
            />
            <ErrorMessage name="title" component="div" className="text-red-500 text-sm absolute mt-1" />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="ml-[10px] flex items-center justify-center rounded-sm text-white text-[50px] bg-[#9E78CF] w-[40px] h-[40px] cursor-pointer"
          >
            <span className="mb-1">+</span>
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default CustomEditBox;
