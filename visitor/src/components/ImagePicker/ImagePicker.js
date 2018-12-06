import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Button, Icon} from 'antd-mobile';
import styles from './ImagePicker.module.less';
import framework from '../../lib/framework';

class ImagePicker extends PureComponent {
  constructor() {
    super();
    this.input = null;
  }

  takePhoto = e => {
    if (this.props.loading) {
      return;
    }
    this.input.click();
  };

  fileChange = () => {
    const el = this.input;
    if (el && el.files && el.files.length) {
      this.props.onStart();

      const {files} = el;
      // 预览图片
      const reader = new FileReader();
      reader.onload = () => {
        const dataURL = reader.result;
        this.props.onLoaded(dataURL);
      };
      reader.readAsDataURL(files[0]);
      const formData = new FormData();
      formData.append('file', files[0]);
      // 上传服务器
      fetch(this.props.accept, {
        method: 'POST',
        body: formData
      }).then(response => response.json()).then(res => framework.file.uploadCallback(res, (errCode, errMsg, resultData) => {
        this.props.onSuccess(resultData)
      }))
      //   .catch(error => console.error('Error:', error))
      //   .then(response => console.log('Success:', response));

    }
    if (el) {
      el.value = '';
    }

  };

  render() {
    const {text, loading} = this.props;
    return (
      <label>
        <Button
          className={styles.button}
          type='primary'
          onClick={this.takePhoto}
        >
          {text}{loading ? <Icon type='loading' className={styles.icon}/> : ''}
        </Button>
        <input
          ref={node => this.input = node}
          type='file'
          style={{display: 'none'}}
          accept='image/*'
          capture='camera'
          onChange={this.fileChange}/>
      </label>
    );
  }
}

ImagePicker.propTypes = {
  onError: PropTypes.func,
  onLoaded: PropTypes.func,
  onStart: PropTypes.func,
  onStop: PropTypes.func,
  onSuccess: PropTypes.func,
};

// const mapStateToProps = ({imagePicker}) => {
//   return {
//     loading: imagePicker.loading,
//     text: imagePicker.text,
//   }
// };
//
// const mapDispatchToProps = dispatch => {
//   return {
//     onStart: () => dispatch(startUpload()),
//     onStop: () => dispatch(stopUpload())
//   }
// };

// export default connect(mapStateToProps, mapDispatchToProps)(ImagePicker);
export default ImagePicker;