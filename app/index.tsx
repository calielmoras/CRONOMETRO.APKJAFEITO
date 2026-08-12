import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [tempo, setTempo] = useState(0); // tempo em milissegundos
  const [rodando, setRodando] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (rodando) {
      intervalRef.current = setInterval(() => {
        setTempo((prev) => prev + 10);
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [rodando]);

  const formatarTempo = (ms) => {
    const minutos = Math.floor(ms / 60000);
    const segundos = Math.floor((ms % 60000) / 1000);
    const centesimos = Math.floor((ms % 1000) / 10);
    return `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}.${String(centesimos).padStart(2, '0')}`;
  };

  const iniciarPausar = () => setRodando(!rodando);
  const zerar = () => {
    setRodando(false);
    setTempo(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.display}>{formatarTempo(tempo)}</Text>

      <View style={styles.botoes}>
        <TouchableOpacity
          style={[styles.botao, rodando ? styles.botaoPausar : styles.botaoIniciar]}
          onPress={iniciarPausar}
        >
          <Text style={styles.textoBotao}>{rodando ? 'Pausar' : 'Iniciar'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.botao, styles.botaoZerar]} onPress={zerar}>
          <Text style={styles.textoBotao}>Zerar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  display: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 50,
    fontVariant: ['tabular-nums'],
  },
  botoes: {
    flexDirection: 'row',
    gap: 20,
  },
  botao: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 50,
    minWidth: 110,
    alignItems: 'center',
  },
  botaoIniciar: {
    backgroundColor: '#4caf50',
  },
  botaoPausar: {
    backgroundColor: '#ff9800',
  },
  botaoZerar: {
    backgroundColor: '#f44336',
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});