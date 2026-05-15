import React, { useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

export const SORTS = {
  value: { label: '평가금액' },
  pct:   { label: '수익률' },
  gain:  { label: '수익금' },
  name:  { label: '이름' },
} as const;

export type SortKey = keyof typeof SORTS;

interface Props {
  value: SortKey;
  onChange: (key: SortKey) => void;
}

export function SortMenu({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <View>
      <TouchableOpacity
        onPress={() => setOpen(true)}
        style={styles.trigger}
        activeOpacity={0.7}
      >
        <Text style={styles.triggerText}>{SORTS[value].label} 순</Text>
        <Text style={styles.chevron}>▾</Text>
      </TouchableOpacity>

      <Modal transparent visible={open} animationType="fade" onRequestClose={() => setOpen(false)}>
        <TouchableWithoutFeedback onPress={() => setOpen(false)}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
        <View style={styles.menu}>
          {(Object.entries(SORTS) as [SortKey, { label: string }][]).map(([k, s]) => (
            <TouchableOpacity
              key={k}
              style={[styles.menuItem, k === value && styles.menuItemActive]}
              onPress={() => { onChange(k); setOpen(false); }}
              activeOpacity={0.7}
            >
              <Text style={styles.menuItemText}>{s.label}</Text>
              {k === value && <Text style={styles.checkmark}>✓</Text>}
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  triggerText: {
    fontSize: 12,
    color: '#6B7280',
    letterSpacing: -0.1,
  },
  chevron: {
    fontSize: 10,
    color: '#6B7280',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  menu: {
    position: 'absolute',
    top: 120,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 4,
    minWidth: 120,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  menuItemActive: {
    backgroundColor: '#F4F5F7',
  },
  menuItemText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#0B0D12',
    letterSpacing: -0.2,
  },
  checkmark: {
    fontSize: 13,
    color: '#0B0D12',
    fontWeight: '600',
  },
});
