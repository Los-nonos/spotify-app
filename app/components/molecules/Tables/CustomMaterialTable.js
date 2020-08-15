import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MaterialTable from "material-table";

class CustomMaterialTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      materialTable: {
        columns: [],
        data: []
      },
      firstLoad: true
    };
    this.dispatch = props.dispatch;
  }

  addAction = (title, newData) => {
    switch (title) {
      case "Caracteristicas":
        const characteristics = newData.characteristics
          ? prepareCharacteristics(
              newData.name,
              this.props.completeProduct.characteristics
            )
          : [];
        newData.characteristics = characteristics;
        this.props.assignCharacteristicToProduct(newData.name, newData.value);
        break;
      default:
        break;
    }
  };

  editAction = (title, newData) => {
    switch (title) {
      case "Characteristics":
        const characteristics = newData.characteristics
          ? prepareCharacteristics(
              newData.characteristics,
              this.props.completeProduct.characteristics
            )
          : [];
        newData.characteristics = characteristics;
        this.dispatch(
          this.props.updateProductCharacteristic(
            newData,
            this.props.formData.id
          )
        );
        break;
      default:
        break;
    }
  };

  deleteAction = (title, oldData) => {
    switch (title) {
      case "Characteristics":
        this.dispatch(
          this.props.deleteProductCharacteristic(
            oldData,
            this.props.formData.id
          )
        );
        break;
      default:
        break;
    }
  };

  render() {
    const { title, columns, data } = this.props;
    if (data.length !== 0 && this.state.firstLoad) {
      this.setState({ materialTable: { data: data }, firstLoad: false });
    }
    return (
      <div>
        <MaterialTable
          title={title}
          columns={columns}
          data={this.state.materialTable.data}
          options={{ search: false, draggable: false }}
          editable={{
            onRowAdd: newData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  this.addAction(title, newData);
                  this.setState(prevState => {
                    const data = [...prevState.materialTable.data];
                    data.push(newData);
                    return {
                      ...prevState,
                      materialTable: { ...prevState.materialTable, data }
                    };
                  });
                }, 600);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  this.editAction(title, newData);
                  if (oldData) {
                    this.setState(prevState => {
                      const data = [...prevState.materialTable.data];
                      data[data.indexOf(oldData)] = newData;
                      return {
                        ...prevState,
                        materialTable: { ...prevState.materialTable, data }
                      };
                    });
                  }
                }, 600);
              }),
            onRowDelete: oldData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  this.deleteAction(title, oldData);
                  this.setState(prevState => {
                    const data = [...prevState.materialTable.data];
                    data.splice(data.indexOf(oldData), 1);
                    return {
                      ...prevState,
                      materialTable: { ...prevState.materialTable, data }
                    };
                  });
                }, 600);
              })
          }}
        />
      </div>
    );
  }
}

CustomMaterialTable.propTypes = {
  dispatch: PropTypes.func,
  title: PropTypes.string,
  columns: PropTypes.array,
  customFilters: PropTypes.array,
  completeProfileData: PropTypes.object,
  assignCharacteristicToProduct: PropTypes.func,
  updateProductCharacteristic: PropTypes.func,
  deleteProductCharacteristic: PropTypes.func,
  formData: PropTypes.object,
  showNotification: PropTypes.func
};

const mapStateToProps = state => {
  return state.productsReducer;
};

export default connect(mapStateToProps)(CustomMaterialTable);
