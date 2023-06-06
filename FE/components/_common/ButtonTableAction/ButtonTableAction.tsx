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
      <input
        disabled={disabled}
        data-id={dataId}
        className={`button_table_action ${className}`}
        onClick={onClick}
        type="button"
        value={locale || (localeKey && localeKey)}
      />
    );
  }
);

export default ButtonGridAction;
