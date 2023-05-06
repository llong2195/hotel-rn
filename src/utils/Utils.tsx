import {Platform} from 'react-native';
import {request} from 'react-native-permissions';

export async function checkPermission(typeAndroid: any, typeIos: any) {
  // console.log("checkPermission -> typeIos", typeIos)
  const permissions = Platform.select({
    android: typeAndroid,
    ios: typeIos,
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = await request(permissions);
  // console.log("checkPermission -> result", result)
  return result;
}
export const convertGoogleMapAddr = (str: string) => {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
  str = str.replace(/Đ/g, 'D');
  str = str.toLowerCase();
  str = str.replace(/\s/g, '');
  return str;
};

export const converTimeStamp = (timeStamp?: number) => {
  // convert unix timestamp to milliseconds
  let ts_ms = timeStamp ? timeStamp * 1000 : new Date().getTime();

  // initialize new Date object
  let date_ob = new Date(ts_ms);

  // year as 4 digits (YYYY)
  let year = date_ob.getFullYear();

  // month as 2 digits (MM)
  let month = ('0' + (date_ob.getMonth() + 1)).slice(-2);

  // date as 2 digits (DD)
  let date = ('0' + date_ob.getDate()).slice(-2);
  let fullDateTime = date + '/' + month + '/' + year;

  return fullDateTime;
};

export const convertFullTimeStamp = (timeStamp: number) => {
  // convert unix timestamp to milliseconds
  const ts_ms = timeStamp * 1000;

  // initialize new Date object
  const date_ob = new Date(ts_ms);

  // year as 4 digits (YYYY)
  const year = date_ob.getFullYear();

  // month as 2 digits (MM)
  const month = ('0' + (date_ob.getMonth() + 1)).slice(-2);

  // date as 2 digits (DD)
  const date = ('0' + date_ob.getDate()).slice(-2);
  const hour = ('0' + date_ob.getHours()).slice(-2);
  const minutes = ('0' + date_ob.getMinutes()).slice(-2);

  return hour + ':' + minutes + ' ' + date + '/' + month + '/' + year;
};

export const convertTimeStampHour = (timeStamp: number) => {
  // convert unix timestamp to milliseconds
  let ts_ms = timeStamp * 1000;

  // initialize new Date object
  let date_ob = new Date(ts_ms);

  // year as 4 digits (YYYY)
  let hour = ('0' + date_ob.getHours()).slice(-2);
  let minutes = ('0' + date_ob.getMinutes()).slice(-2);

  return hour + ': ' + minutes;
};

export const getDataFormat = (id: number, typeData: any) => {
  let str = '';
  typeData.forEach((item: any) => {
    if (item.id === id) {
      str = item.name;
    }
  });

  return str;
};

export const convertDateToTimeStamp = (date: string) => {
  // for mat DD / MM / YYYY
  let dateFormat = date.split('/');
  let newDate = new Date(
    parseInt(dateFormat[2]),
    parseInt(dateFormat[1]) - 1,
    parseInt(dateFormat[0]),
  );
  let dateTimeStamp = Math.floor(newDate.getTime() / 1000);

  return dateTimeStamp;
};

export const formatSeverDate = (date: string) => {
  let dArr = date.split('-'); // ex input "2010-01-18"
  return dArr[2] + '/' + dArr[1] + '/' + dArr[0]; //ex out: "18/01/2010"
};

export const normalizePhonenumber = (number: string) => {
  number = number.replace(/[^\d+]+/g, '');
  number = number.replace(/^00/, '+');
  number = number.replace(/^0/, '');
  if (number.match(/^84/)) number = '+' + number;
  if (!number.match(/^\+/)) number = '+84' + number;
  return number;
};

export const getTimeFormat = (day: Date) => {
  const year = day.getFullYear();

  // month as 2 digits (MM)
  const month = ('0' + (day.getMonth() + 1)).slice(-2);

  // date as 2 digits (DD)
  const date = ('0' + day.getDate()).slice(-2);
  return year + '-' + month + '-' + date;
};

export const getDaysBetweenTwoDay = (start: string, end: string) => {
  if (start && !end) {
    return [getTimeFormat(new Date(start))];
  }
  if (!start && end) {
    return [getTimeFormat(new Date(end))];
  }
  let currentDay: any = start;
  const array = [getTimeFormat(new Date(currentDay))];
  const oneDay = 1000 * 60 * 60 * 24;
  const days = Math.round(
    (new Date(end).getTime() - new Date(start).getTime()) / oneDay,
  );
  while (array.length <= days) {
    const nextDay = new Date(currentDay);
    nextDay.setDate(nextDay.getDate() + 1);
    array.push(getTimeFormat(nextDay));
    currentDay = nextDay;
  }
  return array;
};

export const getColorForPercentage = function (pct: number) {
  const percentColors = [
    {pct: 0.0, color: {r: 0xff, g: 0x00, b: 0}},
    {pct: 0.5, color: {r: 0xff, g: 0x00, b: 0xff}},
    {pct: 1.0, color: {r: 0x00, g: 0x00, b: 0xff}},
  ];
  let i = 1;
  for (i = 1; i < percentColors.length - 1; i++) {
    if (pct < percentColors[i].pct) {
      break;
    }
  }
  let lower = percentColors[i - 1];
  let upper = percentColors[i];
  let range = upper.pct - lower.pct;
  let rangePct = (pct - lower.pct) / range;
  let pctLower = 1 - rangePct;
  let pctUpper = rangePct;
  let color = {
    r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
    g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
    b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper),
  };
  return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
  // or output as hex if preferred
};

export const getTimeStrFromTime = (timeInSeconds: number) => {
  const days = Math.floor(timeInSeconds / (24 * 3600));
  const remainintSeconds = timeInSeconds - days * 24 * 3600;
  const hours = Math.floor(remainintSeconds / 3600);
  const minutes = Math.floor((remainintSeconds - hours * 3600) / 60);
  let timeStr = ':hours giờ :mins phút';
  if (days > 0) {
    timeStr = ':days ngày :hours giờ :mins phút';
  }

  return {
    time: days > 30,
    string: timeStr
      .replace(':days', '' + days)
      .replace(':hours', '' + hours)
      .replace(':mins', '' + minutes),
  };
};

export const getStringLimitC = (string?: string | null, limit?: number) => {
  if (!string) {
    return '';
  }
  return string?.length > (limit || 0)
    ? `${string.slice(0, limit)}...`
    : string;
};

export const removeVietnameseTones = (str: string) => {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
  str = str.replace(/Đ/g, 'D');
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g, ' ');
  str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    ' ',
  );
  return str;
};

