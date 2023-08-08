import Sound from "react-native-sound";

export function SucceedSound(url: string) {
    Sound.setCategory('Playback');
    var whoosh = new Sound(url, '', (error: any) => {
        if (error) {
            console.log('failed to load the sound', error);
            return error;
        }
        // loaded successfully
        console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());

        // Play the sound with an onEnd callback
        whoosh.play((success: any) => {
            if (success) {
                console.log('successfully finished playing');
            } else {
                console.log('playback failed due to audio decoding errors');
            }
        });
    });

    // Reduce the volume by half
    whoosh.setVolume(1);
    whoosh.setCurrentTime(1);
    return whoosh;
}
