import { ChangeEvent, useState } from 'react';

export const useForm = <T extends object>(initValues: T) => {
  const [fvalues, setFvalues] = useState<T>(initValues);

  const handleInput = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setFvalues({ ...fvalues, [target.name]: target.value });

  const resetForm = () => setFvalues(initValues);

  return { ...fvalues, handleInput, resetForm, fvalues };
};
