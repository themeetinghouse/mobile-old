import React from 'react';
import Amplify from 'aws-amplify';
import awsConfig from './src/aws-exports';
import HomeScreen from "./screens/HomeScreen/index";
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import EStyleSheet from 'react-native-extended-stylesheet';
import { AmplifyTheme, Authenticator } from 'aws-amplify-react-native';
import MySignIn from './components/Auth/MySignIn'
import MySignUp from './components/Auth/MySignUp'
import MyConfirmSignIn from './components/Auth/MyConfirmSignIn'
import MyRequireNewPassword from './components/Auth/MyRequireNewPassword'
import MyConfirmSignUp from './components/Auth/MyConfirmSignUp'
import MyVerifyContact from './components/Auth/MyVerifyContact'
import MyForgotPassword from './components/Auth/MyForgotPassword'
import MyLoading from './components/Auth/MyLoading'


import { NavigationScreenProp } from 'react-navigation';
import { I18n } from 'aws-amplify';
import { Ionicons } from '@expo/vector-icons';
Amplify.configure(awsConfig);


const MyDisabledButton = Object.assign({}, AmplifyTheme.button, { backgroundColor: '#979797', alignItems: 'center', padding: 16 });
const MyButton = Object.assign({}, AmplifyTheme.button, { backgroundColor: '#F0493E', alignItems: 'center', padding: 16 });
const mySection = Object.assign({}, AmplifyTheme.section, { marginTop: 0, padding: 0});
const myNavBar = Object.assign({}, AmplifyTheme.navBar, { width: 0, height: 0 });
const myContainer = Object.assign({}, AmplifyTheme.container, { marginTop: 0 });
//const MyTheme = Object.assign({}, AmplifyTheme, { navBar: myNavBar, s });
const MyTheme = Object.assign({}, AmplifyTheme, {container:myContainer, navBar:myNavBar,section: mySection,button: MyButton, buttonDisabled: MyDisabledButton });


const authScreenLabels = {
  en: {
    'Sign in to your account': 'Login to Jesus Collective',

    'Sign Up': 'Get Started',
    'Sign Up Account': 'Get Started',
    'Sign in with Facebook': 'Use Facebook Account',
    'Sign in with Google': 'Use Google Account',
    'Forgot Password': 'Forgot your password?',
  }
};

I18n.setLanguage('en');
I18n.putVocabularies(authScreenLabels);

interface Props {
  navigation: NavigationScreenProp<any, any>,
  onStateChange(state:string,data:any):any
}
interface State {
  isLoggedIn: boolean
  fontLoaded: boolean
}
const federated = {
  google_client_id: '',
  facebook_app_id: '579712102531269',
  amazon_client_id: ''
};

EStyleSheet.build({ // always call EStyleSheet.build() even if you don't use global variables!
  $textColor: '#0275d8'
});

//export default App;

export default class AwesomeApp extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      fontLoaded: false,
      isLoggedIn: false
     
    };
    //  this.ionViewCanEnter();
  }

  async UNSAFE_componentWillMount() {
   // console.log("test")
    try {
      await Font.loadAsync({
        'Graphik-Bold-App': require('./assets/font/commercial-type-1906-WOIKTV-app/graphik/Graphik-Bold-App.ttf'),
        'Graphik-Medium-App': require('./assets/font/commercial-type-1906-WOIKTV-app/graphik/Graphik-Medium-App.ttf'),
        'Graphik-Regular-App': require('./assets/font/commercial-type-1906-WOIKTV-app/graphik/Graphik-Regular-App.ttf'),
        'Graphik-Semibold-App': require('./assets/font/commercial-type-1906-WOIKTV-app/graphik/Graphik-Semibold-App.ttf'),
        'GraphikXXCondensed-Black-App': require('./assets/font/commercial-type-1906-WOIKTV-app/graphik_xx_condensed/GraphikXXCondensed-Black-App.ttf'),

        // 'Helvetica Neue': require('native-base/Fonts/Roboto_medium.ttf')
        ...Ionicons.font
      });
    }
    catch (e) {
      console.error(e);
    }

    this.setState({ fontLoaded: true });
    Asset.fromModule(require("./components/Header/icon.png")).downloadAsync()
    Asset.fromModule(require("./assets/JC-Logo-RGB-KO2.png")).downloadAsync()
    Asset.fromModule(require("./assets/leftPanel.png")).downloadAsync()
    Asset.fromModule(require("./assets/profile-placeholder.png")).downloadAsync()
    Asset.fromModule(require("./assets/SignUp/progress-1.png")).downloadAsync()
    Asset.fromModule(require("./assets/SignUp/progress-2.png")).downloadAsync()
    Asset.fromModule(require("./assets/SignUp/progress-3.png")).downloadAsync()
    Asset.fromModule(require("./assets/SignUp/progress-4.png")).downloadAsync()
  }
  
  render() {
    if (this.state.fontLoaded) {

      return (
        <Authenticator hideDefault={true}  theme={MyTheme}
          usernameAttributes='email' federated={federated}
          signUpConfig={{
            signUpFields: [{ displayOrder: 6, key: "family_name", label: "Last Name", required: true },
            { displayOrder: 5, key: "given_name", label: "First Name", required: true }]
          }}>
          <HomeScreen />
          <MySignIn />
          <MyConfirmSignIn />
          <MyRequireNewPassword />
          <MySignUp signUpConfig={{
            signUpFields: [{ displayOrder: 6, key: "family_name", label: "Last Name", required: true },
            { displayOrder: 5, key: "given_name", label: "First Name", required: true }]
          }}
          />
          <MyConfirmSignUp />
          <MyVerifyContact />
          <MyForgotPassword />
          <MyLoading />
         

        </Authenticator>

      )
    } else {
      return <AppLoading />
    }
  }
}