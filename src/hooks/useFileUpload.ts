import { Platform } from 'react-native';
import { AuthAPI } from 'src/apis/api';
import axiosIns from 'src/helpers/axiosInterceptor';

export const useFileUpload = () => {
  const createFormData = (photo: any) => {
    const data = new FormData();
    data.append('file', {
      name: photo.fileName,
      type: photo.type,
      uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
    });

    return data;
  };

  const createFormFileData = (file: any) => {
    const data = new FormData();
    data.append('file', {
      name: file.name,
      type: file.type,
      uri: Platform.OS === 'ios' ? file.uri.replace('file://', '') : file.uri,
    });

    return data;
  };

  const onUploadImage = async (photo: any) => {
    const formData = createFormData(photo);
    const response = await axiosIns.post(AuthAPI.UPLOAD_IMAGE_AVATAR, formData);
    return response;
  };

  const onUploadImageMessage = async (photo: any) => {
    const formData = createFormData(photo);
    const response = await axiosIns.post(AuthAPI.UPLOAD_IMAGE_MESSAGE, formData);
    return response;
  };

  const onUploadFile = async (file: any) => {
    const formData = createFormFileData(file);
    const response = await axiosIns.post(AuthAPI.UPLOAD_FILE, formData);
    return response;
  };

  return {
    onUploadImage,
    onUploadImageMessage,
    onUploadFile,
  };
};
