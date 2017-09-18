import React from 'react'
import { FormSection, reduxForm } from 'redux-form'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import UserInfoField from './userInfoField';

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#69c',
    color: '#393939',
    height: 30,
    lineHeight: 30,
    marginTop: 10,
    textAlign: 'center',
    width: 100,
  },
  InfoContainer: {
    borderWidth: 0.5,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  title: {
    fontSize: 14,
    color: '#393939',
  }
});

class BuyerInfoPage extends React.Component{

  constructor(props) {
    super(props);
    this.state={};
  }

  render() {
    return (
      <View>
        <View style={styles.InfoContainer}>
          <Text style={styles.title}>请完善收件人信息：</Text>
          <FormSection name="buyer">
            <UserInfoField/>
          </FormSection>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={this.props.goNextPage}>
              <Text style={styles.button}>下一步</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

BuyerInfoPage.propTypes = {
  goNextPage: React.PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'order',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(BuyerInfoPage)