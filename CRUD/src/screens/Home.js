// HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button,TouchableOpacity,StyleSheet,Image } from 'react-native';
import { Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';

import { useIsFocused,useNavigation } from '@react-navigation/native';
const db = SQLite.openDatabase('employees.db');

export default function Home() {
  const [employees, setEmployees] = useState([]);
  const isFocus = useIsFocused();
  const navigation = useNavigation();

  function loadEmployees() {
    
    console.log("employess loaded");
    
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM Users', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setEmployees(temp);
      });
    });
    console.log(employees);
    
   
  
  }

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, address TEXT)'
      );
    });

    loadEmployees();
  }, [isFocus]);

 
  function deleteUser(id){
    
    db.transaction(tx => {
      console.log("button clicked",id);
      tx.executeSql(
        'DELETE FROM Users where id=?',
        [id],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'User deleted successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => {
                    loadEmployees();
                  },
                },
              ],
              {cancelable: false},
            );
          } else {
            alert('Please insert a valid User Id');
          }
        },
      );
    });
  };

  return (
    
    
    <View style={styles.container}>
      <FlatList
        data={employees}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity style={styles.userItem}>
              <Text style={styles.itemText}>{'Name: ' + item.name}</Text>
              <Text style={styles.itemText}>{'Email: ' + item.email}</Text>
              <Text style={styles.itemText}>{'Address: ' + item.address}</Text>
              
              <View style={styles.belowView}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('EditUser', {
                      data: {
                        name: item.name,
                        email: item.email,
                        address: item.address,
                        id: item.id,
                      },
                    });
                  }}>
                  <Image
                    source={require('../images/edit.png')}
                    style={styles.icons}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    deleteUser(item.id);
                  }}>
                  <Image
                    source={require('../images/delete.png')}
                    style={styles.icons}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      <TouchableOpacity
        style={styles.addNewBtn}
        onPress={() => {
          navigation.navigate('AddUser');
        }}>
        <Text style={styles.btnText}>Add New User</Text>
      </TouchableOpacity>
    </View>
    
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
 
  addNewBtn: {
    backgroundColor: 'red',
    width: 150,
    height: 50,
    borderRadius: 20,
    position: 'absolute',
    bottom: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
  },
  userItem: {
    width: '95%',
    backgroundColor: '#fff',
    padding: 10,
    marginTop:10,
    marginLeft:'2.5%'
  },
  itemText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  belowView: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 20,
    backgroundColor: 'lightyellow',
    borderRadius: 10,
    height: 50,
  },
  icons: {
    width: 20,
    height: 20,
  },
});
