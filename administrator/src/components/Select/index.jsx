import { memo } from "react";
import { Controller } from "react-hook-form";
import ReactSelect from "react-select";
import clsx from "clsx";
import classes from "./styles.module.scss";
import { FormGroup } from "reactstrap";

const customStyles = {
  indicatorSeparator: () => ({
    display: "none",
  }),
  container: provided => ({
    ...provided,
    margin: 0,
  }),
  // option: (provided, state) => ({
  //   ...provided,
  //   cursor: state.isDisabled ? "not-allowed" : "pointer",
  //   background: state.isSelected ? "#4f43e0" : "#ffffff",
  //   color: state.isSelected ? "#ffffff" : "#000000",
  //   "&:hover": {
  //     background: state.isSelected ? "#4f43e0" : "#e5e5e5",
  //   },
  // }),
  option: (provided, state) => ({
    ...provided,
    cursor: state.isDisabled ? "not-allowed" : "pointer",
    background: state.isSelected ? "#e5e5e5" : "#ffffff",
    color: "#000000",
    "&:hover": {
      background: "#e5e5e5",
    },
  }),
  control: (provided, state) => ({
    ...provided,
    border: state.menuIsOpen ? "2px solid #4f43e0" : "2px solid #cccfd6",
    borderRadius: 6,
    boxShadow: "none",
    backgroundColor: state.isDisabled ? "#cccfd6" : "unset",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      borderColor: "#4f43e0",
      transition: "all 0.3s ease-in-out",
    },
  }),
  valueContainer: provided => ({
    ...provided,
    paddingLeft: "18px",
  }),
  placeholder: provided => ({
    ...provided,
    color: "#888888",
    opacity: 0.8,
    fontSize: "0.8571em",
    fontWeight: "400",
    margin: 0,
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: state.isDisabled ? "#888888" : "#000000",
    fontSize: "0.8571em",
    fontWeight: 400,
    margin: 0,
  }),
  input: provided => ({
    ...provided,
    margin: 0,
  }),
  menuPortal: provided => ({
    ...provided,
    zIndex: 9999,
  }),
  menu: provided => ({ ...provided, zIndex: 9999 }),
};

const Select = memo(
  ({
    className,
    errorMessage,
    name,
    control,
    bindKey,
    bindLabel,
    styles,
    ...rest
  }) => {
    return (
      <FormGroup
        className={clsx(
          classes.root,
          { "has-danger": !!errorMessage },
          className
        )}
      >
        {control ? (
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <ReactSelect
                {...field}
                styles={{ ...customStyles, ...styles }}
                menuPortalTarget={document.querySelector("body")}
                getOptionValue={option => option[bindKey || "value"]}
                getOptionLabel={option => option[bindLabel || "label"]}
                noOptionsMessage={() => "..."}
                {...rest}
              />
            )}
          />
        ) : (
          <ReactSelect
            styles={{ ...customStyles, ...styles }}
            menuPortalTarget={document.querySelector("body")}
            getOptionValue={option => option[bindKey || "value"]}
            getOptionLabel={option => option[bindLabel || "label"]}
            noOptionsMessage={() => "..."}
            {...rest}
          />
        )}
        {errorMessage && (
          <span className={classes.errorMessage}>{errorMessage}</span>
        )}
      </FormGroup>
    );
  }
);

export default Select;
