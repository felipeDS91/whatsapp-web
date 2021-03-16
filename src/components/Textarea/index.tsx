import React, {
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useField } from '@unform/core';
import { FiAlertCircle } from 'react-icons/fi';
import { Container, Error, Label } from './styles';

interface ITextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  name: string;
}

const Textarea: React.FC<ITextAreaProps> = ({ name, label, ...props }) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: fieldName,
        ref: ref.current,
        path: 'value',
      });
    }
  }, [fieldName, registerField]);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!ref.current?.value);
  }, []);

  return (
    <>
      {label && <Label htmlFor={fieldName}>{label}</Label>}
      <Container isErrored={!!error} isFilled={isFilled} isFocused={isFocused}>
        <textarea
          id={fieldName}
          name={fieldName}
          defaultValue={defaultValue}
          onFocus={handleFocus}
          onBlur={handleBlur}
          ref={ref}
          {...props}
        />
        {error && (
          <Error title={error}>
            <FiAlertCircle color="#c53030" size={20} />
          </Error>
        )}
      </Container>
    </>
  );
};

export default Textarea;
