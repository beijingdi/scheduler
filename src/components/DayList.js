import React from "react";
import DayListItem from "./DayListItem.js";

export default function DayList(props) {
  let {days, day, setDay} = props;
  const dayList = days.map((eachDay) => {
    return (
      <DayListItem
        key={eachDay.id}
        name={eachDay.name}
        spots={eachDay.spots}
        selected={props.selected}
        setDay={setDay}
      />
    );
  });
  return (
    <ul>
      {dayList}
    </ul>
  );
};

