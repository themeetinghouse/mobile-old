import * as React from 'react';
import { NavigationScreenProp } from 'react-navigation';
import { Container, Content, Text, List, ListItem, Header } from "native-base";

const routes = ["HomeScreen", "NewsScreen", "ProfileScreen"];
export default class SideBar extends React.Component {
  render() {
    return (
      <Container><Content>
      <Header></Header>
      <List
            dataArray={routes}
            renderRow={data => {
              return (
                <ListItem
                  button
                  onPress={() => this.props.navigation.navigate(data)}>
                  <Text>{data}</Text>
                </ListItem>
              );
            }}
          />
      </Content>
      </Container>
     )
    }
}