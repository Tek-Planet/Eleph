import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  Alert,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import UserPermissions from "../utilities/UserPermissions";
import ExtraDimensions from "react-native-extra-dimensions-android";
import { FontAwesome5 } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import normalize from "react-native-normalize";
import { Entypo } from "@expo/vector-icons";
import Fire from "../Fire";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const isEmail = (email) => {
  const RegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regEx)) return true;
  else return false;
};

const isEmpty = (string) => {
  if (string.trim() === "") {
    return true;
  } else return false;
};

export default class RegisterScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
    //header: null
  };

  state = {
    user: {
      name: "",
      email: "",
      password: "",
      avatar: null,
    },
    errorMessage: null,
  };

  handleSignUp = () => {
    let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let alpha = /^[a-zA-Z]+$/;
    let check = alpha.test(this.state.user.name);
    let text;
    try {
      if (this.state.user.password.length < 6) {
        this.setState({ errorMessage: "Please enter at least 6 characters" });
      } else if (this.state.user.password.length > 20) {
        this.setState({ errorMessage: "Please enter less than 20 characters" });
      } else if (this.state.user.email == "") {
        this.setState({ errorMessage: "Email cant be empty!" });
      } else if (this.state.user.password == "") {
        this.setState({ errorMessage: "Password cant be empty!" });
      } else if (this.state.user.name == "") {
        this.setState({ errorMessage: "Name cant be empty!" });
      } else if (!check) {
        this.setState({ errorMessage: "Name field must be alphabetic" });
      } else if (reg.test(text) === false) {
        this.setState({ email: text });
      }

      Fire.shared.createUser(this.state.user);
    } catch (err) {
      console.log(err.toString());
    }
  };

  handlePickAvatar = async () => {
    UserPermissions.getCameraPermission();

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      this.setState({ user: { ...this.state.user, avatar: result.uri } });
    }
  };

  //metoda za pokretanje "Secret" ekrana:
  lastTap = 0;
  handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (this.lastTap && (now - this.lastTap) * 2.7 < DOUBLE_PRESS_DELAY) {
      this.props.navigation.navigate("Secret");
    } else {
      this.lastTap = now;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {/* <StatusBar barStyle="default"></StatusBar> */}

        <View style={{ flex: 1, alignItems: "center" }}>
          <TouchableOpacity
            style={styles.back}
            onPress={() => this.props.navigation.goBack()}
          >
            <MaterialCommunityIcons
              name="account-arrow-left-outline"
              size={24}
              color="white"
            />
            <Text style={{ color: "white", textDecorationLine: "underline" }}>
              Login
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logo} onPress={this.handleDoubleTap}>
            <Image
              source={require("../assets/LoadingLogoEleph.jpg")}
              style={{ width: 60, height: 52 }}
              //borderRadius={5}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <View
            style={{
              marginTop: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* <Text style={styles.greeting}>{`Hello!\nSign up to get started.`}</Text> */}
            <TouchableOpacity
              style={styles.avatarPlaceholder}
              onPress={this.handlePickAvatar}
            >
              <Image
                source={{ uri: this.state.user.avatar }}
                style={styles.avatar}
              />
              <Ionicons
                name="ios-add"
                size={50}
                color="white"
                //size={size}
                style={{ textAlign: "center" }}
              ></Ionicons>
            </TouchableOpacity>
            <Text
              style={{
                padding: 20,
                fontSize: responsiveFontSize(2),
                textAlign: "center",
              }}
            >
              <Text style={{ color: "white" }}>{`Welcome to `}</Text>
              <Text style={{ color: "#639dff" }}>Eleph </Text>
              <Text style={{ color: "#639dff" }}>
                {`sign up!\nTap on`}{" "}
                <Text style={{ color: "#639dff" }}>+ </Text>
                if you want to add your avatar now!
              </Text>
            </Text>
          </View>
        </View>

        <View style={styles.errorMessage}>
          {this.state.errorMessage && (
            <Text style={styles.error}>{this.state.errorMessage}</Text>
          )}
        </View>

        <View
          style={{
            position: "absolute",
            marginBottom: 20,
            bottom: 0,
            paddingHorizontal: 20,
            width: 400,
          }}
        >
          <View>
            <FontAwesome5
              name="user-edit"
              size={25}
              color="white"
              style={{ position: "absolute", top: 8, left: 10 }}
            />
            <TextInput
              style={styles.input}
              onChangeText={(name) =>
                this.setState({ user: { ...this.state.user, name } })
              }
              placeholder="Full name"
              placeholderTextColor="white"
              value={this.state.user.name}
            ></TextInput>
          </View>

          <View>
            <MaterialCommunityIcons
              name="email-outline"
              size={25}
              color="white"
              style={{ position: "absolute", top: 8, left: 10 }}
            />
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              placeholderTextColor="white"
              placeholder="Email address"
              onChangeText={(email) =>
                this.setState({ user: { ...this.state.user, email } })
              }
              value={this.state.user.email}
            ></TextInput>
          </View>

          <View>
            <MaterialCommunityIcons
              name="shield-lock"
              size={25}
              color="white"
              style={{ position: "absolute", top: 8, left: 10 }}
            />
            <TextInput
              style={styles.input}
              secureTextEntry
              //minLength={5}
              placeholder="Password"
              autoCapitalize="none"
              placeholderTextColor="white"
              onChangeText={(password) =>
                this.setState({ user: { ...this.state.user, password } })
              }
              value={this.state.user.password}
              errorText="Please enter a valid password."
            ></TextInput>
          </View>

          <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
            <Text style={{ color: "#FFF", fontWeight: "500" }}>Sign up</Text>
          </TouchableOpacity>
        </View>
        {/* onPress={() => this.props.navigation.navigate("Login")} */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6C6C6C",
    padding: 20,
  },
  greeting: {
    marginTop: 32,
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    color: "#FFF",
  },
  form: {
    marginHorizontal: 30,
    marginBottom: 20,
  },
  inputTitle: {
    color: "#8A8F9E",
    fontSize: 10,
    textTransform: "uppercase",
  },
  input: {
    //backgroundColor: "rgba(255,255,255,0.2)",
    marginBottom: 20,
    height: 45,
    fontSize: 16,
    paddingHorizontal: 10,
    color: "#639dff",
    paddingLeft: 50,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  button: {
    backgroundColor: "#639dff",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",

    //marginHorizontal: 30,
    //borderRadius: 4,
    //height: 52,
    //width: "45%",
    paddingHorizontal: 10,
    //marginBottom: 20,
    padding: 15,
    height: 45,
  },
  errorMessage: {
    padding: 20,
    //height: 200,
    alignItems: "center",
    justifyContent: "center",
    //marginHorizontal: 60
  },
  error: {
    color: "#E9446A",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
  back: {
    position: "absolute",
    //top: 50,

    alignItems: "center",
    left: 0,
    //paddingHorizontal: 10,
    //borderRadius: 12,
    backgroundColor: "#6C6C6C",
    width: 60,
    height: 52,
    justifyContent: "center",
    marginTop: 20,
  },
  logo: {
    flex: 1,
    position: "absolute",
    //padding:15,
    //top: 50,
    //overflow: "hidden",
    alignItems: "center",
    right: 10,
    //borderRadius : 60/2,
    backgroundColor: "#639dff",
    width: 60,
    height: 52,
    //height: responsiveScreenHeight(50), // 50% of Screen height
    //width: responsiveScreenWidth(50), // 50% of Screen width
    //justifyContent: "center",
    //marginBottom: 20,
    marginTop: 20,
  },
  avatarPlaceholder: {
    width: 52,
    height: 52,
    backgroundColor: "#E1E2E6",
    borderRadius: 50,
  },
  avatar: {
    position: "absolute",
    width: 52,
    height: 52,
    borderRadius: 50,
  },
});
