import React, { Component } from "react";
import { View, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import colors from "../styles/colors";
import fontSize from "../styles/fontSize";


class GenericList extends Component {
  render() {
    return (
      <FlatList
        keyExtractor={this._keyExtractor}
        renderItem={this._renderRow}
        ItemSeparatorComponent={this._renderSeparator}
        data={this.props.data}
      />
    );
  }

  _renderRow = ({ item }) => {
    return (
      <TouchableOpacity
        disabled={this.props.onPressDisabled}
        onPress={() => this.props.onPress(item)}
        style={styles.listItemContainer}
      >
        {this.props.renderRowItem(item)}
      </TouchableOpacity>
    );
  };

  
  _renderSeparator = () => <View style={styles.separator} />;


  _keyExtractor = (item, index) => `${item.id}_${index}`;
}

const styles = StyleSheet.create({
  separator: {
    backgroundColor: colors.blue,
    height: 2,
    width: "100%"
  },
  listItemContainer: {
    padding: 10,
    backgroundColor: "transparent"
  },
  listItemText: {
    color: colors.cream,
    paddingVertical: 10,
    fontSize: fontSize.medium
  }
});

GenericList.propTypes = {
  data: PropTypes.array,
  onPress: PropTypes.func,
  renderRowItem: PropTypes.func,
  onPressDisabled: PropTypes.bool
};

GenericList.defaultProps = {
  data: [],
  onPress: () => {},
  renderRowItem: () => <View />,
  onPressDisabled: false
};

export default GenericList;
