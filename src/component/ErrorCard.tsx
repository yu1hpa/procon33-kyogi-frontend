import { ReactNode } from "react";
import { FiAlertCircle } from "react-icons/fi";

import styles from "./ErrorCard.module.scss";

type Props = {
  children: ReactNode;
};
const ErrorCard = ({ children }: Props) => {
  return (
    <div className={styles.error}>
      <div>
        <FiAlertCircle className={styles.icon} />
        <span>{children}</span>
      </div>
    </div>
  );
};

export default ErrorCard;
