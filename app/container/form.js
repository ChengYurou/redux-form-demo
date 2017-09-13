import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    color: 'white',
    height: 30,
    lineHeight: 30,
    marginTop: 10,
    textAlign: 'center',
    width: 250,
  },
  container: {},
  input: {
    borderColor: 'black',
    borderWidth: 1,
    height: 37,
    width: 250,
  },
});

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  submit = values => {
    console.log('submitting form', values)
  };

  change = value => {
    console.log('on change', value)
  };

  renderInput = ({ input: { onChange, value}}) => {
    return <TextInput style={styles.input} onChangeText={onChange}/>
  };

  render() {
    const {handleSubmit} = this.props;
    return (
      <View style={styles.container}>
        <Text>Email:</Text>
        <Field name="email" component={this.renderInput} />
        <TouchableOpacity onPress={handleSubmit(this.submit)}>
          <Text style={styles.button}>Submit</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default connect(null, null)(
  reduxForm({
    form: 'simpleForm',
  })(Form));
