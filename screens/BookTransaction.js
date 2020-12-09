import React from 'react'
import {View , Text , TextInput,TouchableOpacity,StyleSheet,Image} from 'react-native'
import {BarCodeScanner} from 'expo-barcode-scanner'
import * as Permissions from  'expo-permissions'

export default class BookTransactionScreen extends React.Component{
 constructor(){
     super()
     this.state = {
         BookId:'',
         hasCameraPermissions:null,
         scanned:false,
         scannedData:'',
         buttonState:'normal',
         StudentId:''
     }
 }

    getCameraPermissions = async (id) =>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
            hasCameraPermissions:status === "granted",
            buttonState:id,
            scanned:false
        })
       
    } 
    handleBarCodeScanned = async({type,data})=>{
         const {ButtonState} = this.state
         if(ButtonState === 'BookId'){
            this.setState({
                scanned:true,
                buttonState:'normal',
                BookId: data
            })
         }
         else if(ButtonState === 'StudentId'){
            this.setState({
                scanned:true,
                buttonState:'normal',
                StudentId: data
            })
         }
         
    }
    render(){
    
        
        const hasCameraPermissions = this.state.hasCameraPermissions
        const Scanned = this.state.scanned
        const ButtonState = this.state.buttonState
        if(ButtonState !== "normal" && hasCameraPermissions){
             return (<BarCodeScanner onBarCodeScanned={Scanned ? undefined: this.handleBarCodeScanned} style={StyleSheet.absoluteFillObject}/>)
        }else if(ButtonState === 'normal'){
            return(

             <View style={styles.container}>
                    
                 <View>
                        <Image source={require('../assets/booklogo.jpg')} style={{width:200,height:200}}/>    
                        <Text style={{textAlign:'center',fontWeight:'bold',marginBottom:50}}>Wili</Text>
                 </View> 
                  
                 <View style={styles.inputView}>

                    <TextInput placeholder="BookId" style={{width:150,height:35,borderWidth:1,borderColor:'black'}} onChangeText={(BookId)=>{this.setState({
                         BookId : BookId
                    })}} value={this.state.BookId}></TextInput> 
                                     
                    <TouchableOpacity onPress={()=>{this.getCameraPermissions('BookId')}} style={styles.scanButton}>
                        <Text style={{fontWeight:'bold'}}>Scan QR code</Text>
                    </TouchableOpacity>
                       
            </View>
             <View style={styles.inputView}>

             <TextInput placeholder="StudentId" style={{width:150,height:35,borderWidth:1,borderColor:'black'}} onChangeText={(StudentId)=>{this.setState({
                        StudentId : StudentId
                     })}} value={this.state.StudentId}></TextInput> 

                <TouchableOpacity onPress={()=>{this.getCameraPermissions('StudentId')}} style={styles.scanButton}>
                        <Text style={{fontWeight:'bold'}}>Scan QR code</Text>
                </TouchableOpacity>  

             </View>
                 
    
                 </View>
            )
        }
      
    }
}

const styles = StyleSheet.create({

    container: {
 
 
      flex: 1,
 
 
      justifyContent: 'center',
 
 
      alignItems: 'center'
 
 
    },
 
 
    displayText:{
 
 
      fontSize: 15,
 
 
      textDecorationLine: 'underline'
 
 
    },
 
 
    scanButton:{
 
 
      backgroundColor: '#2196F3',
 
 
      padding: 10,
 
 
      margin: 10
 
 
    },
 
 
    buttonText:{
 
 
      fontSize: 15,
 
 
      textAlign: 'center',
 
 
      marginTop: 10
 
 
    },
 
 
    inputView:{
 
 
      flexDirection: 'row',
 
 
      margin: 20
 
 
    },
 
 
    inputBox:{
 
 
      width: 200,
 
 
      height: 40,
 
 
      borderWidth: 1.5,
 
 
      borderRightWidth: 0,
 
 
      fontSize: 20
 
 
    },
 
 
    scanButton:{
 
 
      backgroundColor: '#66BB6A',
 
 
      width: 50,
 
 
      borderWidth: 1.5,
 
 
      borderLeftWidth: 0
 
 
    },
 
 
    submitButton:{
 
 
      backgroundColor: '#FBC02D',
 
 
      width: 100,
 
 
      height: 50,
 
 
    },
 
 
    submitButtonText:{
 
 
      padding: 10,
 
 
      textAlign: 'center',
 
 
      fontWeight: 'bold',
 
 
      fontSize: 20,
 
 
      color:'white'
 
 
    },
 
 
  });
 
 