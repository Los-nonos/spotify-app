import React from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";

import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { withStyles } from "@material-ui/core";

import tableSearchStyle from "../../../styles/dashboard/components/molecules/searchProductsTableStyles";
import { redirectTo } from "../../../utils/helpers/redirectTo";
import { ProductsOrderBy } from "../../../types/ProductsOrderBy";

class SearchProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.dispatch = props.dispatch;

    this.state = {
      modal: false,
      orderBy: "",
      order: ""
    };
  }

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

      this.dispatch(
        this.props.changeOrder(
          this.props.searchProductState,
          this.props.searchProductState.page,
          orderBy,
          order
        )
      );
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
    const slug = props.uuid;
    this.dispatch(this.props.seeDetails(slug));
    redirectTo("products");
  };

  handleClickAddToCart = props => {
    const { id } = props;
    this.dispatch(this.props.addToCart(id));
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
                      {prop.visibleData.map((prop, innerKey) => {
                        return (
                          <TableCell
                            className={classes.tableCell}
                            key={innerKey}
                          >
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
                          title="Ver Detalles"
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
                          title="Agregar a una compra"
                          placement="top"
                          classes={{ tooltip: classes.tooltip }}
                        >
                          <IconButton
                            aria-label="Add to cart"
                            className={classes.tableActionButton}
                            onClick={this.handleClickAddToCart.bind(this, prop)}
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

SearchProductTable.defaultProps = {
  tableHeaderColor: "gray"
};

SearchProductTable.propTypes = {
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
  tableData: PropTypes.array,
  dispatch: PropTypes.func,
  updateModalShow: PropTypes.bool,
  createModalShow: PropTypes.bool,
  page: PropTypes.number,
  formData: PropTypes.object,
  seeDetails: PropTypes.func,
  showNotification: PropTypes.func
};

const mapStateToProps = state => {
  return state.productsReducer;
};

export default connect(mapStateToProps)(
  withStyles(tableSearchStyle)(SearchProductTable)
);
