export type Broker = string;

export interface RawHolding {
  name: string;
  ticker: string;
  market: string;
  shares: number;
  avg: number;
  price: number;
  brokers: Record<Broker, number>;
}

export interface Holding extends RawHolding {
  principal: number;
  value: number;
  gain: number;
  pct: number;
}

export interface Account {
  name: string;
  sub: string;
  principal: number;
  value: number;
  gain: number;
  pct: number;
  holdings: number;
}

const ACCOUNT_META: Record<string, { sub: string }> = {
  '키움증권':     { sub: '주식종합' },
  '미래에셋':     { sub: 'CMA-주식' },
  '한국투자증권': { sub: '연금저축' },
  '토스증권':     { sub: '일반위탁' },
  'NH투자증권':   { sub: 'ISA' },
};

const RAW_HOLDINGS: RawHolding[] = [
  { name: '삼성전자',         ticker: '005930', market: 'KOSPI',     shares: 100, avg: 68500,  price: 72300,  brokers: { '키움증권': 60, '미래에셋': 40 } },
  { name: 'SK하이닉스',       ticker: '000660', market: 'KOSPI',     shares: 30,  avg: 185000, price: 210500, brokers: { '키움증권': 30 } },
  { name: 'LG에너지솔루션',   ticker: '373220', market: 'KOSPI',     shares: 10,  avg: 420000, price: 478000, brokers: { '미래에셋': 10 } },
  { name: '현대차',           ticker: '005380', market: 'KOSPI',     shares: 20,  avg: 235000, price: 245500, brokers: { '한국투자증권': 20 } },
  { name: '셀트리온',         ticker: '068270', market: 'KOSPI',     shares: 25,  avg: 168000, price: 182000, brokers: { '키움증권': 15, '한국투자증권': 10 } },
  { name: 'NAVER',            ticker: '035420', market: 'KOSPI',     shares: 15,  avg: 195000, price: 178500, brokers: { '토스증권': 15 } },
  { name: '카카오',           ticker: '035720', market: 'KOSPI',     shares: 40,  avg: 52000,  price: 45200,  brokers: { '토스증권': 25, 'NH투자증권': 15 } },
  { name: 'POSCO홀딩스',      ticker: '005490', market: 'KOSPI',     shares: 12,  avg: 385000, price: 358000, brokers: { '미래에셋': 12 } },
  { name: 'TIGER 미국S&P500', ticker: '360750', market: 'KOSPI ETF', shares: 50,  avg: 24800,  price: 26540,  brokers: { 'NH투자증권': 35, '키움증권': 15 } },
];

export const HOLDINGS: Holding[] = RAW_HOLDINGS.map(h => {
  const principal = h.shares * h.avg;
  const value = h.shares * h.price;
  const gain = value - principal;
  const pct = (gain / principal) * 100;
  return { ...h, principal, value, gain, pct };
});

const accountsMap: Record<string, { name: string; principal: number; value: number; holdings: number }> = {};
HOLDINGS.forEach(h => {
  Object.entries(h.brokers).forEach(([name, shares]) => {
    if (!accountsMap[name]) {
      accountsMap[name] = { name, principal: 0, value: 0, holdings: 0 };
    }
    accountsMap[name].principal += shares * h.avg;
    accountsMap[name].value += shares * h.price;
    accountsMap[name].holdings += 1;
  });
});

export const ACCOUNTS: Account[] = Object.values(accountsMap).map(a => {
  const gain = a.value - a.principal;
  return {
    ...a,
    ...(ACCOUNT_META[a.name] ?? { sub: '' }),
    gain,
    pct: (gain / a.principal) * 100,
  };
});

export const TOTAL_PRINCIPAL = HOLDINGS.reduce((s, h) => s + h.principal, 0);
export const TOTAL_VALUE = HOLDINGS.reduce((s, h) => s + h.value, 0);
export const TOTAL_GAIN = TOTAL_VALUE - TOTAL_PRINCIPAL;
export const TOTAL_PCT = (TOTAL_GAIN / TOTAL_PRINCIPAL) * 100;
export const TODAY_DELTA = 84300;
