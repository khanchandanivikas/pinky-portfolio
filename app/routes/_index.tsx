import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Contact } from "@/components/Contact";
import { SOCIAL_LINKS } from "@/components/Footer/SocialIcon";
import { Hero } from "@/components/Hero";
import shareImage from "@/components/Hero/pinky-wave.jpg";

const NAME = "Pinky Lalwani";
const TITLE = "Pinky Lalwani | Full-Stack React Developer";
const DESCRIPTION =
  "Full-stack developer and designer building React, Next.js and Remix.js sites. Available for freelance projects.";
const SHARE_TITLE = "Pinky Lalwani: React Developer";
const SHARE_DESCRIPTION =
  "I build fast React and headless Shopify sites, front end to back end. Open to freelance projects.";

// Canonical, Open Graph and JSON-LD URLs must be absolute, and the domain
// isn't fixed, so derive it from the request.
export const loader = ({ request }: LoaderFunctionArgs) => ({
  origin: new URL(request.url).origin,
});

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const url = `${data?.origin ?? ""}/`;
  const image = `${data?.origin ?? ""}${shareImage}`;

  return [
    { title: TITLE },
    { name: "description", content: DESCRIPTION },
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:site_name", content: NAME },
    { property: "og:title", content: SHARE_TITLE },
    { property: "og:description", content: SHARE_DESCRIPTION },
    { property: "og:image", content: image },
    {
      property: "og:image:alt",
      content: "3D illustrated portrait of Pinky waving and holding a coffee",
    },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: SHARE_TITLE },
    { name: "twitter:description", content: SHARE_DESCRIPTION },
    { name: "twitter:image", content: image },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "Person",
        name: NAME,
        url,
        image,
        jobTitle: "Full-Stack Developer and Designer",
        description:
          "Full-stack developer and designer building websites, web apps and headless Shopify stores with React, Next.js, Hydrogen, Sanity and Node.js. Open to freelance and full-time work.",
        knowsAbout: [
          "React",
          "Next.js",
          "Remix",
          "JavaScript",
          "HTML",
          "CSS",
          "Shopify",
          "Shopify Hydrogen",
          "Headless commerce",
          "Sanity.io",
          "Node.js",
          "MongoDB",
          "PHP",
          "MySQL",
          "Strapi",
          "Figma",
          "Web design",
        ],
        sameAs: SOCIAL_LINKS.map((link) => link.href).filter((href) =>
          href.startsWith("http"),
        ),
      },
    },
  ];
};

const Index = () => {
  return (
    <>
      <Hero />
    </>
  );
};

export default Index;
