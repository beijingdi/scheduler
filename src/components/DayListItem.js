import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";


const formatSpots = (spot) => {
  if (spot === 0) {
    return "no spots remaining";
  }
  if (spot === 1) {
    return "1 spot remaining";
  }
  return `${spot} spots remaining`;
}

export default function DayListItem(props) {
  let dayClass = classNames("day-list__item", {
    "day-list__item--selected":props.selected,
    "day-list__item--full": (props.spots === 0)
  })

  let spotsRemaining = formatSpots(props.spots);
  return (
    <li
      className={dayClass}
      onClick={() => props.setDay(props.name)}
    >
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{spotsRemaining}</h3>
    </li>
  );
}




