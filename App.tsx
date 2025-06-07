import * as SQLite from 'expo-sqlite';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import _tarefa from './types/tarefa';
import Tarefa from './components/Tarefa';

const db = SQLite.openDatabaseSync('to-do.sqlite')

export default function App() {
  const [novaTarefa, setNovaTarefa] = useState<string>('');
  const[tarefas, setTarefas] = useState<_tarefa[]>([]);

  useEffect(()=>{
    db.execSync(`CREATE TABLE IF NOT EXISTS tarefas(
                  id INTEGER PRIMARY KEY NOT NULL,
                  texto VARCHAR(100),
                  concluifo INTEGER DEFAULT 0
                )`);
    recarregar();
  }, [])

  const recarregar = async () => {
    let temp: _tarefa[] = await db.getAllAsync('SELECT * FROM tarefas');
    setTarefas(temp);
  }

  const adicionar = async ()=>{
    if(novaTarefa == ''){
      Alert.alert('Insira um título!');
      return;
    }
    
    await db.runAsync('INSERT INTO tarefas (texto) VALUES (?)', novaTarefa)

    setNovaTarefa('');
    await recarregar();
  }

  const viewLista = ()=>{
    let lista = tarefas.map(t=>
      <Tarefa dados={t} db={db} recarregar={recarregar} key={t.id}/>
    );
    return lista;
  }

  return (
    <View>
      <TextInput 
        style={styles.input}
        value={novaTarefa} 
        onChangeText={setNovaTarefa}
      />
      <Button title='Adicionar' onPress={adicionar} color={"blue"}/>
      <View>
        {viewLista()}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 40,
    backgroundColor: "gray"
    
  },
  
});