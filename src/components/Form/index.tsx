import React, { useRef, useCallback } from 'react';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import { FormWrapper } from './styles';
import { ToastError } from '../Message';

interface IFormProps {
  id?: string;
  schema?: Yup.BaseSchema;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: any;
  initialData?: object;
}

const Form: React.FC<IFormProps> = ({
  children,
  schema,
  onSubmit,
  id = 'form',
  ...props
}) => {
  const ref = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async data => {
      if (!schema) {
        onSubmit(data);
        return;
      }

      try {
        // Remove all previous errors
        ref.current?.setErrors({});

        const validatedData = await schema.validate(data, {
          abortEarly: false,
        });

        // Validation passed
        onSubmit(validatedData);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          ref.current?.setErrors(errors);
        }

        ToastError('Erro ao validar campos.');
      }
    },
    [onSubmit, schema],
  );

  return (
    <FormWrapper id={id} ref={ref} onSubmit={handleSubmit} {...props}>
      {children}
    </FormWrapper>
  );
};

export default Form;
