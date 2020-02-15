export function debounce(
  func: (...args: any[]) => void,
  wait: number,
  immediate?: boolean,
): (...args: any[]) => void {
  let timeout: NodeJS.Timeout;
  const context = null;
  return (...args: any[]): void => {
    const later = () => {
      timeout = null;
      if (!immediate) {
        return func.apply(context, args);
      }
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      return func.apply(context, args);
    }
  };
}
