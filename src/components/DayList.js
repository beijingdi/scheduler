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
        selected={eachDay.name === day}
        setDay={setDay}
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

