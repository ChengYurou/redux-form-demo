import React from 'react'
import { reduxForm } from 'redux-form'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';

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
});

class RecipientInfoPage extends React.Component{

  constructor(props) {
    super(props);
    this.state={};
  }

  render() {
    return (
      <View>
        <Text>RecipientInfoPage</Text>
        <TouchableOpacity onPress={this.props.goPreviousPage}>
          <Text style={styles.button}>上一步</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

RecipientInfoPage.propTypes = {
  goPreviousPage: React.PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'order',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(RecipientInfoPage)