export const generateVerifierCode = () => {
  //   code-verifier = 43*128unreserved
  //  unreserved = ALPHA / DIGIT / "-" / "." / "_" / "~"
  //  ALPHA = %x41-5A / %x61-7A
  //  DIGIT = %x30-39
  //var s = 'abcdefghijklmnopqrstvuwxyz.ABCDEFGHIJKLMNOPQRSTVUWXYZ-_~0123456789';
  let s = 'abcdefghijklmnopqrstvuwxyzABCDEFGHIJKLMNOPQRSTVUWXYZ123456789';
  let l = s.length;
  let ret = '';
  let MAX_CODE_LENGTH = 43;
  for (let i = 0; i < MAX_CODE_LENGTH; i++)
    ret += s[Math.floor(Math.random() * l)];
  // return ret;
  return 'u1ta-MQ0e7TcpHjgz33M2DcBnOQu~aMGxuiZt0QMD1C';
};

export const generateCodeChallenge = async () => {
  // const test = await asyncPkceChallenge();
  // const codeVerifierBuffer = generateVerifierCode()
  // // var crypto = require('crypto');
  // // var SHA256 = require("react-native-crypto-js").SHA256;
  // // console.log(SHA256, CryptoJS.AES.encrypt("fsdffs", "fsfsd"))
  // let value = codeVerifierBuffer
  // value = base64.encode(value)
  // // .replace(/\+/g, '-')
  // // .replace(/\//g, '_')
  // // .replace(/=/g, '');
  // console.log(codeVerifierBuffer, value, test)
  // return test;
};

export const telephoneCheckAndGet = (str: string): string | null => {
  const phone = str.replace(/[^0-9]/g, '');

  const isPhone = /^($|(084|84|))(0?[3|5|7|8|9])([0-9]{8})\b/g.test(phone);

  const isHomePhone = /^($|(084|84|))(0?2)([0-9]{9})\b/g.test(phone);

  if (isPhone || isHomePhone) {
    return toStandard(phone);
  }

  return null;
};

export const toStandard = (phone: string): string => {
  if ((phone.length === 10 || phone.length === 11) && phone[0] === '0') {
    return `84${phone}`.replace(/840/g, '84');
  } else {
    let p = phone;
    if (p[0] === '0') {
      p = p.replace(/084/g, '84');
    }

    if (p[2] === '0') {
      p = p.replace(/840/g, '84');
    }

    return p;
  }
};
