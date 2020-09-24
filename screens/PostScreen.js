// import React, { Component } from "react";
// import { StyleSheet, View, Text } from "react-native";

// import Svg, { Path } from "react-native-svg";

// import Animated, { Easing } from "react-native-reanimated";

// import {
//   PanGestureHandler,
//   State,
//   TouchableOpacity,
// } from "react-native-gesture-handler";

// const {
//   interpolate,
//   Extrapolate,
//   Value,
//   timing,
//   Clock,
//   startClock,
//   block,
//   cond,
//   stopClock,
//   call,
//   event,
//   add,
//   set,
//   eq,
//   max,
//   min,
//   defined,
//   clockRunning,
//   multiply,
//   modulo,
//   sub,
//   neq,
//   greaterThan,
//   debug,
//   divide,
//   round,
//   abs,
// } = Animated;

// import { interpolateColor } from "react-native-redash";

// import { interpolateAll } from "flubber";

// //console.disableYellowBox = true;

// const EMOJIS = [
//   {
//     shapes: {
//       eye2: "M22.7,1.29A5.08,5.08,0,1,0,30.46.07L30.36,0Z",
//       eye1: "M9.46,1.29A5.08,5.08,0,1,1,1.7.07L1.8,0Z",
//       lip:
//         "M6.42,29.12c-3.4,1.63-6-.79-4.95-3.6,1.42-3.82,12-5.86,16.08-5.67,6.58.3,12.76,3.34,12.9,7.23a2,2,0,0,1-2,2.32c-4.91-.08-6.16-2.54-12-2.51A20.4,20.4,0,0,0,6.42,29.12Z",
//     },
//     text: "Terrible",
//     scale: new Value(1),
//   },
//   {
//     shapes: {
//       eye1: "M26.08,0a5.08,5.08,0,1,0,6.08,5s0-.08,0-.12Z",
//       eye2: "M6.08,0A5.08,5.08,0,1,1,0,5s0-.08,0-.12Z",
//       lip:
//         "M6.41,28.84c-3.41,1.38-6-.68-5-3.07,1.41-3.25,12-4.95,16.06-4.79,6.59.27,12.77,2.87,12.92,6.17a1.85,1.85,0,0,1-2,2C23.49,29,22.24,27,16.43,27A23.3,23.3,0,0,0,6.41,28.84Z",
//     },
//     text: "Bad",
//     scale: new Value(1),
//   },
//   {
//     shapes: {
//       eye1:
//         "M10.16,4.83A5.08,5.08,0,0,1,0,4.83,4.87,4.87,0,0,1,5.08,0,4.87,4.87,0,0,1,10.16,4.83Z",
//       eye2:
//         "M32.16,4.83A5.08,5.08,0,1,1,22,4.83,4.87,4.87,0,0,1,27.08,0,4.87,4.87,0,0,1,32.16,4.83Z",
//       lip:
//         "M7.31,22.91c6.37-1.66,12.68-2.65,18.3-3.57a3,3,0,0,1,3,1.29l.05.07a2.89,2.89,0,0,1-2,4.37c-6.26,1.06-13,2.63-18.5,3.65a2.68,2.68,0,0,1-3.09-2v-.06A3.09,3.09,0,0,1,7.31,22.91Z",
//     },
//     text: "Okay",
//     scale: new Value(0),
//   },
//   {
//     shapes: {
//       eye2:
//         "M10.16,4.83A5.08,5.08,0,0,1,0,4.83,4.87,4.87,0,0,1,5.08,0,4.87,4.87,0,0,1,10.16,4.83Z",
//       eye1:
//         "M32.16,4.83A5.08,5.08,0,1,1,22,4.83,4.87,4.87,0,0,1,27.08,0,4.87,4.87,0,0,1,32.16,4.83Z",
//       lip:
//         "M25.65,22.66c3.4-1.39,6,.67,5,3.06-1.41,3.25-12,5-16.07,4.79C8,30.24,1.78,27.64,1.62,24.34a1.85,1.85,0,0,1,2-2c4.91.08,6.16,2.18,12,2.15A23.43,23.43,0,0,0,25.65,22.66Z",
//     },
//     text: "Good",
//     scale: new Value(1),
//   },
//   {
//     shapes: {
//       eye1:
//         "M10.16,4.83A5.08,5.08,0,0,1,0,4.83,4.87,4.87,0,0,1,5.08,0,4.87,4.87,0,0,1,10.16,4.83Z",
//       eye2:
//         "M32.16,4.83A5.08,5.08,0,1,1,22,4.83,4.87,4.87,0,0,1,27.08,0,4.87,4.87,0,0,1,32.16,4.83Z",
//       lip:
//         "M2.22,20.26c10.87.07,20.91-.1,29.84.06a2.58,2.58,0,0,1,1.76.74h0a2.24,2.24,0,0,1,.41,2.59C32.4,27.25,26.11,31.8,19.42,32,9.75,32.29,2.91,27.69.5,24.31a2.62,2.62,0,0,1-.07-3l0,0A2.18,2.18,0,0,1,2.22,20.26Z",
//     },
//     text: "Grate",
//     scale: new Value(1),
//   },
// ];

