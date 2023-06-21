import { forwardRef, memo } from "react";
import clsx from "clsx";
import classes from "./styles.module.scss";

const Textarea = memo(
  forwardRef((props, ref) => {
    const {
      className,
      textareaClassName,
      errorMessage,
      ...rest
    } = props;

    return (
      <div className={className}>
        <textarea
          className={clsx(classes.textarea, textareaClassName)}
          ref={ref}
          {...rest}
        />

        {errorMessage ? (
          <p className={classes.errorMessage}>{errorMessage}</p>
        ) : null}
      </div>
    );
  })
);

export default Textarea;
