import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import GridContainer from "../../atoms/Grid/GridContainer";
import GridItem from "../../atoms/Grid/GridItem";

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2)
  }
}));

export default function CircularIndeterminate() {
  const classes = useStyles();

  return (
    <div id="load-conteiner">
      <GridContainer justify={"center"} alignContent={"center"}>
        <GridItem xs={12} sm={12} md={12}>
          <CircularProgress className={classes.progress} />
        </GridItem>
      </GridContainer>
    </div>
  );
}
