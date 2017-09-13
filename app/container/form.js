import React from 'react';
import { Field, FormSection, reduxForm } from 'redux-form';
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  button: {
    backgroundColor: '#69c',
    color: '#393939',
    height: 30,
    lineHeight: 30,
    marginTop: 10,
    textAlign: 'center',
    width: 300,
  },
  inputRow: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    flex: 1,
  },
});

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  submit = values => {
    console.log('submitting test', values)
  };

  renderInput = ({ input: { onChange, name } }) => {
    return <View style={styles.inputRow}>
      <Text>{name}</Text>
      <TextInput style={styles.input} onChangeText={onChange} />
    </View>
  };

  renderAddress = () => (<View>
      <Field name="streetName" component={this.renderInput} />
      <Field name="number" component={this.renderInput} />
      <Field name="zipCode" component={this.renderInput} />
    </View>
  );

  renderParty = () => (<View>
      <Field name="givenName" component={this.renderInput} />
      <Field name="middleName" component={this.renderInput} />
      <Field name="surname" component={this.renderInput} />
      <FormSection name="address">
        {this.renderAddress()}
      </FormSection>
    </View>
  );

  render() {
    const { handleSubmit } = this.props;
    return (
      <View style={styles.container}>
        <Text>Email:</Text>
        <Field name="email" component={this.renderInput} />
        <FormSection name="buyer">
          {this.renderParty()}
        </FormSection>
        <FormSection name="recipient">
          {this.renderParty()}
        </FormSection>
        <TouchableOpacity onPress={handleSubmit(this.submit)}>
          <Text style={styles.button}>Submit</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default reduxForm({
  form: 'simpleForm',
})(Form);
