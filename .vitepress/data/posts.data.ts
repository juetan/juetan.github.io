import { createContentLoader } from 'vitepress';

export default createContentLoader(['src/**/*.md'], {
  excerpt: true,
  transform(rawData) {
    const sorted = rawData.sort((a, b) => +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date));
    const ignores = ['/about', '/public', '/index'];
    const data = sorted.map((item) => {
      item.url = item.url.replace('/src', '');
      if (item.frontmatter.excerpt) {
        item.excerpt = item.frontmatter.excerpt;
      }
      if (!item.frontmatter.thumbnail) {
        const index = Math.floor(Math.random() * 10) + 1;
        const padIndex = index.toString().padStart(2, '0');
        item.frontmatter.thumbnail = `./images/${padIndex}.jpg`;
      }
      if (ignores.some((i) => item.url.includes(i))) {
        return item;
      }
      return item;
    });
    return data.filter(Boolean);
  },
});
