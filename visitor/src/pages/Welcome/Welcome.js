import React, {Component} from 'react';
import styles from './Welcome.module.less';
import { connect } from 'react-redux'
import { Toast } from 'antd-mobile';
import ImagePicker from '../../components/ImagePicker/ImagePicker';
import Header from '../../components/Header/Header'
import framework from '../../lib/framework'
import defaultImg from '../../assets/default.png'
import {saveVisitorInfo, clearImageToken} from '../../reducer'

class Welcome extends Component {
  constructor() {
    super();
    this.state = {
      src: defaultImg,
      loading: false,
      text: '开始拍摄'
    }
  }
  onStart = () => {
    this.setState({
      loading: true,
      text: '检测中'
    })
  };

  onLoaded = src => {
    this.setState({
      src,
    })
  };

  onSuccess = res => {
    const { statusCode, imageToken, id, visitorName } = res;
    if (statusCode !== 'SUCCESS') {
      Toast.info('人脸检测失败', 1.2, () => {
        this.props.clearImageToken();
        this.setState({
          loading: false,
          text: '开始拍摄',
          src: defaultImg,
        });
      });
      return;
    }
    this.props.saveVisitorInfo({ imageToken, id, visitorName});
    // 根据id 判断是否有未完成的预约
    if (id) {
      this.props.history.push('form');
    }
  };

  render() {
    return (
      <div>
        <Header/>
        <div className={styles.container}>
          <div className={styles.imgContainer}>
            <img src={this.state.src} className={styles.img} alt=''/>
          </div>
          <span className={styles.requiresSpan}>拍照要求：</span>
          <span className={styles.infoSpan1}>请选择光线充足，浅色背景的环境拍照。</span>
          <span className={styles.infoSpan2}>请拍摄脸部正面照片，角度参考证件照。</span>
          <ImagePicker
            className={styles.imagePicker}
            accept={framework.file.uploadUrl('fileService', 'uploadVisitorPhoto', [null])}
            loading={this.state.loading}
            text={this.state.text}
            onStart={this.onStart}
            onLoaded={this.onLoaded}
            onSuccess={this.onSuccess}/>
        </div>
        <div className={styles.infoSpan3}><span>我们会确保对您的个人信息保密</span></div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    imageToken: state.imageToken,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    saveVisitorInfo: imageToken => dispatch(saveVisitorInfo(imageToken)),
    clearImageToken: () => dispatch(clearImageToken()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
