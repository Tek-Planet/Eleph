import React from "react";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import SideBar from "./components/SideBar";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Ionicons } from "@expo/vector-icons";
import LoadingScreen from "./screens/LoadingScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

import HomeScreen from "./screens/HomeScreen";
import MessageScreen from "./screens/MessageScreen";
import { Dimensions } from "react-native";
//import { DrawerActions } from 'react-navigation';
import PostDetails from "./screens/PostDetails";
import PostScreen from "./screens/PostScreen";
import NotificationScreen from "./screens/PostDetails";
import ProfileScreen from "./screens/ProfileScreen";
import SecretScreen from "./screens/SecretScreen";
import { createDrawerNavigator, DrawerActions } from "react-navigation-drawer";

const MyProfileStack  = createStackNavigator(
    {
        default: createBottomTabNavigator(
            {
                Home: {
                    screen: HomeScreen,
                    navigationOptions: {
                        tabBarIcon: ({ tintColor }) => <Ionicons name="ios-home" size={24} color={tintColor} />
                    }
                },
                Message: {
                    screen: MessageScreen,
                    navigationOptions: {
                        tabBarIcon: ({ tintColor }) => <Ionicons name="ios-chatboxes" size={24} color={tintColor} />
                    }
                },
                Post: {
                    screen: PostScreen,
                    navigationOptions: {
                        tabBarIcon: ({ tintColor }) => (
                            <Ionicons
                                name="ios-add-circle"
                                size={48}
                                color="#E9446A"
                                style={{
                                    shadowColor: "#E9446A",
                                    shadowOffset: { width: 0, height: 10 },
                                    shadowRadius: 10,
                                    shadowOpacity: 0.3
                                }}
                            />
                        )
                    }
                },
                Notification: {
                    screen: NotificationScreen,
                    navigationOptions: {
                        tabBarIcon: ({ tintColor }) => <Ionicons name="ios-notifications" size={24} color={tintColor} />
                    }
                },
                Profile: {
                    screen: ProfileScreen,
                    navigationOptions: {
                        tabBarIcon: ({ tintColor }) => <Ionicons name="ios-person" size={24} color={tintColor} />
                    }
                }
            },
            {
                defaultNavigationOptions: {
                    tabBarOnPress: ({ navigation, defaultHandler }) => {
                        if (navigation.state.key === "Post") {
                            navigation.navigate("postModal");
                        } else {
                            defaultHandler();
                        }
                    }
                },
                tabBarOptions: {
                    activeTintColor: "#161F3D",
                    inactiveTintColor: "#B8BBC4",
                    showLabel: false
                }
            }
        ),
        postModal: {
            screen: PostScreen
        }
    },
    {
        mode: "modal",
        headerMode: "none"
        // initialRouteName: "postModal"
    }
);

const AuthStack = createStackNavigator({
    Login: LoginScreen,
    Register: RegisterScreen,
    Secret: SecretScreen
});

const DrawerStack = createDrawerNavigator({
    MyProfileStack: { screen: MyProfileStack },
    AuthStack: {screen: AuthStack },
    PostDetails:{screen: PostDetails}
    },
    {
    contentComponent: props => <SideBar {...props} />,

        drawerWidth: Dimensions.get("window").width * 0.85,
        hideStatusBar: true,

        contentOptions: {
            activeBackgroundColor: "rgba(212,118,207, 0.2)",
            activeTintColor: "#53115B",
            itemsContainerStyle: {
                marginTop: 16,
                marginHorizontal: 8
            },
            itemStyle: {
                borderRadius: 4
            }
        }
    }
);

    const App = createSwitchNavigator(
        {
            Loading: LoadingScreen,
            App: MyProfileStack,
            Auth: AuthStack,
            Drawer: DrawerStack,
            
        },
        {
            initialRouteName: "Drawer"
        }
    );


export default createAppContainer(App);
//var firebaseConfig = {
  //apiKey: "AIzaSyDwUBce3WYEl78xA6aag5nzb1xh2xC8dZQ",
  //authDomain: "eleph-6fee9.firebaseapp.com",
  //databaseURL: "https://eleph-6fee9.firebaseio.com",
  //projectId: "eleph-6fee9",
  //storageBucket: "eleph-6fee9.appspot.com",
  //messagingSenderId: "403017984463",
  //appId: "1:403017984463:web:098a3d5faffd76e3a28aba",
  //measurementId: "G-DMNRMF10LG"
//};
// Initialize Firebase
//firebase.initializeApp(firebaseConfig);
//firebase.analytics();

