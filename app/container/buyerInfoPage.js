import React from 'react'
import { reduxForm } from 'redux-form'
import { Text, TouchableOpacity, View } from 'react-native';

class BuyerInfoPage extends React.Component{

  constructor(props) {
    super(props);
    this.state={};
  }

  render() {
    return (
      <View>
        <Text>BuyerInfoPage</Text>
        <TouchableOpacity onPress={this.props.goNextPage}>
          <Text>下一步</Text>
        </TouchableOpacity>
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