import { ReactNode } from "react";
import { AiFillPlusCircle } from "react-icons/ai";

import styles from "./SuccessCard.module.scss";

type Props = {
  children: ReactNode;
};
const SuccessCard = ({ children }: Props) => {
  return (
    <div className={styles.success}>
      <div>
        <AiFillPlusCircle className={styles.icon} />
        <span>{children}</span>
      </div>
    </div>
  );
};

export default SuccessCard;
