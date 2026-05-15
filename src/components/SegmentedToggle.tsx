import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Item {
  id: string;
  label: string;
  count: number;
}

interface Props {
  value: string;
  onChange: (id: string) => void;
  items: Item[];
}

export function SegmentedToggle({ value, onChange, items }: Props) {
  return (
    <View style={styles.container}>
      {items.map(item => {
        const active = value === item.id;
        return (
          <TouchableOpacity
            key={item.id}
            onPress={() => onChange(item.id)}
            style={[styles.button, active && styles.buttonActive]}
            activeOpacity={0.7}
          >
            <Text style={[styles.label, active && styles.labelActive]}>
              {item.label}
            </Text>
            <Text style={[styles.count, active && styles.countActive]}>
              {item.count}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#EEF0F3',
    borderRadius: 10,
    padding: 3,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 8,
    gap: 5,
  },
  buttonActive: {
    backgroundColor: '#fff',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  label: {
    fontSize: 13.5,
    fontWeight: '500',
    color: '#6B7280',
    letterSpacing: -0.2,
  },
  labelActive: {
    fontWeight: '700',
    color: '#0B0D12',
  },
  count: {
    fontSize: 11,
    fontWeight: '600',
    color: '#B0B6BE',
    fontVariant: ['tabular-nums'],
  },
  countActive: {
    color: '#9CA3AF',
  },
});
