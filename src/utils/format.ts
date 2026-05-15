export const krw = (n: number): string =>
  new Intl.NumberFormat('ko-KR').format(Math.round(n));

export const signed = (n: number): string =>
  (n >= 0 ? '+' : '−') + krw(Math.abs(n));

export const pct = (n: number): string =>
  (n >= 0 ? '+' : '−') + Math.abs(n).toFixed(2) + '%';

// Korean stock convention: up = red, down = blue
export const UP_COLOR = '#D32F2F';
export const DOWN_COLOR = '#1565C0';
export const UP_BG = '#FFEBEE';
export const DOWN_BG = '#E3F2FD';

export const upDownColor = (n: number) => (n >= 0 ? UP_COLOR : DOWN_COLOR);
export const upDownBg = (n: number) => (n >= 0 ? UP_BG : DOWN_BG);
