import React from 'react'
import { View } from 'react-native';
import CustomerInfoPage from './customerInfoPage';

class CustomerInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
  }

  goNextPage = () => {
    this.setState({ page: this.state.page + 1 })
  };

  goPreviousPage = () => {
    this.setState({ page: this.state.page - 1 })
  };

  render() {
    return (
      <View>
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
          />
        )}
      </View>
    );
  }
}

export default CustomerInfo