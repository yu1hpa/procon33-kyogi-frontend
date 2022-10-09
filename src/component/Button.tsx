import styles from "./Button.module.scss";

type ButtonProps = {
  text: string;
  onClick: () => void;
};

const Button = (props: ButtonProps) => {
  return (
    <div className={styles.button}>
      <button className={styles.button__element} onClick={props.onClick}>
        <div className={styles.text}>{props.text}</div>
      </button>
    </div>
  );
};

export default Button;