// const EMOJIS_PATH = EMOJIS.map((e, index) =>
//   interpolateAll(
//     [
//       EMOJIS[index].shapes.lip,
//       EMOJIS[index].shapes.eye1,
//       EMOJIS[index].shapes.eye2,
//     ],
//     [
//       EMOJIS[Math.min(EMOJIS.length - 1, index + 1)].shapes.lip,
//       EMOJIS[Math.min(EMOJIS.length - 1, index + 1)].shapes.eye2,
//       EMOJIS[Math.min(EMOJIS.length - 1, index + 1)].shapes.eye1,
//     ],
//     { single: true, maxSegmentLength: 1 }
//   )
// );

// const EMOJI_WIDTH = 70,
//   THUMB_EMOJI_WIDTH = 100,
//   EMOJI_PADDING = 30;

// const EmojiPlaceholder = ({ d: { eye1, eye2, lip }, scale, text, onPress }) => {
//   let bottom = interpolate(scale, {
//     inputRange: [0, 1],
//     outputRange: [115, 90],
//     extrapolate: Extrapolate.Clamp,
//   });

//   let color = interpolateColor(
//     scale,
//     {
//       inputRange: [0, 1],
//       outputRange: [
//         { r: 52, g: 58, b: 67 },
//         { r: 183, g: 185, b: 191 },
//       ],
//       extrapolate: Extrapolate.Clamp,
//     },
//     "rgb"
//   );

//   return (
//     <View>
//       <Animated.View
//         style={[styles.emojiContainer, { transform: [{ scale }] }]}
//       >
//         <TouchableOpacity
//           activeOpacity={1}
//           {...{ onPress }}
//           style={styles.emojiContainerInternal}
//         >
//           <Svg width={35} height={33} viewBox="0 0 35 33">
//             <Path {...{ d: eye1 }} fill="white" />
//             <Path {...{ d: eye2 }} fill="white" />
//             <Path {...{ d: lip }} fill="white" />
//           </Svg>
//         </TouchableOpacity>
//       </Animated.View>
//       <Animated.Text
//         style={[
//           styles.emojiText,
//           { color, transform: [{ translateY: bottom }] },
//         ]}
//       >
//         {text}
//       </Animated.Text>
//     </View>
//   );
// };

// runTiming = (clock, value, dest) => {
//   const state = {
//     finished: new Value(0),
//     position: new Value(0),
//     time: new Value(0),
//     frameTime: new Value(0),
//   };

//   const config = {
//     duration: 300,
//     toValue: new Value(0),
//     easing: Easing.inOut(Easing.ease),
//   };

