import { wkrequest } from '../lib/wkrequest';

// 查询用户管理列表
export function queryUserManagement(params) {
    return wkrequest('systemUserService/findUser', params);
}

export function intervieweeInfoCheck(params) {
  return wkrequest('visitorService/intervieweeInfoCheck', params);
}

export function addReservationVisitorInfo(params) {
  return wkrequest('visitorService/addReservationVisitorInfo', params);
}