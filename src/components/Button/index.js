// importando os componentes do react native
import { TouchableOpacity, Text, StyleSheet } from "react-native"


// Definindo o componente de Button para aplicação
// Recebendo a prop type, label e onPress
export const Button = ({ type, label, onPress }) => {
  return (
    <TouchableOpacity
      // para aplicar o estilo do botão, é verificado seu tipo, se é primario ou secundario
      style={type === 'primary' ? styles.buttonPrimary : styles.buttonSecondary}

      // passando a propriedade onPress recebida via parametros para o método onPress do botão
      onPress={onPress}
    >
      {/* para aplicar o estilo do texto do botão, é verificado seu tipo, se é primario ou secundario */}
      <Text style={type === 'primary' ? styles.textPrimary : styles.textSecondary}>{label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonPrimary: {
    backgroundColor: '#1991E3',
    display: 'flex',
    justifyContent: 'center',
    color: 'white',
    alignItems: 'center',
    borderRadius: 16,
    padding: 16,
    width: '50%'
  },
  buttonSecondary: {
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,    
    padding: 16,
    borderColor: 'black',
    borderWidth: 1,
    width: '50%'
  },
  textPrimary: {
    color: 'white',
    // fontSize: '16',
    fontWeight: 'bold'
  },
  textSecondary: {
    color: 'black',
    // fontSize: '16',
    fontWeight: 'bold'
  }
});