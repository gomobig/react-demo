import React, {PureComponent} from 'react';
import {Button, List, InputItem, Picker} from 'antd-mobile';
import {createForm} from 'rc-form';
import dayjs from 'dayjs'
import _ from 'lodash';
import {saveVisitorInfo} from '../../reducer';
import {intervieweeInfoCheck, addReservationVisitorInfo} from '../../services/wkapi'
import connect from 'react-redux/es/connect/connect';
import Header from '../../components/Header/Header';
import styles from './Form.module.less'


class Form extends PureComponent {
  constructor() {
    super();
    this.state = {
      startTime: '请选择',
      endTime: '请选择',
      startTimeError: 'none',
      endTimeError: 'none',
      now: this.calcInitValue(),
      showStartError: false,
      showEndError: false,
    }
  }

  componentDidMount() {
    this.calcVisitorTime();
  }

  calcInitValue = () => {
    const now = dayjs();
    let min = parseInt(now.format('mm'), 10);
    min = (2 - min % 2) + min;
    return [now.format('YYYY'), now.format('MM'), now.format('DD'), now.format('HH'), min.toString().padStart(2, '0')];
  };

  calcVisitorTime = () => {
    let days = [];
    let now = dayjs();
    // 日期 最近10天
    let dates = [];
    for (let i = 0; i < 10; i++) {
      dates.push(now.add(i, 'day'));
    }
    // 小时
    let hours = [];
    for (let i = 8; i < 19; i++) {
      hours.push(i.toString().padStart(2, '0'))
    }
    // 分钟
    let minutes = [];
    for (let i = 0; i < 60; i += 2) {
      minutes.push(i.toString().padStart(2, '0'));
    }
    const yyyys = [];
    const mms = [];
    const dds = [];
    dates.forEach(date => {
      let yyyy = date.format('YYYY');
      let mm = date.format('MM');
      let dd = date.format('DD');
      let yLabel = {label: yyyy, value: yyyy};
      let mLabel = {label: mm, value: mm};
      let dLabel = {label: dd, value: dd};
      if (_.findIndex(yyyys, yLabel) === -1) {
        yyyys.push(yLabel)
      }
      if (_.findIndex(mms, mLabel) === -1) {
        mms.push(mLabel);
      }
      dds.push(dLabel);
    });
    days.push(yyyys);
    days.push(mms);
    days.push(dds);
    // days.push(dates.map(day => ({label:day.format('YYYY') ,value: day.format('YYYY'),})));
    // days.push(dates.map(day => ({label:day.format('MM') ,value: day.format('MM'),})));
    // days.push(dates.map(day => ({label:day.format('DD') ,value: day.format('DD'),})));
    days.push(hours.map(hour => ({label: hour, value: hour,})));
    days.push(minutes.map(minute => ({label: minute, value: minute,})));
    return days;
  };

  checkInterviewee = (rule, value, callback) => {
    if (!value) {
      callback('被访人姓名不能为空');
    }
    intervieweeInfoCheck([value]).then(res => {
      const {result, errorMsg} = res;
      if (result !== 'true') {
        callback(errorMsg)
      } else {
        callback()
      }
    })
  };

  submit = () => {
    const timeError = this.changeTimeErrorStatus();
    console.log(this.props.form)
    this.props.form.validateFields((error, value) => {
      console.log('nothing-', value);
      // 错误
      if (error || timeError) {
        return
      }
      const {name, phone, interviewee} = value;
      addReservationVisitorInfo([
        {
          visitorName: name,
          mobileNo: parseInt(phone.trim()),
          imageToken: this.props.imageToken,
        },
        {
          startTime: dayjs(this.state.startTime).valueOf(),
          endTime: dayjs(this.state.endTime).valueOf(),
          intervieweeName: interviewee,
        }]).then(res => {
        // 预约成功跳转至结果页面
        console.log('预约成功', res);
        this.props.history.push('result');
      });
      // 正确信息 提交后台
      console.log('nothing')
    });

  };

