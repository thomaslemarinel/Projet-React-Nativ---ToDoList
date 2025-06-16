import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { signIn } from '../api/sign';
import { TokenContext, UsernameContext } from '../Context/Context';

const SignInScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [, setToken] = useContext(TokenContext);
  const [, setUsernameContext] = useContext(UsernameContext);

  const handleSignIn = () => {
    signIn(username, password)
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
      <Button title="Se connecter" color="#800020" onPress={handleSignIn} />
      {error ? <Text>{error}</Text> : null}
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
});

export default SignInScreen;