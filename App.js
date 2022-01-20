import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  Pressable,
  Modal,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Chip } from 'react-native-paper';
import { Camera } from 'expo-camera';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import HomeScreen from './components/HomeScreen';
import Chats from './components/Chats';
import Calls from './components/Calls';
import Status from './components/Status';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SearchBar } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import { Details } from './components/Details';
import Camerass from './components/Camerass'
const Tab = createMaterialTopTabNavigator();

export class MyTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state={
     chat:"chats",
     status:"status",
     calls:"calls",
     camera:"camera"
    }
  }
  render() {
    console.log('is', this.props.name);
    const { name } = this.props;
    return (
      <Tab.Navigator
      initialRouteName="Status"
        screenOptions={{
          tabBarLabelStyle: { fontSize: 13 },
          tabBarStyle: { backgroundColor: '#075E54' },
          tabBarIndicatorStyle: {
            backgroundColor: '#fff',
          },
          tabBarInactiveTintColor: ' #999999',
          tabBarActiveTintColor: '#fff',
          showIcon: true,
  
    backBehavior: 'history',
        }}>
        <Tab.Screen
          name="camera"
           listeners={({ navigation, route }) => ({
    tabPress: e => {
     this.props.onRun(this.state.camera)
     console.log("nav",this.props.navigation)
     this.props.onGate(navigation)
    },
  })}
          options={{
            tabBarIcon: ({ color: String }) => (
              <AntDesign name="camera" size={20} color="black" />
            ),
            tabBarLabel: () => null,
            tabBarIconStyle: {
              display: 'flex',
              alignItems: 'center',
            },
          }}
        />
        <Tab.Screen
          name="Chats"
          component={() => <Chats filterData={name} />}
          listeners={({ navigation, route }) => ({
    tabPress: e => {
      this.props.onRun(this.state.chat)
     
    },
  })}
        />
        <Tab.Screen
          name="Status"
          component={() => <Status filterData={name} />}
           listeners={({ navigation, route }) => ({
    tabPress: e => {
       this.props.onRun(this.state.status)
    },
  })}
          
        />
        <Tab.Screen
          name="Calls"
          component={() => <Calls filterData={name} />}
           listeners={({ navigation, route }) => ({
    tabPress: e => {
       this.props.onRun(this.state.calls)
    },
  })}
        />
      </Tab.Navigator>
    );
  }
}

