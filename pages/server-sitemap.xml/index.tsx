import { GetServerSideProps } from "next";
import { getServerSideSitemap, ISitemapField } from "next-sitemap";
import { collection, getDocs } from "firebase/firestore";

import { firestore } from '../../firebase/clientApp'

export const GetPost = async () => {
  const querySnapshot = await getDocs(collection(firestore, "fl_content"));
  const data: Array<any> = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  
  return data;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const siteUrl = "http://italiameravigliosaintour.it/server-sitemap.xml";
  const data: any = await GetPost();
  const fields: ISitemapField[] = data?.map((data: any) => ({
    loc: `${siteUrl}/${data.id}`,
    lastmod: new Date().toISOString(),
  }));

  return getServerSideSitemap(ctx, fields);
};

export default function Sitemap() {}
