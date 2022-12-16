import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {NativeStackScreenProps} from 'react-native-screens/native-stack';
import {RootStackParamList} from '../../../App';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {useState} from 'react';
import {editTask, Task} from '../../../state/store';

type Props = NativeStackScreenProps<RootStackParamList, 'Edit'>;

function EditTaskScreen({navigation, route}: Props) {
  const {id} = route.params;

  const dispatch = useAppDispatch();
  const tasks = useAppSelector(state => state.tasks);

  const [task, setTask] = useState<Task>(
    tasks.find(item => item.id === id) || {
      date: Date.now().toString(),
      title: '',
      id: 0,
      desc: '',
      isOpen: true,
    },
  );

  const onTitleInput = (event: string) => {
    setTask(prevState => {
      const title = event;
      return {
        ...prevState,
        title,
      };
    });
  };

  const onDescriptionInput = (event: string) => {
    setTask(prevState => {
      return {
        ...prevState,
        desc: event,
      };
    });
  };

  const onSave = () => {
    dispatch(editTask(task));
    navigation.navigate('HomeScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text>{task?.date}</Text>
        <Pressable onPress={onSave} style={styles.saveButton}>
          <Text style={styles.saveText}>Save</Text>
        </Pressable>
      </View>
      <TextInput
        value={task?.title}
        onChangeText={onTitleInput}
        placeholder="Title ..."
      />
      <TextInput
        value={task?.desc}
        multiline
        onChangeText={onDescriptionInput}
        placeholder="Description ..."
        style={styles.desc}
      />
    </View>
  );
}

export default EditTaskScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '80%',
  },
  topContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  desc: {
    flexGrow: 1,
    borderRadius: 8,
    borderColor: '#cdcdcd',
    borderWidth: 1,
  },
  saveButton: {
    borderRadius: 50,
    backgroundColor: '#00eaff',
    padding: 12,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveText: {
    color: '#ffffff',
    fontSize: 16,
  },
});