//   return block([
//     cond(
//       clockRunning(clock),
//       [
//         // if the clock is already running we update the toValue, in case a new dest has been passed in
//         set(config.toValue, dest),
//       ],
//       [
//         // if the clock isn't running we reset all the animation params and start the clock
//         set(state.finished, 0),
//         set(state.time, 0),
//         set(state.position, value),
//         set(state.frameTime, 0),
//         set(config.toValue, dest),
//         startClock(clock),
//       ]
//     ),
//     // we run the step here that is going to update position
//     timing(clock, state, config),
//     // if the animation is over we stop the clock
//     cond(state.finished, debug("stop clock", stopClock(clock))),
//     // we made the block return the updated position
//     state.position,
//   ]);
// };

// class App extends Component {
//   constructor() {
//     super();

//     this.translateXOnChange = ([translateX]) => {
//       let _progress =
//         (translateX % (THUMB_EMOJI_WIDTH + EMOJI_PADDING)) /
//         (THUMB_EMOJI_WIDTH + EMOJI_PADDING);

//       let _selectedIndex = Math.floor(
//         translateX / (THUMB_EMOJI_WIDTH + EMOJI_PADDING)
//       );

//       this.path.setNativeProps({
//         d: EMOJIS_PATH[_selectedIndex](_progress.toFixed(1)),
//       });
//     };

//     const _dragX = new Value(0);
//     const _dragVX = new Value(0);
//     const _offsetX = new Value(0);
//     const _clock = new Clock();
//     const _state = new Value(-1);
//     const _transX = new Value();
//     const _lastCall = new Value(0);

//     this._selectedIndex = new Value(-1);

//     this._translateX = block([
//       cond(
//         neq(this._selectedIndex, -1),
//         [
//           set(
//             _transX,
//             runTiming(
//               _clock,
//               cond(
//                 defined(_transX),
//                 _offsetX,
//                 2 * THUMB_EMOJI_WIDTH + 2 * EMOJI_PADDING
//               ),
//               add(
//                 multiply(this._selectedIndex, THUMB_EMOJI_WIDTH),
//                 multiply(this._selectedIndex, EMOJI_PADDING)
//               )
//             )
//           ),
//           cond(eq(clockRunning(_clock), 0), [
//             set(this._selectedIndex, -1),
//             set(_offsetX, _transX),
//           ]),
//           cond(
//             greaterThan(
//               abs(sub(_transX, _lastCall)),
//               (THUMB_EMOJI_WIDTH + EMOJI_PADDING) / 4
//             ),
//             [
//               set(_lastCall, _transX),
//               call([_lastCall], this.translateXOnChange),
//             ]
//           ),
//           _transX,
//         ],
//         cond(
//           eq(_state, State.ACTIVE),
//           [
//             stopClock(_clock),
//             set(
//               _transX,
//               min(
//                 max(0, add(_dragX, _offsetX)),
//                 4 * THUMB_EMOJI_WIDTH + 4 * EMOJI_PADDING
//               )
//             ),
//             cond(
//               greaterThan(
//                 abs(sub(_transX, _lastCall)),
//                 (THUMB_EMOJI_WIDTH + EMOJI_PADDING) / 10
//               ),
//               [
//                 set(_lastCall, _transX),
//                 call([_lastCall], this.translateXOnChange),
//               ]
//             ),
//             _transX,
//           ],
//           [
//             set(
//               _offsetX,
//               cond(
//                 defined(_transX),
//                 cond(
//                   eq(_state, State.END),
//                   [
//                     cond(
//                       neq(
//                         modulo(_transX, THUMB_EMOJI_WIDTH + EMOJI_PADDING),
//                         0
//                       ),
//                       [
//                         set(
//                           _lastCall,
//                           runTiming(
//                             _clock,
//                             _transX,
//                             multiply(
//                               round(
//                                 divide(
//                                   _transX,
//                                   THUMB_EMOJI_WIDTH + EMOJI_PADDING
//                                 )
//                               ),
//                               THUMB_EMOJI_WIDTH + EMOJI_PADDING
//                             )
//                           )
//                         ),
//                         call([_lastCall], this.translateXOnChange),
//                         _lastCall,
//                       ],
//                       _transX
//                     ),
//                   ],
//                   _offsetX
//                 ),
//                 2 * THUMB_EMOJI_WIDTH + 2 * EMOJI_PADDING
//               )
//             ),
//           ]
//         )
//       ),
//     ]);

