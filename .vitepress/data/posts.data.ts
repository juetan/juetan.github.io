import { ContentData, createContentLoader } from 'vitepress';

export interface PostItem extends ContentData {
  frontmatter: {
    title?: string;
    date?: string;
    excerpt?: string;
    thumbnail?: string;
    tags?: string[];
  };
}

export default createContentLoader(['src/**/*.md'], {
  excerpt: true,
  transform(rawData) {
    const sorted = rawData.sort((a, b) => +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date));
    const ignores = ['/about', '/public', '/index', '/archive', '/tags', '/404'];
    const data = sorted.map((item) => {
      item.url = item.url.replace('/src', '');
      if (item.frontmatter.excerpt) {
        item.excerpt = item.frontmatter.excerpt;
      }
      if (!item.frontmatter.thumbnail) {
        const index = Math.floor(Math.random() * 10) + 1;
        item.frontmatter.thumbnail = `./images/${index}.jpg`;
      }
      if (ignores.some((i) => item.url.includes(i))) {
        return item;
      }
      return item;
    });
    const list = Array(10).fill(data.filter(Boolean));
    return list.flat();
  },
});

export const data: PostItem[] = [];
