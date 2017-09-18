import React from 'react'
import { reduxForm } from 'redux-form'
import { Text, View } from 'react-native';

class RecipientInfoPage extends React.Component{

  constructor(props) {
    super(props);
    this.state={};
  }

  render() {
    return (
      <View><Text>RecipientInfoPage</Text></View>
    )
  }
}

export default reduxForm({
  form: 'order',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(RecipientInfoPage)