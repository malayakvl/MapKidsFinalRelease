import React from "react";
import { useSelector } from "react-redux";
import { colorDataSelector } from "../../../redux/customerData/selectors";

const ArrowUp: React.FC = () => {
  const colorDataPalette = useSelector(colorDataSelector);

  return (
    <div className="arrow-up">
      <svg
        width="16"
        height="41"
        viewBox="0 0 16 41"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932
                        6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159
                        1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159
                        14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711
                        6.65685L8.70711 0.292893ZM9 41V1H7V41H9Z"
          fill={`${colorDataPalette.weaknesses2strengths_color}`}
        />
      </svg>
    </div>
  );
};

export default ArrowUp;
