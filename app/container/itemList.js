import React from 'react';
import { View, StyleSheet, Text, ListView, TextInput, TouchableOpacity } from 'react-native';
import { Field, FieldArray, FormSection, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import * as _ from 'lodash';

const styles = StyleSheet.create({
  itemListContainer: {
    marginVertical: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
    flex: 1,
  },
  evenRow: {
    backgroundColor: '#F7FBFD',
  },
  itemBaseInfoContainer: {
    flex: 2,
    alignItems: 'center',
  },
  itemText: {
    fontSize: 14,
    color: '#393939',
  },
  headerName: {
    fontSize: 16,
    color: '#393939',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
  },
  priceAndCount: {
    flex: 1,
    alignItems: 'center',
  },
  countInput: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 5,
    borderColor: '#393939',
    borderWidth: 0.5,
    height: 20,
  },
  totalPriceContainer: {
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  totalPriceText: {
    fontSize: 16,
    color: '#393939',
  },
});

const lessThan = otherField => (value, previousValue, allValues) => {
  const otherFieldValue = _.get(allValues, otherField);
  return _.toNumber(value) <= _.toNumber(otherFieldValue) ? value : previousValue;
};


class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderItemCode = ({ input: { value } }) => (
    <View style={styles.itemBaseInfoContainer}>
      <Text style={styles.itemText}>{value}</Text>
    </View>
  );

  renderPrice = ({ input: { value } }) => (
    <View style={styles.priceAndCount}>
      <Text style={styles.itemText}>{`${value}¥`}</Text>
    </View>
  );

  renderCountInput = ({ input: { onChange, value } }) => (
    <TextInput
      style={styles.countInput}
      onChangeText={onChange}
      value={value}
    />
  );

  renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.itemBaseInfoContainer}>
        <Text style={styles.headerName}>商品编号</Text>
      </View>
      <View style={styles.itemBaseInfoContainer}>
        <Text style={styles.headerName}>商品名</Text>
      </View>
      <View style={styles.itemBaseInfoContainer}>
        <Text style={styles.headerName}>总数</Text>
      </View>
      <View style={styles.priceAndCount}>
        <Text style={styles.headerName}>单价</Text>
      </View>
      <View style={styles.priceAndCount}>
        <Text style={styles.headerName}>数量</Text>
      </View>
    </View>
  );

  getTotalPrice = () => (
    _.sumBy(
      _.filter(
        this.props.items,
        item => _.toNumber(item.count) > 0,
      ), a => _.toNumber(a.count) * _.toNumber(a.price),
    )
  );

  renderTotalPrice = ({ input: { value }, totalPrice }) => (
    <View style={styles.totalPriceContainer}>
      <Text style={styles.totalPriceText}>{`总计：${totalPrice}¥`}</Text>
    </View>
  );

  renderRow = (member, index) => (
    <View style={[styles.row, index % 2 && styles.evenRow]} key={index}>
      {_.map(['code', 'name', 'totalCount'], (item, index) => {
        return <Field name={`${member}.${item}`}
                      key={index}
                      component={this.renderItemCode} />
      })}
      <Field name={`${member}.price`} component={this.renderPrice} />
      <Field name={`${member}.count`}
             component={this.renderCountInput}
             normalize={lessThan(`items[${index}].totalCount`)} />
    </View>
  );

  renderItems = ({ fields }) => {
    return (
      <View>
        {fields.map((member, index) => {
          return this.renderRow(member, index);
        })}
      </View>
    )
  };

  render() {
    return (
      <View style={styles.itemListContainer}>
        {this.renderHeader()}
        <FieldArray name="items" component={this.renderItems} />
        <Field
          name="totalPrice"
          value={this.getTotalPrice()}
          component={this.renderTotalPrice}
          totalPrice={this.getTotalPrice()}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  const selector = formValueSelector('order');
  return {
    items: selector(state, 'items'),
  };
};

export default connect(mapStateToProps, null)(ItemList);