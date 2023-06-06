// import { useTranslations } from "next-intl";
import React, { useState } from "react";

interface Props {
  style: string | null;
  icon: string | null;
  name: string;
  label: string | null;
  placeholder: string | null;
  props: any;
}

const TogglePassword: React.FC<Props> = ({
  style,
  icon,
  name,
  label,
  placeholder,
  props,
}) => {
  // const t = useTranslations();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`mb-4 ${style} relative`}>
      {label && <label htmlFor={name}>{label}</label>}
      <div className="relative">
        {icon && <i className={`f-icon ${icon}`} />}
        {!showPassword ? (
          <>
            {icon && <i className={`f-icon ${icon}`} />}
            <input
              placeholder={placeholder ? placeholder : ""}
              className={icon ? "form-control-icon" : "form-control"}
              type="password"
              onChange={props.handleChange}
              name={name}
              // value={inputValue || ''}
              value={props.values[name]}
            />
            {/*<EyeIcon*/}
            {/*    className="h-7 text-gray-180 absolute right-2 top-2"*/}
            {/*    onClick={() => {*/}
            {/*        setShowPassword(!showPassword);*/}
            {/*    }}*/}
            {/*/>*/}
          </>
        ) : (
          <>
            <input
              className={icon ? "form-control-icon" : "form-control"}
              type="text"
              onChange={props.handleChange}
              name={name}
              // value={inputValue || ''}
              value={props.values[name]}
            />
            {/*<EyeOffIcon*/}
            {/*    className="h-7 text-gray-180 absolute right-2 top-2"*/}
            {/*    onClick={() => {*/}
            {/*        setShowPassword(!showPassword);*/}
            {/*    }}*/}
            {/*/>*/}
          </>
        )}
      </div>
      {props.errors[name] && (
        <div className="error-el">{props.errors[name]}</div>
      )}
    </div>
  );
};

export { TogglePassword };
