import { useState } from 'react';
import { putRequest } from '../../../../utils/axios.utils';
import { DialogActions, useDialogActions } from '../../../common/dialog/dialog.component';

export const EditProductName = ({ productId, name: initialName }: { productId: string, name: string }) => {
  const [name, setName] = useState(initialName);

  const { close } = useDialogActions();

  const save = async () => {
    await putRequest(`/product/edit/name/${productId}/${name}`, {});

    location.reload();
  };

  return <>
    <div>Введите новое имя каталога</div>
    <input type="text"
           value={name}
           placeholder="Новое имя каталога"
           onChange={e => setName(e.target.value)}/>

    <DialogActions onClose={close}
                   onSubmit={save}
                   submitLabel="Сохранить"
                   cancelLabel="Отмена"/>
  </>;
};