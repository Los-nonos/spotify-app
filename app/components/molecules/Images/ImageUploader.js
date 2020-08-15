import React from "react";

class ImageUploader extends React.Component {
  showWidget = e => {
    e.preventDefault();

    this.widget.open();
  };

  checkUploadResult = resultEvent => {
    if (resultEvent.event === "success") {
      this.props.getImage(resultEvent.info.secure_url);
    }
  };

  render() {
    this.widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dhbwfcydx", //TODO: change for environment variables
        uploadPreset: "dfxe94d1"
      },
      (error, result) => {
        this.checkUploadResult(result);
      }
    );

    return (
      <div id={"photo-form-container"}>
        <button onClick={this.showWidget}>Cargar imagen</button>
      </div>
    );
  }
}

export default ImageUploader;
