import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  SectionList,
} from 'react-native';
import { useWallet } from '../context/WalletContext';

const MyReportsScreen = () => {
  const { lostWallets, foundWallets, updateWalletStatus, deleteWallet } = useWallet();
  const [expandedId, setExpandedId] = useState(null);

  const handleStatusChange = (id, type) => {
    const newStatus = type === 'lost' ? 'recovered' : 'claimed';
    Alert.alert(
      'Update Status',
      `Mark this wallet as ${newStatus}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: () => updateWalletStatus(id, newStatus, type),
        },
      ]
    );
  };

  const handleDelete = (id, type) => {
    Alert.alert(
      'Delete Report',
      'Are you sure you want to delete this report?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteWallet(id, type),
        },
      ]
    );
  };

  const sections = [
    {
      title: 'Lost Wallets',
      data: lostWallets.map(w => ({ ...w, type: 'lost' })),
      empty: 'No lost wallet reports yet',
    },
    {
      title: 'Found Wallets',
      data: foundWallets.map(w => ({ ...w, type: 'found' })),
      empty: 'No found wallet reports yet',
    },
  ];

  const renderWalletItem = (item) => (
    <View key={item.id} style={styles.walletCard}>
      <TouchableOpacity
        style={styles.cardHeader}
        onPress={() => setExpandedId(expandedId === item.id ? null : item.id)}
      >
        <View style={styles.headerContent}>
          <Text style={styles.walletColor}>{item.color} Wallet</Text>
          <Text style={styles.status}>{item.status.toUpperCase()}</Text>
        </View>
        <Text style={styles.arrow}>{expandedId === item.id ? '▼' : '▶'}</Text>
      </TouchableOpacity>

      {expandedId === item.id && (
        <View style={styles.cardDetails}>
          {item.photo && (
            <Image source={{ uri: item.photo }} style={styles.walletImage} />
          )}

          {item.location && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>📍 Location:</Text>
              <Text style={styles.detailValue}>{item.location}</Text>
            </View>
          )}

          {item.contents && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>💼 Contents:</Text>
              <Text style={styles.detailValue}>{item.contents}</Text>
            </View>
          )}

          {item.description && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>📝 Description:</Text>
              <Text style={styles.detailValue}>{item.description}</Text>
            </View>
          )}

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>📞 Phone:</Text>
            <Text style={styles.detailValue}>{item.phone}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>📧 Email:</Text>
            <Text style={styles.detailValue}>{item.email}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>📅 Date:</Text>
            <Text style={styles.detailValue}>
              {new Date(item.createdAt).toLocaleDateString()}
            </Text>
          </View>

          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[styles.actionButton, styles.statusButton]}
              onPress={() => handleStatusChange(item.id, item.type)}
            >
              <Text style={styles.actionButtonText}>
                {item.type === 'lost' ? '✓ Mark Recovered' : '✓ Mark Claimed'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.deleteButton]}
              onPress={() => handleDelete(item.id, item.type)}
            >
              <Text style={styles.actionButtonText}>🗑️ Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {sections.map((section) => (
        <View key={section.title} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          {section.data.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>{section.empty}</Text>
            </View>
          ) : (
            section.data.map((item) => renderWalletItem(item))
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  walletCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
    borderLeftWidth: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  headerContent: {
    flex: 1,
  },
  walletColor: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  status: {
    fontSize: 12,
    fontWeight: '600',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: '#E3F2FD',
    color: '#007AFF',
    alignSelf: 'flex-start',
  },
  arrow: {
    fontSize: 14,
    color: '#999',
  },
  cardDetails: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: '#fafafa',
  },
  walletImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 12,
  },
  detailRow: {
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 3,
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  statusButton: {
    backgroundColor: '#34C759',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  emptyState: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 30,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});

export default MyReportsScreen;
