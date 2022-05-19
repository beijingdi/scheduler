import React from "react";
import DayListItem from "./DayListItem.js";

export default function DayList(props) {
  let {days, value, onChange} = props;
  const dayList = days.map((day) => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === value}
        setDay={onChange}
        // setDay={() => onClick(day.name)}
      />
    );
  });
  return (
    <ul>

      {dayList}
    </ul>
  );
};

