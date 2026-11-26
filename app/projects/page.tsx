import type { Metadata } from "next";
import ProjectsPageClient from "./ProjectsPageClient";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected client work and personal projects by Tofunmithehuman — fashion, real estate, film, wellness, ticketing and more.",
  openGraph: {
    title: "Projects · Tofunmithehuman",
    description:
      "Selected client work and personal projects by Tofunmithehuman.",
    url: "https://tofunmithehuman.com/projects",
  },
};

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}