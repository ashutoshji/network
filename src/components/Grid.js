import React, { Component } from "react";
import { View, FlatList } from "react-native";
import PropTypes from "prop-types";


class Grid extends Component {
  render() {
    return (
      <FlatList
        keyExtractor={this._keyExtractor}
        renderItem={this.props.renderGridItem}
        data={this.props.data}
        numColumns={this.props.numColumns}
      />
    );
  }

  _keyExtractor = (item, index) => `${item.id}_${index}`;
}

Grid.propTypes = {
  data: PropTypes.array,
  renderGridItem: PropTypes.func,
  onPressDisabled: PropTypes.bool
};

Grid.defaultProps = {
  data: [],
  onPress: () => {},
  renderGridItem: () => <View />
};

export default Grid;
