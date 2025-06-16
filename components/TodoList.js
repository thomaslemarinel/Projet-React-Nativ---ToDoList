import React, { useState } from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList } from 'react-native'
import todoData from '../Helpers/todoData'
import TodoItem from './TodoItem'

export default function TodoList () {
  //setTodos -> setter recuperé avec le useState de la liste
  //useState -> permet d'ajouter et de gérer l'état dans des composants (permet d'initialiser les états : todos, count, newTodoText)
  const [todos, setTodos] = useState(todoData)
  const [count, setCount] = useState(todos.filter(item => item.done).length)
  const [newTodoText, setNewTodoText] = useState('')

  const updateCount = () => {
    setCount(todos.filter(item => item.done).length)
  }

  const updateItem = id => {
    const newTodos = todos.map((item) => {return {id: item.id, content: item.content, done: (item.id == id) ? ! item.done : item.done}})
    setTodos(newTodos)
    setCount(newTodos.filter(item => item.done).length)
  }

  const deleteTodo = id => {
    const newTodos = todos.filter(item => item.id != id)
    setTodos(newTodos)
    setCount(newTodos.filter(item => item.done).length)
  }
  
  const addNewTodo = () => {
    if (newTodoText == '') return
    setTodos([
      ...todos,
      {
        id: todos.length ? Math.max(...todos.map(item => item.id)) + 1 : 1,
        content: newTodoText,
        done: false
      }
    ])
    setNewTodoText('')
    updateCount()
  }
  
  const checkAll = () => {
    const newTodos = todos.map((item) => {return {id: item.id, content: item.content, done: true}})
    console.log(newTodos)
    setTodos(newTodos)
    updateCount(newTodos.length)
  }

  const uncheckAll = () => {
    const newTodos = todos.map((item) => {return {id: item.id, content: item.content, done: false}})
    console.log(newTodos)
    setTodos(newTodos)
    updateCount(0)
  }

  const showCompleted = () => {
    const completedTodos = todos.filter(item => item.done);
    setTodos(completedTodos);
    updateCount(completedTodos.length)
  };

  const showUncompleted = () => {
    const uncompletedTodos = todos.filter(item => !item.done);
    setTodos(uncompletedTodos);
    updateCount(uncompletedTodos.length)
  };

  return (
      <View style={{ margin: 10 }}>
        <Text>{count} items réalisés</Text>
        <View style={styles.entreeTexte}>
          <View>
            <TextInput
              style={styles.vue_entree}
              onChangeText={setNewTodoText}
              placeholder='saisir ici un nouvel item'
              onSubmitEditing={addNewTodo}
              value={newTodoText}
            />
          </View>
          <View style={styles.vue_bouton}>
            <Button onPress={addNewTodo} title='new' />
          </View>
        </View>
        <FlatList
          style={{ paddingLeft: 10 }}
          data={todos}
          renderItem={({ item }) => (
            <TodoItem
              item={item}
              updateItem={updateItem}
              deleteTodo={deleteTodo}
            />
          )}
        />
        <View style={styles.vue_bouton}>
          <Button onPress={checkAll} title='Cocher tous les tâches' />
        </View>
        <View style={styles.vue_bouton}>
          <Button onPress={uncheckAll} title='Décocher tous les tâches' />
        </View>
        <View style={styles.vue_bouton}>
          <Button onPress={showCompleted} title='Afficher uniquement les tâches cochées' />
        </View>
        <View style={styles.vue_bouton}>
          <Button onPress={showUncompleted} title='Afficher uniquement les tâches non cochées' />
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  entreeTexte: {
    flexDirection: 'row'
  },
  vue_entree: {
    margin: 12,
    borderWidth: 1,
    padding: 10
  },
  vue_bouton: {
    margin: 5,
    paddingTop: 3
  },
})