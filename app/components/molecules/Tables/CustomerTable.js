import React from "react";
import { withStyles } from "@material-ui/core";
import { CustomersOrderBy } from "../../../types/CustomersOrderBy";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import { Close, Edit, Visibility } from "@material-ui/icons";

class CustomerTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      orderBy: "",
      order: ""
    };
    this.dispatch = props.dispatch;
  }

  handleClickUpdate = props => {
    const { id } = props;
    this.dispatch(this.props.getCustomerById(id));
  };

  handleClickChangeState = props => {
    const { id } = props;
    this.dispatch(this.props.deleteCustomer(id));
  };

  handleClickSelect = props => {
    const { id } = props;
    this.props.selectedUser(id);
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

      this.dispatch(this.props.listCustomer(this.props.page, orderBy, order));
    }
  };

  orderBySanitized = props => {
    let orderBy = props.toLowerCase().split(" ");
    orderBy = orderBy[1]
      ? orderBy[0] + orderBy[1][0].toUpperCase() + orderBy[1].slice(1)
      : orderBy[0];

    return Object.values(CustomersOrderBy).indexOf(orderBy) > -1
      ? orderBy
      : null;
  };

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
                        {this.props.selectUser ? (
                          <Tooltip
                            id={"tooltip-top"}
                            title={"Seleccionar"}
                            placement={"top"}
                            classes={{ tooltip: classes.tooltip }}
                          >
                            <IconButton
                              aria-label={"Seleccionar"}
                              className={classes.tableActionButton}
                              onClick={this.handleClickSelect.bind(this, prop)}
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
                        ) : (
                          <>
                            <Tooltip
                              id="tooltip-top"
                              title="Editar"
                              placement="top"
                              classes={{ tooltip: classes.tooltip }}
                            >
                              <IconButton
                                aria-label="Editar"
                                className={classes.tableActionButton}
                                onClick={this.handleClickUpdate.bind(
                                  this,
                                  prop
                                )}
                              >
                                <Edit
                                  className={
                                    classes.tableActionButtonIcon +
                                    " " +
                                    classes.edit
                                  }
                                />
                              </IconButton>
                            </Tooltip>
                            <Tooltip
                              id="tooltip-top-start"
                              title={"Eliminar"}
                              placement="top"
                              classes={{ tooltip: classes.tooltip }}
                            >
                              <IconButton
                                aria-label={"Close"}
                                className={classes.tableActionButton}
                                onClick={this.handleClickChangeState.bind(
                                  this,
                                  prop
                                )}
                              >
                                <Close
                                  className={
                                    classes.tableActionButtonIcon +
                                    " " +
                                    classes.close
                                  }
                                />
                              </IconButton>
                            </Tooltip>
                          </>
                        )}
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

export default withStyles({})(CustomerTable);
