import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, View, TextInput, StyleSheet, Alert, TouchableOpacity, Text, Platform, KeyboardAvoidingView } from 'react-native';
import { SafeAreaViewComponent } from '../../styles';
import { AuthContext } from '../../context/AuthContext';
import { collection, onSnapshot, query, orderBy, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../services/firebaseConfig';
import { Ionicons } from '@expo/vector-icons';
import { Button } from "../../components/Button";
import Modal from 'react-native-modal';
import {
  HomeContainer,
  HeaderContainer,
  GreetingText,
  SubTitle,
  SectionTitle,
  NewsCard,
  NewsMessage,
  NewsDate,
  EmptyNewsText
} from './styles';

export default function Home() {
  const { userData, user, isAdmin } = useContext(AuthContext);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [newPriority, setNewPriority] = useState('normal');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, 'news'), orderBy('publishDate', 'desc'));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newsArray = [];
      querySnapshot.forEach((doc) => {
        newsArray.push({ id: doc.id, ...doc.data() });
      });
      setNews(newsArray);
      setLoading(false);
      setError(false);
    }, (error) => {
      console.warn("Erro ao buscar avisos: ", error);
      setLoading(false);
      setError(true);
    });

    return () => unsubscribe();
  }, [user]);

  const getFirstName = () => {
    if (userData && userData.name) {
      return userData.name.split(' ')[0];
    }
    return 'Visitante';
  };

  const handleAddNews = async () => {
    if (!newMessage.trim()) {
      Alert.alert("Atenção", "A mensagem do aviso não pode estar vazia.");
      return;
    }
    setSaving(true);
    try {
      await addDoc(collection(db, 'news'), {
        message: newMessage.trim(),
        publishDate: new Date().toISOString(),
        priority: newPriority
      });
      setNewMessage('');
      setNewPriority('normal');
      setModalVisible(false);
      Alert.alert("Sucesso", "Aviso publicado!");
    } catch (err) {
      console.warn('News add error:', err.code || err.message);
      Alert.alert("Erro", "Não foi possível publicar o aviso.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteNews = (newsId) => {
    Alert.alert(
      "Excluir Aviso",
      "Deseja realmente excluir este aviso?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteDoc(doc(db, 'news', newsId));
            } catch (err) {
              console.warn('News delete error:', err.code || err.message);
              Alert.alert("Erro", "Não foi possível excluir o aviso.");
            }
          }
        }
      ]
    );
  };

  return (
    <SafeAreaViewComponent>
      <HomeContainer>
        <HeaderContainer>
          <Ionicons name="sunny" size={32} color="#fcd34d" />
          <GreetingText>Olá, {getFirstName()}!</GreetingText>
          <SubTitle>A Paz do Senhor seja contigo hoje.</SubTitle>
        </HeaderContainer>

        <View style={styles.sectionHeader}>
          <SectionTitle>Avisos da Semana</SectionTitle>
          {isAdmin && (
            <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
              <Ionicons name="add-circle" size={32} color="#3b82f6" />
            </TouchableOpacity>
          )}
        </View>
        
        {loading ? (
          <ActivityIndicator size="large" color="#3b82f6" style={{ marginTop: 24 }} />
        ) : error ? (
          <View style={{ alignItems: 'center', marginTop: 24 }}>
            <Text style={{ color: '#ef4444', fontSize: 14 }}>Erro ao carregar avisos.</Text>
            <TouchableOpacity onPress={() => { setLoading(true); setError(false); }} style={{ marginTop: 8 }}>
              <Text style={{ color: '#3b82f6', fontSize: 14 }}>Tentar novamente</Text>
            </TouchableOpacity>
          </View>
        ) : news.length === 0 ? (
          <EmptyNewsText>Nenhum aviso no momento.</EmptyNewsText>
        ) : (
          news.map((item) => (
            <NewsCard key={item.id} priority={item.priority || 'normal'}>
              <NewsMessage>{item.message}</NewsMessage>
              <View style={styles.newsFooter}>
                <NewsDate>{item.publishDate ? new Date(item.publishDate).toLocaleDateString('pt-BR') : ''}</NewsDate>
                {isAdmin && (
                  <TouchableOpacity onPress={() => handleDeleteNews(item.id)}>
                    <Ionicons name="trash-outline" size={20} color="#ef4444" />
                  </TouchableOpacity>
                )}
              </View>
            </NewsCard>
          ))
        )}

      </HomeContainer>

      <Modal isVisible={modalVisible} onBackdropPress={() => setModalVisible(false)}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Novo Aviso</Text>
            <Text style={styles.modalLabel}>Mensagem</Text>
            <TextInput
              style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
              value={newMessage}
              onChangeText={setNewMessage}
              placeholder="Digite o aviso..."
              placeholderTextColor="#9ca3af"
              multiline
            />
            <Text style={[styles.modalLabel, { marginTop: 8 }]}>Prioridade</Text>
            <View style={styles.priorityRow}>
              <TouchableOpacity
                style={[styles.priorityButton, newPriority === 'normal' && styles.priorityActive]}
                onPress={() => setNewPriority('normal')}
              >
                <Text style={newPriority === 'normal' ? styles.priorityTextActive : {}}>Normal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.priorityButton, newPriority === 'high' && styles.priorityActiveHigh]}
                onPress={() => setNewPriority('high')}
              >
                <Text style={newPriority === 'high' ? styles.priorityTextActive : {}}>Alta</Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 16, gap: 8 }}>
              <Button label={saving ? "Publicando..." : "Publicar"} type="primary" onPress={handleAddNews} disabled={saving} />
              <Button label="Cancelar" type="secondary" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaViewComponent>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 24,
  },
  addButton: {
    marginTop: 24,
  },
  newsFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 16,
  },
  input: {
    borderColor: '#d1d5db',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  priorityRow: {
    flexDirection: 'row',
    gap: 8,
  },
  priorityButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  priorityActive: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  priorityActiveHigh: {
    backgroundColor: '#ef4444',
    borderColor: '#ef4444',
  },
  priorityTextActive: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  modalLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  }
});
