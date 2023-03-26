import { useState } from 'react';
import { ICatalog } from '../../../../models/catalog.models';
import { postRequest } from '../../../../utils/axios.utils';
import { DialogActions } from '../../../common/dialog/dialog.component';
import { SelectCatalog } from '../../../catalog/select/select-catalog.component';

export function EditPrimaryDialog(
  { primaryItemId, catalog }: { primaryItemId: string, catalog: ICatalog },
) {
  const [selectedCatalogId, setSelectedCatalogId] = useState<string | null>(catalog._id || null);

  const save = async () => {
    await postRequest(`catalog/primary/${primaryItemId}/${selectedCatalogId}`, {});

    location.reload();
  };

  return <>
    <SelectCatalog selectedCatalogId={selectedCatalogId}
                   onSelectedCatalogChange={setSelectedCatalogId}
                   startFrom={catalog}/>
    <DialogActions onClose={() => void 0}
                   submitDisabled={!selectedCatalogId}
                   onSubmit={save}
                   submitLabel="Сохранить"
                   cancelLabel="Отмена"/>
  </>;
}