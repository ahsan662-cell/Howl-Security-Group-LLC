import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "HOWL Security Group",
    short_name: "HOWL Security",
    description:
      "Special Operations leadership & executive protection across South Florida and worldwide.",
    start_url: "/",
    display: "standalone",
    background_color: "#07090E",
    theme_color: "#E58518",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
