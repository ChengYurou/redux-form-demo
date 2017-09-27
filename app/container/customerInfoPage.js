import React from 'react'
import { FormSection, reduxForm } from 'redux-form'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import UserInfoField from './userInfoField';
import * as _ from 'lodash';
import { CUSTOMER_NAMES } from '../constant/order';

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
    marginTop: 50,
    marginHorizontal: 10,
    borderWidth: 0.5,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 14,
    color: '#393939',
  },
  submitButton: {
    marginLeft: 5,
  }
});

class CustomerInfoPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  submitCustomerInfo = (values) => {
    console.log(values)
  };

  render() {
    const { customerName, goPreviousPage, goNextPage, handleSubmit } = this.props;
    return (
      <View>
        <View style={styles.InfoContainer}>
          <Text style={styles.title}>{`请完善${CUSTOMER_NAMES[customerName]}信息：`}</Text>
          <FormSection name={customerName}>
            <UserInfoField />
          </FormSection>
          <View style={styles.buttonContainer}>
            {customerName === 'recipient' && (
              <TouchableOpacity onPress={goPreviousPage}>
                <Text style={styles.button}>上一步</Text>
              </TouchableOpacity>
            )}
            {customerName === 'recipient' && (
              <TouchableOpacity onPress={handleSubmit(this.submitCustomerInfo)} style={styles.submitButton}>
                <Text style={styles.button}>提交</Text>
              </TouchableOpacity>
            )}
            {customerName === 'buyer' && (
              <TouchableOpacity onPress={handleSubmit(goNextPage)}>
                <Text style={styles.button}>下一步</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    )
  }
}

CustomerInfoPage.propTypes = {
  goNextPage: React.PropTypes.func,
  goPreviousPage: React.PropTypes.func,
  customerName: React.PropTypes.string.isRequired,
};

CustomerInfoPage.defaultProps = {
  goNextPage: _.noop,
  goPreviousPage: _.noop,
};

export default reduxForm({
  form: 'customerInfo',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(CustomerInfoPage)