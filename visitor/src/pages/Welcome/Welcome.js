import React, { Component } from 'react';
import { Button } from 'antd-mobile';
import styles from './Welcome.module.less';
import ImagePicker from '../../components/ImagePicker';


class Welcome extends Component {
  render() {
    return (
      <div className={styles.container} >
        <h2>Welcome to React</h2>
        <Button type="primary">This is a button</Button>
        <ImagePicker />
      </div>
    );
  }
}

export default Welcome;
