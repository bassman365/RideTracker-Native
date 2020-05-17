// import React, {Component} from 'react';
// import PropTypes from 'prop-types';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ToastAndroid,
//   Keyboard,
// } from 'react-native';
// import {styles} from '../../lib/styles';
// import {signInAsync} from '../../lib/api';
// import {Screens} from '../../lib/screens';
// import {
//   setTokenAsync,
//   setVerifiedAsync,
//   VerifiedStates,
// } from '../../lib/storage';

// export default class SignInScreen extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       emailText: '',
//       passwordText: '',
//     };

//     this.onSignIn = this.onSignIn.bind(this);
//   }

//   async handleSignIn(email, password) {
//     try {
//       let response = await signInAsync(email, password);
//       ToastAndroid.show(response.message, ToastAndroid.LONG);
//       if (response.success) {
//         await setTokenAsync(response.token);
//         await setVerifiedAsync(VerifiedStates.Verified);
//         return true;
//       } else {
//         return false;
//       }
//     } catch (error) {
//       console.error(error);
//       return false;
//     }
//   }

//   onSignIn(email, password) {
//     this.handleSignIn(email, password).then(result => {
//       if (result) {
//         Keyboard.dismiss();
//         this.props.navigation.navigate(Screens.HOME);
//       }
//     });
//   }

//   render() {
//     return (
//       <View style={{flex: 1, flexDirection: 'column'}}>
//         <View style={{flex: 3}}>
//           <View style={{flex: 0.1}} />
//           <View style={{flexDirection: 'row', justifyContent: 'center'}}>
//             <Text style={styles.titleText}>Ride Tracker</Text>
//           </View>
//           <View style={{flex: 0.2}} />
//           <View style={{flexDirection: 'row', justifyContent: 'center'}}>
//             <TextInput
//               keyboardType="email-address"
//               onChangeText={text => this.setState({emailText: text})} //eslint-disable-line  react/no-set-state
//               placeholder="Email"
//               style={{flex: 0.8, borderWidth: 0, height: 40}}
//             />
//           </View>
//           <View style={{flex: 0.2}} />
//           <View style={{flexDirection: 'row', justifyContent: 'center'}}>
//             <TextInput
//               onChangeText={text => this.setState({passwordText: text})} //eslint-disable-line  react/no-set-state
//               placeholder="Password"
//               secureTextEntry
//               style={{flex: 0.8, borderWidth: 0, height: 40}}
//             />
//           </View>
//         </View>

//         <View
//           style={{flex: 2, flexDirection: 'column', justifyContent: 'center'}}>
//           <View style={{flexDirection: 'row', justifyContent: 'center'}}>
//             <TouchableOpacity
//               disabled={
//                 this.state.emailText.length === 0 ||
//                 this.state.passwordText.length === 0
//               }
//               onPress={() =>
//                 this.onSignIn(this.state.emailText, this.state.passwordText)
//               }
//               style={
//                 this.state.emailText.length === 0 ||
//                 this.state.passwordText.length === 0
//                   ? styles.disabledButton
//                   : styles.button
//               }
//               testID="signInSubmitButton">
//               <Text style={styles.buttonText}>Sign In</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         <View style={{flex: 1}}>
//           <View style={{flexDirection: 'row', justifyContent: 'center'}}>
//             <Text
//               onPress={() => this.props.navigation.navigate(Screens.SIGNUP)}
//               style={styles.linkText}>
//               No Account yet? Sign up now.
//             </Text>
//           </View>
//         </View>
//       </View>
//     );
//   }
// }

// SignInScreen.propTypes = {
//   navigation: PropTypes.shape({
//     navigate: PropTypes.func,
//   }).isRequired,
// };
