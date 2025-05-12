import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {deleteNote} from '../redux/actions/noteActions';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const notes = useSelector(state => state.notesState.notes);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleDelete = id => {
    Alert.alert('Notu Sil', 'Bu notu silmek istediğinize emin misiniz?', [
      {text: 'İptal', style: 'cancel'},
      {
        text: 'Sil',
        style: 'destructive',
        onPress: () => dispatch(deleteNote(id)),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>🗒️ Notlarım</Text>

      <FlatList
        data={notes}
        keyExtractor={item => item.id}
        contentContainerStyle={{paddingBottom: 100}}
        renderItem={({item}) => (
          <View style={styles.noteCard}>
            <View style={styles.noteHeader}>
              <Text style={styles.noteTitle}>{item.title}</Text>
              <Text style={styles.noteDate}>{item.date}</Text>
            </View>
            <Text style={styles.noteText}>{item.description}</Text>

            <View style={styles.actionContainer}>
              <TouchableOpacity
                style={[styles.button, styles.editBtn]}
                onPress={() =>
                  navigation.navigate('AddNote', {note: item, type: 'edit'})
                }>
                <Text style={styles.buttonText}>Düzenle</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.deleteBtn]}
                onPress={() => handleDelete(item.id)}>
                <Text style={styles.buttonText}>Sil</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddNote')}>
        <Text style={{color: 'white', fontSize: 30}}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, backgroundColor: '#f9f9f9'},
  header: {fontSize: 26, fontWeight: 'bold', marginBottom: 16, color: '#333'},
  noteCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  noteDate: {
    fontSize: 12,
    color: '#888',
  },
  noteText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  editBtn: {
    backgroundColor: '#4CAF50',
  },
  deleteBtn: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#007AFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
});

export default HomeScreen;
