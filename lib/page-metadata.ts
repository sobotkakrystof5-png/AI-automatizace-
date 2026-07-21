import type { Metadata } from "next";

// Next.js openGraph merging mezi layoutem a stránkou je shallow — pokud
// stránka nastaví vlastní `openGraph`, celý objekt z layoutu se nahradí,
// ne slije po jednotlivých polích. Proto sem dáváme siteName/locale/type
// znovu explicitně, aby žádná podstránka nepřišla o tyto hodnoty jen
// proto, že přepisuje title/description/url. Ze stejného důvodu musí
// `images` odkazovat na app/opengraph-image.tsx ručně — jinak by ho
// stránka s vlastním `openGraph` blokem "ztratila" a sdílený odkaz by
// na sociálních sítích neměl náhledový obrázek.
export function pageMetadata({
  path,
  title,
  description,
}: {
  path: string;
  title: string;
  description: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: "AvenIQ",
      locale: "cs_CZ",
      type: "website",
      images: ["/opengraph-image"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
  };
}
