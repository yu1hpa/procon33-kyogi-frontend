import styles from "./Input.module.scss";

type Props = {
  type: string;
  value: string | undefined;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = (props: Props) => {
  return (
    <>
      <div className={styles.input}>
        <input
          className={styles.input__number}
          type={props.type}
          value={props.value}
          placeholder={props.placeholder}
          onChange={props.onChange}
        />
      </div>
    </>
  );
};

export default Input;
