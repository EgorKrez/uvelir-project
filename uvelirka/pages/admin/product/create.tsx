import Head from 'next/head';
import ProductCreate from '../../../components/admin/product/product-create/product-create';
import {
  adminTabs,
  applicationTabs,
  EAdminNavbarTabs,
  EAppNavbarTabs,
  HeaderTabs,
} from '../../../components/common/header/app-header.component';

export default function Create() {
  return (
    <>
      <Head>
        <title>Управление Продуктами</title>
        <meta name="description"
              content="Создать ювелирное изделие"/>
        <meta name="viewport"
              content="width=device-width, initial-scale=1"/>
        <link rel="icon"
              href="/favicon.ico"/>
      </Head>
      <main>
        <HeaderTabs tabs={applicationTabs} selectedTabId={EAppNavbarTabs.ADMIN} />
        <HeaderTabs tabs={adminTabs} selectedTabId={EAdminNavbarTabs.PRODUCTS} />

        <ProductCreate />
      </main>
    </>
  );
}
