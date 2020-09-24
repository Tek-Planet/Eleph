import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Fire, { getCom} from "../Fire";

export default class NotificationScreen extends React.Component {
    
    constructor(props) {
        super(props);
      }
      state = {
        loading: false,
        limit: 2,
        post: [],
        comment: [],
      };
      
      onPostsReceived = (post) => {
        try {
          this.setState({ post: post });
          console.log("***************");
          console.log(post);
          console.log("***************");

        } catch (error) {
          console.log(error);
        }
      };
      
      async componentDidMount() {
        let postId = "NJ2YN5MHYIXRHsUYQlZz";
        getCom(postId, this.onPostsReceived);
        }
      
      
    render() {
        return (
            <View style={styles.container}>
            <Text> {JSON.stringify(this.state.post)}</Text>
                {/* <FlatList
        
          data={this.state.post}
          //extraData={this.state}
          renderItem={({ item }) => 
                   {   return(<View>
                              <Text>ID: {item.postId.trim()}</Text>
                              <Text>{item.body}</Text>
                             </View>)
                    
                    }
                      }
          //keyExtractor={(item, index) => String(index)}

         
        /> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});