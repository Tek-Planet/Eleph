import React from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView  } from "react-native";
import Fire, { getCom} from "../Fire";

export default class NotificationScreen extends React.Component {
    
    constructor(props) {
        super(props);
      }
      state = {
        details:{},
        loading: false,
        limit: 2,
        post: [],
        comments: [],
      };
      
      onPostsReceived = (post) => {
        try {
          this.setState({ details: post.details,
                         comments: post.comments });
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
    
        const {details, comments} = this.state
        
        return (
            <SafeAreaView style={{marginTop:50, flex:1}}>
            <View style={styles.container}>
            <View style={{alignItems:'center'}}><Text style={{alignItems:'center',fontSize:22, fontWeight:'bold'}}>Post Details</Text></View>
            <View>
            <Text style={{margin: 10}}>Mood <Text style={{fontWeight:'bold'}}>{ details.mood}</Text></Text>
            <Text style={{margin: 10}}>Body <Text style={{fontWeight:'bold'}}>{ details.text}</Text></Text>
            <Text style={{margin: 10}}>comments <Text style={{fontWeight:'bold'}}>{ details.commentCount}</Text></Text>
            <Text style={{margin: 10}}>Likes <Text style={{fontWeight:'bold'}}>{ details.likeCount}</Text></Text>

            </View>
            
            <View style={{alignItems:'center'}}><Text style={{alignItems:'center',fontSize:22, fontWeight:'bold'}}>Comments</Text></View>

                <FlatList
        
          data={comments}
          //extraData={this.state}
          renderItem={({ item }) => 
                   {   return(<View>
                         <Text style={{margin: 10}}>Body <Text style={{fontWeight:'bold'}}>{ item.body}</Text></Text>
                         <Text style={{margin: 10}}>UserHandle <Text style={{fontWeight:'bold'}}>{ item.userHandle}</Text></Text>
                         <Text style={{margin: 10}}>PostId <Text style={{fontWeight:'bold'}}>{ item.postId}</Text></Text>

                             </View>)
                    
                    }
                      }
          //keyExtractor={(item, index) => String(index)}

         
        />
            </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});