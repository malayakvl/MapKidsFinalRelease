import React from "react";

interface Props {
  style: string | null;
  icon: string | null;
  name: string;
  label: string | null;
  placeholder: string | null;
  props: any;
  tips: string | null;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  extValue?: string;
}

const InputText: React.FC<Props> = ({
  style,
  icon,
  name,
  label,
  placeholder,
  tips,
  props,
  disabled,
  onChange,
  extValue,
}) => {
  const clear = () => {
    if (disabled) return;
    props.setFieldValue(name, "");
  };

  const handleFocus = (e: any) => {
    e.target.select();
  };

  return (
    <div className={`${style}`}>
      {label && (
        <label className="control-label" htmlFor={name}>
          {label}
        </label>
      )}
      <div className="position-relative relative">
        {icon && <i className={`f-icon ${icon}`} />}
        <input
          className={icon ? "form-control-icon" : "form-control"}
          placeholder={placeholder || ""}
          type="text"
          onFocus={handleFocus}
          onChange={onChange ? onChange : props.handleChange}
          value={props.values[name] ? props.values[name] : extValue}
          name={name}
          disabled={disabled}
        />
        <i
          role="presentation"
          className="input-close cursor-pointer"
          onClick={clear}
        />
        {tips && <em className="input-tips">{tips}</em>}
        {props.errors[name] && (
          <div className="error-el">{props.errors[name]}</div>
        )}
      </div>
    </div>
  );
};

export { InputText };
