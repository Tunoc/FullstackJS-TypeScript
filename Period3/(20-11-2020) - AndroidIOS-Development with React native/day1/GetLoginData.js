import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Modal } from "react-native";

export default function GetLoginData(props) {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [distance, setDistance] = useState("0");
    const { onLoginDataReady, visible, onCancel } = props;

    const submit = () => {
        const loginData = { userName, password, distance }
        onLoginDataReady(loginData);
        setUserName("")
        setPassword("")
        setDistance("0")
    }

    return (
        <Modal visible={visible} animationType="slide">
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Enter Username"
                    value={userName}
                    onChangeText={(txt) => setUserName(txt)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Enter Password"
                    value={password}
                    onChangeText={(txt) => setPassword(txt)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Enter Radius (in meters)"
                    value={distance}
                    onChangeText={(txt) => setDistance(txt)}
                    style={styles.input}
                />
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button title="CANCEL" color="red" onPress={onCancel} />
                    </View>
                    <View style={styles.button}>
                        <Button title="ADD" onPress={submit} />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    input: {
        width: "80%",
        borderColor: "black",
        borderWidth: 1,
        padding: 10,
        marginBottom: 10
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "60%"
    },
    button: {
        width: "40%"
    }
});


