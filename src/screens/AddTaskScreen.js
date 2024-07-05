import React, { useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

export default function AddTaskScreen({ route, navigation }) {
    const [task, setTask] = React.useState('');
    const index = route.params?.index;

    useEffect(() => {
        if (route.params?.task) {
            setTask(route.params.task);
        }
    }, [route.params]);

    const saveTask = () => {
        if (index !== undefined) {
            navigation.navigate('Home', { editedTask: task, index });
        } else {
            navigation.navigate('Home', { newTask: task });
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{index !== undefined ? 'Editar Tarea' : 'Añadir Tarea'}</Text>
            <TextInput
                style={styles.input}
                placeholder="Nueva tarea"
                value={task}
                onChangeText={setTask}
            />
            <TouchableOpacity style={styles.saveButton} onPress={saveTask}>
                <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 20,
        borderRadius: 5,
        backgroundColor: '#fff',
        fontSize: 18,
        color: '#333',
    },
    saveButton: {
        backgroundColor: 'green',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});