import { useCallback, useRef, useState } from "react";
import { formDataToObject } from "./formdata-to-object";

interface FormState<T> {
  isValid: boolean;
  message: string;
  data: T;
}

interface UseForm<T> {
  formState: FormState<T>;
  register: (name: string) => { ref: React.RefObject<HTMLInputElement> };
  handleSubmit: (
    onSubmit: (values: T) => void
  ) => (e: React.FormEvent<HTMLFormElement>) => void;
}

export const useForm = <T extends Record<string, any>>(): UseForm<T> => {
  const ref = useRef<HTMLInputElement>(null);

  const [formState, setFormState] = useState<FormState<T>>({
    isValid: true,
    message: "",
    data: {} as T,
  });

  const register = useCallback((name: string) => {
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormState((prevState) => ({
        ...prevState,
        data: {
          ...prevState.data,
          [name]: e.target.value,
        },
      }));
    };

    return { ref, onChange };
  }, []);
  const handleSubmit = useCallback((onSubmit: (values: T) => void) => {
    return (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);
      const formDataObj = formDataToObject(formData);

      // Modify with validation tools like YUP, ZOD etc for more robust handling
      const isValid = Object.values(formDataObj).some((value) => {
        return value.length !== 0;
      });
      setFormState((prevState) => ({
        ...prevState,
        isValid,
        ...(isValid && { message: "Please enter a value" }),
      }));
      if (isValid) onSubmit(formDataObj as T);
    };
  }, []);

  return { formState, register, handleSubmit };
};
