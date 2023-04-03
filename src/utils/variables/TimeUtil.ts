// show time ago
import moment from 'moment';
import _ from 'lodash';

const MIN_IN_MILIS = 60 * 1000;
const HOUR_IN_MILIS = 60 * MIN_IN_MILIS;
const DAY_IN_MILIS = 24 * HOUR_IN_MILIS;
const MONTH_IN_MILIS = 30 * DAY_IN_MILIS;
const YEAR_IN_MILIS = 365 * DAY_IN_MILIS;

const SIMPLE_DATE_FORMAT = 'DD MMM YY';
const SIMPLE_TIME_24_FORMAT = 'H:mm';
const STOP_TIME_FORMAT = 'mM:ss:SS';
const DOB_FORMAT = 'DD MMM YY';
const SIMPLE_DATE_TIME_FORMAT = 'H:mm DD MMM YY';
const DATE_TIME_FORMAT = 'DD MMM YY HH:mm';
const HALF_OF_DAY = 12 * 60 * 60 * 1000;

const now = new Date();
const currentYear = now.getFullYear();

//29 May 16
function simpleDateFormat(timeInMillis) {
  let date = new Date(timeInMillis);
  return date ? moment(date).format(SIMPLE_DATE_FORMAT) : '';
}

function timeAgo(timeInMilis) {
  const date = new Date();
  const diff = date.getTime() - timeInMilis;

  if (diff >= YEAR_IN_MILIS) {
    const noOfYear = Math.round(diff / YEAR_IN_MILIS);
    return noOfYear > 1 ? `${noOfYear} years ago` : `${noOfYear} year ago`;
  }
  if (diff >= MONTH_IN_MILIS) {
    const noOfMonth = Math.round(diff / MONTH_IN_MILIS);
    return noOfMonth > 1 ? `${noOfMonth} months ago` : `${noOfMonth} month ago`;
  }
  if (diff >= DAY_IN_MILIS) {
    const noOfDay = Math.round(diff / DAY_IN_MILIS);
    return noOfDay > 1 ? `${noOfDay} days ago` : `${noOfDay} day ago`;
  }
  if (diff >= HOUR_IN_MILIS) {
    const noOfHour = Math.round(diff / HOUR_IN_MILIS);
    return noOfHour > 1 ? `${noOfHour} hours ago` : `${noOfHour} hour ago`;
  }
  if (diff >= MIN_IN_MILIS) {
    const noOfMin = Math.round(diff / MIN_IN_MILIS);
    return noOfMin > 1 ? `${noOfMin} minutes ago` : `${noOfMin} minute ago`;
  }
  return 'just now';
}

