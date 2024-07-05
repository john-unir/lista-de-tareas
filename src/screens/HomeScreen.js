import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

export default function HomeScreen({ route, navigation }) {
    const [tasks, setTasks] = React.useState([]);

    useEffect(() => {
        if (route.params?.newTask) {
            setTasks(prevTasks => [...prevTasks, route.params.newTask]);
        } else if (route.params?.editedTask) {
            setTasks(prevTasks =>
                prevTasks.map((task, index) =>
                    index === route.params.index ? route.params.editedTask : task
                )
            );
        }
    }, [route.params]);

    const deleteTask = (index) => {
        setTasks(prevTasks => prevTasks.filter((_, i) => i !== index));
    };

    const renderItem = ({ item, index }) => (
        <View style={styles.taskContainer}>
            <Text style={styles.taskText}>{item}</Text>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.editButton]}
                    onPress={() => navigation.navigate('AddTask', { task: item, index })}
                >
                    <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.deleteButton]}
                    onPress={() => deleteTask(index)}
                >
                    <Text style={styles.buttonText}>Eliminar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={tasks}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
            <TouchableOpacity
                style={[styles.button, styles.addButton]}
                onPress={() => navigation.navigate('AddTask')}
            >
                <Text style={styles.buttonText}>Añadir Tarea</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 20,
        backgroundColor: '#f5f5f5',
    },
    taskContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: '#fff',
        marginVertical: 5,
        borderRadius: 5,
    },
    taskText: {
        fontSize: 18,
        color: '#333',
    },
    buttonsContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    button: {
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    editButton: {
        backgroundColor: 'green',
    },
    deleteButton: {
        backgroundColor: 'red',
    },
    addButton: {
        backgroundColor: 'green',
        padding: 15,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});