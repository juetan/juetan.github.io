import { throttle } from 'lodash-es';
import { useRoute } from 'vitepress';
import { nextTick, onMounted, onUnmounted, reactive, watch } from 'vue';

export const state = reactive({
  hash: '',
});

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

export const formatNumber = (num: number) => {
  const chars = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
  if (num < 11) {
    return chars[num];
  }
  if (num < 20) {
    return '十' + chars[num - 10];
  }
  if (num < 100) {
    return chars[Math.floor(num / 10)] + '十' + chars[num % 10];
  }
};
