import {createContentLoader} from 'vitepress';

export default createContentLoader(
  ['**/*.md', '!./*.md', '!about/*.md', '!public'],
  {
    excerpt: true,
    transform(rawData) {
      const sorted = rawData.sort(
        (a, b) => +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date),
      );
      const data = sorted.map((item) => {
        if (item.frontmatter.excerpt) {
          item.excerpt = item.frontmatter.excerpt;
        }
        if (!item.frontmatter.thumbnail) {
          const index = Math.floor(Math.random() * 10) + 1;
          const padIndex = index.toString().padStart(2, '0');
          item.frontmatter.thumbnail = `./images/${padIndex}.jpg`;
        }
        return item;
      });
      return data;
    },
  },
);
