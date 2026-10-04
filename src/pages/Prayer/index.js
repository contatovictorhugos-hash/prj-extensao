import React, { useContext, useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
  Platform,
  KeyboardAvoidingView
} from 'react-native';
import { SafeAreaViewComponent } from '../../styles';
import { AuthContext } from '../../context/AuthContext';
import { db } from '../../services/firebaseConfig';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  writeBatch,
  increment,
  serverTimestamp
} from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../components/Button';
import Modal from 'react-native-modal';
import {
  PrayerContainer,
  HeaderContainer,
  HeaderTop,
  HeaderTitleContainer,
  PageTitle,
  SubTitle,
  AddPrayerButton,
  AddPrayerButtonText,
  FilterTabsContainer,
  FilterTabButton,
  FilterTabText,
  PrayerCard,
  CardHeader,
  AuthorContainer,
  AvatarImage,
  AvatarPlaceholder,
  AuthorMeta,
  AuthorName,
  PrayerDate,
  ActionIconsContainer,
  BadgeContainer,
  Badge,
  BadgeText,
  PrayerMessage,
  CardFooter,
  PrayingButton,
  PrayingButtonText,
  PrayingCounterBadge,
  PrayingCounterText,
  ConfidentialNotice,
  ConfidentialNoticeText,
  EmptyContainer,
  EmptyText,
  EmptySubText
} from './styles';

