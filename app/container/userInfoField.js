import React from 'react'
import { TextInput, View, StyleSheet, Text } from 'react-native';
import { Field } from 'redux-form';

const styles = StyleSheet.create({
  InfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#393939',
    borderBottomWidth: 0.5,
  },
  nameInput: {
    flex: 1,
    height: 30,
    marginVertical: 2,
    marginHorizontal: 2,
  },
  text: {
    color: '#393939',
    fontSize: 14,
  },
  errorText: {
    fontSize: 12,
    color: '#F2777A',
  },
});

class UserInfoField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  required = value => (value ? undefined : '此项为必填项');

  telephoneNumber = value =>
    value && !/^1[3|4|5|7|8][0-9]\d{4,8}$/i.test(value)
      ? '请输入合法手机号'
      : undefined;

  renderNameInput = ({ input: { onChange, value }, meta: {touched, error}}) => (
    <View style={styles.InfoRow}>
      <Text style={styles.text}>姓名:</Text>
      <TextInput
        style={styles.nameInput}
        onChangeText={onChange}
      />
      {(touched && error) && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );

  renderTelephoneInput = ({input: {onChange, value}, meta: {touched, error}}) => (
    <View style={styles.InfoRow}>
      <Text style={styles.text}>手机号:</Text>
      <TextInput
        style={styles.nameInput}
        onChangeText={onChange}
      />
      {(touched && error) && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );

  renderAddressInput = ({input: {onChange, value}}) => (
    <View style={styles.InfoRow}>
      <Text style={styles.text}>地址:</Text>
      <TextInput
        style={styles.nameInput}
        onChangeText={onChange}
      />
    </View>
  );

  render() {
    return (
      <View>
        <Field name="name"
               component={this.renderNameInput}
               validate={this.required}
        />
        <Field
          name="telephone"
          component={this.renderTelephoneInput}
          validate={[this.required,this.telephoneNumber]}
        />
        <Field name="address" component={this.renderAddressInput} />
      </View>
    );
  }
}

export default UserInfoField