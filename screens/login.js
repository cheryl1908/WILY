import React from 'react';
import * as firebase from 'firebase';
import { StyleSheet, Text, View, ScrollView, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Image } from 'react-native';

export default class Login extends React.Component{
    constructor(){
        super();
        this.state={
            emailId:"",
            pwd:""
        }
    }
    loginCheck=async(emailId,pwd)=>{
        if(emailId && pwd){
            try{
                const ref=await firebase.auth().signInWithEmailAndPassword(emailId,pwd);
                if(ref){
                    this.props.navigation.navigate("Transaction")
                }
            }catch(error){
                switch(error.code){
                    case 'auth/user-not-found':alert("User doesn't exist");
                    break;
                    case 'auth/invalid-email':alert("Incorrect Email/Password");
                    break;
                }
            }
        }else{
            alert("Enter Email and Password");
        }
    }
    render(){
        return(
            <KeyboardAvoidingView style={{alignItems:'center', marginTop:20}}>
                <View>
                    <Image source={require("../assets/booklogo.jpg")} style={{width:200, height:200, marginTop:40}}/>
                    <Text style={{textAlign:'center', fontSize:30, marginTop:10, marginBottom:10}}> WILY </Text>
                </View>
                <View>
                    <TextInput style={styles.loginBox} placeholder="abc@example.com" onChangeText={text=>{
                        this.setState({
                            emailId:text
                        })
                    }} keyboardType="email-address">
                    </TextInput>
                    <TextInput style={styles.loginBox} placeholder="Enter Password" onChangeText={text=>{
                        this.setState({
                            pwd:text
                        })
                    }} secureTextEntry={true}>
                    </TextInput>
                </View>
                <View>
                    <TouchableOpacity style={{borderWidth:1, borderRadius:7, width:100, height:50, paddingTop:5, marginTop:20, alignItems:'center'}} onPress={()=>{
                        this.loginCheck(this.state.emailId, this.state.pwd)
                    }}>
                        <Text style={{textAlign:'center', marginTop:7, fontSize:15}}> Login </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
}
const styles = StyleSheet.create({
    loginBox:
    {
    width: 300,
    height: 40,
    borderWidth: 1.5,
    fontSize: 20,
    margin:10,
    paddingLeft:10
    }
  })