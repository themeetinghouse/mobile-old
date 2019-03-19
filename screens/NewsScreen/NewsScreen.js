﻿import React from 'react';
import { Component } from 'react';
import Amplify from 'aws-amplify';
import awsConfig from '../../src/aws-exports';

Amplify.configure(awsConfig);

import { Authenticator } from 'aws-amplify-react-native';
import { Drawer, Container, Header,Left,Icon,Body,Title,Right,Button } from 'native-base';
import { DrawerActions } from 'react-navigation';

 export default class NewsScreen extends Component {
  static navigationOptions = {
    drawerLabel: 'The Meeting House',
    headerTitle:'test',
    title: 'The Meeting House',
  };

  openDrawer = () => {
    this.props.navigation.dispatch(DrawerActions.openDrawer());
  }
  render() {
    const {navigate} = this.props.navigation;
    return (
      <Container>
      <Header>
        <Left>
          <Button
            transparent
            onPress={this.openDrawer}>
            <Icon name="menu" />
          </Button>
        </Left>
        <Body>
          <Title>News</Title>
        </Body>
        <Right />
      </Header>

      <Authenticator><Button
        title="Go to Jane's profile"
        onPress={() => navigate('Profile', {name: 'Jane'})}
      /></Authenticator>
      </Container>

    );
  }
}