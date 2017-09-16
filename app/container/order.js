import React from 'react';
import { Field, FormSection, reduxForm } from 'redux-form';
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { ORDER_STATUS } from '../constant/order';
import ItemList from './itemList';

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
});


class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderStatus: this.props.orderStatus,
      isItemListDisplay: this.props.orderStatus !== ORDER_STATUS.UN_CREATE,
    };
  }

  judgeItemListDisplay = () => {
    this.setState({ isItemListDisplay: this.state.orderStatus !== ORDER_STATUS.UN_CREATE })
  };

  setOrderStatus(orderStatus) {
      this.setState({ orderStatus }, () => {
        this.judgeItemListDisplay();
      });
  }

  handleButtonPress = () => {
    const orderStatus = this.state.orderStatus;

    if (orderStatus === ORDER_STATUS.UN_CREATE) {
      this.setOrderStatus(ORDER_STATUS.EDIT)
    }
    if (orderStatus === ORDER_STATUS.EDIT) {
      this.setOrderStatus(ORDER_STATUS.CREATED)
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={this.handleButtonPress}
          disabled={this.state.orderStatus === ORDER_STATUS.CREATED}>
          <Text style={styles.button}>{this.state.orderStatus}</Text>
        </TouchableOpacity>
        {this.state.isItemListDisplay && <ItemList />}
      </View>
    )
  }
}

Order.propTypes = {
  orderStatus: React.PropTypes.string,
};

Order.defaultProps = {
  orderStatus: ORDER_STATUS.UN_CREATE,
};

export default reduxForm({
  form: 'order',
})(Order);
