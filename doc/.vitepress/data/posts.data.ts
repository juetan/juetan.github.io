import { createContentLoader } from "vitepress";

export default createContentLoader(["**/*.md", "!./*.md", "!about/*.md", "!public"], {
  excerpt: true,
  transform(rawData) {
    const sorted = rawData.sort((a, b) => +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date));
    const data = sorted.map((item) => {
      if (item.frontmatter.excerpt) {
        item.excerpt = item.frontmatter.excerpt;
      }
      if (!item.frontmatter.thumbnail) {
        item.frontmatter.thumbnail =
          "https://images.unsplash.com/photo-1661956601349-f61c959a8fd4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80";
      }
      return item;
    });
    return data;
  },
});
