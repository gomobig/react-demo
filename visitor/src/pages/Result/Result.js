import React, { PureComponent } from 'react';
import { Button } from 'antd-mobile';
import Header from "../../components/Header/Header";
import BookItem from "../../components/BookItem/BookItem";

class Result extends PureComponent {
  render() {
    return (
      <div>
        <Header/>
        <BookItem style={{margin: 'auto'}}/>
      </div>
    )
  }
}

export default Result;