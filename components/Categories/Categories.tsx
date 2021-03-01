import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import styles from './Categories.module.scss';

interface Sub {
  img: string;
  name: string;
  url: string;
}

interface Category {
  _id: string;
  name: string;
  url: string;
  subs: Sub[];
}

const Categories = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .request({
        method: 'GET',
        url: '/api/categories',
      })
      .then(({ data }) => setCategories(data.items))
      .finally(() => setLoading(false));
  }, []);

  const getSubs = useCallback(
    (subs: Sub[]) => (
      <div className={styles.Subs}>
        {subs.map(({ img, name }) => (
          <div
            key={img}
            className={styles.Sub}
            onClick={() => router.push(`subcategory?name=${name}`)}
          >
            <div>
              <img src={`https://zaglushka.ru/${img}`} alt={name} />
            </div>
            <div className={styles.Title}>{name}</div>
          </div>
        ))}
      </div>
    ),
    []
  );

  const cats = useMemo(
    () =>
      categories.map(({ name, subs }) => (
        <div key={name}>
          <div className={styles.CatName}>{name}</div>
          <div>{getSubs(subs)}</div>
        </div>
      )),
    [categories, getSubs]
  );

  if (isLoading)
    return <div className={styles.Loading}>Идет загрузка ЖДИТЕ!</div>;

  return <div className={styles.Categories}>{cats}</div>;
};

export default Categories;
