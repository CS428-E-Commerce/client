import { Fragment, memo } from "react";
import { Controller } from "react-hook-form";
import ReactSelect, { components } from "react-select";
import clsx from "clsx";
import classes from "./styles.module.scss";
import { FormGroup } from "reactstrap";

const Select = memo(
  ({
    className,
    errorMessage,
    name,
    control,
    bindKey,
    bindLabel,
    styles,
    icon,
    minWidth,
    ...rest
  }) => {
    const customStyles = {
      indicatorSeparator: () => ({
        display: "none",
      }),
      container: provided => ({
        ...provided,
        margin: 0,
      }),
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
        height: 56,
        padding: "0 16px",
        borderRadius: 4,
        border: "none",
        boxShadow: "none",
        backgroundColor: "#D5D9DD",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          borderColor: "#4f43e0",
          transition: "all 0.3s ease-in-out",
        },
      }),
      valueContainer: provided => ({
        ...provided,
        minWidth,
        paddingLeft: 8,
      }),
      placeholder: provided => ({
        ...provided,
        color: "#000000",
        fontSize: "18px",
        fontWeight: 400,
        lineHeight: "165%",
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
      dropdownIndicator: provided => ({
        ...provided,
        color: "#6D7D8B",
      }),
      menuPortal: provided => ({
        ...provided,
        zIndex: 9999,
      }),
      menu: provided => ({ ...provided, zIndex: 9999 }),
    };

    const ValueContainer = props => {
      const { children, ...rest } = props;
      return (
        components.ValueContainer && (
          <components.ValueContainer {...rest}>
            {icon ? (
              <Fragment>
                {icon}
                <div className="ml-2">{children}</div>
              </Fragment>
            ) : (
              children
            )}
          </components.ValueContainer>
        )
      );
    };

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
                isSearchable={false}
                styles={{ ...customStyles, ...styles }}
                menuPortalTarget={document.querySelector("body")}
                getOptionValue={option => option[bindKey || "value"]}
                getOptionLabel={option => option[bindLabel || "label"]}
                noOptionsMessage={() => "..."}
                components={{ ValueContainer }}
                {...rest}
              />
            )}
          />
        ) : (
          <ReactSelect
            isSearchable={false}
            styles={{ ...customStyles, ...styles }}
            menuPortalTarget={document.querySelector("body")}
            getOptionValue={option => option[bindKey || "value"]}
            getOptionLabel={option => option[bindLabel || "label"]}
            noOptionsMessage={() => "..."}
            components={{ ValueContainer }}
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