//     this.onGestureEvent = event([
//       {
//         nativeEvent: {
//           translationX: _dragX,
//           velocityX: _dragVX,
//           state: _state,
//         },
//       },
//     ]);
//   }

//   render() {
//     let color = interpolateColor(
//       this._translateX,
//       {
//         inputRange: [
//           0,
//           2 * THUMB_EMOJI_WIDTH + 2 * EMOJI_PADDING,
//           4 * THUMB_EMOJI_WIDTH + 4 * EMOJI_PADDING,
//         ],
//         outputRange: [
//           { r: 253, g: 161, b: 143 },
//           { r: 255, g: 220, b: 140 },
//           { r: 255, g: 220, b: 140 },
//         ],
//         extrapolate: Extrapolate.CLAMP,
//       },
//       "rgb"
//     );

//     return (
//       <View style={styles.container}>
//         <Text style={styles.titleText}>Tell us about your mood</Text>
//         <View style={styles.emojisContainer}>
//           <View style={styles.centerLine} />
//           {EMOJIS.map(({ shapes: d, text }, index) => {
//             let scale = interpolate(this._translateX, {
//               inputRange: [
//                 (index - 1) * THUMB_EMOJI_WIDTH + (index - 1) * EMOJI_PADDING,
//                 index * THUMB_EMOJI_WIDTH +
//                   index * EMOJI_PADDING -
//                   (EMOJI_WIDTH + EMOJI_PADDING / 2),
//                 index * THUMB_EMOJI_WIDTH + index * EMOJI_PADDING,
//                 index * THUMB_EMOJI_WIDTH +
//                   index * EMOJI_PADDING +
//                   (EMOJI_WIDTH + EMOJI_PADDING / 2),
//                 (index + 1) * THUMB_EMOJI_WIDTH + (index + 1) * EMOJI_PADDING,
//               ],
//               outputRange: [1, 1, 0.5, 1, 1],
//               extrapolate: Extrapolate.CLAMP,
//             });

//             return (
//               <EmojiPlaceholder
//                 key={text}
//                 {...{ d, text, scale }}
//                 onPress={() => {
//                   this._selectedIndex.setValue(index);
//                 }}
//               />
//             );
//           })}
//           <PanGestureHandler
//             maxPointers={1}
//             onGestureEvent={this.onGestureEvent}
//             onHandlerStateChange={this.onGestureEvent}
//           >
//             <Animated.View
//               style={[
//                 styles.selectedEmojiContainer,
//                 {
//                   backgroundColor: color,
//                   height: THUMB_EMOJI_WIDTH,
//                   width: THUMB_EMOJI_WIDTH,
//                   transform: [{ translateX: this._translateX }],
//                 },
//               ]}
//             >
//               <Svg width={50} height={50} viewBox="0 0 34 33">
//                 <Path
//                   ref={(ref) => (this.path = ref)}
//                   d={EMOJIS_PATH[2](0)}
//                   fill="#665E53"
//                 />
//               </Svg>
//             </Animated.View>
//           </PanGestureHandler>
//         </View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   titleText: {
//     fontSize: 24,
//     color: "#81898B",
//   },
//   emojisContainer: {
//     flexDirection: "row",
//     marginTop: 30,
//     width: 5 * THUMB_EMOJI_WIDTH + 4 * EMOJI_PADDING,
//     justifyContent: "space-between",
//   },
//   emojiContainer: {
//     width: THUMB_EMOJI_WIDTH,
//     height: THUMB_EMOJI_WIDTH,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   emojiContainerInternal: {
//     width: EMOJI_WIDTH,
//     height: EMOJI_WIDTH,
//     borderRadius: EMOJI_WIDTH * 2,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#C8CED3",
//   },
//   emojiText: {
//     fontSize: 24,
//     textAlign: "center",
//     position: "absolute",
//     left: 0,
//     right: 0,
//   },
//   centerLine: {
//     position: "absolute",
//     height: 4,
//     backgroundColor: "#D8DCE1",
//     left: 25,
//     right: 25,
//     top: 100 / 2 - 4 / 2,
//   },
//   selectedEmojiContainer: {
//     backgroundColor: "#665E53",
//     borderRadius: THUMB_EMOJI_WIDTH * 2,
//     position: "absolute",
//     alignItems: "center",
//     justifyContent: "center",
//     shadowColor: "gray",
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 5,
//     shadowOpacity: 0.4,
//   },
// });

