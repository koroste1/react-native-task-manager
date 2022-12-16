import {NativeModules, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {changeStatus} from '../../../state/store';

type Props = {
  id: number;
};

function Task({id}: Props) {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(state => state.tasks);

  const currentTask = tasks.find(item => item.id === id);

  const {CustomModule} = NativeModules;

  const onPress = () => {
    CustomModule.showNotify(
      currentTask?.isOpen ? 'Task Closed' : 'Task Opened',
    );
    dispatch(changeStatus({id}));
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={[styles.text]}>{currentTask?.date}</Text>
        <Text style={[styles.text, styles.title]}>{currentTask?.title}</Text>
        <Text style={[styles.text, styles.desc]}>{currentTask?.desc}</Text>
      </View>
      <Pressable
        onPress={onPress}
        style={[
          styles.checkbox,
          currentTask && !currentTask?.isOpen && styles.isClosed,
        ]}>
        <Text>
          {currentTask && currentTask.isOpen ? 'Close Task' : 'Open Task'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkbox: {
    borderRadius: 50,
    borderColor: '#000',
    borderWidth: 1,
    padding: 12,
  },
  text: {
    maxHeight: 18,
    fontSize: 16,
  },
  title: {
    fontWeight: '600',
    color: '#000026',
    marginTop: 8,
  },
  desc: {
    marginTop: 8,
  },
  isClosed: {
    backgroundColor: '#00c000',
  },
});

export default Task;
