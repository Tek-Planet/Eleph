// import React from "react";
// import { View, Text, StyleSheet, TouchableOpacity, StatusBar, SafeAreaView, Platform } from "react-native";
// import { Ionicons } from "@expo/vector-icons";

// export default class MessageScreen extends React.Component {
//     render() {
//         return (
//             <View style={{paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
//             <View style={styles.container}>
//             <StatusBar barStyle="default"></StatusBar>
//             <View style={{flex:1,alignItems: "center" }}>
//             <SafeAreaView>
//             <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
//                         <Ionicons name="md-arrow-back" size={24} color="#D8D9DB"></Ionicons>
//                     </TouchableOpacity>
//                 <Text>Message Screen</Text>
//                 </SafeAreaView>
//             </View>
//             </View>
//             </View>
//         );
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: "center",
//         justifyContent: "center"
//     },
//     back: {
//         position: "absolute",
//         //top: 50,

//         alignItems: "center",
//         left: 0,
//         //paddingHorizontal: 10,
//         //borderRadius: 12,
//         backgroundColor: "#6C6C6C",
//         width: 60,
//         height: 52,
//         justifyContent: "center",
//         marginTop: 20
//     }
// });

import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from "react-native";

export default class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: 1,
          image: "https://bootdey.com/img/Content/avatar/avatar1.png",
          name: "Frank Odalthh",
          comment:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
        },
        {
          id: 2,
          image: "https://bootdey.com/img/Content/avatar/avatar6.png",
          name: "John DoeLink",
          comment:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
        },
        {
          id: 3,
          image: "https://bootdey.com/img/Content/avatar/avatar7.png",
          name: "March SoulLaComa",
          comment:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
        },
        {
          id: 4,
          image: "https://bootdey.com/img/Content/avatar/avatar2.png",
          name: "Finn DoRemiFaso",
          comment:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
        },
        {
          id: 5,
          image: "https://bootdey.com/img/Content/avatar/avatar3.png",
          name: "Maria More More",
          comment:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
        },
        {
          id: 6,
          image: "https://bootdey.com/img/Content/avatar/avatar4.png",
          name: "Clark June Boom!",
          comment:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
        },
        {
          id: 7,
          image: "https://bootdey.com/img/Content/avatar/avatar5.png",
          name: "The googler",
          comment:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
        },
      ],
    };
  }

  render() {
    return (
      <FlatList
        style={styles.root}
        data={this.state.data}
        extraData={this.state}
        ItemSeparatorComponent={() => {
          return <View style={styles.separator} />;
        }}
        keyExtractor={(item) => {
          return item.id;
        }}
        renderItem={(item) => {
          const Notification = item.item;
          return (
            <View style={styles.container}>
              <TouchableOpacity onPress={() => {}}>
                <Image
                  style={styles.image}
                  source={{ uri: Notification.image }}
                />
              </TouchableOpacity>
              <View style={styles.content}>
                <View style={styles.contentHeader}>
                  <Text style={styles.name}>{Notification.name}</Text>
                  <Text style={styles.time}>9:58 am</Text>
                </View>
                <Text rkType="primary3 mediumLine">{Notification.comment}</Text>
              </View>
            </View>
          );
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#ffffff",
    marginTop: 10,
  },
  container: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  content: {
    marginLeft: 16,
    flex: 1,
  },
  contentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC",
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 20,
    marginLeft: 20,
  },
  time: {
    fontSize: 11,
    color: "#808080",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
