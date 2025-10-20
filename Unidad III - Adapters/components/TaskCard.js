import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { deleteTask } from "../store/taskSlice";

export default function TaskCard({ task, navigation }) {
  const dispatch = useDispatch();

  return (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{task.title}</Text>
        <Text>{task.description}</Text>
        <Text style={{ color: task.completed ? "green" : "red" }}>
          {task.completed ? "Completada" : "Pendiente"}
        </Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Form", { task })}
          style={styles.edit}
        >
          <Text style={styles.textBtn}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dispatch(deleteTask(task.id))} style={styles.delete}>
          <Text style={styles.textBtn}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 6,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: { fontWeight: "bold", fontSize: 16 },
  edit: {
    backgroundColor: "#4B9CD3",
    padding: 6,
    borderRadius: 6,
    marginBottom: 5,
  },
  delete: {
    backgroundColor: "#e74c3c",
    padding: 6,
    borderRadius: 6,
  },
  textBtn: { color: "#fff", fontSize: 12 },
});