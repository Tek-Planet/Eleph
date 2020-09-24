import React from "react";
import { Image } from "react-native";

export default class SecretScreen extends React.Component {
 
    render() {
        return (
            <Image
                    source={require("../assets/ElephLogo2.png")}
                    style={{height: undefined, width: undefined, 
                    flex: 1, backgroundColor: '#9C6200', padding: 20}}
                    resizeMode="contain">
            </Image>  
        );
    }
}