// export default App;

// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   SafeAreaView,
//   TextInput,
//   Image,
//   Platform,
//   StatusBar,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import Fire from "../Fire";
// import * as ImagePicker from "expo-image-picker";
// import UserPermissions from "../utilities/UserPermissions";

// export default class PostScreen extends React.Component {
//   state = {
//     text: "",
//     mood: null,
//   };

//   componentDidMount() {
//     //UserPermissions.getCameraPermission;
//   }

//   handlePost = () => {
//     Fire.shared
//       .addPost({ text: this.state.text.trim(), mood: this.state.mood })
//       .then((ref) => {
//         this.setState({ text: "", mood: null });
//         this.props.navigation.goBack();
//       })
//       .catch((error) => {
//         //if(this.state.mood==){}
//         //OVO ISPRAVI!!!
//         alert(error);
//       });
//   };

//   // pickImage = async () => {
//   //     let result = await ImagePicker.launchImageLibraryAsync({
//   //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//   //         allowsEditing: true,
//   //         aspect: [4, 3]
//   //     });

//   //     if (!result.cancelled) {
//   //         this.setState({ image: result.uri });
//   //     }
//   //};

//   render() {
//     return (
//       <SafeAreaView style={styles.container}>
//         <View
//           style={{
//             paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
//           }}
//         >
//           <View style={styles.header}>
//             <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
//               <Ionicons
//                 name="md-arrow-back"
//                 size={24}
//                 color="#D8D9DB"
//               ></Ionicons>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={this.handlePost}>
//               <Text style={{ fontWeight: "500" }}>Post</Text>
//             </TouchableOpacity>
//           </View>

//           <View style={styles.inputContainer}>
//             <Image
//               source={require("../assets/tempAvatar.jpg")}
//               style={styles.avatar}
//             ></Image>
//             <TextInput
//               autoFocus={true}
//               multiline={true}
//               numberOfLines={4}
//               style={{ flex: 1 }}
//               placeholder="Want to share something?"
//               onChangeText={(text) => this.setState({ text })}
//               value={this.state.text}
//             ></TextInput>
//           </View>
//           {/* TU JE NOVI CONTAINER: */}
//           <View style={styles.inputContainer}>
//             <Image
//               source={require("../assets/tempAvatar.jpg")}
//               style={styles.avatar}
//             ></Image>
//             <TextInput
//               autoFocus={true}
//               //multiline={true}
//               //numberOfLines={4}
//               style={{ flex: 1 }}
//               placeholder="Your mood?"
//               onChangeText={(mood) => this.setState({ mood })}
//               value={this.state.mood}
//             ></TextInput>
//           </View>

//           {/* <TouchableOpacity style={styles.photo} onPress={this.pickImage}>
//             <Ionicons name="md-camera" size={32} color="#D8D9DB"></Ionicons>
//           </TouchableOpacity> */}

