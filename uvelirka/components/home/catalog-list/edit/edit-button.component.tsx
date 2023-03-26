import { MouseEvent, PropsWithChildren, ReactNode, useState } from 'react';
import { IPropsWithClassname } from '../../../../models/common.model';
import { c } from '../../../../utils/classname.utils';
import { Dialog } from '../../../common/dialog/dialog.component';
import styles from './edit-button.module.scss';

interface IEditButtonProps extends IPropsWithClassname, PropsWithChildren {
  readonly dialogTitle: ReactNode;
  readonly button: ReactNode;
}

export default function EditButton({ dialogTitle, className, children, button }: IEditButtonProps) {
  const [open, setOpen] = useState(false);

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setOpen(!open);
  };

  const close = () => {
    setOpen(false);
  };

  return <>
    <div onClick={handleClick}
         className={c(styles.editbutton, className)}>
      {button}
    </div>
    {open &&
      <Dialog title={dialogTitle}
              onClose={close}>
        {children}
      </Dialog>
    }
  </>;
}