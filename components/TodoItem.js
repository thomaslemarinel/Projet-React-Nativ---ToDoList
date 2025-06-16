import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Image } from 'react-native';
import { updateTodo } from '../api/todo'; 
import { TokenContext } from '../Context/Context'; 

export default function TodoItem(props) {
  const [done, setDone] = useState(props.item.done); 
  const [token] = useContext(TokenContext); 

  const handleSwitchChange = async () => {
    const newDoneStatus = !done;
    setDone(newDoneStatus); 

    try {
      if (!token) {
        throw new Error('Erreur de token');
      }

      await updateTodo(props.item.id, newDoneStatus, token);

      if (props.updateItem) {
        props.updateItem(props.item.id, newDoneStatus);
      }
    }
    catch (error) {
      console.error("Erreur lors de la mise à jour de la tâche", error);
      setDone(done);
    }
  };

  return (
    <View style={styles.contenu}>
      {/* Switch pour modifier l'état à 'done' */}
      <Switch
        value={done}
        onValueChange={handleSwitchChange}
      />
      
      {/* Nom de la tâche */}
      <Text
        style={[
          styles.texte,
          { textDecorationLine: done ? 'line-through' : 'none' } // On barre le texte si la tache est 'done'
        ]}
      >
        {props.item.content}
      </Text>
      
      {/* Poubelle de suppression */}
      <TouchableOpacity onPress={() => props.deleteTodo(props.item.id)}>
        <Image
          source={require('../assets/trash-can-outline.png')}
          style={styles.poubelle}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  contenu: {
    flexDirection: 'row',   
    alignItems: 'center',   
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  texte: {
    marginLeft: 15,         
    fontSize: 16,           
    flex: 1,               
  },
  poubelle: {
    height: 24,             
    width: 24,            
  },
});
