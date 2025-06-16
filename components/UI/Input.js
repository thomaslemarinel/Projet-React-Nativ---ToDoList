import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default function Input({ placeholder, onSubmit, buttonTitle }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = () => {
    //On vérifie si l'entrée est non vide
    if (inputValue.trim()) {
      onSubmit(inputValue);
      setInputValue(''); //On remet le champ vide après l'ajout d'un toDo
    }
    else {
      alert("Le nom de la tâche ne peut pas être vide !");
    }
  };

  return (
    <View style={styles.container_entree}>
      <TextInput
        style={styles.entree}
        placeholder={placeholder}
        value={inputValue}
        onChangeText={setInputValue}
      />
      <Button title={buttonTitle} color="#800020" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container_entree: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  entree: {
    flex: 1,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
});