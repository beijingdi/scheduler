import React from "react";
import "./DayListItem.js";

export default function DayList(props) {
  let {days} = props;
  const dayList = days.map((day) => {
    return (
      <li
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.selected}
        setDay={day.setDay}
      />
    );
  });
  return (
    <ul>
      {dayList}
    </ul>
  );
};

