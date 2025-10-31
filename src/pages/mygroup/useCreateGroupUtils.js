import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { errorMsg, successMsg } from "../../utils/customFn";


export const createGroupSchema = yup.object().shape({
  title: yup.string().required("Group title is required"),
  note: yup.string().required("Short note is required"),
});

const useCreateGroupUtils = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createGroupSchema),
    defaultValues: {
      title: "",
      note: "",
    },
  });

  const onSubmit = async (formData) => {
    try {
      console.log("Group Payload:", formData);
      successMsg("Group created successfully!");
      reset();
    } catch (error) {
      console.error(error);
      errorMsg("Something went wrong while creating the group!");
    }
  };

  return {
    handleSubmit,
    onSubmit,
    errors,
    control,
    reset,
  };
};

export default useCreateGroupUtils;
