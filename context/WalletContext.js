import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [lostWallets, setLostWallets] = useState([]);
  const [foundWallets, setFoundWallets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load data from AsyncStorage on app start
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const lostData = await AsyncStorage.getItem('lostWallets');
      const foundData = await AsyncStorage.getItem('foundWallets');
      
      if (lostData) setLostWallets(JSON.parse(lostData));
      if (foundData) setFoundWallets(JSON.parse(foundData));
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Save lost wallets to AsyncStorage
  const saveLostWallet = async (wallet) => {
    try {
      const newWallet = {
        ...wallet,
        id: Date.now().toString(),
        type: 'lost',
        createdAt: new Date().toISOString(),
        status: 'active',
      };
      const updatedList = [...lostWallets, newWallet];
      setLostWallets(updatedList);
      await AsyncStorage.setItem('lostWallets', JSON.stringify(updatedList));
      return newWallet;
    } catch (error) {
      console.error('Error saving lost wallet:', error);
    }
  };

  // Save found wallets to AsyncStorage
  const saveFoundWallet = async (wallet) => {
    try {
      const newWallet = {
        ...wallet,
        id: Date.now().toString(),
        type: 'found',
        createdAt: new Date().toISOString(),
        status: 'unclaimed',
      };
      const updatedList = [...foundWallets, newWallet];
      setFoundWallets(updatedList);
      await AsyncStorage.setItem('foundWallets', JSON.stringify(updatedList));
      return newWallet;
    } catch (error) {
      console.error('Error saving found wallet:', error);
    }
  };

  // Update wallet status
  const updateWalletStatus = async (id, status, type) => {
    try {
      if (type === 'lost') {
        const updated = lostWallets.map(w => w.id === id ? { ...w, status } : w);
        setLostWallets(updated);
        await AsyncStorage.setItem('lostWallets', JSON.stringify(updated));
      } else {
        const updated = foundWallets.map(w => w.id === id ? { ...w, status } : w);
        setFoundWallets(updated);
        await AsyncStorage.setItem('foundWallets', JSON.stringify(updated));
      }
    } catch (error) {
      console.error('Error updating wallet status:', error);
    }
  };

  // Delete wallet
  const deleteWallet = async (id, type) => {
    try {
      if (type === 'lost') {
        const updated = lostWallets.filter(w => w.id !== id);
        setLostWallets(updated);
        await AsyncStorage.setItem('lostWallets', JSON.stringify(updated));
      } else {
        const updated = foundWallets.filter(w => w.id !== id);
        setFoundWallets(updated);
        await AsyncStorage.setItem('foundWallets', JSON.stringify(updated));
      }
    } catch (error) {
      console.error('Error deleting wallet:', error);
    }
  };

  return (
    <WalletContext.Provider
      value={{
        lostWallets,
        foundWallets,
        loading,
        saveLostWallet,
        saveFoundWallet,
        updateWalletStatus,
        deleteWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider');
  }
  return context;
};
