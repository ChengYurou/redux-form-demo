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
  }
});

class UserInfoField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderNameInput = ({ input: { onChange, value }}) => (
    <View style={styles.InfoRow}>
      <Text style={styles.text}>姓名:</Text>
      <TextInput
        style={styles.nameInput}
        onChangeText={onChange}
      />
    </View>
  );

  renderTelephoneInput = ({input: {onChange, value}}) => (
    <View style={styles.InfoRow}>
      <Text style={styles.text}>手机号:</Text>
      <TextInput
        style={styles.nameInput}
        onChangeText={onChange}
      />
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
        <Field name="name" component={this.renderNameInput} />
        <Field name="telephone" component={this.renderTelephoneInput} />
        <Field name="address" component={this.renderAddressInput} />
      </View>
    );
  }
}

export default UserInfoField