import Link from "next/link";
import { IPrimaryCatalog } from "../../models/primary-catalog.model";
import background from "../../public/background.png";
import { EditIcon } from "../../svg/edit.icon";
import { rootCatalog } from "../../utils/path.utils";
import { CatalogList } from "./catalog-list/catalog-list.component";
import { EditPrimaryDialog } from "./catalog-list/edit-primary-dialog/edit-primary-dialog.component";
import EditButton from "./catalog-list/edit/edit-button.component";
import { Header } from "./header/header.component";
import styles from "./home-page-desktop.module.scss";
import { SecondaryCatalog } from "./secondary-catalog.component";

interface IHomePageDesktopComponentProps {
  primaryCatalogs: IPrimaryCatalog[];
}

export default function HomePageDesktopComponent({
  primaryCatalogs,
}: IHomePageDesktopComponentProps) {
  const primary = primaryCatalogs.slice(6, 12);
  const primaryAsCatalogs = primary.map((catalog) => catalog.catalog);

  return (
    <div>
      <div
        className={styles.header__container}
        style={{ backgroundImage: `url(${background.src})` }}
      >
        <Header className={styles.header} />

        <div className={styles.subheader}>
          <div className={styles.motto}>Сиюминутно, дёшево, сердито!</div>

          <Link href={rootCatalog} className={styles.catalog}>
            каталог изделий
          </Link>
        </div>
      </div>

      <div className={styles.collectionstitle}>
        <div className={styles.collectionstitle__first}>К мероприятиям</div>
      </div>

      <div className={styles.secondarycatalogs}>
        <div />
        {primaryCatalogs.slice(0, 6).map((catalog) => (
          <SecondaryCatalog
            key={catalog._id}
            secondaryCatalogId={catalog._id}
            catalog={catalog.catalog}
          />
        ))}
        <div />
      </div>

      <div className={styles.primarycatalogs}>
        <CatalogList
          className={styles.cataloglist}
          inCatalog={(catalog, index) => (
            <EditButton
              dialogTitle="Изменить главный каталог"
              button={<EditIcon />}
            >
              <EditPrimaryDialog
                catalog={catalog}
                primaryItemId={primary[index]._id}
              />
            </EditButton>
          )}
          catalogs={primaryAsCatalogs}
        />
      </div>

      <div style={{ height: 100 }} />
    </div>
  );
}
