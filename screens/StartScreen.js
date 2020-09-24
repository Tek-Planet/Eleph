import React, { useState, /*useEffect*/ } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

const StartScreen = () => {
    //const [term, setTerm] = useState('');
    //const [errorMessage, setErrorMessage] = useState('');

    return <View>
        <Text>Start sc</Text>
        </View>
};

//StartScreen.navigationOptions = {
//    headerTitle: 'dejhehjjn'
//};

const styles = StyleSheet.create({

});

StartScreen.navigationOptions = navData => {
    return {
      headerTitle: 'Your Orders',
      headerLeft: (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="Menu"
              iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
              onPress={() => {
                navData.navigation.toggleDrawer();
              }}
            />
          </HeaderButtons>
        ),
    };
  };

export default StartScreen; 