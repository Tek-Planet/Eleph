import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  Dimensions,
} from "react-native";
import Fire from "../Fire";
//import Button from 'MyButton';
import Loader from "../components/loader";

export default class ProfileScreen extends React.Component {
  state = {
    user: {},
    loading: false,
  };

  unsubscribe = null;

  async componentDidMount() {
    this.setState({ loading: true });
    const user = Fire.shared.uid;
    //console.log(user);
    this.unsubscribe = await Fire.shared.firestore
      .collection("users")
      .doc(user)
      .onSnapshot((doc) => {
        this.setState({ loading: false, user: doc.data() });
      });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <View style={styles.container}>
        <Loader loading={this.state.loading} />
        <View style={{ marginTop: 64, alignItems: "center" }}>
          <View style={styles.avatarContainer}>
            <Image
              source={
                this.state.user.avatar
                  ? { uri: this.state.user.avatar }
                  : require("../assets/tempAvatar.jpg")
              }
              style={styles.avatar}
            />
          </View>
          <Text style={styles.name}>{this.state.user.name}</Text>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statAmount}>21</Text>
            <Text style={styles.statTitle}>Posts</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statAmount}>981</Text>
            <Text style={styles.statTitle}>Followers</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statAmount}>63</Text>
            <Text style={styles.statTitle}>Following</Text>
          </View>
        </View>

        <Button
          onPress={() => {
            Fire.shared.signOut();
          }}
          title="Log out"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profile: {
    marginTop: 64,
    alignItems: "center",
  },
  avatarContainer: {
    shadowColor: "#151734",
    shadowRadius: 30,
    shadowOpacity: 0.4,
  },
  avatar: {
    width: 136,
    height: 136,
    borderRadius: 68,
  },
  name: {
    marginTop: 24,
    fontSize: 16,
    fontWeight: "600",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 32,
  },
  stat: {
    alignItems: "center",
    flex: 1,
  },
  statAmount: {
    color: "#4F566D",
    fontSize: 18,
    fontWeight: "300",
  },
  statTitle: {
    color: "#C3C5CD",
    fontSize: 12,
    fontWeight: "500",
    marginTop: 4,
  },
});