export default function Prayer() {
  const { user, userData, isAdmin } = useContext(AuthContext);

  const [activeTab, setActiveTab] = useState('public'); // 'public' | 'mine' | 'confidential'
  const [prayers, setPrayers] = useState([]);
  const [userSupportedPrayers, setUserSupportedPrayers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  // Modal de novo pedido
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [visibility, setVisibility] = useState('public'); // 'public' | 'confidential'
  const [isUrgent, setIsUrgent] = useState(false);
  const [saving, setSaving] = useState(false);

  // Escuta os pedidos de oração em tempo real no Firestore
  useEffect(() => {
    setLoading(true);
    setError(false);

    let q;
    try {
      if (activeTab === 'public') {
        q = query(
          collection(db, 'prayers'),
          where('visibility', '==', 'public'),
          orderBy('createdAt', 'desc')
        );
      } else if (activeTab === 'mine') {
        if (!user) {
          setPrayers([]);
          setLoading(false);
          return;
        }
        q = query(
          collection(db, 'prayers'),
          where('authorId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );
      } else if (activeTab === 'confidential') {
        q = query(
          collection(db, 'prayers'),
          where('visibility', '==', 'confidential'),
          orderBy('createdAt', 'desc')
        );
      }
    } catch (e) {
      console.warn("Erro ao montar query de orações:", e);
    }

    if (!q) {
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const list = [];
        querySnapshot.forEach((documentSnap) => {
          list.push({ id: documentSnap.id, ...documentSnap.data({ serverTimestamps: 'estimate' }) });
        });
        setPrayers(list);
        setLoading(false);
        setError(false);
      },
      (err) => {
        console.warn("Erro ao carregar pedidos de oração:", err);
        setLoading(false);
        setError(true);
      }
    );

    return () => unsubscribe();
  }, [activeTab, user, retryCount]);

  // Carrega o status de "Estou Orando" do usuário logado para os pedidos exibidos
  useEffect(() => {
    if (!user || prayers.length === 0) {
      setUserSupportedPrayers({});
      return;
    }

    let isMounted = true;
    const checkSupportStatus = async () => {
      const statusMap = {};
      await Promise.all(
        prayers.map(async (item) => {
          try {
            const supporterDoc = await getDoc(doc(db, 'prayers', item.id, 'supporters', user.uid));
            if (supporterDoc.exists()) {
              statusMap[item.id] = true;
            }
          } catch (e) {
            // Ignora erro pontual de leitura em modo offline
          }
        })
      );
      if (isMounted) {
        setUserSupportedPrayers(statusMap);
      }
    };

    checkSupportStatus();

    return () => {
      isMounted = false;
    };
  }, [prayers, user]);

  const handleOpenNewPrayerModal = () => {
    if (!user) {
      Alert.alert("Atenção", "Faça login com sua conta para enviar um pedido de oração.");
      return;
    }
    setMessage('');
    setVisibility('public');
    setIsUrgent(false);
    setModalVisible(true);
  };

  const handleCreatePrayer = async () => {
    if (!user) {
      Alert.alert("Atenção", "Usuário não autenticado.");
      return;
    }

    if (!message.trim()) {
      Alert.alert("Atenção", "Por favor, descreva seu pedido de oração.");
      return;
    }

    if (message.length > 500) {
      Alert.alert("Atenção", "O pedido de oração deve ter no máximo 500 caracteres.");
      return;
    }

    setSaving(true);
    try {
      await addDoc(collection(db, 'prayers'), {
        message: message.trim(),
        visibility,
        urgent: isUrgent,
        prayingCount: 0,
        authorId: user.uid,
        authorName: userData?.name || 'Membro da Igreja',
        authorPhoto: userData?.avatarUrl || '',
        createdAt: serverTimestamp()
      });

      setMessage('');
      setVisibility('public');
      setIsUrgent(false);
      setModalVisible(false);

      Alert.alert(
        "Sucesso",
        visibility === 'confidential'
          ? "Pedido confidencial enviado diretamente à liderança pastoral."
          : "Seu pedido foi publicado no Mural de Orações!"
      );
    } catch (err) {
      console.warn("Erro ao salvar pedido de oração:", err);
      Alert.alert("Erro", "Não foi possível enviar o pedido de oração.");
    } finally {
      setSaving(false);
    }
  };

  const handleTogglePraying = async (prayerId, currentCount = 0) => {
    if (!user) {
      Alert.alert("Atenção", "Faça login para demonstrar seu apoio em oração.");
      return;
    }

    const isCurrentlySupported = !!userSupportedPrayers[prayerId];

    // Atualização otimista local para resposta imediata
    setUserSupportedPrayers(prev => ({
      ...prev,
      [prayerId]: !isCurrentlySupported
    }));

    try {
      const batch = writeBatch(db);
      const prayerRef = doc(db, 'prayers', prayerId);
      const supporterRef = doc(db, 'prayers', prayerId, 'supporters', user.uid);

      if (isCurrentlySupported) {
        batch.delete(supporterRef);
        batch.update(prayerRef, {
          prayingCount: increment(-1)
        });
      } else {
        batch.set(supporterRef, {
          supportedAt: serverTimestamp(),
          userName: userData?.name || 'Membro'
        });
        batch.update(prayerRef, {
          prayingCount: increment(1)
        });
      }

      await batch.commit();
    } catch (err) {
      console.warn("Erro ao alternar apoio em oração:", err);
      // Reverte estado otimista em caso de falha
      setUserSupportedPrayers(prev => ({
        ...prev,
        [prayerId]: isCurrentlySupported
      }));
      Alert.alert("Erro", "Não foi possível atualizar o apoio em oração.");
    }
  };

  const handleDeletePrayer = (prayerId) => {
    Alert.alert(
      "Excluir Pedido",
      "Deseja realmente remover este pedido de oração?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteDoc(doc(db, 'prayers', prayerId));
            } catch (err) {
              console.warn("Erro ao excluir pedido:", err);
              Alert.alert("Erro", "Não foi possível excluir o pedido.");
            }
          }
        }
      ]
    );
  };

  const formatDate = (createdAt) => {
    if (!createdAt) return 'Enviando...';
    if (createdAt.toDate) {
      return createdAt.toDate().toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    }
    if (typeof createdAt === 'string') {
      return new Date(createdAt).toLocaleDateString('pt-BR');
    }
    return '';
  };

  return (
    <SafeAreaViewComponent>
      <PrayerContainer>
        <HeaderContainer>
          <HeaderTop>
            <HeaderTitleContainer>
              <Ionicons name="heart" size={32} color="#f43f5e" />
              <PageTitle>Mural de Orações</PageTitle>
              <SubTitle>Compartilhe pedidos e interceda junto à congregação.</SubTitle>
            </HeaderTitleContainer>
            <AddPrayerButton onPress={handleOpenNewPrayerModal}>
              <Ionicons name="add" size={18} color="white" />
              <AddPrayerButtonText>Novo Pedido</AddPrayerButtonText>
            </AddPrayerButton>
          </HeaderTop>
        </HeaderContainer>

        {/* Abas de filtro */}
        <FilterTabsContainer>
          <FilterTabButton
            active={activeTab === 'public'}
            onPress={() => setActiveTab('public')}
          >
            <FilterTabText active={activeTab === 'public'}>Mural Geral</FilterTabText>
          </FilterTabButton>

          {user && (
            <FilterTabButton
              active={activeTab === 'mine'}
              onPress={() => setActiveTab('mine')}
            >
              <FilterTabText active={activeTab === 'mine'}>Meus Pedidos</FilterTabText>
            </FilterTabButton>
          )}

          {isAdmin && (
            <FilterTabButton
              active={activeTab === 'confidential'}
              onPress={() => setActiveTab('confidential')}
            >
              <FilterTabText active={activeTab === 'confidential'}>Confidenciais</FilterTabText>
            </FilterTabButton>
          )}
        </FilterTabsContainer>

        {/* Listagem de pedidos */}
        {loading ? (
          <ActivityIndicator size="large" color="#312e81" style={{ marginTop: 32 }} />
        ) : error ? (
          <View style={{ alignItems: 'center', marginTop: 32 }}>
            <Text style={{ color: '#ef4444', fontSize: 14 }}>Erro ao carregar pedidos de oração.</Text>
            <TouchableOpacity onPress={() => setRetryCount(c => c + 1)} style={{ marginTop: 8 }}>
              <Text style={{ color: '#4f46e5', fontSize: 14, fontWeight: 'bold' }}>Tentar novamente</Text>
            </TouchableOpacity>
          </View>
        ) : prayers.length === 0 ? (
          <EmptyContainer>
            <Ionicons name="chatbubbles-outline" size={56} color="#c7d2fe" />
            <EmptyText>Nenhum pedido de oração encontrado.</EmptyText>
            <EmptySubText>
              {activeTab === 'mine'
                ? "Você ainda não cadastrou nenhum pedido de oração."
                : activeTab === 'confidential'
                ? "Nenhum pedido confidencial pendente para a liderança."
                : "Seja o primeiro a compartilhar um motivo de intercessão!"}
            </EmptySubText>
          </EmptyContainer>
        ) : (
          prayers.map((item) => {
            const isSupported = !!userSupportedPrayers[item.id];
            const canDelete = isAdmin || (user && user.uid === item.authorId);

            return (
              <PrayerCard
                key={item.id}
                urgent={item.urgent}
                visibility={item.visibility}
              >
                <CardHeader>
                  <AuthorContainer>
                    {item.authorPhoto ? (
                      <AvatarImage source={{ uri: item.authorPhoto }} />
                    ) : (
                      <AvatarPlaceholder>
                        <Ionicons name="person" size={20} color="#4338ca" />
                      </AvatarPlaceholder>
                    )}
                    <AuthorMeta>
                      <AuthorName numberOfLines={1}>{item.authorName || 'Membro da Igreja'}</AuthorName>
                      <PrayerDate>{formatDate(item.createdAt)}</PrayerDate>
                    </AuthorMeta>
                  </AuthorContainer>

                  <ActionIconsContainer>
                    {canDelete && (
                      <TouchableOpacity onPress={() => handleDeletePrayer(item.id)}>
                        <Ionicons name="trash-outline" size={20} color="#ef4444" />
                      </TouchableOpacity>
                    )}
                  </ActionIconsContainer>
                </CardHeader>

                <BadgeContainer>
                  {item.urgent && (
                    <Badge variant="urgent">
                      <BadgeText variant="urgent">Urgente</BadgeText>
                    </Badge>
                  )}
                  {item.visibility === 'confidential' && (
                    <Badge variant="confidential">
                      <BadgeText variant="confidential">Confidencial (Pastoral)</BadgeText>
                    </Badge>
                  )}
                </BadgeContainer>

                <PrayerMessage>{item.message}</PrayerMessage>

                <CardFooter>
                  {item.visibility === 'public' ? (
                    <PrayingButton
                      isSupported={isSupported}
                      onPress={() => handleTogglePraying(item.id, item.prayingCount || 0)}
                    >
                      <Ionicons
                        name={isSupported ? "heart" : "heart-outline"}
                        size={18}
                        color={isSupported ? "#e11d48" : "#4b5563"}
                      />
                      <PrayingButtonText isSupported={isSupported}>
                        {isSupported ? "Orando" : "Estou Orando"}
                      </PrayingButtonText>
                      <PrayingCounterBadge isSupported={isSupported}>
                        <PrayingCounterText>{item.prayingCount || 0}</PrayingCounterText>
                      </PrayingCounterBadge>
                    </PrayingButton>
                  ) : (
                    <ConfidentialNotice>
                      <Ionicons name="lock-closed" size={14} color="#7c3aed" />
                      <ConfidentialNoticeText>Visível apenas para o autor e a liderança</ConfidentialNoticeText>
                    </ConfidentialNotice>
                  )}
                </CardFooter>
              </PrayerCard>
            );
          })
        )}

        <View style={{ height: 36 }} />
      </PrayerContainer>

      {/* Modal para criar novo pedido de oração */}
      <Modal isVisible={modalVisible} onBackdropPress={() => setModalVisible(false)}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Novo Pedido de Oração</Text>

            <Text style={styles.modalLabel}>Motivo de Oração *</Text>
            <TextInput
              style={[styles.input, { height: 110, textAlignVertical: 'top' }]}
              value={message}
              onChangeText={setMessage}
              placeholder="Descreva o motivo pelo qual deseja que a congregação ou a pastoral ore..."
              placeholderTextColor="#9ca3af"
              multiline
              maxLength={500}
            />
            <Text style={styles.charCounter}>{message.length}/500</Text>

            <Text style={[styles.modalLabel, { marginTop: 4 }]}>Visibilidade</Text>
            <View style={styles.optionsRow}>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  visibility === 'public' && styles.optionButtonActivePublic
                ]}
                onPress={() => setVisibility('public')}
              >
                <Ionicons
                  name="people-outline"
                  size={16}
                  color={visibility === 'public' ? 'white' : '#4b5563'}
                />
                <Text style={visibility === 'public' ? styles.optionTextActive : styles.optionText}>
                  Público (Mural)
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.optionButton,
                  visibility === 'confidential' && styles.optionButtonActiveConfidential
                ]}
                onPress={() => setVisibility('confidential')}
              >
                <Ionicons
                  name="lock-closed-outline"
                  size={16}
                  color={visibility === 'confidential' ? 'white' : '#4b5563'}
                />
                <Text style={visibility === 'confidential' ? styles.optionTextActive : styles.optionText}>
                  Confidencial (Pastoral)
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={[styles.modalLabel, { marginTop: 12 }]}>Prioridade</Text>
            <View style={styles.optionsRow}>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  !isUrgent && styles.optionButtonActiveNormal
                ]}
                onPress={() => setIsUrgent(false)}
              >
                <Text style={!isUrgent ? styles.optionTextActive : styles.optionText}>
                  Normal
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.optionButton,
                  isUrgent && styles.optionButtonActiveUrgent
                ]}
                onPress={() => setIsUrgent(true)}
              >
                <Ionicons
                  name="alert-circle-outline"
                  size={16}
                  color={isUrgent ? 'white' : '#4b5563'}
                />
                <Text style={isUrgent ? styles.optionTextActive : styles.optionText}>
                  Urgente
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ marginTop: 20, gap: 8 }}>
              <Button
                label={saving ? "Enviando..." : "Enviar Pedido"}
                type="primary"
                onPress={handleCreatePrayer}
                disabled={saving}
              />
              <Button
                label="Cancelar"
                type="secondary"
                onPress={() => setModalVisible(false)}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaViewComponent>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 14,
  },
  modalLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4b5563',
    marginBottom: 6,
  },
  input: {
    borderColor: '#d1d5db',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    color: '#1f2937',
  },
  charCounter: {
    fontSize: 11,
    color: '#9ca3af',
    textAlign: 'right',
    marginTop: 4,
    marginBottom: 4,
  },
  optionsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  optionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: '#f9fafb',
  },
  optionButtonActivePublic: {
    backgroundColor: '#312e81',
    borderColor: '#312e81',
  },
  optionButtonActiveConfidential: {
    backgroundColor: '#7c3aed',
    borderColor: '#7c3aed',
  },
  optionButtonActiveNormal: {
    backgroundColor: '#4b5563',
    borderColor: '#4b5563',
  },
  optionButtonActiveUrgent: {
    backgroundColor: '#dc2626',
    borderColor: '#dc2626',
  },
  optionText: {
    fontSize: 12,
    color: '#4b5563',
    fontWeight: '500',
  },
  optionTextActive: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
  },
});
