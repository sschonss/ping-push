import { Stack } from 'expo-router';
import { View, Text } from './src/components/StyledComponents';

export default function App() {
  return (
    <>
      <Stack />
      {/* Exemplo de uso dos componentes estilizados */}
      <View style={{ position: 'absolute', bottom: 16, left: 0, right: 0, alignItems: 'center' }}>
        <View style={{ 
          backgroundColor: '#3b82f6', 
          paddingHorizontal: 16, 
          paddingVertical: 8, 
          borderRadius: 8 
        }}>
          <Text style={{ 
            color: 'white', 
            fontWeight: 'bold', 
            textAlign: 'center' 
          }}>
            Componentes estilizados estão funcionando! 🎉
          </Text>
        </View>
      </View>
    </>
  );
}
