import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Markup } from 'interweave';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styles from './Product.module.scss';
import { Table } from 'antd';

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

const Product = () => {
  const article = useRouter().query?.article;
  const [product, setProduct] = useState<Product | undefined>();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    article &&
      axios
        .request({
          method: 'GET',
          url: '/api/product',
          params: {
            article,
          },
        })
        .then(({ data }) => setProduct(data))
        .finally(() => setLoading(false));
  }, [article]);

  if (!product && !isLoading)
    return (
      <div className={styles.NotFound}>Такого мы не продаем¯\_(ツ)_/¯ </div>
    );

  if (isLoading || !product)
    return <div className={styles.Loading}>Идет загрузка ЖДИТЕ!</div>;

  return (
    <div className={styles.Product}>
      <div className={styles.Carousel}>
        <Carousel>
          {product.imgs.map((str) => (
            <div className={styles.Img}>
              <img src={str} className={styles.Img} />
            </div>
          ))}
        </Carousel>
      </div>
      <div>
        <table>
          <tbody dangerouslySetInnerHTML={{ __html: product.specifications }} />
        </table>
        <table>
          <tbody dangerouslySetInnerHTML={{ __html: product.packaging }} />
        </table>
        <Table
          loading={isLoading}
          dataSource={[product].map((item) => ({
            ...item,
            key: item._id,
          }))}
          columns={columns}
          pagination={false}
        />
      </div>
    </div>
  );
};

export default Product;
