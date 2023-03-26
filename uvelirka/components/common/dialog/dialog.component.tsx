import { createContext, MouseEvent, PropsWithChildren, ReactElement, ReactNode, useContext } from 'react';
import { createPortal } from 'react-dom';
import { ICallback } from '../../../models/common.model';
import { CloseIcon } from '../../../svg/close.icon';
import { Button } from '../button/button.component';
import styles from './dialog.module.scss';

export interface IDialogActions {
  onClose: () => void;
  onSubmit: () => void;
  submitLabel: string;
  cancelLabel: string;
  submitDisabled?: boolean;
}

export const DialogActions = (
  { onClose, onSubmit, submitLabel, cancelLabel, submitDisabled }: IDialogActions,
) => {
  return <div className={styles.dialog__actions}>
    <Button text={submitLabel}
            disabled={submitDisabled}
            onClick={onSubmit}/>
    <Button text={cancelLabel}
            onClick={onClose}/>
  </div>;
};

interface IDialogActionsContext {
  readonly close: ICallback;
}

const stub = () => void 0;

const DialogActionsContext = createContext<IDialogActionsContext>({
  close: stub,
});

export const useDialogActions = () => useContext(DialogActionsContext);

export const Dialog = (
  {
    children,
    onClose,
    title,
  }: {
    onClose?: ICallback;
    title?: ReactNode;
  } & PropsWithChildren,
) => {
  const handleBackdropClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;

    if (target.classList.contains(styles.backdrop)) {
      onClose?.();
    }

    event.stopPropagation();
  };

  return createPortal(
    <div className={styles.backdrop}
         onClick={handleBackdropClick}>
      <div className={styles.dialog}>
        <div className={styles.dialog__header}>
          <div>
            {title}
          </div>
          <CloseIcon onClick={onClose}/>
        </div>
        <DialogActionsContext.Provider value={{ close: onClose || stub }}>
          {children}
        </DialogActionsContext.Provider>
      </div>
    </div>,
    document.body,
  );
};