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

function htmlToText(html?: string) {
  if (!html) {
    return '';
  }
  let text = html.replaceAll(/<code>.*?<\/code>/g, '');
  text = text.replaceAll(/<\/?.*?>/g, '');
  text = text.replaceAll(/\n|\s/g, '') || '';
  text = text.replaceAll(/&.*?;/g, '');
  return text;
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
      const text = htmlToText(item.html);
      const post: PostItem = {
        url: item.url,
        frontmatter: item.frontmatter,
        excerpt: item.frontmatter?.excerpt,
        src: '',
        html: '',
      };
      if (!post.excerpt) {
        post.excerpt = text.slice(0, 140);
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
    return data.filter(Boolean);
  },
});

export const data: PostItem[] = [];