function timeToHHMMSS(timeMilis) {
  let hours = Math.floor(timeMilis / 3600);
  let minutes = Math.floor((timeMilis - hours * 3600) / 60);
  let seconds = Math.floor(timeMilis - hours * 3600 - minutes * 60);

  if (hours < 10) {
    hours = '0' + hours;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  // return hours + ':' + minutes + ':' + seconds;
  if (hours > 0) {
    return `${hours}:${minutes}:${seconds}`;
  }
  return `${minutes}:${seconds}`;
}

function timeToHHMM(timeMilis) {
  let date = new Date(timeMilis);
  return moment(date).format(SIMPLE_TIME_24_FORMAT);
}

function timeToDDDMMMYY(timeMilis) {
  let date = new Date(timeMilis);
  let a = moment();
  let b = moment(timeMilis);
  let diff = a.diff(b, 'days');
  if (diff === 0) {
    return moment(date).format('hh:mm');
  }
  if (diff === 1) {
    return 'yesterday';
  }
  return moment(date).format('ddd DD MMM YY');
}

function timeTodddDDMMMYY(timeMilis) {
  let date = new Date(timeMilis);
  return moment(date).format('ddd DD MMM YY');
}

function timeTodddDDMMM(timeMilis) {
  let date = new Date(timeMilis);
  return moment(date).format('ddd DD MMM');
}

function timeDob(timeMilis) {
  if (timeMilis == null) {
    return moment(0).format('DD MMM YY');
  }
  if (timeMilis < 0) {
    return moment(0)
      .add(100, 'year')
      .add(timeMilis, 'ms')
      .format('DD MMM YY');
  }
  return moment(timeMilis).format('DD MMM YY');
}

function dateWithFormat(date, format) {
  return moment(date).format(format);
}

function getDiffYears(firstDay, lastDay) {
  let a = moment(firstDay);
  let b = moment(lastDay);
  return a.diff(b, 'years');
}

function getDiffDays(firstDay, lastDay) {
  let a = moment(firstDay).startOf('day');
  let b = moment(lastDay).startOf('day');
  return a.diff(b, 'days');
}

function getStartOfDay(timeMilis) {
  let start = new Date(timeMilis);
  start.setHours(0, 0, 0, 0);
  return start.getTime();
}

function getEndOfDay(timeMilis) {
  let end = new Date(timeMilis);
  end.setHours(23, 59, 59, 999);
  return end.getTime();
}

function simpleDateTimeFormat(timeInMillis) {
  let date = new Date(timeInMillis);
  return date ? moment(date).format(SIMPLE_DATE_TIME_FORMAT) : '';
}

function toTimeFromMinute(minutes) {
  const formattedHours = ('0' + Math.floor(minutes / 60)).slice(-2);
  const formattedMinutes = ('0' + Math.floor(minutes % 60)).slice(-2);
  return formattedHours + ':' + formattedMinutes;
}

function getTotalMinuteFromStartOfDay(timeInMillis) {
  const date = new Date(timeInMillis);
  return getMinutesFromStartOfDay(date.getHours(), date.getMinutes());
}

function getMinutesFromStartOfDay(hourOfDay, minute) {
  return hourOfDay * 60 + minute;
}
function roundMiliToMinute(milisecconds) {
  return 60000 * Math.round(milisecconds / 60000);
}

function mediaTimeTitle() {
  return moment().format('DD MMM YY');
}

function getMiliSecondInDay() {
  let now = new Date();
  let h = now.getHours();
  let m = now.getMinutes();
  let s = now.getSeconds();
  let mi = now.getMilliseconds();
  return h * HOUR_IN_MILIS + m * MIN_IN_MILIS + s * 1000 + mi;
}

function getMiliSecondWithMounthInput(mounthNumber) {
  return MONTH_IN_MILIS * mounthNumber;
}

// danh sách lọc theo tuần
const ListTimeWeeds = [
  {
    title: 'Hôm nay',
    startTime: `${moment().format('DD/MM/YYYY')}`,
    endTime: `${moment().format('DD/MM/YYYY')}`,
  },

  {
    title: `Hôm qua`,
    startTime: `${moment()
      .subtract(1, 'days')
      .format('DD/MM/YYYY')}`,
    endTime: `${moment()
      .subtract(1, 'days')
      .format('DD/MM/YYYY')}`,
  },
  {
    title: `Tuần này`,
    startTime: `${moment()
      .clone()
      .startOf('isoWeek')
      .format('DD/MM/YYYY')}`,
    endTime: `${moment()
      .clone()
      .endOf('isoWeek')
      .format('DD/MM/YYYY')}`,
  },

  {
    title: `Tuần trước`,
    startTime: `${moment()
      .subtract(1, 'weeks')
      .clone()
      .startOf('isoWeek')
      .format('DD/MM/YYYY')}`,
    endTime: `${moment()
      .subtract(1, 'weeks')
      .clone()
      .endOf('isoWeek')
      .format('DD/MM/YYYY')}`,
  },
  {
    title: `Tuần sau`,
    startTime: `${moment()
      .add(1, 'weeks')
      .clone()
      .startOf('isoWeek')
      .format('DD/MM/YYYY')}`,
    endTime: `${moment()
      .add(1, 'weeks')
      .clone()
      .endOf('isoWeek')
      .format('DD/MM/YYYY')}`,
  },
  {
    title: `Đầu tuần đến hiện tại`,
    startTime: `${moment()
      .add(0, 'weeks')
      .clone()
      .startOf('isoWeek')
      .format('DD/MM/YYYY')}`,
    endTime: `${moment().format('DD/MM/YYYY')}`,
  },
];

// danh sách lọc theo tháng
const ListTimeMounth = [
  {
    title: 'Tháng này',
    startTime: `${moment()
      .clone()
      .startOf('month')
      .format('DD/MM/YYYY')}`,
    endTime: `${moment()
      .clone()
      .endOf('month')
      .format('DD/MM/YYYY')}`,
  },
  {
    title: 'Tháng trước',
    startTime: `${moment()
      .subtract(1, 'months')
      .clone()
      .startOf('month')
      .format('DD/MM/YYYY')}`,
    endTime: `${moment()
      .subtract(1, 'months')
      .clone()
      .endOf('month')
      .format('DD/MM/YYYY')}`,
  },
  {
    title: 'Tháng sau',
    startTime: `${moment()
      .add(1, 'months')
      .clone()
      .startOf('month')
      .format('DD/MM/YYYY')}`,
    endTime: `${moment()
      .add(1, 'months')
      .clone()
      .endOf('month')
      .format('DD/MM/YYYY')}`,
  },

  {
    title: 'Đầu tháng đến hiện tại',
    startTime: `${moment()
      .clone()
      .startOf('month')
      .format('DD/MM/YYYY')}`,
    endTime: `${moment().format('DD/MM/YYYY')}`,
  },

  {
    title: 'Tháng 1',
    startTime: `01/01/${currentYear}`,
    endTime: `31/01/${currentYear}`,
  },
  {
    title: 'Tháng 2',
    startTime: `01/02/${currentYear}`,
    endTime: `29/02/${currentYear}`,
  },
  {
    title: 'Tháng 3',
    startTime: `01/03/${currentYear}`,
    endTime: `31/03/${currentYear}`,
  },
  {
    title: 'Tháng 4',
    startTime: `01/04/${currentYear}`,
    endTime: `30/04/${currentYear}`,
  },
  {
    title: 'Tháng 5',
    startTime: `01/05/${currentYear}`,
    endTime: `31/05/${currentYear}`,
  },
  {
    title: 'Tháng 6',
    startTime: `01/06/${currentYear}`,
    endTime: `30/06/${currentYear}`,
  },
  {
    title: 'Tháng 7',
    startTime: `01/07/${currentYear}`,
    endTime: `31/07/${currentYear}`,
  },
  {
    title: 'Tháng 8',
    startTime: `01/08/${currentYear}`,
    endTime: `31/08/${currentYear}`,
  },
  {
    title: 'Tháng 9',
    startTime: `01/09/${currentYear}`,
    endTime: `30/09/${currentYear}`,
  },
  {
    title: 'Tháng 10',
    startTime: `01/10/${currentYear}`,
    endTime: `31/10/${currentYear}`,
  },
  {
    title: 'Tháng 11',
    startTime: `01/11/${currentYear}`,
    endTime: `30/11/${currentYear}`,
  },
  {
    title: 'Tháng 12',
    startTime: `01/12/${currentYear}`,
    endTime: `31/12/${currentYear}`,
  },
];

// danh sách lọc theo quý

const ListTimeQuarter = [
  {
    title: 'Quý này',
    startTime: `${moment()
      .clone()
      .startOf('quarter')
      .format('DD/MM/YYYY')}`,
    endTime: `${moment()
      .clone()
      .endOf('quarter')
      .format('DD/MM/YYYY')}`,
  },
  {
    title: 'Quý trước',
    startTime: `${moment()
      .subtract(1, 'quarter')
      .clone()
      .startOf('quarter')
      .format('DD/MM/YYYY')}`,
    endTime: `${moment()
      .subtract(1, 'quarter')
      .clone()
      .endOf('quarter')
      .format('DD/MM/YYYY')}`,
  },
  {
    title: 'Quý sau',
    startTime: `${moment()
      .add(1, 'quarter')
      .clone()
      .startOf('quarter')
      .format('DD/MM/YYYY')}`,
    endTime: `${moment()
      .add(1, 'quarter')
      .clone()
      .endOf('quarter')
      .format('DD/MM/YYYY')}`,
  },

  {
    title: 'Đầu quý đến hiện tại',
    startTime: `${moment()
      .clone()
      .startOf('quarter')
      .format('DD/MM/YYYY')}`,
    endTime: `${moment().format('DD/MM/YYYY')}`,
  },
  {
    title: 'Quý I',
    startTime: `01/01/${currentYear}`,
    endTime: `30/03/${currentYear}`,
  },
  {
    title: `Quý II`,
    startTime: `01/04/${currentYear}`,
    endTime: `30/06/${currentYear}`,
  },
  {
    title: `Quý III`,
    startTime: `01/07/${currentYear}`,
    endTime: `30/09/${currentYear}`,
  },
  {
    title: `Quý IV`,
    startTime: `01/10/${currentYear}`,
    endTime: `31/12/${currentYear}`,
  },
];

// danh sách lọc theo năm
const ListTimeYear = [
  {
    title: 'Năm này',
    startTime: `${moment()
      .clone()
      .startOf('year')
      .format('DD/MM/YYYY')}`,
    endTime: `${moment()
      .clone()
      .endOf('year')
      .format('DD/MM/YYYY')}`,
  },
  {
    title: 'Năm trước',
    startTime: `${moment()
      .subtract(1, 'year')
      .clone()
      .startOf('year')
      .format('DD/MM/YYYY')}`,
    endTime: `${moment()
      .subtract(1, 'year')
      .clone()
      .endOf('year')
      .format('DD/MM/YYYY')}`,
  },
  {
    title: 'Năm sau',
    startTime: `${moment()
      .add(1, 'year')
      .clone()
      .startOf('year')
      .format('DD/MM/YYYY')}`,
    endTime: `${moment()
      .add(1, 'year')
      .clone()
      .endOf('year')
      .format('DD/MM/YYYY')}`,
  },

  {
    title: 'Đầu năm đến hiện tại',
    startTime: `${moment()
      .clone()
      .startOf('year')
      .format('DD/MM/YYYY')}`,
    endTime: `${moment().format('DD/MM/YYYY')}`,
  },
  {
    title: `6 tháng đầu năm`,
    startTime: `01/01/${currentYear}`,
    endTime: `30/06/${currentYear}`,
  },
  {
    title: `6 tháng cuối năm`,
    startTime: `01/07/${currentYear}`,
    endTime: `31/12/${currentYear}`,
  },
];

const ListTime = [
  {
    title: 'Quý I',
    startTime: `01/01/${currentYear}`,
    endTime: `31/03/${currentYear}`,
  },
  {
    title: `Quý II`,
    startTime: `01/04/${currentYear}`,
    endTime: `30/06/${currentYear}`,
  },
  {
    title: `Quý III`,
    startTime: `01/07/${currentYear}`,
    endTime: `30/09/${currentYear}`,
  },
  {
    title: `Quý IV`,
    startTime: `01/10/${currentYear}`,
    endTime: `31/12/${currentYear}`,
  },
  {
    title: `6 tháng đầu năm`,
    startTime: `01/01/${currentYear}`,
    endTime: `30/06/${currentYear}`,
  },
  {
    title: `6 tháng cuối năm`,
    startTime: `01/07/${currentYear}`,
    endTime: `31/12/${currentYear}`,
  },
];

export {
  simpleDateTimeFormat,
  simpleDateFormat,
  timeAgo,
  timeToHHMMSS,
  timeToDDDMMMYY,
  timeDob,
  getDiffYears,
  dateWithFormat,
  getStartOfDay,
  getEndOfDay,
  timeToHHMM,
  timeTodddDDMMMYY,
  HALF_OF_DAY,
  SIMPLE_DATE_FORMAT,
  toTimeFromMinute,
  getDiffDays,
  getTotalMinuteFromStartOfDay,
  DATE_TIME_FORMAT,
  DOB_FORMAT,
  timeTodddDDMMM,
  roundMiliToMinute,
  mediaTimeTitle,
  getMiliSecondInDay,
  getMiliSecondWithMounthInput,
  ListTimeWeeds,
  ListTimeMounth,
  ListTimeYear,
  ListTimeQuarter,
  ListTime,
};
