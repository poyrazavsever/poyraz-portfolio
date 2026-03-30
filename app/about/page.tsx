import { AboutContent } from "@/components/about-content";
import { PersonJsonLd } from "@/components/json-ld";

export default function AboutPage() {
  return (
    <>
      <PersonJsonLd
        name="Poyraz Avsever"
        jobTitle="Fullstack Developer"
        sameAs={[
          "https://github.com/poyrazavsever",
          "https://www.linkedin.com/in/poyrazavsever",
          "https://x.com/poyrazavsever",
        ]}
      />
      <AboutContent />
    </>
  );
}
