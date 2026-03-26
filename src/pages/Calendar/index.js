import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, View, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaViewComponent } from '../../styles';
import { collection, onSnapshot, query, orderBy, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../services/firebaseConfig';
import { AuthContext } from '../../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { Button } from "../../components/Button";
import { Text } from 'native-base';
import Modal from 'react-native-modal';
import {
  CalendarContainer,
  HeaderContainer,
  PageTitle,
  EventCard,
  EventHeader,
  EventTitle,
  EventTypeBadge,
  EventTypeText,
  EventDescription,
  EventDateRow,
  EventDateText,
  EmptyEventsText
} from './styles';

export default function Calendar() {
  const { isAdmin } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newType, setNewType] = useState('special');

  useEffect(() => {
    const q = query(collection(db, 'events'), orderBy('date', 'asc'));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const eventsArray = [];
      querySnapshot.forEach((doc) => {
        eventsArray.push({ id: doc.id, ...doc.data() });
      });
      setEvents(eventsArray);
      setLoading(false);
    }, (error) => {
      if (error.code !== 'permission-denied') {
        console.warn("Erro ao buscar agenda: ", error);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDateInput = (text) => {
    let cleaned = text.replace(/\D/g, '');
    if (cleaned.length > 12) cleaned = cleaned.substring(0, 12);

    if (cleaned.length <= 2) {
      setNewDate(cleaned);
    } else if (cleaned.length <= 4) {
      setNewDate(`${cleaned.slice(0, 2)}/${cleaned.slice(2)}`);
    } else if (cleaned.length <= 8) {
      setNewDate(`${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4)}`);
    } else if (cleaned.length <= 10) {
      setNewDate(`${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)} ${cleaned.slice(8)}`);
    } else {
      setNewDate(`${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)} ${cleaned.slice(8, 10)}:${cleaned.slice(10, 12)}`);
    }
  };

  const handleAddEvent = async () => {
    if (!newTitle.trim() || !newDate.trim()) {
      Alert.alert("Atenção", "Título e data são obrigatórios.");
      return;
    }

    // Parse dd/mm/yyyy HH:mm to ISO
    const parts = newDate.match(/^(\d{2})\/(\d{2})\/(\d{4})\s?(\d{2})?:?(\d{2})?$/);
    if (!parts) {
      Alert.alert("Atenção", "Formato de data inválido. Use dd/mm/yyyy HH:mm");
      return;
    }
    const [, day, month, year, hour = '00', minute = '00'] = parts;
    const isoDate = new Date(year, month - 1, day, hour, minute).toISOString();

    try {
      await addDoc(collection(db, 'events'), {
        title: newTitle.trim(),
        description: newDescription.trim(),
        date: isoDate,
        type: newType
      });
      setNewTitle('');
      setNewDescription('');
      setNewDate('');
      setNewType('special');
      setModalVisible(false);
      Alert.alert("Sucesso", "Evento criado!");
    } catch (err) {
      console.warn('Event add error:', err.code || err.message);
      Alert.alert("Erro", "Não foi possível criar o evento.");
    }
  };

  const handleDeleteEvent = (eventId) => {
    Alert.alert(
      "Excluir Evento",
      "Deseja realmente excluir este evento?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteDoc(doc(db, 'events', eventId));
            } catch (err) {
              console.warn('Event delete error:', err.code || err.message);
              Alert.alert("Erro", "Não foi possível excluir o evento.");
            }
          }
        }
      ]
    );
  };

  return (
    <SafeAreaViewComponent>
      <CalendarContainer>
        <HeaderContainer>
          <View style={styles.headerRow}>
            <View>
              <Ionicons name="calendar-outline" size={32} color="white" />
              <PageTitle>Agenda da Igreja</PageTitle>
            </View>
            {isAdmin && (
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Ionicons name="add-circle" size={36} color="white" />
              </TouchableOpacity>
            )}
          </View>
        </HeaderContainer>
        
        {loading ? (
          <ActivityIndicator size="large" color="#1e3a8a" style={{ marginTop: 32 }} />
        ) : events.length === 0 ? (
          <EmptyEventsText>Nenhum evento programado no momento.</EmptyEventsText>
        ) : (
          events.map((evt) => (
            <EventCard key={evt.id}>
              <EventHeader>
                <EventTitle>{evt.title}</EventTitle>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <EventTypeBadge type={evt.type}>
                    <EventTypeText type={evt.type}>
                      {evt.type === 'fixed' ? 'Fixado' : 'Especial'}
                    </EventTypeText>
                  </EventTypeBadge>
                  {isAdmin && (
                    <TouchableOpacity onPress={() => handleDeleteEvent(evt.id)}>
                      <Ionicons name="trash-outline" size={20} color="#ef4444" />
                    </TouchableOpacity>
                  )}
                </View>
              </EventHeader>

              <EventDescription>{evt.description}</EventDescription>

              <EventDateRow>
                <Ionicons name="time-outline" size={16} color="#6b7280" />
                <EventDateText>{formatDate(evt.date)}</EventDateText>
              </EventDateRow>
            </EventCard>
          ))
        )}
        <View style={{ height: 32 }} />
      </CalendarContainer>

      <Modal isVisible={modalVisible} onBackdropPress={() => setModalVisible(false)}>
        <View style={styles.modalContent}>
          <Text fontSize="lg" bold mb={3}>Novo Evento</Text>

          <Text fontSize="sm" color="gray.500" mb={1}>Título *</Text>
          <TextInput
            style={styles.input}
            value={newTitle}
            onChangeText={setNewTitle}
            placeholder="Ex: Culto de Oração"
          />

          <Text fontSize="sm" color="gray.500" mb={1} mt={2}>Descrição</Text>
          <TextInput
            style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
            value={newDescription}
            onChangeText={setNewDescription}
            placeholder="Detalhes do evento..."
            multiline
          />

          <Text fontSize="sm" color="gray.500" mb={1} mt={2}>Data e Hora * (dd/mm/yyyy HH:mm)</Text>
          <TextInput
            style={styles.input}
            value={newDate}
            onChangeText={handleDateInput}
            placeholder="25/03/2026 19:00"
            keyboardType="numeric"
            maxLength={16}
          />

          <Text fontSize="sm" color="gray.500" mb={1} mt={2}>Tipo</Text>
          <View style={styles.typeRow}>
            <TouchableOpacity
              style={[styles.typeButton, newType === 'special' && styles.typeActiveSpecial]}
              onPress={() => setNewType('special')}
            >
              <Text style={newType === 'special' ? styles.typeTextActive : {}}>Especial</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.typeButton, newType === 'fixed' && styles.typeActiveFixed]}
              onPress={() => setNewType('fixed')}
            >
              <Text style={newType === 'fixed' ? styles.typeTextActive : {}}>Fixo</Text>
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 16, gap: 8 }}>
            <Button label="Criar Evento" type="primary" onPress={handleAddEvent} />
            <Button label="Cancelar" type="secondary" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </SafeAreaViewComponent>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
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
  typeRow: {
    flexDirection: 'row',
    gap: 8,
  },
  typeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  typeActiveSpecial: {
    backgroundColor: '#be185d',
    borderColor: '#be185d',
  },
  typeActiveFixed: {
    backgroundColor: '#1d4ed8',
    borderColor: '#1d4ed8',
  },
  typeTextActive: {
    color: 'white',
    fontWeight: 'bold',
  }
});
