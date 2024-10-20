import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
export default function FooterLayout({style, links, logo, copyright}) {
  return (
    <footer
      className={clsx('footer', {
        'footer--dark': style === 'dark',
      })}>
      <div className={clsx(styles.container, "container container-fluid")}>
        {(logo || copyright) && (
          <div className="footer__bottom text--left">
            {logo && <div className="margin-bottom--sm">{logo}</div>}
            {copyright}
          </div>
        )}
        <div className={styles.links}>
          {links}
        </div>
      </div>
    </footer>
  );
}
