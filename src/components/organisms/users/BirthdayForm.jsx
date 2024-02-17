import React, { useMemo } from "react";
import { Select } from "../../atoms/inputs/Select";
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
      <Select
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
      </Select>
    ),
    []
  );

  const selectMonthMemo = useMemo(
    () => (
      <Select
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
      </Select>
    ),
    []
  );

  const selectDayMemo = useMemo(
    () => (
      <Select name="birthday">
        <option hidden>日</option>
        {[...Array(dateState.lastDay)].map((_v, i) => {
          const day = i + 1;
          return (
            <option className="text-black" key={i}>
              {day}
            </option>
          );
        })}
      </Select>
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
