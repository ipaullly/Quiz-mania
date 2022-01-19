import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import Title from '../components/title';
import { TouchableOpacity } from 'react-native-web';

const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Title />
      <View style={styles.bannerContain}>
        <Image
          style={styles.banner}
          resizeMode="contain"
          source={{
            uri: "https://cdn.pixabay.com/photo/2019/05/22/22/28/brainstorm-4222728_960_720.jpg",
          }}
        />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Quiz")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  banner: {
    height: 300,
    width: 300,
  },
  bannerContain: {
    alignItems: "center",
    flex: 1,
  },
  container: {
    paddingTop: 40,
    paddingHorizontal: 20,
    height: "100%",
  },
  button: {
    backgroundColor: "#2F3A8F",
    width: "100%",
    padding: 20,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 22,
    fontWeight: "600",
    color: "white",
  },
});
