import React, { useRef, useEffect, useState, useCallback } from 'react';
import ReactSelect, {
  OptionTypeBase,
  Props as SelectProps,
} from 'react-select';
import { useField } from '@unform/core';
import { FiAlertCircle } from 'react-icons/fi';
import { IconBaseProps } from 'react-icons';
import { Container, Label, Error, SelectWrapper, Wrapper } from './styles';

const customStyles = {
  control: (provided: object) => ({
    ...provided,
    padding: '4px',
    borderRadius: 8,
    cursor: 'pointer',
    border: 0,
    boxShadow: 'none',
  }),
  menu: (provided: object) => ({
    ...provided,
    borderRadius: 8,
  }),
  container: (provided: object) => ({
    ...provided,
    width: '100%',
  }),
  option: (
    provided: object,
    state: { isSelected: boolean; isFocused: boolean },
  ) => ({
    ...provided,
    color: state.isFocused ? '#ffffff' : '#333333',
    backgroundColor: state.isFocused ? '#333333' : '#ffffff',
    padding: 10,
    width: '98%',
    borderRadius: 5,
    margin: '0 auto',
  }),
};

interface Props extends SelectProps<OptionTypeBase> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
  label?: string;
}

const Select: React.FC<Props> = ({
  name,
  label,
  isMulti,
  icon: Icon,
  options,
  ...rest
}) => {
  const selectRef = useRef<any>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, defaultValue, registerField, error } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!selectRef.current?.state.value);
  }, []);

  const getDefaultValue = useCallback(() => {
    if (!defaultValue) return null;

    if (!isMulti)
      return options?.find(
        (option: OptionTypeBase) => option.value === defaultValue,
      );

    return options?.filter((option: OptionTypeBase) =>
      defaultValue.includes(option.value),
    );
  }, [defaultValue, isMulti, options]);

  useEffect(() => {
    if (defaultValue && !selectRef?.current?.select.props.value) {
      selectRef?.current?.select.setValue(getDefaultValue(), 'set-value');
    }
  }, [defaultValue, getDefaultValue]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref?.state?.value) {
            return [];
          }
          return ref.state.value.map((option: OptionTypeBase) => option.value);
        }
        if (!ref?.state?.value) {
          return '';
        }
        if (Array.isArray(ref?.state?.value)) {
          return ref?.state?.value[0]?.value;
        }
        return ref?.state?.value?.value;
      },
      setValue: (ref: any, value: any) => {
        if (rest.isMulti && Array.isArray(value)) {
          const items = ref?.props?.options?.filter((option: any) =>
            value.includes(option.value),
          );
          ref?.select.setValue(items);
        } else {
          const item = ref?.props?.options?.filter(
            (option: any) => option.value === value,
          );
          if (item && item.length > 0) {
            ref?.select?.setValue(item);
          }
        }
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <Wrapper>
      {label && <Label htmlFor={fieldName}>{label}</Label>}
      <Container isErrored={!!error} isFilled={isFilled} isFocused={isFocused}>
        <SelectWrapper>
          {Icon && <Icon size={22} />}
          <ReactSelect
            defaultValue={getDefaultValue()}
            ref={selectRef}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            classNamePrefix="react-select"
            options={options}
            noOptionsMessage={() => 'Sem opção cadastrada'}
            styles={customStyles}
            placeholder="Selecione..."
            {...rest}
          />
        </SelectWrapper>
        {error && (
          <Error title={error}>
            <FiAlertCircle color="#c53030" size={20} />
          </Error>
        )}
      </Container>
    </Wrapper>
  );
};

export default Select;
