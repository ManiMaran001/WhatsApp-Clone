import React from 'react'
import {View,Text,Button,StyleSheet,Image,ScrollView, FlatList} from 'react-native'
import { SearchBar } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Zocial } from '@expo/vector-icons';
import {Details} from './Details'
class Calls extends React.Component{
  constructor(props){
    super(props)
    this.state={
      date:" December 6, 3:34 PM",
      Details:[
           {id:1,img_uri:"https://e7.pngegg.com/pngimages/119/921/png-clipart-flower-dahlia-flower-flower-garden-annual-plant.png",time:new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", hour12:true }),name:"California",chat:"hai"},
             {id:2,img_uri:"https://us.123rf.com/450wm/luismolinero/luismolinero1909/luismolinero190917934/130592146-handsome-young-man-in-pink-shirt-over-isolated-blue-background-keeping-the-arms-crossed-in-frontal-p.jpg?ver=6",time:new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", hour12:true }),name:"james",chat:"tommorow "},
             {id:3,img_uri:"https://media.istockphoto.com/photos/smiling-indian-man-looking-at-camera-picture-id1270067126?k=20&m=1270067126&s=612x612&w=0&h=ZMo10u07vCX6EWJbVp27c7jnnXM2z-VXLd-4maGePqc=",time:new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", hour12:true }),name:"kadhar",chat:"pdf file sended to email"},
              {id:4,img_uri:"https://images.unsplash.com/photo-1503443207922-dff7d543fd0e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWVufGVufDB8fDB8fA%3D%3D&w=1000&q=80",time:new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", hour12:true }),name:"aslam",chat:"send me chat "},
               {id:5,img_uri:"https://images.unsplash.com/photo-1503443207922-dff7d543fd0e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWVufGVufDB8fDB8fA%3D%3D&w=1000&q=80",time:new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", hour12:true }),name:"aslam",chat:"send me chat "},
                {id:6,img_uri:"https://images.unsplash.com/photo-1503443207922-dff7d543fd0e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWVufGVufDB8fDB8fA%3D%3D&w=1000&q=80",time:new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", hour12:true }),name:"aslam",chat:"send me chat "},
                 {id:7,img_uri:"https://images.unsplash.com/photo-1503443207922-dff7d543fd0e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWVufGVufDB8fDB8fA%3D%3D&w=1000&q=80",time:new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", hour12:true }),name:"aslam",chat:"send me chat "},
                  {id:8,img_uri:"https://images.unsplash.com/photo-1503443207922-dff7d543fd0e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWVufGVufDB8fDB8fA%3D%3D&w=1000&q=80",time:new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", hour12:true }),name:"aslam",chat:"send me chat "}
      ],
      search:"",
      filteredData:[]
    }
  }
  updateSearch=(e)=>{
     this.setState({ search:e.target.value})
     console.log(filteredData)
     let filteredData = this.state.Details.filter(function (item) {
    return item.name.toLowerCase().startsWith(e.target.value.toLowerCase());
  }
  );

  this.setState({filteredData: filteredData});
    console.log(filteredData)
  }
   ListEmptyView = (searchName) => {
    return (
      <View style={{alignItems:"center"}}>
 
        <Text style={{textAlign: 'center',marginTop:20,fontSize:15}}>No results found for '{searchName}'</Text>
 
      </View>
 
    );
  }
  render(){
    const {filterData}=this.props
    return(
      <View style={{flex:1,backgroundColor:"#fff"}}>
      <FlatList
      data={filterData.name && filterData.name.length > 0 ?filterData.name :""}
      renderItem={({item})=>{
        return (
      <View style={styles.container}>
      <View style={styles.leftContainer}>
      <Image source={{uri:item.img_uri}} style={styles.avatar}/>
      <View style={styles.midContainer}>
      
      <Text style={styles.userName}>
      {item.name}
      </Text>
      <Text style={styles.msgName}>
        <Feather name="arrow-up-right" size={14} color="#25D366" />
        <Text style={{paddingLeft:5,marginVertical:-3}}>{this.state.date}</Text>
      </Text>
       <Text></Text>
      </View>
      </View>
      <Text style={styles.time}>
      <Zocial name="call" size={16} color="#075E54" />
      </Text>
      </View>
        )
      }}
      ListEmptyComponent={this.ListEmptyView(filterData.search)}
      />
      </View>
    )
  }
}

const styles=StyleSheet.create({
  avatar:{
    width:50,
    height:50,
    borderRadius:100/2,
    marginLeft:10,
    marginRight:10,
  },
  container:{
    marginTop:10,
    flexDirection:"row",
    width:"100%",
    justifyContent:"space-between",
    paddingRight:10
  },
  leftContainer:{
  flexDirection:"row"
  },
  midContainer:{
    justifyContent:"space-around"
  },
  userName:{
    fontSize:16,
    fontWeight:"bold"
  },
  msgName:{
    display:"flex",
    flexDirection:"row",
    color:"grey",

  },
  time:{
    marginTop:10,
    fontSize:16,
  }

})

export default Calls