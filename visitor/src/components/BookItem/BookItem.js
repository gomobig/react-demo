import React, { PureComponent } from 'react';
import styles from './BookItem.module.less';

class BookItem extends PureComponent {
  render() {
    console.log(this.props)
    return (
      <div className={styles.container} style={{...this.props.style}}>

      </div>
    );
  }
}

export default BookItem;