import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  Image,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import firebase from 'firebase';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';

export default class PostCard extends Component {
  constructor() {
    super();
    this.state = {
      tHeight: null,
    };
  }

    componentDidMount() {
    this.fetchUser();
    this.fetchUser();
  }

  fetchUser = () => {
    let theme;
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", snapshot => {
        theme = snapshot.val().current_theme;
        this.setState({ light_theme: theme === "light" });
      });
  };
  
  render() {
    return (
      <View style={[styles.container,{backgroundColor:this.state.light_theme ? "white" : "#2A2A2A"}]}>
        <SafeAreaView style={styles.droidSafeArea} />
        <View
          style={styles.appTitle}
          onLayout={(event) => {
            this.setState({ tHeight: event.nativeEvent.layout.height });
          }}>
          <View style={[styles.appIcon,
              { backgroundColor: this.state.isEnabled ? 'transparent' : 'black' }]}>
            <Image
              source={require('../assets/logo.png')}
              style={styles.iconImage}></Image>
          </View>
          <View style={styles.appTitleTextContainer}>
            <Text style={[styles.appTitleText,{color:this.state.light_theme ? "black" : "white"}]}>Spectagram</Text>
          </View>
        </View>
        <View
          style={[
            styles.cardContainer,
            {backgroundColor:this.state.light_theme ? "lightgrey" : "grey",
              marginTop:
                (Platform.OS === 'android'
                  ? StatusBar.currentHeight
                  : RFValue(35)) +
                this.state.tHeight +
                5,
              height:
                Dimensions.get('window').height -
                (this.state.tHeight +
                  (Platform.OS === 'android'
                    ? StatusBar.currentHeight
                    : RFValue(35))+5),
            },
          ]}>
          <View style={[styles.authorContainer,{backgroundColor:this.state.light_theme ? "#a0a0a0" : "#3a3a3a"}]}>
            <View style={styles.authorImageContainer}>
              <Image
                source={require('../assets/profile_img.png')}
                style={styles.profileImage}></Image>
            </View>
            <View style={styles.authorNameContainer}>
              <Text style={styles.authorNameText}>
                {this.props.route.params.post.author}
              </Text>
            </View>
          </View>
          <ScrollView>
            <Image
              source={require('../assets/post.jpeg')}
              style={styles.postImage}></Image>
            <View style={[styles.captionContainer,{backgroundColor:this.state.light_theme ? "#a0a0a0" : "#3a3a3a"}]}>
              <Text style={styles.captionText}>
                {this.props.route.params.post.caption}
              </Text>
            </View>
          </ScrollView>
          <View style={styles.actionContainer}>
            <View style={styles.likeButton}>
              <Ionicons name={'heart'} size={RFValue(30)} color={'white'} />
              <Text style={styles.likeText}>-12k</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
  },
  appTitle: {
    flex: 0.07,
    flexDirection: 'row',
  },
  appIcon: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  iconImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  appTitleTextContainer: {
    flex: 0.8,
    justifyContent: 'center',
  },
  appTitleText: {
    color: 'white',
    fontSize: RFValue(28),
  },
  container: {
    flex: 1,
  },
  cardContainer: {
    alignSelf: 'center',
    borderRadius: RFValue(20),
    position: 'absolute',
    width: (Dimensions.get('window').width * 93) / 100,
  },
  postImage: {
    resizeMode: 'contain',
    width: '95%',
    alignSelf: 'center',
    height: RFValue(250),
  },
  profileImage: {
    width: (Dimensions.get('window').width * 10) / 100,
    height: (Dimensions.get('window').width * 10) / 100,
    borderRadius: 500,
  },
  authorImageContainer: {
    borderRadius: RFValue(200),
    alignSelf: 'center',
    paddingLeft: '5%',
  },
  authorContainer: {
    marginTop: (Dimensions.get('window').width * 3) / 100,
    borderRadius: RFValue(20),
    flexDirection: 'row',
    height: (Dimensions.get('window').width * 15) / 100,
  },
  authorNameContainer: {
    alignSelf: 'center',
    paddingLeft: '5%',
  },
  authorNameText: {
    fontSize: RFValue(18),
    color: 'white',
    fontWeight: 'bold',
  },
  captionContainer: {
    marginLeft: RFValue(20),
    marginRight: RFValue(20),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3A3A3A',
    borderRadius: 10,
  },
  captionText: {
    fontSize: RFValue(20),
    color: 'white',
    textAlign: 'center',
  },
  actionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: RFValue(10),
  },
  likeButton: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#eb3948',
    borderRadius: RFValue(30),
  },
  likeText: {
    color: 'white',
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(25),
    marginLeft: RFValue(5),
  },
});
