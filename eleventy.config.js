import Image from "@11ty/eleventy-img";

export default async function (eleventyConfig) {
  eleventyConfig.addShortcode(
    "image",
    async function (src, alt, classes, sizes) {
      let metadata = await Image(src, {
        urlPath: "/images/",
        outputDir: "./_site/images",
        widths: [400, 800, 1280],
        formats: ["webp", "jpeg"],
      });

      let imageAttributes = {
        alt,
        sizes: sizes || "100vh",
        class: classes,
        loading: "lazy",
        decoding: "async",
      };

      // You bet we throw an error on a missing alt (alt="" works okay)
      return Image.generateHTML(metadata, imageAttributes);
    }
  );

  return {
    markdownTemplateEngine: "njk",
    dir: {
      input: "./",
    },
  };
}
