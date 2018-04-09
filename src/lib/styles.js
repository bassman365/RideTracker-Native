import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  titleText: {
    fontFamily: 'nanumpenscript_regular',
    fontSize: 42,
  },
  linkText: {
    fontFamily: 'inconsolata_regular',
    fontSize: 22,
    color: '#4359e8'
  },
  labelText: {
    fontFamily: 'inconsolata_regular',
    fontSize: 16,
  },
  labelText2: {
    fontFamily: 'inconsolata_regular',
    fontSize: 18,
    flex: 0.8,
    borderWidth: 0,
    height: 30
  },
  dateText: {
    fontFamily: 'inconsolata_regular',
    fontSize: 18,
    color: '#4359e8',
    paddingHorizontal: 20
  },
  buttonText: {
    fontFamily: 'inconsolata_bold',
    fontSize: 22,
    color: 'white'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#4359e8',
    padding: 4,
    height: 40,
    flex: 0.8
  },
  disabledButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(138,139,140,0.5)',
    padding: 4,
    height: 40,
    flex: 0.8
  }
});
