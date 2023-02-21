import { getServerSideSitemapIndex, ISitemapField } from 'next-sitemap'
import { GetServerSideProps } from 'next'

const categorias = [
  '',
  'categoria/Acqua',
  'categoria/Borghi',
  'categoria/Sentieri',
  'categoria/Monumenti',
  'categoria/Natura',
  'categoria/Curiosità',
]

export const getProvincia = async () => {
  const provincias = await fetch("https://comuni-ita.herokuapp.com/api/province", {
    method: "GET",
  })
  const res = await provincias.json()
  return res
}

export const getServerSideProps: GetServerSideProps = async(ctx) => {
  const siteUrl = "http://italiameravigliosaintour.it/sitemap.xml";
  const provincias: any = await getProvincia()
  const fields: string[] = provincias?.map((data: any) => (
    `${siteUrl}/provincia/${data.regione}`
  ))
  categorias.forEach(categoria => {
    fields.push(`${siteUrl}/${categoria}`)
  })

  return getServerSideSitemapIndex(ctx, fields)
}

export default function SitemapIndex() {}