  onChange = (type, val) => {
    let {showStartError, showEndError} = this.state;
    if (type === 'startTime') {
      showStartError = false;
    } else {
      showEndError = false;
    }
    this.setState({
      [type]: `${val[0]}-${val[1]}-${val[2]} ${val[3]}:${val[4]}`,
      showStartError,
      showEndError,
    });
  };

  changeTimeErrorStatus = () => {
    const showStartError = this.state.startTime === '请选择';
    const showEndError = this.state.endTime === '请选择';
    this.setState({
      showStartError,
      showEndError,
    });
    return showStartError || showEndError;
  };

  render() {
    const {getFieldProps, getFieldError} = this.props.form;
    const nameStyle = getFieldError('name') ? 'errorItem' : 'errorItemHidden';
    const phoneStyle = getFieldError('phone') ? 'errorItem' : 'errorItemHidden';
    const intervieweeStyle = getFieldError('interviewee') ? 'errorItem' : 'errorItemHidden';
    const startErrorStyle = this.state.showStartError ? 'errorItem' : 'errorItemHidden';
    const endErrorStyle = this.state.showEndError ? 'errorItem' : 'errorItemHidden';
    const startStyle = this.state.startTime === '请选择' ? 'pickerExtra' : 'pickerExtraSelected';
    const endStyle = this.state.endTime === '请选择' ? 'pickerExtra' : 'pickerExtraSelected';
    return (
      <div className={styles.container}>
        <Header style={{borderBottom: 0}}/>
        <List>
          <InputItem
            {...getFieldProps('name', {
              rules: [{required: true, message: '姓名不能为空'}]
            })}
            placeholder='请输入您的姓名'
          >姓名</InputItem>
          <List.Item className={styles[nameStyle]}>
            <span className={styles.errorSpan}>{getFieldError('name')}</span>
          </List.Item>
          <InputItem
            {...getFieldProps('phone', {
              rules: [
                {required: true, message: '手机号不能为空'},
                {pattern: new RegExp(/^1[0-9]{2} [0-9]{4} [0-9]{4}$/), message: '请输入11位手机号'}]
            })}
            placeholder='请输入您的手机'
            type='phone'
          >手机</InputItem>
          <List.Item className={styles[phoneStyle]}>
            <span className={styles.errorSpan}>{getFieldError('phone')}</span>
          </List.Item>
          <InputItem
            {...getFieldProps('interviewee', {
              rules: [
                {validator: this.checkInterviewee},
              ],
              validateTrigger: 'onBlur'
            })}
            placeholder='请输入被访人姓名'
          >被访人</InputItem>
          <List.Item className={styles[intervieweeStyle]}>
            <span className={styles.errorSpan}>{getFieldError('interviewee')}</span>
          </List.Item>
          <Picker
            data={this.calcVisitorTime()}
            cascade={false}
            value={this.state.now}
            onOk={v => this.onChange('startTime', v)}
          >
            <List.Item arrow="horizontal">
              <span className={styles.pickerLabel}>开始时间</span>
              <span className={styles[startStyle]}>{this.state.startTime}</span>
            </List.Item>
          </Picker>
          <List.Item className={styles[startErrorStyle]}>
            <span className={styles.errorSpan}>请选择拜访时间</span>
          </List.Item>
          <Picker
            data={this.calcVisitorTime()}
            cascade={false}
            value={this.state.now}
            onOk={v => this.onChange('endTime', v)}
          >
            <List.Item arrow="horizontal">
              <span className={styles.pickerLabel}>结束时间</span>
              <span className={styles[endStyle]}>{this.state.endTime}</span>
            </List.Item>
          </Picker>
          <List.Item className={styles[endErrorStyle]}>
            <span className={styles.errorSpan}>请选择拜访时间</span>
          </List.Item>
        </List>
        <Button className={styles.button} type='primary' onClick={this.submit}>下一步</Button>
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
    saveImageToken: imageToken => dispatch(saveVisitorInfo(imageToken)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(createForm()(Form));