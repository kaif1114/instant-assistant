export function typewriter(text: string, delay: number = 50): Promise<string> {
  return new Promise((resolve) => {
    let i = 0;
    let result = "";
    const interval = setInterval(() => {
      if (i < text.length) {
        result += text[i];
        i++;
      } else {
        clearInterval(interval);
        resolve(result);
      }
    }, delay);
  });
}
