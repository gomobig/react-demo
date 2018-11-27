import React, { PureComponent } from "react";
import { Button } from "antd-mobile";
import { connect } from "react-redux";
import { startUpload } from '../reducer'

class ImagePicker extends PureComponent {
  constructor() {
    super();
    this.input = null;
  }

  takePhoto = () => {
    this.input.click();
    this.props.startUpload(true)
  }

  fileChange = () => {
    // const file = fileInput.files[0];
    const el = this.input;
    if (el && el.files && el.files.length) {
      const { files } = el;
      console.log(files[0].size/1000 + 'KB')
      const reader = new FileReader();
      reader.onload = function() {
        const dataURL = reader.result;
        // console.log(dataURL)
      };
      reader.readAsDataURL(files[0]);
    }
    if (el) {
      el.value = '';
    }

  }

  render () {
    const { text, loading } = this.props;
    return (
      <label>
        <Button type="primary" loading={loading} onClick={this.takePhoto}>{text}</Button>
        <input 
          ref={node => this.input = node }
          type="file"
          style={{display: "none" }}
          accept="image/*"
          capture="camera"
          onChange={this.fileChange} />
        <input 
          type="file"
          accept="image/*"
          capture="camera"
          onChange={this.fileChange} />
      </label>
    );
  }
}

const mapStateToProps = ({imagePicker}) => {
  return {
    loading: imagePicker.loading,
    text: imagePicker.text,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    startUpload: loading => dispatch(startUpload(loading)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImagePicker);