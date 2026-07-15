import data from "./data.json";
import { siteUrl } from "./content";
import { HomePage } from "./home/HomePage";

export default function Page() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: data.name,
    url: siteUrl,
    image: `${siteUrl}/images/hero-gary.webp`,
    jobTitle: "Jazz Vocalist and Guitarist",
    email: `mailto:${data.email}`,
    sameAs: Object.values(data.social),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <HomePage />
    </>
  );
}
