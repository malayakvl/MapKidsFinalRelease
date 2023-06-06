import React, { memo, useEffect } from "react";
import { useTransition, animated } from "react-spring";
import { useDispatch, useSelector } from "react-redux";
import { toastsSelector } from "../../redux/layouts/selectors";
import { deleteToastAction } from "../../redux/layouts";

const ToastClassNamesMap = {
  error: "alert-danger",
  success: "alert-success",
  info: "alert-info",
};

const Toasts: React.FC = () => {
  const toasts = useSelector(toastsSelector);
  // console.log("Toasts", toasts);
  const transitions = useTransition(toasts, (item: any) => item.id, {
    from: { transform: "translate(360px, 0)", opacity: 1 },
    enter: { transform: "translate(0px, 0)" },
    leave: { opacity: 0 },
  });

  return (
    <div
      style={{
        position: "fixed",
        top: 5,
        right: 5,
        zIndex: 2000,
        overflow: "hidden",
      }}
    >
      {transitions.map(({ item, props, key }) => (
        <animated.div key={key} style={props}>
          <Toast {...item} />
        </animated.div>
      ))}
    </div>
  );
};

// eslint-disable-next-line react/display-name
const Toast: React.FC<Layouts.Toast> = memo(({ id, type, message }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => dispatch(deleteToastAction(id)), 4000);
  }, [id, message, dispatch]);

  return (
    <div
      className={ToastClassNamesMap[type]}
      style={{ minWidth: 350, marginBottom: 10 }}
    >
      <div className="text-sm flex-grow ml-3">
        {typeof message === "object"
          ? (message.key, (message as any).options)
          : message}
      </div>
    </div>
  );
});

export default Toasts;
