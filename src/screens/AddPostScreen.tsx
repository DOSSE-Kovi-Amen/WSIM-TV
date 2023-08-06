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
    View
} from 'react-native';
import { styles } from '../constants/styles';
import database from '@react-native-firebase/firestore';
import { colors } from '../constants/colors';
import { getLinkPreview } from 'link-preview-js';
import storage from '@react-native-firebase/storage';
import DocumentPicker from 'react-native-document-picker'



export default function AddPostScreen() {

    const [password, setPassword] = useState('');
    const [desc, setDesc] = useState('');
    const truepassword = 'ktz@2030';

    const [msg, setMsg] = useState('');
    const [data, setData] = useState([]);

    useEffect(() => {

        database().collection('posts').orderBy('created_at', 'desc').onSnapshot((querySnapshot) => {
            const todos = querySnapshot.docs;
            const todoList: any = [];
            todos.forEach(element => {
                const data = element.data();
                const id = { id: element.id };
                const finalData = Object.assign(id, data)
                todoList.push(finalData);
            });
            setData(todoList);
        });
    }, []);

    async function create() {
        if (desc == '') {
            setMsg('Erreur! Les champs sont vides.')
            Alert.alert('Erreur! Les champs sont vides.');

        } else {

            await getLinkPreview(desc, { timeout: 60000 }
            ).then(async (linkData: any) => {
                console.log('================t====================');
                console.log(linkData?.images);
                console.log('====================================');

                // setData(linkData.url);
                if (linkData?.images) {
                    await database().collection('posts')
                        .add({
                            desc: desc,
                            imageUrl: linkData?.images[0],
                            siteName: linkData?.description,
                            title: linkData?.title,
                            created_at: new Date()
                        })
                        .then(() => console.log('success'));
                } else {
                    await database().collection('posts')
                        .add({
                            desc: desc,
                            imageUrl: "",
                            siteName: "",
                            title: "",
                            created_at: new Date()
                        })
                        .then(() => console.log('success'));
                }

            })

            setDesc('');
        }

    }
    const deletePost = async (postId: string) => {
        Vibration.vibrate(100)

        await database()
            .collection('posts')
            .doc(postId)
            .delete()

    }
    const uploadVideo = async () => {
        // const reference = storage().ref(`videos/Screenshot_20230806-102107.png`);
        // console.log(reference);
        
        try {
            const doc: any = await DocumentPicker.pick({
                type: [DocumentPicker.types.images],
            });
            // const reference = storage().ref(`videos/`);

            console.log('====================================');
            console.log(doc);
            console.log('====================================');
            
            await storage().ref(`videos/`).putFile(doc[0]?.uri);

            console.log('Upload successful!');
        } catch (error) {
            console.error('Error uploading video:', error);
        }
    };


    return (
        <SafeAreaView>

            <View style={[styles.container, { marginBottom: 10 }]}>
                <View>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: 'black' }}>Gérer la vidéo pub</Text>
                    <View >
                        <Button title='Vidéo' onPress={uploadVideo} color="#2996C9" />
                    </View>
                </View>
                <View style={{ marginBottom: 20 }}>
                    <TextInput value={password} onChangeText={(password) => { setPassword(password); }} style={password == truepassword ? styles.none : styles.input} placeholder="Entrer Le mot de passe " />
                    <TextInput value={desc} onChangeText={(desc) => { setDesc(desc) }} multiline style={[password == truepassword ? styles.input : styles.none, { color: 'black' }]} placeholder="Entrer La Description"
                    />
                    <View style={[{ marginTop: 30 }, password == truepassword ? {} : styles.none]}>
                        <Button disabled={(password == truepassword && desc != '') ? false : true} color={colors.mainColor} onPress={create} title="Publier" accessibilityLabel="Publier un lien"></Button>
                    </View>
                </View>


                <View style={password == truepassword ? styles.input : styles.none}>

                    <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: 'black' }}>Gérer les posts</Text>
                    <FlatList
                        data={data}
                        renderItem={(item: any) => (
                            <Pressable
                                hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
                                android_ripple={{ color: 'red' }} onLongPress={
                                    () => {
                                        Vibration.vibrate(100)
                                        deletePost(item.item.id)
                                    }
                                }>
                                <View style={[styles.item]}>
                                    <Text style={{ color: 'black', fontSize: 16, }}>{item.item?.desc}
                                    </Text>
                                    <Text style={{ color: 'black', fontSize: 16, }}>{item.item?.desc}
                                    </Text>
                                </View>
                            </Pressable>
                        )}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}
