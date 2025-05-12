import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';

import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {addNote, updateNote} from '../redux/actions/noteActions';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

const AddNoteScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const {note, type} = route.params || {};

  useEffect(() => {
    if (type === 'edit' && note) {
      setTitle(note.title);
      setDescription(note.description);
    }
  }, []);

  const handleAddNote = () => {
    if (!title || !description) return;

    const updatedNote = {
      id: type === 'edit' ? note.id : Date.now().toString(),
      title,
      description,
      date: new Date().toLocaleString(),
    };

    if (type === 'edit') {
      dispatch(updateNote(updatedNote));
    } else {
      dispatch(addNote(updatedNote));
    }

    setTitle('');
    setDescription('');
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>📝 Yeni Not Ekle</Text>

      <TextInput
        placeholder="Başlık"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
        placeholderTextColor="#aaa"
      />
      <TextInput
        placeholder="Açıklama"
        value={description}
        onChangeText={setDescription}
        style={[styles.input, {height: 100}]}
        multiline
        placeholderTextColor="#aaa"
      />

      <TouchableOpacity style={styles.button} onPress={handleAddNote}>
        <Text style={styles.buttonText}>Kaydet</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16},
  header: {fontSize: 22, fontWeight: 'bold', marginBottom: 20},
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {color: '#fff', fontWeight: 'bold'},
});

export default AddNoteScreen;
