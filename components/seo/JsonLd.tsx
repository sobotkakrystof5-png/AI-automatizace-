// Server Component (žádné "use client") — vykreslí libovolný JSON-LD objekt
// jako <script type="application/ld+json">. JSON.stringify escapuje uvozovky
// i zpětná lomítka, takže i data obsahující "<" (žádná v našich zdrojích
// nejsou) nemůžou rozbít okolní HTML.
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
