import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Account } from '../data/holdings';
import { krw, pct, signed, upDownColor } from '../utils/format';

interface Props {
  account: Account;
}

export function AccountCard({ account: a }: Props) {
  const color = upDownColor(a.gain);

  return (
    <View style={styles.card}>
      <View style={styles.left}>
        <Text style={styles.name} numberOfLines={1}>{a.name}</Text>
        <Text style={styles.meta} numberOfLines={1}>
          {a.sub} · 종목 {a.holdings}개 · 원금 {krw(a.principal)}
        </Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.value} numberOfLines={1}>
          {krw(a.value)}
        </Text>
        <Text style={[styles.gain, { color }]} numberOfLines={1}>
          {signed(a.gain)} ({pct(a.pct)})
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.06,
    shadowRadius: 1,
    elevation: 1,
  },
  left: {
    flex: 1,
    minWidth: 0,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: -0.3,
    color: '#0B0D12',
  },
  meta: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 2,
    letterSpacing: -0.1,
    fontVariant: ['tabular-nums'],
  },
  right: {
    alignItems: 'flex-end',
    flexShrink: 0,
  },
  value: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: -0.3,
    color: '#0B0D12',
    fontVariant: ['tabular-nums'],
  },
  gain: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
    letterSpacing: -0.1,
    fontVariant: ['tabular-nums'],
  },
});
