import { useState } from "react";
import { FiCalendar } from "react-icons/fi";
import { IoCalendarOutline, IoTimeOutline } from "react-icons/io5";

export const useDashboardTimeHook = () => {
  const [now, setNow] = useState(() => new Date());
  const DAY_MS = 24 * 60 * 60 * 1000;

  const getTimeData = (now) => {
    const year = now.getFullYear();
    const month = now.getMonth();
    const date = now.getDate();

    // Month calculations
    const monthStart = new Date(year, month, 1);
    const nextMonthStart = new Date(year, month + 1, 1);

    const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
    const currentDay = date;

    const daysPassedInMonth = currentDay;
    const daysRemainingInMonth = totalDaysInMonth - currentDay;

    const monthElapsed =
      ((now.getTime() - monthStart.getTime()) /
        (nextMonthStart.getTime() - monthStart.getTime())) *
      100;

    const monthRemaining = 100 - monthElapsed;

    // Year calculations
    const yearStart = new Date(year, 0, 1);
    const nextYearStart = new Date(year + 1, 0, 1);

    const totalDaysInYear = Math.round(
      (nextYearStart.getTime() - yearStart.getTime()) / DAY_MS,
    );

    const dayOfYear =
      Math.floor((now.getTime() - yearStart.getTime()) / DAY_MS) + 1;

    const daysRemainingInYear = Math.max(0, totalDaysInYear - dayOfYear);

    const yearElapsed =
      ((now.getTime() - yearStart.getTime()) /
        (nextYearStart.getTime() - yearStart.getTime())) *
      100;

    const yearRemaining = 100 - yearElapsed;

    const dayStart = new Date(year, month, date);
    const nextDayStart = new Date(year, month, date + 1);

    const totalHoursInDay =
      (nextDayStart.getTime() - dayStart.getTime()) / 3600000;

    const elapsedMilliseconds = now.getTime() - dayStart.getTime();

    const remainingMilliseconds = Math.max(
      0,
      nextDayStart.getTime() - now.getTime(),
    );

    const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);

    const remainingSeconds = Math.floor(remainingMilliseconds / 1000);

    const elapsedHours = elapsedMilliseconds / 3600000;

    const remainingHours = remainingMilliseconds / 3600000;

    const dayElapsed =
      (elapsedMilliseconds / (nextDayStart.getTime() - dayStart.getTime())) *
      100;

    const dayRemaining = 100 - dayElapsed;

    const formatDuration = (totalSeconds) => {
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      return {
        hours,
        minutes,
        seconds,
        text: `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
          2,
          "0",
        )}:${String(seconds).padStart(2, "0")}`,
      };
    };

    return {
      month: {
        total: totalDaysInMonth,
        elapsed: daysPassedInMonth,
        remaining: daysRemainingInMonth,
        progress: monthElapsed,
        remainingProgress: monthRemaining,
      },

      year: {
        total: totalDaysInYear,
        elapsed: dayOfYear,
        remaining: daysRemainingInYear,
        progress: yearElapsed,
        remainingProgress: yearRemaining,
      },

      day: {
        total: totalHoursInDay,
        elapsed: elapsedHours,
        remaining: remainingHours,
        progress: dayElapsed,
        remainingProgress: dayRemaining,
        elapsedDuration: formatDuration(elapsedSeconds),
        remainingDuration: formatDuration(remainingSeconds),
      },
    };
  };

  const timeData = getTimeData(now);

  const countdowns = [
    {
      title: "MONTH END",
      value: timeData.month.remaining,
      total: timeData.month.total,
      elapsed: timeData.month.elapsed,
      remaining: timeData.month.remaining,
      unit: "days remaining",
      icon: FiCalendar,
      progress: timeData.month.progress,
      remainingProgress: timeData.month.remainingProgress,
      detail: `${timeData.month.elapsed} of ${timeData.month.total} days passed`,
      remainingDetail: `${timeData.month.remaining} days left`,
    },
    {
      title: "YEAR END",
      value: timeData.year.remaining,
      total: timeData.year.total,
      elapsed: timeData.year.elapsed,
      remaining: timeData.year.remaining,
      unit: "days remaining",
      icon: IoCalendarOutline,
      progress: timeData.year.progress,
      remainingProgress: timeData.year.remainingProgress,
      detail: `${timeData.year.elapsed} of ${timeData.year.total} days passed`,
      remainingDetail: `${timeData.year.remaining} days left`,
    },
    {
      title: "DAY END",
      value: timeData.day.remainingDuration.hours,
      total: 24,
      elapsed: timeData.day.elapsed,
      remaining: timeData.day.remaining,
      unit: "hours remaining",
      icon: IoTimeOutline,
      progress: timeData.day.progress,
      remainingProgress: timeData.day.remainingProgress,
      detail: `${timeData.day.elapsedDuration.text} elapsed`,
      remainingDetail: `${timeData.day.remainingDuration.text} left`,
    },
  ];


  return { countdowns, setNow, DAY_MS , now,timeData};
};
