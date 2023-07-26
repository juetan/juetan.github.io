import { reactive } from 'vue';

export const state = reactive({
  hash: '',
});

export const useTocSync = () => {
  let observer: IntersectionObserver;
  const run = () => {
    if (observer) {
      observer.disconnect();
    }
    const tocList = Array.from(document.querySelectorAll('h2, h3'));
    if (!tocList.length) {
      return;
    }
    const onChange = (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          state.hash = entry.target.id;
        }
      }
    };
    observer = new IntersectionObserver(onChange);
    for (const el of tocList) {
      observer.observe(el);
    }
  };
  const cancel = () => {
    observer?.disconnect();
  };
  return { run, cancel };
};
