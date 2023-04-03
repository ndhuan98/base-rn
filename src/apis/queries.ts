import axiosIns from 'src/helpers/axiosInterceptor';
import {  AuthAPI, } from './api';
import { combineUrlParams } from 'src/utils/common';

export async function getAllProvinces() {
  const response = await axiosIns.get(AuthAPI.GET_ALL_PROVINCES);

  return response?.data?.data?.result;
}

export async function getDistrictByCity(code: string) {
  const response = await axiosIns.get(AuthAPI.GET_PROVINCE_BY_CITY.replace(':code', code));

  return response?.data?.data.result;
}

export async function getUserProfile(id: string | number) {
  const response = await axiosIns.get(`${AuthAPI.USER_INFORMATION}${id}`);

  return response?.data?.data;
}


export async function getNotification() {
  const response = await axiosIns.get(AuthAPI.NOTIFICATION + '?limit=10&page=1');

  return response?.data?.data;
}

export async function getNotificationDetail(id: number) {
  try {
    await axiosIns.get(`${AuthAPI.NOTIFICATION}/${id}`);
  } catch (e) {}
}

export async function getNotificationCount() {
  const response = await axiosIns.get(AuthAPI.NOTIFICATION_UNSEEN_COUNT);

  return response?.data?.data;
}

export async function deleteNotification(id: number) {
  try {
    await axiosIns.post(`${AuthAPI.NOTIFICATION_DELETE}/${id}`);
  } catch (e) {}
}


export async function inActiveAccount(userId: number, status: string) {
  const response = await axiosIns.post(`${AuthAPI.INACTIVE_ACCOUNT}/${userId}`, { status: status });
  console.log('response', response);

  return response;
}
