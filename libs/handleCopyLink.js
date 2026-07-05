import { showMessage } from "./commonHelper";

export async function handleCopyLink(url) {
  if (typeof window === 'undefined') return;

  if (navigator?.clipboard) {
    try {
      await navigator.clipboard.writeText(url);
      return true;
    } catch (err) {
      return false
    }
  }

  try {
    const textArea = document.createElement('textarea');
    textArea.value = url;
    
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);

    if (successful) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
}