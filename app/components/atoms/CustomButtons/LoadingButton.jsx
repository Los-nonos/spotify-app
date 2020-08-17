import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import { CircularProgress } from "@material-ui/core";
import classNames from "classnames";

import buttonStyle from "../../../styles/dashboard/components/buttonStyle.jsx";
import customCircularProgress from "../../../styles/dashboard/components/customCircularProgress";

const CircularProgressCustom = withStyles(customCircularProgress)(
  CircularProgress
);

const LoadingButton = props => {
  const {
    classes,
    color,
    round,
    children,
    disabled,
    simple,
    size,
    block,
    link,
    justIcon,
    className,
    muiClasses,
    loading,
    done,
    ...rest
  } = props;

  const btnClasses = classNames({
    [classes.button]: true,
    [classes[size]]: size,
    [classes[color]]: color,
    [classes.round]: round,
    [classes.disabled]: disabled,
    [classes.simple]: simple,
    [classes.block]: block,
    [classes.link]: link,
    [classes.justIcon]: justIcon,
    [className]: className
  });

  if (done) {
    return (
      <Button {...rest} classes={muiClasses} className={btnClasses} disabled>
        {children}
      </Button>
    );
  }
  if (loading) {
    return (
      <Button {...rest} classes={muiClasses} className={btnClasses} disabled>
        {children}
        <CircularProgressCustom />
      </Button>
    );
  }
  return (
    <Button {...rest} classes={muiClasses} className={btnClasses}>
      {children}
    </Button>
  );
};

LoadingButton.defaultProps = {
  loading: false,
  done: false
};

LoadingButton.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf([
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "rose",
    "white",
    "secondary",
    "transparent"
  ]),
  size: PropTypes.oneOf(["sm", "lg"]),
  simple: PropTypes.bool,
  round: PropTypes.bool,
  disabled: PropTypes.bool,
  block: PropTypes.bool,
  link: PropTypes.bool,
  justIcon: PropTypes.bool,
  className: PropTypes.string,
  // use this to pass the classes props from Material-UI
  muiClasses: PropTypes.object,
  loading: PropTypes.bool,
  done: PropTypes.bool
};

export default withStyles(buttonStyle)(LoadingButton);
