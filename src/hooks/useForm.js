import { useState, useCallback } from 'react';

const useForm = (initForm) => {
  const [form, setForm] = useState(initForm);

  const setValue = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      return { ...prev, [name]: value };
    });
  }, []);

  return { form, setForm, setValue };
};

export default useForm;
