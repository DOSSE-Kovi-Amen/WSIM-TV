import React, { useEffect, useState } from 'react';
import {
    Alert,
    Button,
    FlatList,
    Pressable,
    SafeAreaView,
    Text,
    Vibration,
    TextInput,
    View,
    Image
} from 'react-native';
import { styles } from '../constants/styles';
import database from '@react-native-firebase/firestore';
import { colors } from '../constants/colors';
import { TouchableOpacity } from 'react-native';
import { Linking } from 'react-native';
import { getLinkPreview, getPreviewFromContent } from "link-preview-js";
import { PostType } from '../constants/type';



export default function PostScreen() {

    const [password, setPassword] = useState('');
    const [desc, setDesc] = useState('');

    const [msg, setMsg] = useState('');
    const [data, setData] = useState([]);

    useEffect(() => {

        database().collection('posts').orderBy('created_at', 'desc').onSnapshot((querySnapshot) => {
            const todos = querySnapshot.docs;
            const todoList: any = [];
            todos.forEach( element => {
                const data = element.data();
                const id = { id: element.id };

                const finalData = Object.assign(id, data);
                todoList.push(finalData);

                console.log('=================post===================');
                console.log(finalData);
                console.log('====================================');
                setData(todoList);
            });
        });
    }, []);


    return (
        <SafeAreaView>
            <View >
                <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center',color:'black', margin:15, textDecorationLine:"underline" }}> Posts récents</Text>
                <FlatList
                    data={data}
                    renderItem={(item: any) => {

                        return (
                            <TouchableOpacity onPress={() => Linking.openURL(item.item.desc)}>
                                <View style={{ backgroundColor: 'black', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}>
                                    <Image resizeMode='contain' style={[{ width: '100%', height: 300 },]} source={{ uri:item.item.imageUrl}} />
                                </View>
                                <View style={[styles.item]}>
                                    <Text style={{ color: 'black', fontSize: 16, }}>{item.item.desc}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>
        </SafeAreaView>
    );

}
