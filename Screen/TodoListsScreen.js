import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList, StyleSheet, Text, Button, TextInput } from 'react-native';
import { TokenContext, UsernameContext } from '../Context/Context'; 
import { createTodoList, getTodoLists, deleteTodoList } from '../api/todoList'; 
import { createTodo, getTodos, deleteTodo } from '../api/todo'; 
import TodoItem from '../components/TodoItem'; 

export default function TodoListsScreen() {
  const [todoLists, setTodoLists] = useState([]); 
  const [selectedTodoList, setSelectedTodoList] = useState(null); 
  const [newTodoListTitle, setNewTodoListTitle] = useState(''); 
  const [newTodoText, setNewTodoText] = useState(''); 
  const [count, setCount] = useState(0); 
  const [total, setTotal] = useState(0); 
  const [token] = useContext(TokenContext); 
  const [username] = useContext(UsernameContext); 
  const [filteredTasks, setFilteredTasks] = useState([]); 

  useEffect(() => {
    if (token && username) {
      getTodoLists(username, token)
        .then((lists) => {
          setTodoLists(lists);
        })
        .catch((error) => {
          console.error("Erreur lors du chargement des listes", error);
        });
    }
  }, [token, username]);

  const handleAddTodoList = () => {
    if (!newTodoListTitle.trim()) return;
    createTodoList(username, newTodoListTitle, token)
      .then((newList) => {
        setTodoLists([...todoLists, newList]);
        setNewTodoListTitle(''); 
      })
      .catch((error) => {
        console.error("Erreur lors de la création de la liste", error);
      });
  };


  const handleSelectTodoList = (todoList) => {
    if (!todoList.items) {
      getTodos(todoList.id, token)
        .then((items) => {
          todoList.items = items;
          setSelectedTodoList(todoList);
          setFilteredTasks(items); 
          setCount(items.filter(item => item.done).length);
          setTotal(items.length);
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des tâches", error);
        });
    } else {
      setSelectedTodoList(todoList);
      setFilteredTasks(todoList.items); 
      setCount(todoList.items.filter(item => item.done).length);
      setTotal(todoList.items.length);
    }
  };

  const getProgressPercentage = () => {
    if (total === 0) return 0;
    return (count / total) * 100;
  };

  const showAllTasks = () => {
    if (selectedTodoList) {
      setFilteredTasks(selectedTodoList.items);
    }
  };

  const showCompletedTasks = () => {
    if (selectedTodoList) {
      const completedTasks = selectedTodoList.items.filter(item => item.done);
      setFilteredTasks(completedTasks);
    }
  };

  const showUncompletedTasks = () => {
    if (selectedTodoList) {
      const uncompletedTasks = selectedTodoList.items.filter(item => !item.done);
      setFilteredTasks(uncompletedTasks);
    }
  };

  const handleDeleteTodoList = (id) => {
    deleteTodoList(id, token)
      .then((deletedCount) => {
        if (deletedCount > 0) {
          setTodoLists(todoLists.filter(todoList => todoList.id !== id));
          if (selectedTodoList && selectedTodoList.id === id) {
            setSelectedTodoList(null);
            setFilteredTasks([]);
            setCount(0);
            setTotal(0);
          }
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression de la liste", error);
      });
  };

  const handleAddTodoItem = () => {
    if (!newTodoText.trim()) return;
    if (!selectedTodoList.items) {
      selectedTodoList.items = []; 
    }

    createTodo(newTodoText, selectedTodoList.id, token)
      .then((newTodo) => {
        const updatedTodoList = {
          ...selectedTodoList,
          items: [...selectedTodoList.items, newTodo],
        };
        setSelectedTodoList(updatedTodoList);
        setNewTodoText('');
        setFilteredTasks(updatedTodoList.items); 
        setCount(updatedTodoList.items.filter(item => item.done).length);
        setTotal(updatedTodoList.items.length);
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout de la tâche", error);
      });
  };

  const updateTodoItem = (id) => {
    if (!selectedTodoList.items) {
      selectedTodoList.items = [];
    }
    const updatedItems = selectedTodoList.items.map(item => {
      if (item.id === id) {
        return { ...item, done: !item.done };
      }
      return item;
    });
    const updatedTodoList = { ...selectedTodoList, items: updatedItems };
    setSelectedTodoList(updatedTodoList);
    setFilteredTasks(updatedTodoList.items);
    setCount(updatedTodoList.items.filter(item => item.done).length);
  };

  const deleteTodoItem = (id) => {
    deleteTodo(id, token)
      .then(() => {
        if (!selectedTodoList.items) {
          selectedTodoList.items = [];
        }
        const updatedItems = selectedTodoList.items.filter(item => item.id !== id);
        const updatedTodoList = { ...selectedTodoList, items: updatedItems };
        setSelectedTodoList(updatedTodoList);
        setFilteredTasks(updatedTodoList.items); 
        setCount(updatedTodoList.items.filter(item => item.done).length);
        setTotal(updatedTodoList.items.length);
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression de la tâche", error);
      });
  };

  return (
    <View style={styles.container}>
      {/* Affichage des listes */}
      {selectedTodoList ? (
        <>
          <Text style={styles.compteur}>
            {count} tâches réalisées sur {total}
          </Text>
          <View style={styles.barre_backgound}>
            <View style={[styles.barre_progression, { width: `${getProgressPercentage()}%` }]} />
          </View>

          {/* Boutons de filtrage */}
          <View style={styles.boutons}>
            <Button title="Afficher toutes les tâches" color="grey" onPress={showAllTasks} />
            <View style={{ marginBottom: 5 }} />
            <Button title="Afficher les tâches réalisées" color="grey" onPress={showCompletedTasks} />
            <View style={{ marginBottom: 5 }} />
            <Button title="Afficher les tâches non réalisées" color="grey" onPress={showUncompletedTasks} />
          </View>

          {/* Listes filtrées */}
          <FlatList
            data={filteredTasks}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TodoItem
                item={item}
                updateItem={updateTodoItem}
                deleteTodo={deleteTodoItem}
              />
            )}
          />

          {/* Ajout de nouvelles tâches */}
          <TextInput
            style={styles.entree}
            onChangeText={setNewTodoText}
            value={newTodoText}
            placeholder="Ajouter une nouvelle tâche"
            onSubmitEditing={handleAddTodoItem}
          />
          <Button title="Ajouter" color="#800020" onPress={handleAddTodoItem} />
        </>
      ) : (
        <>
          {/* Création nouvelle liste */}
          <TextInput
            style={styles.entree}
            onChangeText={setNewTodoListTitle}
            value={newTodoListTitle}
            placeholder="Titre de la nouvelle liste"
          />
          <Button title="Ajouter" color="#800020" onPress={handleAddTodoList} />

          <View style={{ marginBottom: 20 }} />
          
          {/* Liste des listes */}
          <FlatList
            data={todoLists}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.liste}>
                <Button style={styles.bouton_liste} title={item.title} color="grey" onPress={() => handleSelectTodoList(item)} />
                <Button style={styles.bouton_liste} title="Supprimer la liste" color="grey" onPress={() => handleDeleteTodoList(item.id)} />
              </View>
              
            )}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  entree: {
    marginVertical: 10,
    padding: 8,
    borderWidth: 1,
    borderRadius: 5,
  },
  compteur: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  barre_backgound: {
    height: 10,
    width: '100%',
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginBottom: 20,
  },
  barre_progression: {
    height: '100%',
    backgroundColor: '#800020',
    borderRadius: 5,
  },
  liste: {
    marginBottom: 10,
  },
  bouton_liste: {
    marginVertical: 10,
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  boutons: {
    marginBottom: 20,
  }
});
