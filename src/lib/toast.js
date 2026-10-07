const EVENT = 'mb:toast';

export function toast(message) {
  window.dispatchEvent(new CustomEvent(EVENT, { detail: message }));
}

export function onToast(handler) {
  const listener = (e) => handler(e.detail);
  window.addEventListener(EVENT, listener);
  return () => window.removeEventListener(EVENT, listener);
}

export async function copyText(text, message = 'Copied to clipboard') {
  try {
    await navigator.clipboard.writeText(text);
    toast(message);
  } catch {
    toast('Couldn’t access the clipboard');
  }
}
