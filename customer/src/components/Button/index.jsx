import { memo } from "react";
import classes from "./styles.module.scss";
import clsx from "clsx";

const Button = memo(({ type, onClick, primary, children, className }) => {
  type ??= "button";

  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx({ [classes.primary]: primary }, className)}
    >
      {children}
    </button>
  );
});

export default Button;
