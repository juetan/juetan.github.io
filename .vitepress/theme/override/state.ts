import { useRoute } from 'vitepress';
import { nextTick, onMounted, onUnmounted, reactive, watch } from 'vue';
import { throttle } from 'lodash-es';

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

export const useHeadScroll = () => {
  const route = useRoute();
  const oldHash = state.hash;
  let container: HTMLElement;
  let elements: HTMLElement[];
  const scollHandler = () => {
    for (const element of elements) {
      if (Math.abs(container.scrollTop - element.offsetTop) < 100) {
        state.hash = element.id;
      }
    }
    if (container.scrollTop - elements[elements.length - 1].offsetTop > 100) {
      state.hash = elements[elements.length - 1].id;
    }
    if (state.hash && state.hash !== oldHash) {
      const url = new URL(window.location.href);
      url.hash = state.hash;
      window.history.replaceState(null, '', url.toString());
    }
  };
  const throttledScrollHandler = throttle(scollHandler, 100);

  onMounted(() => {
    const hash = decodeURIComponent(window.location.hash);
    if (hash) {
      state.hash = hash;
    }
    container = document.documentElement || document.body;
    elements = Array.from(document.querySelectorAll('h2, h3'));
    document.addEventListener('scroll', throttledScrollHandler);
  });

  onUnmounted(() => {
    document.removeEventListener('scroll', throttledScrollHandler);
  });

  watch(
    () => route.path,
    async () => {
      await nextTick();
      state.hash = '';
      elements = Array.from(document.querySelectorAll('h2, h3'));
      scollHandler();
    }
  );
};
