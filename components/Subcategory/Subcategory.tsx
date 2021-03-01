import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Table } from 'antd';
import axios from 'axios';

import styles from './Subcategory.module.scss';

interface Product {
  _id: string;
  cat: string;
  sub_cat: string;
  img_sub_cat: string;
  url: string;
  specifications: string;
  packaging: string;
  article: string;
  price: string;
  imgs: string[];
  priceArr: string[];
  imgsArr: string[];
}

const sum = 141.5759;

const columns = [
  {
    title: 'Артикул',
    key: 'article',
    render: ({ article, sub_cat }: Product) => (
      <a href={`/product/?article=${article}`}>{article}</a>
    ),
  },
  {
    title: '',
    key: 'imgs',
    render: ({ imgsArr, article, sub_cat }: Product) => (
      <>
        {imgsArr.map((img) => (
          <a href={`/product/?article=${article}`}>
            <img src={`https://zaglushka.ru/${img}`} />
          </a>
        ))}
      </>
    ),
  },
  {
    title: 'от 10 000',
    key: 'price1',
    render: ({ priceArr }: Product) => (
      <>{(+priceArr[0] * sum).toFixed(0)} сум</>
    ),
  },
  {
    title: 'от 5 000',
    key: 'price2',
    render: ({ priceArr }: Product) => (
      <>{(+priceArr[1] * sum).toFixed(0)} сум</>
    ),
  },
  {
    title: 'от 1 000',
    key: 'price3',
    render: ({ priceArr }: Product) => (
      <>{(+priceArr[2] * sum).toFixed(0)} сум</>
    ),
  },
  {
    title: 'от 500',
    key: 'price4',
    render: ({ priceArr }: Product) => (
      <>{(+priceArr[3] * sum).toFixed(0)} сум</>
    ),
  },
  {
    title: 'от 100',
    key: 'price5',
    render: ({ priceArr }: Product) => (
      <>{(+priceArr[4] * sum).toFixed(0)} сум</>
    ),
  },
  {
    title: 'розница',
    key: 'price6',
    render: ({ priceArr }: Product) => (
      <>{(+priceArr[5] * sum).toFixed(0)} сум</>
    ),
  },
];

const Subcategory = () => {
  const name = useRouter().query?.name;
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    name &&
      axios
        .request({
          method: 'GET',
          url: '/api/subcategory',
          params: {
            name,
          },
        })
        .then(({ data }) => setProducts(data.items))
        .finally(() => setLoading(false));
  }, [name]);

  return (
    <div className={styles.Subcategory}>
      <Table
        loading={isLoading}
        dataSource={products.map((item) => ({
          ...item,
          key: item._id,
        }))}
        columns={columns}
      />
    </div>
  );
};

export default Subcategory;
