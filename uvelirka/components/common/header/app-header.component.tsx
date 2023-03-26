import styles from './app-header.module.scss';

interface ITab {
  readonly title: string;
  readonly link: string;
  readonly id: string;
}

export enum EAppNavbarTabs {
  MAIN = 'MAIN',
  CATALOG = 'CATALOG',
  CONTACTS = 'CONTACTS',
  ADMIN = 'ADMIN',
}

export enum EAdminNavbarTabs {
  PRODUCTS = 'PRODUCTS',
  IMAGES = 'IMAGES',
  CATALOG = 'CATALOG',
}

export const applicationTabs: ITab[] = [
  {
    id: EAppNavbarTabs.MAIN,
    title: 'Главная',
    link: '/',
  },
  {
    id: EAppNavbarTabs.CATALOG,
    title: 'Каталог',
    link: '/catalog',
  },
  {
    id: EAppNavbarTabs.CONTACTS,
    title: 'Контакты',
    link: '/contacts',
  },
  {
    id: EAppNavbarTabs.ADMIN,
    title: 'Панель управления',
    link: '/admin',
  },
];

export const adminTabs: ITab[] = [
  {
    id: EAdminNavbarTabs.PRODUCTS,
    title: 'Ювелирные изделия',
    link: '/admin',
  },
  {
    id: EAdminNavbarTabs.CATALOG,
    title: 'Каталог',
    link: '/admin/catalog',
  },
];

export const HeaderTabs = (
  { tabs, selectedTabId }: { tabs: ITab[], selectedTabId: string },
) => {
  return <div className={styles.header}>
    {tabs.map(tab =>
      <a key={tab.link}
         className={styles.header__tab}
         href={tab.link}>
        {tab.title}
        {selectedTabId === tab.id && <span className={styles.header__tab_active}></span>}
      </a>,
    )}
  </div>;
};