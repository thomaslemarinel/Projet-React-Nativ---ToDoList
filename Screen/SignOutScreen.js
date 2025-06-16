import React, { useContext } from 'react';
import { View, Button } from 'react-native';
import { TokenContext } from '../Context/Context';

const SignOutScreen = () => {
  //permet de récupérer la fonction setToken pour mettre à jour la valeur du token
  const [, setToken] = useContext(TokenContext);

  const handleSignOut = () => {
    setToken(null); //On supprime le token pour déconnecter l'utilisateur
  };

  return (
    <View>
      <Button title="Se déconnecter" color="#800020" onPress={handleSignOut} />
    </View>
  );
};

export default SignOutScreen;