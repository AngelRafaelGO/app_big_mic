import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import Search_bar from '../components/Search_bar';
import Search_filters from '../components/Search_filters';
import Search_listview from '../components/Search_listview';

class SearchSceneScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    return (
      <SafeAreaView>
        <Search_bar />
        <Search_filters />
        <Search_listview />
      </SafeAreaView>
    );
  }
}

export default SearchSceneScreen;
