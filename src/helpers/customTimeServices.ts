import moment from 'moment/moment';

class CustomTimeService {
  timeSince = (date: string) => {
    let result = 0;
    try {
      let seconds = moment(new Date()).diff(moment(date), 'seconds');
      let interval = seconds / 31536000;
      if (interval > 1) {
        return Math.floor(interval) + ' năm trước';
      }
      interval = seconds / 2592000;
      if (interval > 1) {
        return Math.floor(interval) + ' tháng trước';
      }
      interval = seconds / 86400;
      if (interval > 1) {
        return Math.floor(interval) + ' ngày trước';
      }
      interval = seconds / 3600;
      if (interval > 1) {
        return Math.floor(interval) + ' giờ trước';
      }
      interval = seconds / 60;
      if (interval > 1) {
        return Math.floor(interval) + ' phút trước';
      }
    } catch (e) {
      result = 0;
    }
    return Math.floor(result) + ' giây trước';
  };

  getTimeDay = () => {
    const hours = new Date().getHours();
    if (hours >= 0 && hours < 10) {
      return 'buổi sáng';
    } else if (hours >= 10 && hours < 13) {
      return 'buổi trưa';
    } else if (hours >= 13 && hours <= 17) {
      return 'buổi chiều';
    } else {
      return 'buổi tối';
    }
  };
}
export const customTimeService = new CustomTimeService();
