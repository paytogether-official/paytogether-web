import classNames from "classnames";
import { Toast, ToastContainer } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import { useCommon } from "store/useCommon";
import "./ToastLayer.scss";

export interface ToastData {
  type?: "success" | "error" | "info" | "warning";
  show?: boolean;
  text: string;
  delay?: number;
}

export const ToastLayer = () => {
  const { toastList, closeToast } = useCommon();

  const onClose = (index: number) => {
    closeToast(index);
  };

  return (
    <div>
      <ToastContainer position="top-center" className="toast-layer p-3">
        {toastList.map((toast, i) => (
          <Toast
            show={toast.show ?? true}
            key={i}
            autohide
            delay={toast.delay ?? 1000}
            onClose={() => onClose(i)}
          >
            <Toast.Body>
              <div className="flex items-center justify-center">
                <FaCheckCircle
                  className={classNames("text-[18px]  inline-block mr-2", {
                    "text-[#0BBD4A]": !toast.type || toast.type === "success",
                    "text-[#E6533E]": toast.type === "error"
                  })}
                />
                {toast.text}
              </div>
            </Toast.Body>
          </Toast>
        ))}
      </ToastContainer>
    </div>
  );
};
