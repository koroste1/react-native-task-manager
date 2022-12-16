import {Pressable, ScrollView, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from 'react-native-screens/native-stack';
import {BottomTabList} from '../../../App';
import {useAppSelector} from '../../hooks';
import Task from '../../components/task';
import React from 'react';

type Props = NativeStackScreenProps<BottomTabList, 'Closed'>;

function ClosedScreen({navigation}: Props): JSX.Element {
  const tasks = useAppSelector(state => state.tasks);

  const openTasks = tasks.filter(item => !item.isOpen);

  const onPress = (id: number) => {
    navigation.navigate('Edit', {
      id,
    });
  };

  return (
    <ScrollView style={styles.container}>
      {openTasks.length > 0 &&
        openTasks.map(({id}) => (
          <Pressable onPress={() => onPress(id)} key={id}>
            <Task id={id} />
          </Pressable>
        ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    flexDirection: 'column',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    margin: 16,
  },
  subTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    margin: 16,
  },
  input: {
    padding: 12,
    fontSize: 16,
    borderStyle: 'solid',
    borderColor: 'red',
    borderWidth: 2,
    borderRadius: 16,
  },
  output: {
    marginTop: 12,
    fontSize: 16,
  },
  randomValue: {
    fontSize: 32,
    color: 'black',
    margin: 20,
  },
  containerRow: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});

export default ClosedScreen;
