﻿import React from 'react';
import Amplify, { Auth } from 'aws-amplify';
import awsConfig from '../../src/aws-exports';
import { Button, View } from 'react-native'
import MyProfile from '../../components/MyProfile/MyProfile'
import { NavigationScreenProp } from 'react-navigation';
import Header from '../../components/Header/Header'

Amplify.configure(awsConfig);

interface Props {
  navigation: NavigationScreenProp<any, any>
}
interface State { }
export default class LoginScreen extends React.Component<Props, State>{
  logout() {
    Auth.signOut()
      .then(data => {
        console.log(data); console.log("Logged Out")
      }

      )
      .catch(err => {
        console.log(err)
      });

  }
  render() {
    // const { navigate } = this.props.navigation;
    return (
      <View>
        <Header title="Profile" navigation={this.props.navigation} />
        <MyProfile />
        <Button onPress={() => this.logout()} title="Logout"></Button>
      </View>

    );
  }
}