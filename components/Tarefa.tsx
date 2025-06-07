import { SQLiteDatabase } from "expo-sqlite"
import _tarefa from "../types/tarefa"
import { Button, View, Text, StyleSheet } from "react-native"


type _propsTarefa = {
    dados: _tarefa,
    db: SQLiteDatabase,
    recarregar: any
}

export default function Tarefa(props: _propsTarefa){
    
    const excluir = async () => {
        await props.db.runAsync("DELETE FROM tarefas WHERE id = ?", props.dados.id);
        await props.recarregar();
    }

    const concluir = async () => {
        await props.db.runAsync("UPDATE tarefas SET concluido = 1 WHERE id = ?", props.dados.id);
        await props.recarregar();
    }

    const renderStatus = () => {
        if(props.dados.concluido)
            return <Text>Concluido</Text>
        return <Button title="Concluir" onPress={concluir}/>
    }

    const styles = StyleSheet.create({
      view: {
        backgroundColor: "black",
        height: 100,
      },
      
    });

    return <View>
        <Text style={styles.view}>{props.dados.texto}</Text>
        <Button title="Excluir" onPress={excluir} color={"red"}/>
        <Button title="Concluir" onPress={concluir} color={"green"}/>
    </View>

    
}