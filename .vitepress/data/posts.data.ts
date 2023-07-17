import { ContentData, createContentLoader } from 'vitepress';

export interface PostItem extends ContentData {
  frontmatter: {
    title?: string;
    date?: string;
    excerpt?: string;
    thumbnail?: string;
    tags?: string[];
    wordCount?: number;
  };
}

export default createContentLoader(['src/**/*.md'], {
  excerpt: true,
  includeSrc: true,
  render: true,
  transform(rawData) {
    const sorted = rawData.sort((a, b) => +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date));
    const ignores = ['/about', '/public', '/index', '/archive', '/tags', '/404'];
    const data: PostItem[] = sorted.map((item) => {
      item.url = item.url.replace('/src', '');
      const text = item.html?.replaceAll(/<\/?.*?>/g, '').replaceAll(/\n|\s/g, '') || '';
      const post: PostItem = {
        url: item.url,
        frontmatter: item.frontmatter,
        excerpt: item.frontmatter?.excerpt,
        src: '',
        html: '',
      };
      if (!post.excerpt) {
        post.excerpt = text.slice(0, 100);
      }
      if (!post.frontmatter.thumbnail) {
        const index = Math.floor(Math.random() * 10) + 1;
        post.frontmatter.thumbnail = `./images/${index}.jpg`;
      }
      if (ignores.some((i) => item.url.includes(i))) {
        return post;
      }
      if (text) {
        post.frontmatter.wordCount = text.length;
      }
      return post;
    });
    const list = Array(10).fill(data.filter(Boolean));
    return list.flat();
  },
});

export const data: PostItem[] = [];
