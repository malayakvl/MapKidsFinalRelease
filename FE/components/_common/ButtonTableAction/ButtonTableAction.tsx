import React, { memo } from "react";

interface Props {
  className?: string;
  disabled?: boolean;
  dataId?: string;
  locale?: string;
  localeKey?: string;
  onClick?: (event: React.SyntheticEvent) => void;
}

// eslint-disable-next-line react/display-name
const ButtonGridAction: React.FC<Props> = memo(
  ({
    className = "",
    disabled = false,
    dataId,
    locale,
    localeKey,
    onClick,
  }) => {
    // const t = useTranslations();
    return (
      <div className="inline-block cursor-pointer">
        <input
          disabled={disabled}
          data-id={dataId}
          className={`float-left button_table_action ${className}`}
          onClick={onClick}
          type="button"
          value={locale || (localeKey && localeKey)}
        />
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <span
          onClick={onClick}
          data-id={dataId}
          className={`float-right ${className}-text`}
        >
          {localeKey}
        </span>
      </div>
    );
  }
);

export default ButtonGridAction;
