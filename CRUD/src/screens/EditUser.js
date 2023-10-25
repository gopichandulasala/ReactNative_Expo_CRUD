import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button,StyleSheet,TouchableOpacity } from 'react-native';
import * as SQLite from 'expo-sqlite';
import {useNavigation, useRoute} from '@react-navigation/native';
import { Alert } from 'react-native';
const db = SQLite.openDatabase('employees.db');

export default function EditUser() {
  const route = useRoute();
  console.log(route.params.data);
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState(route.params.data.email);
  const [address, setAddress] = useState(route.params.data.address);
  function updateUser(){
    console.log("Button clicked");
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE Users set name=?, email=? , address=? where id=?',
        [name, email, address, route.params.data.id],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'User updated successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('Home'),
                },
              ],
              {cancelable: false},
            );
          } else alert('Updation Failed');
        },
      );
    });
  };
  useEffect(() => {
    setName(route.params.data.name);
    setEmail(route.params.data.email);
    setAddress(route.params.data.address);
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter User Name"
        style={styles.input}
        value={name}
        onChangeText={txt => setName(txt)}
      />
      <TextInput
        placeholder="Enter User Email"
        value={email}
        onChangeText={txt => setEmail(txt)}
        style={[styles.input, {marginTop: 20}]}
      />
      <TextInput
        placeholder="Enter User Address"
        value={address}
        onChangeText={txt => setAddress(txt)}
        style={[styles.input, {marginTop: 20}]}
      />
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => {
          EditUser();
        }}>
        <Text style={styles.btnText}>Save User</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    width: '80%',
    height: 50,
    borderRadius: 10,
    borderWidth: 0.3,
    alignSelf: 'center',
    paddingLeft: 20,
    marginTop: 100,
  },
  addBtn: {
    backgroundColor: 'red',
    width: '80%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    alignSelf: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
  },
});
