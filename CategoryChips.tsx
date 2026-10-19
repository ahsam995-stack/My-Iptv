import React from 'react';
import { FlatList, Pressable, StyleSheet, Text } from 'react-native';
import { Category } from '../types';
import { colors } from '../theme';

type Props = { data: Category[]; selected: string | null; onSelect: (id: string) => void };

export default function CategoryChips({ data, selected, onSelect }: Props) {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={data}
      keyExtractor={(c) => c.category_id}
      contentContainerStyle={{ paddingHorizontal: 12, gap: 8 }}
      style={{ flexGrow: 0, marginBottom: 8 }}
      renderItem={({ item }) => {
        const active = item.category_id === selected;
        return (
          <Pressable onPress={() => onSelect(item.category_id)} style={[s.chip, active && s.active]}>
            <Text style={[s.text, active && { color: '#fff' }]} numberOfLines={1}>{item.category_name}</Text>
          </Pressable>
        );
      }}
    />
  );
}

const s = StyleSheet.create({
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border },
  active: { backgroundColor: colors.primary, borderColor: colors.primary },
  text: { color: colors.muted, fontWeight: '600' },
});
