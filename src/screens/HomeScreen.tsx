import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AccountCard } from '../components/AccountCard';
import { SegmentedToggle } from '../components/SegmentedToggle';
import { SortMenu, SortKey, SORTS } from '../components/SortMenu';
import { StockCard } from '../components/StockCard';
import {
  ACCOUNTS,
  Account,
  Holding,
  HOLDINGS,
  TODAY_DELTA,
  TOTAL_GAIN,
  TOTAL_PCT,
  TOTAL_PRINCIPAL,
  TOTAL_VALUE,
} from '../data/holdings';
import {
  UP_COLOR,
  krw,
  pct,
  signed,
  upDownBg,
  upDownColor,
} from '../utils/format';

type ViewMode = 'stock' | 'account';

const TOGGLE_ITEMS = [
  { id: 'stock', label: '종목별', count: HOLDINGS.length },
  { id: 'account', label: '증권사별', count: ACCOUNTS.length },
];

function sortHoldings(items: Holding[], key: SortKey): Holding[] {
  return [...items].sort((a, b) => {
    if (key === 'value') { return b.value - a.value; }
    if (key === 'pct') { return b.pct - a.pct; }
    if (key === 'gain') { return b.gain - a.gain; }
    return a.name.localeCompare(b.name, 'ko');
  });
}

function sortAccounts(items: Account[], key: SortKey): Account[] {
  return [...items].sort((a, b) => {
    if (key === 'value') { return b.value - a.value; }
    if (key === 'pct') { return b.pct - a.pct; }
    if (key === 'gain') { return b.gain - a.gain; }
    return a.name.localeCompare(b.name, 'ko');
  });
}

export function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [view, setView] = useState<ViewMode>('stock');
  const [sort, setSort] = useState<SortKey>('value');
  const [hide, setHide] = useState(false);

  const gainColor = upDownColor(TOTAL_GAIN);
  const gainBg = upDownBg(TOTAL_GAIN);

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FBFBFC" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.appTitle}>민주네 가계부</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => setHide(h => !h)} hitSlop={8} activeOpacity={0.6}>
            <Text style={styles.iconText}>{hide ? '🙈' : '👁'}</Text>
          </TouchableOpacity>
          <View style={styles.iconPlaceholder} />
          <View style={styles.iconPlaceholder} />
        </View>
      </View>

      {/* Total summary */}
      <View style={styles.summary}>
        <Text style={styles.summaryLabel}>전체 평가금액</Text>
        <Text style={styles.totalValue} numberOfLines={1}>
          {hide ? '••••••••' : krw(TOTAL_VALUE)}
          <Text style={styles.totalValueWon}>원</Text>
        </Text>
        <View style={styles.totalGainRow}>
          <Text style={[styles.totalGain, { color: gainColor }]} numberOfLines={1}>
            {signed(TOTAL_GAIN)}원
          </Text>
          <View style={[styles.pctChip, { backgroundColor: gainBg }]}>
            <Text style={[styles.pctText, { color: gainColor }]}>{pct(TOTAL_PCT)}</Text>
          </View>
        </View>

        {/* Metric strip */}
        <View style={styles.metricStrip}>
          <View style={styles.metricItem}>
            <Text style={styles.metricLabel}>투자원금</Text>
            <Text style={styles.metricValue} numberOfLines={1}>
              {hide ? '••••••' : krw(TOTAL_PRINCIPAL)}원
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.metricItem}>
            <Text style={styles.metricLabel}>보유 종목</Text>
            <Text style={styles.metricValue} numberOfLines={1}>
              {HOLDINGS.length}개{' '}
              <Text style={styles.metricSub}>· {ACCOUNTS.length}계좌</Text>
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.metricItem}>
            <Text style={styles.metricLabel}>오늘</Text>
            <Text style={[styles.metricValue, { color: UP_COLOR }]} numberOfLines={1}>
              {hide ? '••••' : '+' + krw(TODAY_DELTA)}
            </Text>
          </View>
        </View>
      </View>

      {/* Segmented toggle */}
      <View style={styles.toggleWrapper}>
        <SegmentedToggle
          value={view}
          onChange={v => setView(v as ViewMode)}
          items={TOGGLE_ITEMS}
        />
      </View>

      {/* List header */}
      <View style={styles.listHeader}>
        <Text style={styles.listCount}>
          {view === 'stock' ? `${HOLDINGS.length}개 종목` : `${ACCOUNTS.length}개 계좌`}
        </Text>
        <SortMenu value={sort} onChange={setSort} />
      </View>

      {/* List */}
      <ScrollView
        style={styles.list}
        contentContainerStyle={[styles.listContent, { paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}
      >
        {view === 'stock'
          ? sortHoldings(HOLDINGS, sort).map(h => (
              <StockCard key={h.ticker} holding={h} hideAmounts={hide} />
            ))
          : sortAccounts(ACCOUNTS, sort).map(a => (
              <AccountCard key={a.name} account={a} hideAmounts={hide} />
            ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FBFBFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 6,
  },
  appTitle: {
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: -0.4,
    color: '#0B0D12',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconText: {
    fontSize: 18,
  },
  iconPlaceholder: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#E5E7EB',
  },
  summary: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 18,
  },
  summaryLabel: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
    letterSpacing: -0.2,
    marginBottom: 6,
  },
  totalValue: {
    fontSize: 36,
    fontWeight: '700',
    letterSpacing: -1.4,
    lineHeight: 42,
    color: '#0B0D12',
    fontVariant: ['tabular-nums'],
  },
  totalValueWon: {
    fontSize: 20,
    fontWeight: '600',
    color: '#374151',
  },
  totalGainRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    marginTop: 8,
  },
  totalGain: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.3,
    fontVariant: ['tabular-nums'],
  },
  pctChip: {
    paddingVertical: 2,
    paddingHorizontal: 7,
    borderRadius: 4,
  },
  pctText: {
    fontSize: 12.5,
    fontWeight: '700',
    letterSpacing: -0.1,
    fontVariant: ['tabular-nums'],
  },
  metricStrip: {
    marginTop: 14,
    backgroundColor: '#F4F5F7',
    borderRadius: 12,
    padding: 12,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  metricItem: {
    flex: 1,
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 11,
    color: '#6B7280',
    letterSpacing: -0.1,
  },
  metricValue: {
    fontSize: 14.5,
    fontWeight: '600',
    marginTop: 2,
    letterSpacing: -0.3,
    color: '#0B0D12',
    fontVariant: ['tabular-nums'],
  },
  metricSub: {
    color: '#9CA3AF',
    fontWeight: '500',
  },
  divider: {
    width: 1,
    height: 28,
    backgroundColor: '#E5E7EB',
  },
  toggleWrapper: {
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  listHeader: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listCount: {
    fontSize: 13,
    color: '#6B7280',
    letterSpacing: -0.2,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
});
