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
    Image,
    ScrollView
} from 'react-native';
import { styles } from '../constants/styles';
import database from '@react-native-firebase/firestore';
import { colors } from '../constants/colors';
import { TouchableOpacity } from 'react-native';
import { Linking } from 'react-native';
import { getLinkPreview, getPreviewFromContent } from "link-preview-js";
import { PostType } from '../constants/type';



export default function PostScreen() {

    const [datas, setDatas] = useState([]);

    useEffect(() => {

        const subscriber = database().collection('posts').orderBy('created_at', 'desc').onSnapshot((querySnapshot) => {
            const todos = querySnapshot.docs;
            const todoList: any = [];
            todos.forEach(element => {
                const data = element.data();
                const id = { id: element.id };

                const finalData = Object.assign(id, data);
                todoList.push(finalData);
            });
            setDatas(todoList);

        });
        // Stop listening for updates when no longer required
        return () => subscriber();
    }, []);


    return (
        <ScrollView style={{ flex: 1, width: '100%', height: '100%' }}>
            <View style={{ padding: 15, marginBottom: 800, height: 1000, width: "100%" }}>
                {datas.map((item: any) => {

                    return (
                        <TouchableOpacity key={item.id} style={{ marginBottom: 10 }} onPress={() => Linking.openURL(item?.desc)}>
                            <View style={{
                                backgroundColor: 'white',
                                borderColor: '#cccccc',
                                borderWidth: 1,
                                shadowOpacity: 1,
                                shadowColor: 'black',
                                elevation: 4
                            }}>
                                {item?.imageUrl && <Image resizeMode='cover' style={[{ width: '100%', height: 220 },]} source={{ uri: item?.imageUrl }} />}
                                <View style={{ padding: 15, backgroundColor: colors.mainColor }}>
                                    {item?.title ? <Text style={{ color: 'white', fontSize: 16, }}>{item?.title}</Text>
                                        : <Text style={{ color: 'white', fontSize: 16, }}>{item?.desc}</Text>
                                    }

                                </View>
                            </View>

                        </TouchableOpacity>
                    )
                })
                }
            </View>
        </ScrollView>

    );

}
