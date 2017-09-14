import React from 'react';
import { Field, FormSection, reduxForm } from 'redux-form';
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import * as _ from 'lodash';

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
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
  errorText: {
    fontSize: 14,
    color: '#F2777A',
  },
  warningText: {
    fontSize: 14,
    color: '#fc6',
  }
});

const party = ['givenName', 'middleName', 'zipCode'];
const address = ['streetName', 'number', 'zipCode'];

const validate = values => {
  const errors = {};
  if (!values.title) {
    errors.title = 'title is required'
  }
  return errors;
};

const warn = values => {
  const warnings = {}
  if (values.title && values.title.length < 5) {
    warnings.title = 'Please enter at least 5 characters'
  }
  return warnings
};

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  submit = values => {
    console.log('submitting test', values)
  };

  renderInput = ({
                   input: { onChange, name },
                   meta: { touched, error, warning },
                 }) => {
    return <View style={styles.inputRow}>
      <Text>{name}</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChange}
        warning={warning}
      />
      {(touched && error) && <Text style={styles.errorText}>{error}</Text>}
      {(touched && warning) && <Text style={styles.warningText}>{warning}</Text>}
    </View>
  };

  renderFields = fieldsName => (
    _.map(fieldsName, (name, index) => (
      <Field key={index} name={name} component={this.renderInput} />
    ))
  );

  renderParty = () => (<View>
      {this.renderFields(party)}
      <FormSection name='address'>
        <View>
          {this.renderFields(address)}
        </View>
      </FormSection>
    </View>
  );

  render() {
    const { handleSubmit } = this.props;
    return (
      <View style={styles.container}>
        <Field name="title" component={this.renderInput} />
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
  validate,
  warn,
})(Form);
