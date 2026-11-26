// app/components/JsonLd.tsx
export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Bolaji Oluwatofunmi",
    alternateName: "Tofunmithehuman",
    url: "https://tofunmithehuman.com",
    image: "https://tofunmithehuman.com/og-banner.png",
    jobTitle: "Full Stack Developer",
    worksFor: {
      "@type": "Organization",
      name: "Tixwav",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lagos",
      addressCountry: "NG",
    },
    sameAs: [
      "https://github.com/tofunmithehuman", 
      "https://twitter.com/tofunmithehuman",
      // LinkedIn, etc.
    ],
    knowsAbout: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Redis",
      "GSAP",
      "Full Stack Development",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}