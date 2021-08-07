import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import { FiAlertCircle } from 'react-icons/fi';

import { Container, Error, Label } from './styles';

type Props = InputHTMLAttributes<HTMLInputElement>;

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
}

const CheckBox = React.forwardRef<Props, InputProps>(
  ({ name, label, ...rest }, _) => {
    const inputRef = useRef<any>(null);

    const { fieldName, defaultValue, error, registerField } = useField(name);

    useEffect(() => {
      if (inputRef.current) {
        registerField({
          name: fieldName,
          ref: inputRef.current,
          path: 'checked',
        });
      }
    }, [fieldName, registerField]);

    return (
      <>
        {label && <Label htmlFor={fieldName}>{label}</Label>}
        <Container isErrored={!!error}>
          <input
            ref={inputRef}
            id={fieldName}
            name={fieldName}
            aria-label={fieldName}
            type="checkbox"
            defaultValue={defaultValue}
            defaultChecked={defaultValue}
            {...rest}
          />

          {error && (
            <Error title={error}>
              <FiAlertCircle color="#c53030" size={20} />
            </Error>
          )}
        </Container>
      </>
    );
  },
);

export default CheckBox;
