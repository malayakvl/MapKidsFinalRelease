import React from "react";
import { useSelector } from "react-redux";
import { colorDataSelector } from "../../../redux/customerData/selectors";

const SwotIcon: React.FC = () => {
  const colorDataPalette = useSelector(colorDataSelector);

  return (
    <div className="swot-icon-main">
      <svg
        width="240"
        height="240"
        viewBox="0 0 240 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          width="120"
          height="120"
          fill={`${(colorDataPalette as any).strengths_color}`}
        />
        <rect
          y="120"
          width="120"
          height="120"
          fill={`${(colorDataPalette as any).weaknesses_color}`}
        />
        <rect
          x="120"
          width="120"
          height="120"
          fill={`${(colorDataPalette as any).threats_color}`}
        />
        <rect
          x="120"
          y="120"
          width="120"
          height="120"
          fill={`${(colorDataPalette as any).opportunities_color}`}
        />
        <path
          d="M69.5 49.6818C69.2576 47.5303 68.2576 45.8636 66.5 44.6818C64.7424 43.4848 62.5303 42.8864 59.8636 42.8864C57.9545 42.8864 56.303 43.1894 54.9091 43.7955C53.5152 44.3864 52.4318 45.2045 51.6591 46.25C50.9015 47.2803 50.5227 48.4545 50.5227 49.7727C50.5227 50.8788 50.7803 51.8333 51.2955 52.6364C51.8258 53.4394 52.5152 54.1136 53.3636 54.6591C54.2273 55.1894 55.1515 55.6364 56.1364 56C57.1212 56.3485 58.0682 56.6364 58.9773 56.8636L63.5227 58.0455C65.0076 58.4091 66.5303 58.9015 68.0909 59.5227C69.6515 60.1439 71.0985 60.9621 72.4318 61.9773C73.7652 62.9924 74.8409 64.25 75.6591 65.75C76.4924 67.25 76.9091 69.0455 76.9091 71.1364C76.9091 73.7727 76.2273 76.1136 74.8636 78.1591C73.5152 80.2045 71.553 81.8182 68.9773 83C66.4167 84.1818 63.3182 84.7727 59.6818 84.7727C56.197 84.7727 53.1818 84.2197 50.6364 83.1136C48.0909 82.0076 46.0985 80.4394 44.6591 78.4091C43.2197 76.3636 42.4242 73.9394 42.2727 71.1364H49.3182C49.4545 72.8182 50 74.2197 50.9545 75.3409C51.9242 76.447 53.1591 77.2727 54.6591 77.8182C56.1742 78.3485 57.8333 78.6136 59.6364 78.6136C61.6212 78.6136 63.3864 78.303 64.9318 77.6818C66.4924 77.0455 67.7197 76.1667 68.6136 75.0455C69.5076 73.9091 69.9545 72.5833 69.9545 71.0682C69.9545 69.6894 69.5606 68.5606 68.7727 67.6818C68 66.803 66.947 66.0758 65.6136 65.5C64.2955 64.9242 62.803 64.4167 61.1364 63.9773L55.6364 62.4773C51.9091 61.4621 48.9545 59.9697 46.7727 58C44.6061 56.0303 43.5227 53.4242 43.5227 50.1818C43.5227 47.5 44.25 45.1591 45.7045 43.1591C47.1591 41.1591 49.1288 39.6061 51.6136 38.5C54.0985 37.3788 56.9015 36.8182 60.0227 36.8182C63.1742 36.8182 65.9545 37.3712 68.3636 38.4773C70.7879 39.5833 72.697 41.1061 74.0909 43.0455C75.4849 44.9697 76.2121 47.1818 76.2727 49.6818H69.5Z"
          fill="white"
        />
        <path
          d="M43.2273 204L30.3182 157.455H37.7045L46.7727 193.5H47.2045L56.6364 157.455H63.9545L73.3864 193.523H73.8182L82.8636 157.455H90.2727L77.3409 204H70.2727L60.4773 169.136H60.1136L50.3182 204H43.2273Z"
          fill="white"
        />
        <path
          d="M161.818 43.5V37.4545H197.841V43.5H183.318V84H176.318V43.5H161.818Z"
          fill="white"
        />
        <path
          d="M200.545 180.727C200.545 185.697 199.636 189.97 197.818 193.545C196 197.106 193.508 199.848 190.341 201.773C187.189 203.682 183.606 204.636 179.591 204.636C175.561 204.636 171.962 203.682 168.795 201.773C165.644 199.848 163.159 197.098 161.341 193.523C159.523 189.947 158.614 185.682 158.614 180.727C158.614 175.758 159.523 171.492 161.341 167.932C163.159 164.356 165.644 161.614 168.795 159.705C171.962 157.78 175.561 156.818 179.591 156.818C183.606 156.818 187.189 157.78 190.341 159.705C193.508 161.614 196 164.356 197.818 167.932C199.636 171.492 200.545 175.758 200.545 180.727ZM193.591 180.727C193.591 176.939 192.977 173.75 191.75 171.159C190.538 168.553 188.871 166.583 186.75 165.25C184.644 163.902 182.258 163.227 179.591 163.227C176.909 163.227 174.515 163.902 172.409 165.25C170.303 166.583 168.636 168.553 167.409 171.159C166.197 173.75 165.591 176.939 165.591 180.727C165.591 184.515 166.197 187.712 167.409 190.318C168.636 192.909 170.303 194.879 172.409 196.227C174.515 197.561 176.909 198.227 179.591 198.227C182.258 198.227 184.644 197.561 186.75 196.227C188.871 194.879 190.538 192.909 191.75 190.318C192.977 187.712 193.591 184.515 193.591 180.727Z"
          fill="white"
        />
      </svg>
    </div>
  );
};

export default SwotIcon;
