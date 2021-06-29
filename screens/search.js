import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, TextInput, TouchableOpacity } from 'react-native';
import db from '../config';

export default class Search extends React.Component{
    constructor(){
        super();
        this.state={
            allTransactions:[],
            lastVisibleTransaction:null,
            search:""
        }
    }
    componentDidMount=async()=>{
        const ref=await db.collection("transactions").get();
        ref.docs.map(doc=>{
            this.setState({
                allTransactions:[...this.state.allTransactions,doc.data()]
            })
        })
    }
    fetchMoreTransactions=async()=>{
        var enteredText=text.split("");
        if(enteredText[0].toUpperCase()==="B"){
            const ref=await db.collection("transaction").where("bookID", "==", text).startAfter(this.state.lastVisibleTransaction).get();
            ref.docs.map(doc=>{
                this.setState({
                    allTransactions:[...this.state.allTransactions,doc.data()],
                    lastVisibleTransaction:doc
                })
            })
        }else if(enteredText[0].toUpperCase()==="S"){
            const ref=await db.collection("transaction").where("studentID", "==", text).startAfter(y=this.state.lastVisibleTransaction).get();
            ref.docs.map(doc=>{
                this.setState({
                    allTransactions:[...this.state.allTransactions,doc.data()],
                    lastVisibleTransaction:doc
                })
            })
        }
    }
    searchTransactions=async(text)=>{
        var enteredText=text.split("");
        var text=text.toUpperCase();
        this.setState({
            allTransactions:[]
        })
        console.log(enteredText);
        if(enteredText[0].toUpperCase()==="B"){
            console.log("inside serchTransactions B");
            const ref=await db.collection("transactions").where("bookID", "==", text).get();
            ref.docs.map(doc=>{
                this.setState({
                    allTransactions:[...this.state.allTransactions,doc.data()],
                    lastVisibleTransaction:doc
                })
            })
        }else if(enteredText[0].toUpperCase()==="S"){
            console.log("inside serchTransactions S")
            const ref=await db.collection("transactions").where("studentID", "==", text).get();
            ref.docs.map(doc=>{
                this.setState({
                    allTransactions:[...this.state.allTransactions,doc.data()],
                    lastVisibleTransaction:doc
                })
            })
        }
    }
    render(){
        return(
            /*<ScrollView>
                {this.state.allTransactions.map((transaction, index)=>{
                    return(
                        <View style={{borderBottomWidth:2, marginTop:20}} key={index}>
                            <Text style={{fontSize:18}}> {"Student ID : " + transaction.studentID} </Text>
                            <Text style={{fontSize:18}}> {"Book ID : " + transaction.bookID} </Text>
                            <Text style={{fontSize:18}}> {"Transcation Type : " + transaction.transactionType} </Text>
                            <Text style={{fontSize:18}}> {"Date : " + transaction.date.toDate()} </Text>
                        </View>
                    )
                })}
            </ScrollView>*/
            <View style={styles.container}>
                <View style={styles.searchBar}> 
                    <TextInput style={styles.bar} placeholder="Enter Book/Student ID" onChangeText={text=>{this.setState({search:text})}}> </TextInput>
                    <TouchableOpacity style={styles.searchButton} onPress={()=>{this.searchTransactions(this.state.search)}}>
                        <Text> Search </Text>
                    </TouchableOpacity>
                </View>
            
            <FlatList data={this.state.allTransactions} renderItem={({item})=>(
                <View style={{borderBottomWidth:2, marginTop:20}}>
                            <Text style={{fontSize:18}}> {"Student ID : " + item.studentID} </Text>
                            <Text style={{fontSize:18}}> {"Book ID : " + item.bookID} </Text>
                            <Text style={{fontSize:18}}> {"Transcation Type : " + item.transactionType} </Text>
                            <Text style={{fontSize:18}}> {"Date : " + item.date.toDate()} </Text>
                        </View>
            )} keyExtractor={(item,index)=>index.toString()} onEndReached={this.fetchMoreTransactions} onEndReachedThreshold={0.5}>
            </FlatList>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 20
    },
    searchBar:{
      flexDirection:'row',
      height:40,
      width:'auto',
      borderWidth:0.5,
      alignItems:'center',
      backgroundColor:'grey',
  
    },
    bar:{
      borderWidth:2,
      height:30,
      width:300,
      paddingLeft:10,
    },
    searchButton:{
      borderWidth:1,
      height:30,
      width:50,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'green'
    }
  })