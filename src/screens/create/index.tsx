import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {useState} from 'react';
import {useAppDispatch} from '../../hooks';
import {createTask, Task} from '../../../state/store';
import {NativeStackScreenProps} from 'react-native-screens/native-stack';
import {RootStackParamList} from '../../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Create'>;

function CreateScreen({navigation}: Props): JSX.Element {
  const dispatch = useAppDispatch();

  const [task, setTask] = useState<Task>({
    date: Date.now().toString(),
    title: '',
    desc: '',
    id: Number(Date.now()),
    isOpen: true,
  });

  const onTitleInput = (event: string) => {
    setTask(prevState => {
      return {
        ...prevState,
        title: event,
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
    dispatch(createTask(task));
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

export default CreateScreen;
