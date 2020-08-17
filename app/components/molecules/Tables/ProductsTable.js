import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import { Close, Done, Edit, Grade, Visibility } from "@material-ui/icons";
import { ProductsOrderBy } from "../../../types/ProductsOrderBy";
import { withStyles } from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import styles from "../../../styles/dashboard/components/molecules/productsTableStyles";

class ProductsTable extends React.Component {
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
    this.dispatch(this.props.getProductByUuid(id));
  };

  handleClickChangeState = prop => {
    const { id } = prop;
    this.dispatch(this.props.deleteProduct(id));
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

      this.dispatch(this.props.listProducts(this.props.page, orderBy, order));
    }
  };

  orderBySanitized = props => {
    let orderBy = props.toLowerCase().split(" ");
    orderBy = orderBy[1]
      ? orderBy[0] + orderBy[1][0].toUpperCase() + orderBy[1].slice(1)
      : orderBy[0];

    return Object.values(ProductsOrderBy).indexOf(orderBy) > -1
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

  handleClickDetails = props => {
    const { id } = props;
    this.dispatch(this.props.seeDetails(id));
  };

  handleClickShowOnWebsite = props => {
    const { id, isShownOnWebsite } = props;
    const { showOnWebsite, page } = this.props;
    this.dispatch(showOnWebsite(id, isShownOnWebsite, page));
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
                            aria-label="See details"
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
                        <Tooltip
                          id="tooltip-top"
                          title="Edit"
                          placement="top"
                          classes={{ tooltip: classes.tooltip }}
                        >
                          <IconButton
                            aria-label="Editar"
                            className={classes.tableActionButton}
                            onClick={this.handleClickUpdate.bind(this, prop)}
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
                            aria-label={
                              prop.visibleData[9] === "active"
                                ? "Close"
                                : "Done"
                            }
                            className={classes.tableActionButton}
                            onClick={this.handleClickChangeState.bind(
                              this,
                              prop
                            )}
                          >
                            {prop.visibleData["active"] === "active" ? (
                              <Close
                                className={
                                  classes.tableActionButtonIcon +
                                  " " +
                                  classes.close
                                }
                              />
                            ) : (
                              <Done
                                className={
                                  classes.tableActionButtonIcon +
                                  " " +
                                  classes.done
                                }
                              />
                            )}
                          </IconButton>
                        </Tooltip>
                        <Tooltip
                          id="tooltip-top-start"
                          title={
                            prop.isShownOnWebsite
                              ? "Quitar de la página"
                              : "Destacar en la página"
                          }
                          placement="top"
                          classes={{ tooltip: classes.tooltip }}
                        >
                          <IconButton
                            aria-label={
                              prop.isShownOnWebsite ? "Grade" : "Grade"
                            }
                            className={classes.tableActionButton}
                            onClick={this.handleClickShowOnWebsite.bind(
                              this,
                              prop
                            )}
                          >
                            {prop.isShownOnWebsite ? (
                              <Grade
                                className={
                                  classes.tableActionButtonIcon +
                                  " " +
                                  classes.shown
                                }
                              />
                            ) : (
                              <Grade
                                className={
                                  classes.tableActionButtonIcon +
                                  " " +
                                  classes.hidden
                                }
                              />
                            )}
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

ProductsTable.propTypes = {
  classes: PropTypes.object.isRequired,
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  dispatch: PropTypes.func,
  updateModalShow: PropTypes.bool,
  createModalShow: PropTypes.bool,
  page: PropTypes.number,
  formData: PropTypes.object,
  seeDetails: PropTypes.func,
  getProductByUuid: PropTypes.func,
  showOnWebsite: PropTypes.func
};

const mapStateToProps = state => {
  return state.productsReducer;
};

export default connect(mapStateToProps)(withStyles(styles)(ProductsTable));
