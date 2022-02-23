import React, { useState } from 'react'
import { View, Text, Image } from 'react-native'

import { styles, flattenedStyles } from './style';
// import Sound Component
import Sound from 'react-native-sound';
import Button from '../common/Button';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

export default function Message({ message, side, imageUri, audiouri, post }) {

    const [audioPlayed, setaudioPlayed] = useState(false)

    const isLeftSide = side === 'left'

    const containerStyles = isLeftSide ? styles.container : flattenedStyles.container
    const textContainerStyles = isLeftSide ? styles.textContainer : flattenedStyles.textContainer;
    const imageTextcontainer = isLeftSide ? styles.imageTextcontainer : styles.imageTextRightcontainer
    const textStyles = isLeftSide ? flattenedStyles.leftText : flattenedStyles.rightText;
    const imageContainer = isLeftSide ? styles.imageContainer : styles.imageRightContainer

    const audioPlay = (uri) => {
        const sound = new Sound(uri, null, (error) => {
            if (error) {
                // do something
                console.log(error)
            }
            // play when loaded
            setaudioPlayed(true)
            console.log('executed')
            sound.play(() => {
                sound.release();
            })
        });
    };

    const audioPause = (uri) => {
        setaudioPlayed(false);
        const sound = new Sound(uri, null, (error) => {
            if (error) {
                console.log(error)
            }
            return

        })
        sound.pause()
    }
    console.log(post, "<===post")
    return (
        <View style={containerStyles}>
            {
                message?.length > 0 && imageUri?.length > 0 && post ?
                    <View style={imageTextcontainer} >
                        <View style={{ width: '100%', borderBottomColor: 'black', borderBottomWidth: 1 }}>
                            <Text style={[textStyles, { margin: '2%', fontWeight: 'bold' }]}>Kevin</Text>
                            <Text style={[textStyles, { margin: '2%' }]}>{message}!</Text>
                        </View>
                        <View style={{ padding: '5%' }}>
                            <Image
                                style={{ width: 150, height: 150, alignSelf: 'center', }}
                                source={{
                                    uri: imageUri,
                                }}
                            />
                        </View>

                    </View> :
                    message?.length > 0 ?
                        <View style={textContainerStyles}>
                            <Text style={textStyles}>
                                {message}
                            </Text>
                        </View> : imageUri ? <View style={imageContainer} >
                            <Image
                                style={{ width: 100, height: 100 }}
                                source={{
                                    uri: imageUri,
                                }}
                            />
                            <Text style={textStyles}>Someone Liked !!</Text>
                        </View> : audiouri ? <View style={textContainerStyles}>
                            {
                                audioPlayed ?
                                    <Icon name="pause-circle-o" size={20} color={isLeftSide ? '#FFFF' : "#52624B"} style={{ marginRight: '2%', alignSelf: 'flex-end' }} onPress={() => audioPause(audiouri)} /> :
                                    //  pause-circle-o
                                    <Icon name="play-circle-o" size={20} color={isLeftSide ? '#FFFF' : "#52624B"} style={{ marginRight: '2%', alignSelf: 'flex-end' }} onPress={() => audioPlay(audiouri)} />
                                //   play-circle-o
                            }
                        </View> :
                            null
            }
        </View>
    )
}