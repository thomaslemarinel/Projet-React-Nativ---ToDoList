import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { UsernameContext } from '../Context/Context';

export default function HomeScreen() {
  //on recupere la valeur de l'username
  const [username] = useContext(UsernameContext);

  return (
    <View>
      <Text>Bienvenue {username} ! Tu es désormais connecté à ton compte !</Text>
    </View>
  );
}