import React, {PureComponent} from 'react'
import { Icon } from 'antd-mobile'
import styles from './Header.module.less'

class Header extends PureComponent {
  render() {
    return (
      <div className={styles.header}  style={{...this.props.style}}>
        <Icon type='left' size='md'/>
        <span className={styles.title}>和平双语访客系统</span>
      </div>
    )
  }
}

export default Header;