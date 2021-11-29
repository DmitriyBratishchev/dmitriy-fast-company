import { toNumber } from "lodash";

export const timeDifference = (time) => {
  const diffirence = (new Date().valueOf() - toNumber(time)) / 1000;
  const minutes = new Date(toNumber(time)).getMinutes();
  const hours = new Date(toNumber(time)).getHours();
  const dayOfMonth = new Date(toNumber(time)).getUTCDate();
  const monthNumber = new Date(toNumber(time)).getMonth();
  const year = new Date(toNumber(time)).getUTCFullYear();
  const monthArr = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
  const firstZero = (number) => number < 10 ? "0" + number.toString() : number.toString();
  if (diffirence < 60) return "минуту назад";
  if (diffirence < 60 * 5) return "5 минут назад";
  if (diffirence < 60 * 10) return "10 минут назад";
  if (diffirence < 60 * 30) return "30 минут назад";
  if (diffirence < 60 * 60 * 24) return `${firstZero(hours)}:${firstZero(minutes)}`;
  if (diffirence < 60 * 60 * 24 * 31) return `${dayOfMonth} ${monthArr[monthNumber]}`;
  if (diffirence) return `${dayOfMonth} ${monthArr[monthNumber]} ${year}`;
  return "в незапамятные времена";
};
