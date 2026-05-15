import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Holding } from '../data/holdings';
import { krw, pct, signed, upDownBg, upDownColor } from '../utils/format';

interface Props {
  holding: Holding;
  hideAmounts: boolean;
}

export function StockCard({ holding: h, hideAmounts }: Props) {
  const color = upDownColor(h.gain);
  const chipBg = upDownBg(h.gain);
  const brokerEntries = Object.entries(h.brokers);

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.left}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{h.name}</Text>
            <Text style={styles.ticker}>{h.ticker}</Text>
          </View>
          <Text style={styles.meta}>
            {h.shares}주 · 평균 {krw(h.avg)}원
          </Text>
        </View>
        <View style={styles.right}>
          <Text style={styles.value} numberOfLines={1}>
            {hideAmounts ? '••••••' : krw(h.value)}
            <Text style={styles.won}>원</Text>
          </Text>
          <View style={styles.gainRow}>
            <Text style={[styles.gain, { color }]} numberOfLines={1}>
              {signed(h.gain)}
            </Text>
            <View style={[styles.pctChip, { backgroundColor: chipBg }]}>
              <Text style={[styles.pctText, { color }]}>{pct(h.pct)}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.brokers}>
          {brokerEntries.map(([b, shares]) => (
            <View key={b} style={styles.brokerChip}>
              <Text style={styles.brokerText}>
                {b} <Text style={styles.brokerShares}>{shares}주</Text>
              </Text>
            </View>
          ))}
        </View>
        <Text style={styles.currentPrice} numberOfLines={1}>
          현재가 {krw(h.price)}원
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    paddingHorizontal: 16,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.06,
    shadowRadius: 1,
    elevation: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  left: {
    flex: 1,
    minWidth: 0,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
  },
  name: {
    fontSize: 15.5,
    fontWeight: '700',
    letterSpacing: -0.3,
    color: '#0B0D12',
  },
  ticker: {
    fontSize: 10.5,
    color: '#B0B6BE',
    fontVariant: ['tabular-nums'],
  },
  meta: {
    fontSize: 11.5,
    color: '#6B7280',
    marginTop: 3,
    letterSpacing: -0.1,
    fontVariant: ['tabular-nums'],
  },
  right: {
    alignItems: 'flex-end',
    flexShrink: 0,
  },
  value: {
    fontSize: 15.5,
    fontWeight: '700',
    letterSpacing: -0.3,
    fontVariant: ['tabular-nums'],
    color: '#0B0D12',
  },
  won: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  gainRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
    marginTop: 3,
    justifyContent: 'flex-end',
  },
  gain: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: -0.1,
    fontVariant: ['tabular-nums'],
  },
  pctChip: {
    paddingVertical: 1.5,
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  pctText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: -0.1,
    fontVariant: ['tabular-nums'],
  },
  footer: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#EEF0F3',
    borderStyle: 'dashed',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  brokers: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    flex: 1,
  },
  brokerChip: {
    backgroundColor: '#F4F5F7',
    paddingVertical: 2,
    paddingHorizontal: 7,
    borderRadius: 999,
  },
  brokerText: {
    fontSize: 10.5,
    fontWeight: '500',
    color: '#6B7280',
    letterSpacing: -0.1,
  },
  brokerShares: {
    color: '#B0B6BE',
    fontVariant: ['tabular-nums'],
  },
  currentPrice: {
    fontSize: 11,
    color: '#9CA3AF',
    letterSpacing: -0.1,
    flexShrink: 0,
    fontVariant: ['tabular-nums'],
  },
});
