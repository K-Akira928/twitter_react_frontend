import React, { useMemo } from "react";
import { useBirthdaySelectReducer } from "../../../hooks/users";

export const BirthdayForm = () => {
  const nowDate = new Date();

  const initialDateState = {
    selectMonth: null,
    selectYear: nowDate.getFullYear(),
    lastDay: 31,
  };

  const [dateState, dispatch] = useBirthdaySelectReducer(initialDateState);

  const YEAR_REPEAT_TIMES = 121;
  const MONTH_REPEAT_TIMES = 12;

  const yearArray = [...Array(YEAR_REPEAT_TIMES)].map((_v, decrement) => {
    return nowDate.getFullYear() - decrement;
  });

  const selectYearMemo = useMemo(
    () => (
      <select
        className="form-input-select"
        onChange={(e) =>
          dispatch({ type: "selectYear", value: e.target.value })
        }
        name="birthyear"
      >
        <option hidden>年</option>
        {yearArray.map((year, i) => {
          return (
            <option className="text-black" key={i} value={year}>
              {year}
            </option>
          );
        })}
      </select>
    ),
    []
  );

  const selectMonthMemo = useMemo(
    () => (
      <select
        className="form-input-select"
        onChange={(e) =>
          dispatch({ type: "selectMonth", value: e.target.value })
        }
        name="birthmonth"
      >
        <option hidden>月</option>
        {[...Array(MONTH_REPEAT_TIMES)].map((_v, i) => {
          const month = i + 1;
          return (
            <option className="text-black" key={i} value={month}>
              {month}
            </option>
          );
        })}
      </select>
    ),
    []
  );

  const selectDayMemo = useMemo(
    () => (
      <select className="form-input-select" name="birthday">
        <option hidden>日</option>
        {[...Array(dateState.lastDay)].map((_v, i) => {
          const day = i + 1;
          return (
            <option className="text-black" key={i}>
              {day}
            </option>
          );
        })}
      </select>
    ),
    [dateState]
  );

  return (
    <div className="w-full flex justify-between">
      <div className="w-5/12">{selectMonthMemo}</div>
      <div className="w-3/12">{selectDayMemo}</div>
      <div className="w-3/12">{selectYearMemo}</div>
    </div>
  );
};
