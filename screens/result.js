import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-web';

const Result = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View>
        <Text>Result</Text>
      </View>
      <View style={styles.bannerContain}>
        <Image
          style={styles.banner}
          resizeMode="contain"
          source={{
            uri: "https://image.shutterstock.com/image-photo/hand-choose-yes-true-blurred-260nw-1823098694.jpg",
          }}
        />
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Do Another Quiz</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Result;

const styles = StyleSheet.create({
  banner: {
    height: 300,
    width: 300,
  },
  bannerContain: {
    height: "31%",
    overflow: "hidden",
    alignItems: "center",
  },
  container: {
    paddingTop: 40,
    paddingHorizontal: 20,
    height: "100%",
  },
  buttonRow: {
    flex: 1,
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
});