const Stack = createStackNavigator();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSearchBar: false,
      modalVisible: false,
      searchName: '',
      filteredData: [],
      checks:"false",
      tabName:""
    };
  }
  onCheck=(check)=>{
    console.log(check)
    this.state.tabName=check
       console.log("c",this.state.tabName)
  }
  goNavigate=(navigate)=>{
    console.log("pls",navigate)
  }
  onCameraBack=(check)=>{
    console.log("clicked camara")
   this.state.tabName="Status"
  }
  openSearchBar = () => {
    this.setState({ showSearchBar: !this.state.showSearchBar });
  };
  closeSearchBar = () => {
    this.setState({ showSearchBar: !this.state.showSearchBar });
  };
  handleChange = (e) => {
    this.setState({ searchName: e.target.value });
    console.log(filteredData);
    let filteredData = Details.filter(function (item) {
      return item.name.toLowerCase().startsWith(e.target.value.toLowerCase());
    });

    this.setState({ filteredData: filteredData });
    console.log('fills', filteredData);
  };
  clearSearch = () => {
    this.setState({ searchName: '' });
  };
  openModal = () => {
    this.setState({ modalVisible: true });
  };
  closeModal = () => {
    this.setState({ modalVisible: false });
  };
  hideModal = () => {
    this.setState({ modalVisible: false });
  };
  render() {
    console.log("ab",this.state.tabName)
    const { showSearchBar } = this.state;
    const commonProps = {
      name: this.state.searchName !== '' ? this.state.filteredData : Details,
      search: this.state.searchName,
    };
    const name=this.state.tabName==="chats"?<Chats filterData={commonProps}/>:this.state.tabName==="calls"?<Calls filterData={commonProps}/>:<Status filterData={commonProps}/>
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="home"
            component={() => showSearchBar?name:this.state.tabName==="camera"?<Camerass onBack={this.onCameraBack}/>:<MyTabs onRun={this.onCheck} onGate={this.goNavigate}name={commonProps}/>} 
            options={() => ({
              headerShown:this.state.tabName==="camera"?false:true,
              header: () => {
                return (
                  <View style={{flex:1}}>
                    {!showSearchBar ? (
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          backgroundColor: '#075E54',
                    
                        }}>
                        <View style={{ padding: 10, marginRight: '52%' }}>
                          <Text
                            style={{
                              fontSize: 16,
                              color: '#fff',
                              fontWeight: 'normal',
                            }}>
                           WhatsApp
                          </Text>
                        </View>
                        
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                          }}>
                          <TouchableOpacity
                            onPress={this.openSearchBar}
                            style={{ marginHorizontal: 5 }}>
                            <MaterialIcons
                              name="search"
                              size={20}
                              color="white"
                            />
                          </TouchableOpacity>
                          <Modal
                            animationType="fade"
                            transparent={true}
                            visible={this.state.modalVisible}
                         >
                            <View
                              style={{
                                position: 'absolute',
                                left: '53%',
                                top: 3,
                              }}>
                              <View style={styles.modalView}>
                                <View
                                  style={{
                                    paddingHorizontal: 10,
                                    paddingVertical: 5,
                                  }}>
                                  <Text style={{ paddingVertical: 5 }}>
                                    New group
                                  </Text>
                                  <Text style={{ paddingVertical: 5 }}>
                                    New broadCast
                                  </Text>
                                  <Text style={{ paddingVertical: 5 }}>
                                    Linked devices
                                  </Text>
                                  <Text style={{ paddingVertical: 5 }}>
                                    Starred messages
                                  </Text>
                                  <Text style={{ paddingVertical: 5 }}>
                                    Payments
                                  </Text>
                                  <TouchableOpacity
                                    onPress={() => this.hideModal()}>
                                    <Text style={{ paddingVertical: 5 }}>
                                      Settings
                                    </Text>
                                  </TouchableOpacity>
                                </View>
                              </View>
                            </View>
                          </Modal>
                          
                          <TouchableOpacity
                            onPress={this.openModal}
                            style={{ marginHorizontal: 5 }}>
                            <Ionicons
                              name="md-ellipsis-vertical"
                              size={20}
                              color="white"
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    ) : (
                      <View style={{flexDirection:"column",width:"100%"}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          backgroundColor: '#fff',
                          borderBottomWidth:1,
                          borderBottomColor:"#ddd"
                        }}>
                        <TouchableOpacity onPress={this.closeSearchBar}>
                          <AntDesign
                            name="arrowleft"
                            size={20}
                            color="grey"
                            style={{ padding: 10 }}
                          />
                        </TouchableOpacity>
                        <TextInput
                          style={{
                            backgroundColor: '#fff',
                            width: '100%',
                            outline: 'none',
                            fontSize: 17,
                          }}
                          placeholder="Search"
                          onChange={(e) => this.handleChange(e)}
                          value={this.state.searchName}
                        />
                        {this.state.searchName ? (
                          <TouchableOpacity onPress={this.clearSearch}>
                            <EvilIcons
                              name="close"
                              size={20}
                              color="grey"
                              style={{ padding: 10 }}
                            />
                          </TouchableOpacity>
                        ) : null}
                      </View>
                       <View
                        style={{
                          flexDirection: 'row',
                          backgroundColor: '#fff',
                          borderBottomColor:"#ddd",
                        }}>
                    
   <Chip icon="information" onPress={() => console.log('Pressed')} style={{padding:0,width:90}}>photos</Chip>
                       <Chip icon="information" onPress={() => console.log('Pressed')}style={{padding:-10,width:90}}>photos</Chip>
                       <Chip icon="information" onPress={() => console.log('Pressed')}style={{padding:0,width:90}}>photos</Chip>
                       <Chip icon="information" onPress={() => console.log('Pressed')} style={{padding:0,width:90}}>photos</Chip>
                       </View>
                      </View>
                    
                    )}
                  </View>
                );
              },
              // headerRight:()=>{
              //   return (
              //     (
              //       <View style={{flexDirection:"row",alignItems:"center"}}>
              //   <TouchableOpacity onPress={this.open} style={{marginHorizontal:5}}>
              //   <MaterialIcons name="search" size={20} color="white" />
              //    </TouchableOpacity>
              //    <TouchableOpacity onPress={""} style={{marginHorizontal:5}}>
              //   <Ionicons name="md-ellipsis-vertical" size={20} color="white" />
              //   </TouchableOpacity>
              //   </View>)
              //   )
              // },
              headerStyle: {
                backgroundColor: '#075E54', //Set Header color
                borderBottomWidth: 0,
                elevation: 0,
                height: 90,
              },
              headerTitleStyle: {
                fontWeight: 'normal',
                fontSize: 16,
              },
              headerTintColor: '#fff',
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  modalView: {
    borderRadius: 4,
    height: 185,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '115%',
  },
});
