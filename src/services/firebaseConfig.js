import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// IMPORTANTE: O desenvolvedor DEVE preencher essas chaves com as do Console do Firebase
// para que a comunicação de dados funcione!
const firebaseConfig = {
  apiKey: "AIzaSyChumTTh9In6fQnPaISjZ3wVCX49NQ_YYc",
  authDomain: "appmetodista.firebaseapp.com",
  projectId: "appmetodista",
  storageBucket: "appmetodista.firebasestorage.app",
  messagingSenderId: "422969540670",
  appId: "1:422969540670:web:08ebf72877552b7834d16f",
  measurementId: "G-B38K0RJLTN"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exporta as instâncias dos serviços que vamos usar
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
