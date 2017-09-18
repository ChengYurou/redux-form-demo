import React from 'react';
import { reduxForm } from 'redux-form';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import * as _ from 'lodash';
import { ORDER_STATUS } from '../constant/order';
import ItemList from './itemList';
import { fetchStoreItems } from '../../apis/order';
import BuyerInfoPage from './buyerInfoPage';
import RecipientInfoPage from './recipientInfoPage'

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
    width: 400,
  },
});


class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderStatus: this.props.orderStatus,
      isItemListDisplay: this.props.orderStatus !== ORDER_STATUS.UN_CREATE,
      page: 0,
    };
  }

  getEmptyOrder = () => {
    const items = _.keyBy(fetchStoreItems(), item => item.code);
    return {
      items,
      totalPrice: 0,
      buyer: {
        name: '',
        telephone: '',
        address: '',
      },
      recipient: {
        name: '',
        telephone: '',
        address: '',
      },

    };
  };

  componentDidMount() {
    this.props.initialize(this.getEmptyOrder())
  }

  judgeItemListDisplay = () => {
    this.setState({ isItemListDisplay: this.state.orderStatus !== ORDER_STATUS.UN_CREATE })
  };

  setOrderStatus(orderStatus) {
    this.setState({ orderStatus }, () => {
      this.judgeItemListDisplay();
      if (this.state.orderStatus === ORDER_STATUS.CREATED) {
        this.setState({ page: 1 });
      }
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

  goNextPage = () => {
    this.setState({ page: this.state.page + 1 })
  };

  goPreviousPage = () => {
    this.setState({ page: this.state.page - 1 })
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
        {this.state.page === 1 && <BuyerInfoPage goNextPage={this.goNextPage} />}
        {this.state.page === 2 && <RecipientInfoPage goPreviousPage={this.goPreviousPage} />}
      </View>
    )
  }
}

Order.propTypes = {
  orderStatus: React.PropTypes.string,
  initialize: React.PropTypes.func.isRequired,
};

Order.defaultProps = {
  orderStatus: ORDER_STATUS.UN_CREATE,
};

export default reduxForm({
  form: 'order',
})(Order);
