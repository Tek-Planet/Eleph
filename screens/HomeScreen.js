

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StatusBar,
  RefreshControl,
  Alert,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import { FontAwesome5 } from "@expo/vector-icons";
//import CachedImage from 'react-native-expo-cached-image';
import { DrawerActions, createDrawerNavigator } from "react-navigation-drawer";
import { ClassicHeader } from "@freakycoder/react-native-header-view";
//import 'firebase/firestore';  //import * as firebase from 'firebase';
//import '@firebase/firestore';  //import 'firebase/firestore'; //require("firebase/firestore");
import Fire, { getPosts } from "../Fire";
import Loader from "../components/loader";
//require("firebase/firestore");
import firebase, { database } from "firebase";
require("firebase/firestore");

function HandleIdsPosts() {
  //let screamData = {};
  const db = Fire.shared.firestore;

  //const nesto = db.doc(`/posts/${postId}`).get();
  //console.log(nesto);
  const ref = db.collection("posts").get();
  const postId = "y7FN13SKWUDsWdKsGJiT"; // example id of a post document
  let bruh = [];
  var lista = [];
  for (let i = 0; i < ref.size; i++) {
    var postId2 = ref.docs[i].id;
    bruh.push(postId2);
    //bruh does return array of IDs of documents inside collection posts:
    console.log(postId2);
  }
  //console.log(bruh + "yo");
  db.collection("comments")
    // Filter results
    .where("postId", "==", postId)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const PostItem = doc.data();
        //PostItem.id = doc.id;
        lista.push(PostItem);
      });
    });
  console.log(lista);
  // ref.forEach((doc) => {
  //   const PostItem = doc.data();
  //   PostItem.id = doc.id;
  //   post2.push(PostItem);
  //   //const docRefId = ref.docs[0].id;
  // });

  //console.log(docRefId);
}
export default class HomeScreen extends React.PureComponent {


  constructor(props) {
    super(props);
  }
  state = {
    loading: false,
    limit: 2,
    post: [],
    comment: [],
  };

  //unsubscribe = null;

  onPostsReceived = (post) => {
    try {
      this.setState({ post: post });
      //console.log(this.state.post);
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Posts failed to load, you need to check your internet connection."
      );
    }
  };

  comments = (comment) => {
    try {
      this.setState({ comment: comment });
      //console.log(this.state.comment);
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Posts failed to load, you need to check your internet connection."
      );
    }
  };

  

  async componentDidMount() {
    getPosts(this.onPostsReceived);
    var screamData = {};
    const db = Fire.shared.firestore;
    const ref = await db.collection("posts").get();

    for (let i = 0; i < ref.size; i++) {
      var postId = ref.docs[i].id;
      console.log(postId);
    }

    HandleIdsPosts();
    const yo = Fire.shared.firestore
      .collection("comments")
      // Filter results
      .where("postId", "==", postId)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.exists) {
          //console.log(yo);
        }
      });
   
  }

 

 
  renderPost = (post) => {
    return (
      <View style={styles.feedItem}>
        <Image
          source={
            //this.state.user.avatar
            // ? { uri: this.state.user.avatar }
            // :
            require("../assets/tempAvatar.jpg")
          }
          style={styles.avatar}
        />
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              {/* <Text>{console.log(this.state.post)}</Text> */}
  
              <Text style={styles.name}>{post.id}</Text>
              <Text style={styles.timestamp}>
                {moment(post.timestamp).toDate().toDateString()}
              </Text>
            </View>

            <Ionicons name="ios-more" size={24} color="#73788B" />
          </View>
          <TouchableOpacity
              style={{ marginLeft: 0, margin: 10 }}
              onPress={() => this.props.navigation.navigate("PostDetails",{
                userName:'sheffy'
              })}
            >
          <Text style={styles.post}>{post.text}</Text>
          </TouchableOpacity>
          <Image
            source={post.image && { uri: post.image }}
            style={styles.postImage}
            resizeMode="cover"
          />
          <View style={{ flexDirection: "row" }}>
            <Ionicons
              name="ios-heart-empty"
              size={24}
              color="#73788B"
              style={{ marginRight: 16 }}
            />
            <Ionicons name="ios-chatboxes" size={24} color="#73788B" />
          </View>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          translucent
          backgroundColor="white"
          barStyle="dark-content"
        />
        <ClassicHeader
          headerTitle="Eleph"
          leftComponent={
            <TouchableOpacity
              style={{ marginRight: 0, margin: 10 }}
              onPress={() =>
                this.props.navigation.dispatch(DrawerActions.openDrawer())
              }
            >
              <FontAwesome5 name="bars" size={24} color="#161924" />
            </TouchableOpacity>
          }
          rightComponent={
            <TouchableOpacity
              style={{ marginLeft: 0, margin: 10 }}
              onPress={() => this.props.navigation.navigate("Message")}
            >
              <Ionicons name="ios-chatboxes" size={24} color="#73788B" />
            </TouchableOpacity>
          }
        />
        <FlatList
          style={styles.feed}
          data={this.state.post}
          //extraData={this.state}
          renderItem={({ item }) => this.renderPost(item)}
          //keyExtractor={(item, index) => String(index)}

          ListFooterComponent={this.renderFooter}
          ListHeaderComponent={this.renderHeader}
          onEndReachedThreshold={0}
          onEndReached={this.retrieveMore}
          showsVerticalScrollIndicator={false}
        ></FlatList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBECF4",
  },
  header: {
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: "#FFF",
    //alignItems: "",
    justifyContent: "center",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#EBECF4",
    shadowColor: "#454D65",
    shadowOffset: { height: 5 },
    shadowRadius: 15,
    shadowOpacity: 0.2,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "500",
    //alignItems: "center",
  },
  feed: {
    marginHorizontal: 0,
    //flexDirection: "column",
  },
  feedItem: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    padding: 8,
    flexDirection: "row",
    marginVertical: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16,
  },
  name: {
    fontSize: 15,
    fontWeight: "500",
    color: "#454D65",
  },
  timestamp: {
    fontSize: 11,
    color: "#C4C6CE",
    marginTop: 4,
  },
  post: {
    marginTop: 16,
    fontSize: 14,
    color: "#838899",
  },
  postImage: {
    width: 300,
    height: 80,
    borderRadius: 5,
    marginVertical: 16,
  },
  activityIndicator: {
    paddingVertical: 20,
    borderTopWidth: 0,
    borderTopColor: "#CED0CE",
  },
});
