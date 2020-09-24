import React from "react";
import firebase from "firebase";
import { Image } from "react-native";

export default class LoadingScreen extends React.Component {
    // KORISTENJE setTimeout u svrhu odrzavanja LoadingScreen-a na dvije 
    // sekunde te ako je korisnik ulogiran proslijediti ga na App, a ako nije ulogiran onda na logiranje.
    componentDidMount() {
        setTimeout(()=> {
            firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? "App" : "Auth");
        })}, 2000);
    }
    
    render() {
        return (
            <Image
                    source={require("../assets/LoadingLogoEleph.jpg")}
                    style={{height: undefined, width: undefined, flex: 1, backgroundColor: '#639dff', padding: 20}}
                    resizeMode="contain">
            </Image>  
        );
    }
}