import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { signUp } from '../api/sign';
import { TokenContext, UsernameContext } from '../Context/Context';

const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [, setToken] = useContext(TokenContext);
  const [, setUsernameContext] = useContext(UsernameContext);

  const handleSignUp = () => {
    signUp(username, password)
      .then(token => {
        setToken(token);
        setUsernameContext(username);
      })
      .catch(err => {
        setError(err.message);
      });
  };

  return (
    <View style={styles.text_input}>
      <TextInput
        style={styles.entree}
        placeholder="Nom d'utilisateur"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.entree}
        placeholder="Mot de passe"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="S'inscrire" color="#800020" onPress={handleSignUp} />
      {error ? <Text style={styles.erreur}>{error}</Text> : null}
      <Button title="Tu possèdes déja un compte ? Connecte toi !" color="#800020" onPress={() => navigation.navigate('Se connecter')} />
    </View>
  );
};

const styles = StyleSheet.create({
  text_input: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  entree: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
  erreur: {
    color: 'red',
    marginVertical: 10,
  },
});

export default SignUpScreen;
