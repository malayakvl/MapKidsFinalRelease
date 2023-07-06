import React, { useEffect } from "react";

interface Props {
  style: string | null;
  icon: string | null;
  name: string;
  label: string | null;
  placeholder: string | null;
  props: any;
  rows?: number;
  tips: string | null;
  maxLength: number | 10000000;
  extValue?: string;
}

const InputTextarea: React.FC<Props> = ({
  style,
  icon,
  name,
  label,
  placeholder,
  props,
  rows,
  tips,
  maxLength,
  extValue,
}) => {
  const [charLimit, setCharLimit] = React.useState(`0 / ${maxLength}`);

  const clear = () => {
    props.setFieldValue(name, "");
  };

  useEffect(() => {
    if (maxLength && props.values[name]) {
      if (props.values[name].length >= maxLength) {
        setCharLimit("Maximum number of characters!");
      } else {
        setCharLimit(`${props.values[name].length} / ${maxLength}`);
      }
    }
  }, [props.values, maxLength, name]);

  return (
    <div className={`${style}`}>
      {label && (
        <label className="control-label" htmlFor={name}>
          {label}
        </label>
      )}
      <div className="relative">
        {icon && <i className={`f-icon ${icon}`} />}
        <textarea
          style={{ whiteSpace: "pre-wrap" }}
          className={icon ? "form-control-icon" : "form-control"}
          placeholder={placeholder ? placeholder : ""}
          onChange={props.handleChange}
          maxLength={maxLength}
          value={props.values[name] ? props.values[name] : extValue}
          name={name}
          rows={rows ? rows : 4}
        />
        <i
          role="presentation"
          className="input-close cursor-pointer"
          onClick={() => clear()}
        />
        <div>
          {tips && <em className="input-tips float-start form-tips">{tips}</em>}
          {maxLength && <em className="input-tips float-end">{charLimit}</em>}
        </div>
        <div className="clearfix"></div>
        {/*{props.errors[name] && <div className="error-el">{props.errors[name]} Element</div>}*/}
      </div>
    </div>
  );
};

export { InputTextarea };
