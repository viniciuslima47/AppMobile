import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();
const dark = '#000000';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen
            name="Login"
            component={TelaLogin}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Cadastro" component={TelaCadastro} />
          <Stack.Screen name="Lista de Contatos"
            component={TelaListaDeContatos}
            options={({ navigation }) => ({
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('Adicionar Contato')}
                  style={{ marginRight: 15 }}
                >
                  <Ionicons name="add-outline" size={24} color="black" />
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen name="Adicionar Contato" component={TelaAdicionarContato} />
          <Stack.Screen name="Editar Contato" component={TelaEditarContato} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

// Tela Login
function TelaLogin({ navigation }) {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Image
        style={styles.tinyLogo}
        source={{ uri: 'https://marketplace.canva.com/A5alg/MAESXCA5alg/1/tl/canva-user-icon-MAESXCA5alg.png' }}
      />

      <View style={styles.container_inputs}>
        <Text>Login</Text>
        <TextInput
          style={styles.input}
          value={login}
          onChangeText={setLogin}
          autoCapitalize="none"
        />

        <Text>Senha</Text>
        <TextInput
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />
      </View>

      <View style={styles.container_btn}>
        <TouchableOpacity
          style={styles.botao}
          onPress={() => navigation.navigate('Lista de Contatos')}
        >
          <Text style={styles.texto}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botao}
          onPress={() => navigation.navigate('Cadastro')}
        >
          <Text style={styles.texto}>Cadastro</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Tela Cadastro 
function TelaCadastro() {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function cadastrar() {
    alert('Cadastro realizado com sucesso!');
  }

  return (
    <View style={styles.container}>
      <View style={styles.container_inputs}>
        <Text>Nome</Text>
        <TextInput style={styles.input} value={nome} onChangeText={setNome} />

        <Text>CPF</Text>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          value={cpf}
          onChangeText={setCpf}
        />

        <Text>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text>Senha</Text>
        <TextInput
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />
      </View>

      <View style={styles.container_btn}>
        <TouchableOpacity style={styles.botao} onPress={cadastrar}>
          <Text style={styles.texto}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ===== Tela Lista de Contatos =====
function TelaListaDeContatos({ navigation }) {
  const contatos = [
    { id: '1', nome: 'Gustavo Vilane', numero: '(81) 91234-6853' },
    { id: '2', nome: 'Romulo Batata', numero: '(81) 91237-5478' },
    { id: '3', nome: 'Lucas Calado', numero: '(81) 91234-6853' },
    { id: '4', nome: 'Carlos Falante', numero: '(81) 98765-4321' },
  ];

  const [selectedId, setSelectedId] = useState(null);

  const Item = ({ nome, numero }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Editar Contato', {
          nome: nome,
          numero: numero,
        })
      }
    >
      <View style={styles.contato}>
        <Image
          style={styles.tinyLogo}
          source={{ uri: 'https://marketplace.canva.com/A5alg/MAESXCA5alg/1/tl/canva-user-icon-MAESXCA5alg.png' }}
        />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.nome}>{nome}</Text>
          <Text style={styles.numero}>{numero}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (

    <SafeAreaView style={styles.container}>
      <FlatList
        data={contatos}
        renderItem={({ item }) => <Item nome={item.nome} numero={item.numero} />}
        keyExtractor={item => item.id}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
}

// ===== Tela Adicionar Contato =====

function TelaAdicionarContato() {

  const [nome, setNome] = useState('');
  const [numero, setNumero] = useState('');

  function cadastrarContato() {
    alert('Contato cadastrado com sucesso!');
  }

  return (
    <View style={styles.container}>
      <View style={styles.container_inputs}>
        <Text>Nome</Text>
        <TextInput style={styles.input} value={nome} onChangeText={setNome} />

        <Text>Numero</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          maxLength={11}
          value={numero}
          onChangeText={setNumero}
        />
      </View>

      <View style={styles.container_btn}>
        <TouchableOpacity style={styles.botao} onPress={cadastrarContato}>
          <Text style={styles.texto}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ===== Editar Contato =====

function TelaEditarContato({ route }) {
  const { nome, numero } = route.params;
  const [novoNome, setNovoNome] = useState(nome);
  const [novoNumero, setNovoNumero] = useState(numero);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Image
        style={styles.tinyLogo}
        source={{ uri: 'https://marketplace.canva.com/A5alg/MAESXCA5alg/1/tl/canva-user-icon-MAESXCA5alg.png' }}
      />

      <View style={styles.container_inputs}>
        <Text>Nome</Text>
        <TextInput
          style={styles.input}
          value={novoNome}
          onChangeText={novoNome}
          autoCapitalize="none"
        />

        <Text>Numero</Text>
        <TextInput
          style={styles.input}
          value={novoNumero}
          onChangeText={novoNumero}
        />
      </View>

      <View style={styles.container_btn}>
        <TouchableOpacity
          style={styles.botaosalvar}
          onPress={() => {
            alert('Contato Salvo!');
          }}
        >
          <Text style={styles.texto}>Salvar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoexcluir}
          onPress={() => navigation.navigate('Lista de Contatos')}
        >
          <Text style={styles.texto}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ===== Styles =====
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },

  tinyLogo: {
    width: 50,
    height: 50,
    marginBottom: 20,
    borderRadius: 25,
  },

  input: {
    backgroundColor: '#fff',
    height: 40,
    marginVertical: 8,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },

  botao: {
    backgroundColor: 'rgb(0, 170, 255)',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },

  botaosalvar: {
    backgroundColor: 'rgb(72, 234, 83)',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },

  botaoexcluir: {
    backgroundColor: 'rgb(225, 42, 42)',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },

  texto: {
    color: '#fff',
    fontWeight: 'bold',
  },

  container_btn: {
    gap: 10,
    marginTop: 20,
    width: 200,
  },

  container_inputs: {
    width: 200,
  },

  contato: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },

  nome: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  numero: {
    color: '#555',
  },
});