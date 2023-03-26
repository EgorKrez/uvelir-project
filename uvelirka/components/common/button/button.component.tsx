import { c } from '../../../utils/classname.utils';
import styles from './button.module.scss';

interface IButtonProps {
  readonly text: string;
  readonly onClick: () => void;
  readonly className?: string;
  readonly disabled?: boolean;
}

export const Button = (
  { text, onClick, className, disabled }: IButtonProps,
) => {
  return <button type="button"
                 disabled={disabled}
                 className={c(styles.button, className)}
                 onClick={onClick}>
    {text}
  </button>;
};