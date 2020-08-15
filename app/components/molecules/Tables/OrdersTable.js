import React from "react";
import { connect } from "react-redux";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import { EmployeesOrderBy } from "../../../types/EmployeesOrderBy";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import { Close, Visibility } from "@material-ui/icons";
import { withStyles } from "@material-ui/core";

class OrdersTable extends React.Component {
  constructor(props) {
    super(props);
    this.dispatch = props.dispatch;
  }

  changeArrowOrderBy = (props, classes) => {
    const orderBy = this.orderBySanitized(props);

    if (this.state.orderBy === orderBy) {
      return this.state.order === "asc" ? (
        <ArrowDropDownIcon className={classes.tableActionButtonIcon} />
      ) : (
        <ArrowDropUpIcon className={classes.tableActionButtonIcon} />
      );
    } else {
      return <ArrowDropUpIcon className={classes.tableActionButtonIcon} />;
    }
  };

  handleClickDetails = props => {
    const { id } = props;
    this.dispatch(this.props.seeDetails(id));
  };

  handleClickChangeState = props => {
    const { id } = props;
    this.dispatch(this.props.changeEmployeeState(id));
  };

  handleOrderBy = props => {
    const orderBy = this.orderBySanitized(props);

    if (orderBy !== null) {
      let order = "asc";

      if (this.state.orderBy === orderBy) {
        order = this.state.order === "asc" ? "desc" : "asc";
        this.setState({ orderBy, order });
      } else {
        this.setState({ orderBy, order });
      }

      this.props.changeOrderState(orderBy, order);

      this.dispatch(this.props.listEmployees(this.props.page, orderBy, order));
    }
  };

  orderBySanitized = props => {
    let orderBy = props.toLowerCase().split(" ");
    orderBy = orderBy[1]
      ? orderBy[0] + orderBy[1][0].toUpperCase() + orderBy[1].slice(1)
      : orderBy[0];

    return Object.values(EmployeesOrderBy).indexOf(orderBy) > -1
      ? orderBy
      : null;
  };

  render() {
    const { classes, tableHead, tableData, tableHeaderColor } = this.props;
    return (
      <div className={classes.tableResponsive}>
        <Table className={classes.table}>
          {tableHead !== undefined ? (
            <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
              <TableRow>
                {tableHead.map((prop, key) => {
                  return (
                    <TableCell
                      className={
                        classes.tableCell + " " + classes.tableHeadCell
                      }
                      key={key}
                      onClick={this.handleOrderBy.bind(this, prop)}
                    >
                      {this.orderBySanitized(prop) != null
                        ? this.changeArrowOrderBy(prop, classes)
                        : null}
                      {prop}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
          ) : null}
          <TableBody>
            {tableData.length !== 0 && true
              ? tableData.map((prop, key) => {
                  return (
                    <TableRow key={key}>
                      {prop.visibleData.map((prop, key) => {
                        return (
                          <TableCell className={classes.tableCell} key={key}>
                            {typeof prop === "boolean" ? (
                              prop ? (
                                <CheckCircleOutlineIcon />
                              ) : (
                                <HighlightOffIcon />
                              )
                            ) : (
                              prop
                            )}
                          </TableCell>
                        );
                      })}
                      <TableCell className={classes.tableActions}>
                        <Tooltip
                          id="tooltip-top"
                          title="Ver detalles"
                          placement="top"
                          classes={{ tooltip: classes.tooltip }}
                        >
                          <IconButton
                            aria-label="Ver detalles"
                            className={classes.tableActionButton}
                            onClick={this.handleClickDetails.bind(this, prop)}
                          >
                            <Visibility
                              className={
                                classes.tableActionButtonIcon +
                                " " +
                                classes.edit
                              }
                            />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })
              : null}
          </TableBody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state.ordersReducer;
};

export default connect(mapStateToProps)(withStyles({})(OrdersTable));
