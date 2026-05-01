import React, { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../services/firebaseConfig';
import { View, ActivityIndicator } from 'react-native';

const ADMIN_EMAIL = 'admin@admin.com';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const isAdmin = user?.email?.toLowerCase() === ADMIN_EMAIL;

  useEffect(() => {
    let unsubscribeUserData = null;

    // Timeout de segurança caso auth demore muito (conexão lenta)
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 10000);

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      clearTimeout(timeout);
      if (currentUser) {
        setUser(currentUser);
        // Desinscrever o anterior se existir antes de criar novo
        if (unsubscribeUserData) unsubscribeUserData();
        
        unsubscribeUserData = onSnapshot(doc(db, 'users', currentUser.uid), (docSnapshot) => {
          if (docSnapshot.exists()) {
            setUserData(docSnapshot.data());
          }
          setLoading(false);
        }, (error) => {
          // Captura erro de permissão (comum no logout) de forma silenciosa
          if (error.code !== 'permission-denied') {
            console.warn("User data listener error:", error);
          }
        });
      } else {
        // Logout detectado: limpar listener IMEDIATAMENTE
        if (unsubscribeUserData) {
          unsubscribeUserData();
          unsubscribeUserData = null;
        }
        setUser(null);
        setUserData(null);
        setLoading(false);
      }
    });

    return () => {
      clearTimeout(timeout);
      unsubscribeAuth();
      if (unsubscribeUserData) unsubscribeUserData();
    };
  }, []);

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.warn("Erro ao fazer logout: ", error);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={{ user, userData, signOut, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
