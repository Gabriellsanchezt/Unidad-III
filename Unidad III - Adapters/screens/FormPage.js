import React from "react";
import { View, Text, TextInput, Switch, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addTask, updateTask } from "../store/taskSlice";
import ButtonCustom from "../components/ButtonCustom";
import { useRoute, useNavigation } from "@react-navigation/native";
import useToggleAlert from "../hooks/useToggleAlert";

export default function FormPage() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const { task } = route.params || {};
  const { showAlert } = useToggleAlert();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      title: task?.title || "",
      description: task?.description || "",
      completed: task?.completed || false,
    },
  });

  const onSubmit = (data) => {
    if (task) {
      dispatch(updateTask({ id: task.id, ...data }));
      showAlert("Tarea actualizada!");
    } else {
      dispatch(addTask(data));
      showAlert("Tarea agregada!");
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título *</Text>
      <Controller
        control={control}
        name="title"
        rules={{ required: "El título es obligatorio" }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Escribe el título"
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      <Text style={styles.label}>Descripción</Text>
      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Descripción (opcional)"
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      <Text style={styles.label}>¿Completada?</Text>
      <Controller
        control={control}
        name="completed"
        render={({ field: { onChange, value } }) => (
          <Switch value={value} onValueChange={onChange} />
        )}
      />

      <ButtonCustom title="Guardar" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#fff" },
  label: { fontWeight: "bold", marginTop: 15 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginTop: 5,
  },
});