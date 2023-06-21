import { forwardRef, memo } from "react";
import clsx from "clsx";
import classes from "./styles.module.scss";

const Input = memo(
  forwardRef((props, ref) => {
    const {
      className,
      inputClassName,
      startIcon,
      endIcon,
      errorMessage,
      ...rest
    } = props;

    return (
      <div className={className}>
        <div className={classes.inputContainer}>
          {startIcon ? startIcon : null}
          <input
            className={clsx(classes.input, inputClassName)}
            type="text"
            autoComplete="off"
            ref={ref}
            {...rest}
          />
          {endIcon ? endIcon : null}
        </div>

        {errorMessage ? (
          <p className={classes.errorMessage}>{errorMessage}</p>
        ) : null}
      </div>
    );
  })
);

export default Input;
