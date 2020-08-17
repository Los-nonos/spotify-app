import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
}));

function TextFields(props) {
  const classes = useStyles();

  const handleChange = (e) => {
    props.onTextChange(e.target.value);
  };

  return(
    <div>
      <h4>Browser</h4>
      <form className={classes.container} noValidate autoComplete="off">
        <TextField          
          id="standard-required"
          label="Search"
          defaultValue=""
          className={classes.textField}
          margin="normal"
          variant="outlined"
          onChange={handleChange}
        />
      </form>
    </div>    
  );
}

export default TextFields;