import React from 'react';
import DocSidebar from '@theme-original/DocSidebar';

import NavbarSearch from '@theme/Navbar/Search';
import SearchBar from '@theme/SearchBar';

import styles from './styles.module.css';

export default function DocSidebarWrapper(props) {
  return (
    <div className={styles.sidebar}>
      <NavbarSearch className={styles.navbar__search}>
        <SearchBar />
      </NavbarSearch>

      <div className={styles.menu__wrapper}>
        <DocSidebar {...props} />
      </div>
    </div>
  );
}
