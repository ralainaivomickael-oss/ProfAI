import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView } from 'react-native';
import { io } from "socket.io-client";
import * as Speech from 'expo-speech';

const socket = io("http://192.168.1.190:3000"); // ← remplace par ton IP locale

export default function App() {

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {

    socket.on("message", (msg) => {

      setMessages(prev => [...prev, msg]);

      if (msg.sender === "IA") {
        Speech.speak(msg.text); // IA parle
      }

    });

  }, []);

  const sendMessage = () => {

    socket.emit("message", {
      sender: "user",
      text: message
    });

    setMessage("");

  };

  return (
    <View style={{flex:1, padding:20}}>

      <ScrollView style={{flex:1}}>
        {messages.map((msg, index) => (
          <Text key={index}>
            {msg.sender} : {msg.text}
          </Text>
        ))}
      </ScrollView>

      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Message..."
        style={{borderWidth:1, padding:10, marginBottom:10}}
      />

      <Button title="Envoyer" onPress={sendMessage} />

    </View>
  );
}
