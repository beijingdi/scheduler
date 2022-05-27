import React from "react";
import DayListItem from "./DayListItem.js";

export default function DayList(props) {
/*
** generate a daylist to render from the data fetched from server
*/
  let {days, value, onChange} = props;
  const dayList = days.map((day) => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === value}
        setDay={onChange}
      />
    );
  });
  return (
    <ul>
      {dayList}
    </ul>
  );
};

