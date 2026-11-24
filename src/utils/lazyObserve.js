/**
 * 元素进入视口时执行一次回调，用于延迟加载图片/组件。
 */
export function observeOnce(element, callback, options = {}) {
  if (!element) {
    callback();
    return null;
  }

  if (typeof IntersectionObserver === "undefined") {
    callback();
    return null;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      callback();
      observer.disconnect();
    },
    {
      rootMargin: "300px 0px",
      threshold: 0.01,
      ...options,
    },
  );

  observer.observe(element);
  return observer;
}
