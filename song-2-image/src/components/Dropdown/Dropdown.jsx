import React, { useState, useEffect, useRef } from "react";
import Select, { components, ContainerProps } from "react-select";
import { DropdownText, StyledArrow } from "./Dropdown.styles";

const CustomIndicator = ({ selectProps: { menuIsOpen } }) => (
  <StyledArrow menuIsOpen={menuIsOpen} />
);

const CustomOption = ({ isSelected, children, ...rest }) => (
  <components.Option {...rest} isSelected={isSelected}>
    {children}
    <SelectDisk chosen={isSelected} />
  </components.Option>
);

const CustomContainer = ({ children, ...rest }) => {
  const {
    selectedProps: { label, inputState, message, isDisabled },
  } = rest;
  return (
    <components.SelectContainer {...rest}>
      {label && <DropdownText>{label}</DropdownText>}
      {children}
    </components.SelectContainer>
  );
};

const Dropdown = ({ inputState, disabled, label, ...rest }) => {
  const ref = useRef();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    ref.current = document.body;
    setMounted(true);
  }, []);

  return mounted ? (
    <Select
      {...rest}
      components={{
        DropdownIndicator: CustomIndicator,
        Option: CustomOption,
        SelectContainer: CustomContainer,
      }}
      isDisabled={disabled}
      inputState={inputState}
      menuPortalTaget={ref.current}
      label={label}
    />
  ) : null;
};

export default Dropdown;
