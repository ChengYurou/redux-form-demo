import React from 'react';
import { getFormValues, reduxForm } from 'redux-form';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import * as _ from 'lodash';
import { ORDER_STATUS } from '../constant/order';
import ItemList from './itemList';
import { fetchStoreItems } from '../../apis/order';
import CustomerInfoPage from './customerInfoPage';
import { connect } from 'react-redux';

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

  submitOrder = () => {
    console.log('===========')
    console.log(this.props.values);
  };

  render() {
    const { handleSubmit} = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={this.handleButtonPress}
          disabled={this.state.orderStatus === ORDER_STATUS.CREATED}>
          <Text style={styles.button}>{this.state.orderStatus}</Text>
        </TouchableOpacity>
        {this.state.isItemListDisplay && <ItemList />}
        {this.state.page === 1 && (
          <CustomerInfoPage
            goNextPage={this.goNextPage}
            customerName="buyer"
          />
        )}
        {this.state.page === 2 && (
          <CustomerInfoPage
            customerName="recipient"
            goPreviousPage={this.goPreviousPage}
            onSubmit={this.submitOrder}
          />
        )}
        <TouchableOpacity
          onPress={this.submitOrder} >
          <Text style={styles.button}>submit</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

Order.propTypes = {
  orderStatus: React.PropTypes.string,
  initialize: React.PropTypes.func.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
};

Order.defaultProps = {
  orderStatus: ORDER_STATUS.UN_CREATE,
};


const mapStateToProps = (state) => {
  return {
    values: getFormValues('order')(state)
  }
};

export default connect(mapStateToProps, null)(reduxForm({
  form: 'order',
})(Order));
