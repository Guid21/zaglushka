import React, { ReactNode } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import styles from './index.module.scss';

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({
  children,
  title = 'Интернет магазин заглушек в Узбекистане',
}: Props) => {
  const router = useRouter();

  return (
    <div className={styles.Layout}>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <nav>
          <div className={styles.Header}>
            <div style={{ cursor: 'pointer' }} onClick={() => router.push('/')}>
              <img
                src="logo.svg"
                alt="Интернет магазин заглушек в Узбекистане"
              />
            </div>
            <div style={{ display: 'flex' }}>
              <div></div>
              <div
                style={{
                  fontSize: '19px',
                  fontWeight: 600,
                  color: '#000',
                  textDecoration: 'none',
                }}
              >
                8 (499) 322 01 99
              </div>
            </div>
          </div>
        </nav>
      </header>
      {children}
      <footer>
        <hr />
        <span>I'm here to stay (Footer)</span>
      </footer>
    </div>
  );
};
export default Layout;
