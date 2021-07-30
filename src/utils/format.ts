/**
 * 格式化时间，间隔符为.
 * @param {Number} date 大小，单位时间戳13位
 * @param {String} middle 日期中间的符号
 * @param {Boolean} showZero 是否显示日期前面的0
 * @param {Boolean} showTime 是否显示后面时间
 * @return {String} 格式化后的大小
 */
export const formatDate = (
  date: number,
  middle = '-',
  showZero?: boolean,
  showTime?: boolean
): string => {
  console.log('format date', date);
  const da = new Date(date);
  const year: number = da.getFullYear();
  const month: number = da.getMonth() + 1;
  const day: number = da.getDate();
  const hours: number = da.getHours();
  const mins: number = da.getMinutes();
  const secs: number = da.getSeconds();
  let d = '';
  if (showZero) {
    d = `${year}${middle}${month > 9 ? month : '0' + month}${middle}${
      day > 9 ? day : '0' + day
    }`;
  } else {
    d = `${year}${middle}${month}${middle}${day}`;
  }
  if (!showTime) return d;
  return `${d} ${hours > 9 ? hours : '0' + hours}:${
    mins > 9 ? mins : '0' + mins
  }:${secs > 9 ? secs : '0' + secs}`;
};
