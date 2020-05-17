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
// import {signUp} from '../../lib/api';
// import {Screens} from '../../lib/screens';
// import {validEmail} from '../../lib/validation';
// import {VerifiedStates, setVerifiedAsync} from '../../lib/storage';

// export default class SignUpScreen extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       emailText: '',
//       passwordText: '',
//       passwordConfirmationText: '',
//       emailError: true,
//       passwordError: true,
//     };

//     this.onSignUp = this.onSignUp.bind(this);
//     this.onPasswordConfirmationValidate = this.onPasswordConfirmationValidate.bind(
//       this,
//     );
//     this.onEmailValidate = this.onEmailValidate.bind(this);
//   }

//   onSignUp(email, password) {
//     signUp(email, password).then(response => {
//       ToastAndroid.show(response.message, ToastAndroid.LONG);
//       if (response.success) {
//         setVerifiedAsync(VerifiedStates.PendingVerification).then(() => {
//           Keyboard.dismiss();
//           this.props.navigation.navigate(Screens.VERIFY);
//         });
//       }
//     });
//   }

//   onPasswordConfirmationValidate(password, passwordConfirmationText) {
//     if (password !== passwordConfirmationText) {
//       ToastAndroid.show(
//         'Password and confirm password do not match!',
//         ToastAndroid.LONG,
//       );
//       this.setState({passwordError: true});
//     } else {
//       this.setState({passwordError: false});
//     }
//   }

//   onEmailValidate(email) {
//     if (!validEmail(email)) {
//       ToastAndroid.show(
//         'This is not a valid email address!',
//         ToastAndroid.LONG,
//       );
//       this.setState({emailError: true});
//     } else {
//       this.setState({emailError: false});
//     }
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
//               onBlur={() => this.onEmailValidate(this.state.emailText)}
//               onChangeText={text => this.setState({emailText: text})}
//               placeholder="Email"
//               style={{flex: 0.8, borderWidth: 0, height: 40}}
//             />
//           </View>
//           <View style={{flex: 0.2}} />
//           <View style={{flexDirection: 'row', justifyContent: 'center'}}>
//             <TextInput
//               onChangeText={text => this.setState({passwordText: text})}
//               placeholder="Password"
//               secureTextEntry
//               style={{flex: 0.8, borderWidth: 0, height: 40}}
//             />
//           </View>
//           <View style={{flex: 0.2}} />
//           <View style={{flexDirection: 'row', justifyContent: 'center'}}>
//             <TextInput
//               onBlur={() =>
//                 this.onPasswordConfirmationValidate(
//                   this.state.passwordText,
//                   this.state.passwordConfirmationText,
//                 )
//               }
//               onChangeText={text =>
//                 this.setState({passwordConfirmationText: text})
//               }
//               placeholder="Confirm Password"
//               secureTextEntry
//               style={{flex: 0.8, borderWidth: 0, height: 40}}
//             />
//           </View>
//         </View>

//         <View
//           style={{flex: 2, flexDirection: 'column', justifyContent: 'center'}}>
//           <View style={{flexDirection: 'row', justifyContent: 'center'}}>
//             <TouchableOpacity
//               disabled={this.state.emailError || this.state.passwordError}
//               onPress={() =>
//                 this.onSignUp(this.state.emailText, this.state.passwordText)
//               }
//               style={
//                 this.state.emailError || this.state.passwordError
//                   ? styles.disabledButton
//                   : styles.button
//               }
//               testID="signUpSubmitButton">
//               <Text style={styles.buttonText}>Sign Up</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     );
//   }
// }

// SignUpScreen.propTypes = {
//   navigation: PropTypes.shape({
//     navigate: PropTypes.func,
//   }).isRequired,
// };
