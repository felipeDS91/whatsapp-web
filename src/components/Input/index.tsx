import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { useField } from '@unform/core';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import InputMask from 'react-input-mask';

import { Container, Error, Label } from './styles';

type Props = InputHTMLAttributes<HTMLInputElement>;

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
  mask?: string;
}

const Input = React.forwardRef<Props, InputProps>(
  ({ name, icon: Icon, mask, label, ...rest }, _) => {
    const inputRef = useRef<any>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    const { fieldName, defaultValue, error, registerField } = useField(name);

    useEffect(() => {
      if (defaultValue && inputRef?.current?.setInputValue) {
        inputRef.current.setInputValue(defaultValue);
      }
    }, [defaultValue]);

    const handleInputFocus = useCallback(() => {
      setIsFocused(true);
    }, []);

    const handleInputBlur = useCallback(() => {
      setIsFocused(false);

      setIsFilled(!!inputRef.current?.value);
    }, []);

    useEffect(() => {
      if (inputRef.current) {
        registerField({
          name: fieldName,
          ref: inputRef.current,
          path: 'value',
          setValue(ref_: any, value) {
            if (ref_?.setInputValue) ref_.setInputValue(value);
          },
          clearValue(ref_: any) {
            if (ref_?.setInputValue) ref_.setInputValue('');
          },
        });
      }
    }, [fieldName, registerField]);

    return (
      <>
        {label && <Label htmlFor={fieldName}>{label}</Label>}
        <Container
          isErrored={!!error}
          isFilled={isFilled}
          isFocused={isFocused}
        >
          {Icon && <Icon size={20} />}
          {mask ? (
            <InputMask
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              defaultValue={defaultValue}
              mask={mask}
              ref={inputRef}
              {...rest}
            />
          ) : (
            <input
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              defaultValue={defaultValue}
              ref={inputRef}
              {...rest}
            />
          )}

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

export default Input;