//           {/* <View style={{ marginHorizontal: 32, marginTop: 32, height: 150 }}>
//             <Image
//               source={{ uri: this.state.image }}
//               style={{ width: "100%", height: "100%" }}
//             ></Image>
//           </View> */}
//         </View>
//       </SafeAreaView>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingHorizontal: 32,
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: "#D8D9DB",
//   },
//   inputContainer: {
//     margin: 32,
//     flexDirection: "row",
//   },
//   avatar: {
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     marginRight: 16,
//   },
//   //   photo: {
//   //     alignItems: "flex-end",
//   //     marginHorizontal: 32,
//   //   },
// });

// import React, { useState, useEffect } from "react";
// import { useNavigation } from "@react-navigation/native";
// import * as Permissions from "expo-permissions";
// import * as ImagePicker from "expo-image-picker";
// import { Ionicons } from "@expo/vector-icons";
// import Constants from "expo-constants";

// import "firebase/firestore";
// import Fire from "../Fire";
// //import * as ImagePicker from "expo-image-picker";
// import UserPermissions from "../utilities/UserPermissions";
// //import Fire from "../components/Fire";

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Image,
  Platform,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Fire from "../Fire";
import * as ImagePicker from "expo-image-picker";
import UserPermissions from "../utilities/UserPermissions";

export default class PostScreen extends React.Component {
  state = {
    text: "",
    mood: null,
  };

  componentDidMount() {
    //UserPermissions.getCameraPermission;
  }

  handlePost = () => {
    Fire.shared
      .addPost({ text: this.state.text.trim(), mood: this.state.mood })
      .then((ref) => {
        this.setState({ text: "", mood: null });
        this.props.navigation.goBack();
      })
      .catch((error) => {
        //if(this.state.mood==){}
        //OVO ISPRAVI!!!
        alert(error);
      });
  };

  // pickImage = async () => {
  //     let result = await ImagePicker.launchImageLibraryAsync({
  //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //         allowsEditing: true,
  //         aspect: [4, 3]
  //     });

  //     if (!result.cancelled) {
  //         this.setState({ image: result.uri });
  //     }
  //};

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          }}
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Ionicons
                name="md-arrow-back"
                size={24}
                color="#D8D9DB"
              ></Ionicons>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.handlePost}>
              <Text style={{ fontWeight: "500" }}>Post</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Image
              source={require("../assets/tempAvatar.jpg")}
              style={styles.avatar}
            ></Image>
            <TextInput
              autoFocus={true}
              multiline={true}
              numberOfLines={4}
              style={{ flex: 1 }}
              placeholder="Want to share something?"
              onChangeText={(text) => this.setState({ text })}
              value={this.state.text}
            ></TextInput>
          </View>
          {/* TU JE NOVI CONTAINER: */}
          <View style={styles.inputContainer}>
            <Image
              source={require("../assets/tempAvatar.jpg")}
              style={styles.avatar}
            ></Image>
            <TextInput
              autoFocus={true}
              //multiline={true}
              //numberOfLines={4}
              style={{ flex: 1 }}
              placeholder="Your mood?"
              onChangeText={(mood) => this.setState({ mood })}
              value={this.state.mood}
            ></TextInput>
          </View>

          {/* <TouchableOpacity style={styles.photo} onPress={this.pickImage}>
            <Ionicons name="md-camera" size={32} color="#D8D9DB"></Ionicons>
          </TouchableOpacity> */}

          {/* <View style={{ marginHorizontal: 32, marginTop: 32, height: 150 }}>
            <Image
              source={{ uri: this.state.image }}
              style={{ width: "100%", height: "100%" }}
            ></Image>
          </View> */}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#D8D9DB",
  },
  inputContainer: {
    margin: 32,
    flexDirection: "row",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  //   photo: {
  //     alignItems: "flex-end",
  //     marginHorizontal: 32,
  //   },
});
