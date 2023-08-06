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
    ScrollView,
    ActivityIndicator
} from 'react-native';
import { styles } from '../constants/styles';
import database from '@react-native-firebase/firestore';
import { colors } from '../constants/colors';
import { getLinkPreview } from 'link-preview-js';
import storage from '@react-native-firebase/storage';
import DocumentPicker from 'react-native-document-picker'
import { utils } from '@react-native-firebase/app';



export default function AddPostScreen() {

    const [password, setPassword] = useState('');
    const [desc, setDesc] = useState('');
    const truepassword = 'ktz@2030';

    const [msg, setMsg] = useState('');
    const [data, setData] = useState([]);
    const [imgStore, setImgStore] = useState("");
    const [loadingPost, setLoadingPost] = useState(false);

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
            setLoadingPost(true);
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
                        .then(() => {
                            console.log('success')
                            setLoadingPost(false)
                        });
                } else {
                    await database().collection('posts')
                        .add({
                            desc: desc,
                            imageUrl: "",
                            siteName: "",
                            title: "",
                            created_at: new Date()
                        })
                        .then(() => {
                            console.log('success')
                            setLoadingPost(false)
                        });
                }

            }).catch(() => {
                setLoadingPost(false)
                Alert.alert("Saisissez une url valide")
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
                type: [DocumentPicker.types.allFiles],
            });
            const pathToFile = `${utils.FilePath.PICTURES_DIRECTORY}/black-t-shirt-sm.png`;
            console.log('====================================');
            console.log(pathToFile);
            console.log('====================================');
            const reference = storage().ref(`images/1.png`);
            setImgStore(doc[0]?.uri);
            await reference.putFile(doc[0]?.uri);

            console.log('Upload successful!');
        } catch (error) {
            console.error('Error uploading video:', error);
        }
    };


    return (
        <SafeAreaView>
            <ScrollView>
                <View style={[styles.container, { marginBottom: 10 }]}>
                    {loadingPost ?
                        <ActivityIndicator size={80} color="green" />
                        : <View>
                            <View>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: 'black' }}>Gérer la vidéo pub</Text>
                                <View style={{ margin:10 }} >
                                    <Button title='Vidéo' onPress={uploadVideo} color="#2996C9" />
                                </View>
                            </View>
                            <Image style={{ width: 200, height: 200 }} source={{ uri: imgStore || "http://www.g.png" }} />
                            <View style={{ marginBottom: 20 }}>
                                <TextInput value={password} onChangeText={(password) => { setPassword(password); }} style={password == truepassword ? styles.none : styles.input} placeholder="Entrer Le mot de passe " />
                                <TextInput value={desc} onChangeText={(desc) => { setDesc(desc) }} multiline style={[password == truepassword ? styles.input : styles.none, { color: 'black' }]} placeholder="Entrer La Description"
                                />
                                <View style={[{ marginTop: 30 }, password == truepassword ? {} : styles.none]}>
                                    <Button disabled={(password == truepassword && desc != '') ? false : true} color={colors.mainColor} onPress={create} title="Publier" accessibilityLabel="Publier un lien"></Button>
                                </View>
                            </View>
                        </View>}



                    <View style={password == truepassword ? styles.input : styles.none}>

                        <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: 'black' }}>Gérer les posts</Text>

                        {data.map((item: any, index) => {
                            return <Pressable key={index}
                                hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
                                android_ripple={{ color: 'red' }} onLongPress={
                                    () => {
                                        Vibration.vibrate(100)
                                        deletePost(item.id)
                                    }
                                }>
                                <View style={[styles.item]}>
                                    <Text style={{ color: 'black', fontSize: 16, }}>{item?.desc}
                                    </Text>
                                    {/* <Text style={{ color: 'black', fontSize: 16, }}>{item?.desc}
                                    </Text> */}
                                </View>
                            </Pressable>
                        })
                        }

                    </View>
                </View>
                <View style={{ height:200 }}>

                </View>
            </ScrollView>

        </SafeAreaView>
    );
}
