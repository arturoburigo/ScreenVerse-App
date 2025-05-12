import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 32,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
        backgroundColor: '#121212'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 24
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 16
    },
    textContainer: {
        alignItems: 'center',
        gap: 8
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#B75A5A'
    }
});

export { styles };
export default styles; 