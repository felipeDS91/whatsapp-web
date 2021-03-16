/* eslint-disable import/no-duplicates */
import React, { useRef, useState, useEffect, useCallback } from 'react';
import ReactDatePicker, {
  ReactDatePickerProps,
  registerLocale,
  setDefaultLocale,
} from 'react-datepicker';
import { parseISO } from 'date-fns';
import { useField } from '@unform/core';
import ptBR from 'date-fns/locale/pt-BR';
import { FiAlertCircle } from 'react-icons/fi';
import 'react-datepicker/dist/react-datepicker.css';

import CustomDate from './CustomDate';
import { Container, Error, Label } from './styles';

interface Props extends Omit<ReactDatePickerProps, 'onChange'> {
  name: string;
  label?: string;
  onChange?: (e: Date | [Date, Date] | null) => void;
}

const DatePicker: React.FC<Props> = ({
  name,
  label,
  onChange,
  readOnly,
  showTimeSelect,
  ...props
}) => {
  const datepickerRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [selected, setSelected] = useState(defaultValue || undefined);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  registerLocale('ptBR', ptBR);
  setDefaultLocale('ptBR');

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!selected);
  }, [selected]);

  useEffect(() => {
    if (datepickerRef.current) {
      registerField({
        name: fieldName,
        ref: datepickerRef.current,
        path: 'props.selected',
        clearValue: (ref: any) => {
          ref.clear();
        },
      });
    }
  }, [fieldName, registerField]);

  useEffect(() => {
    if (defaultValue && !selected) setSelected(parseISO(defaultValue));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);

  return (
    <>
      {label && <Label htmlFor={fieldName}>{label}</Label>}
      <Container isErrored={!!error} isFilled={isFilled} isFocused={isFocused}>
        <ReactDatePicker
          showTimeSelect={showTimeSelect}
          dateFormat={showTimeSelect ? 'dd/MM/yyyy H:mm' : 'dd/MM/yyyy'}
          locale="ptBR"
          customInput={readOnly ? <CustomDate /> : null}
          name={fieldName}
          selected={selected}
          onFocus={handleFocus}
          onCalendarClose={handleBlur}
          autoComplete="off"
          onChange={date => {
            if (onChange) onChange(date);
            setSelected(date);
          }}
          ref={datepickerRef}
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

export default DatePicker;
