import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {modalConfirmationMetaSelector, modalMarkerConfirmationMetaSelector} from "../../redux/layouts/selectors";
import { setModalConfirmationMetaAction } from "../../redux/layouts";
import { Modal } from "../_common";
import { toggleModalConfirmation } from "../../lib/functions";

const ModalMarkerConfirmation: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const inputMeta = useSelector(modalMarkerConfirmationMetaSelector);
  const [meta, setMeta] = useState<Layouts.ModalConfirmationMeta | null>(null);
  const {
    title = "",
    titleKey = "Add marker there?",
    submitButtonProps,
    onConfirm,
    onCancel,
  } = meta || ({} as any);

  useEffect(() => {
    if (inputMeta) {
      toggleModalConfirmation();
      return setMeta(inputMeta);
    }
    setTimeout(() => {
      setMeta(null);
    }, 500);
  }, [inputMeta]);

  const handleCancelBtnClick = useCallback(() => {
    dispatch(setModalConfirmationMetaAction(null));
    toggleModalConfirmation();
  }, [dispatch]);

  const handleSubmitBtnClick = useCallback(
    (event: React.SyntheticEvent) => {
      event.preventDefault();
      if (!onConfirm) return;
      setIsLoading(true);
      onConfirm()
        .then(handleCancelBtnClick)
        .finally(() => {
          setIsLoading(false);
          toggleModalConfirmation();
        });
    },
    [onConfirm, handleCancelBtnClick]
  );

  return (
    <Modal
      title={title}
      titleKey={titleKey}
      cancelButtonProps={{
        disabled: isLoading,
        className: "btn-confirmation-cancel",
        onClick: onCancel
          ? () => onCancel().then(handleCancelBtnClick)
          : handleCancelBtnClick,
      }}
      submitButtonProps={{
        isLoading,
        iconClassName: submitButtonProps?.iconClassName || "far fa-plus-alt",
        localeKey: submitButtonProps?.localeKey || "Add",
        className: submitButtonProps?.className || "btn-confirmation-add",
        onClick: handleSubmitBtnClick,
      }}
    />
  );
};

export default ModalMarkerConfirmation;
