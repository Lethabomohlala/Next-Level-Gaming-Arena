"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PassScreen;
var react_1 = require("react");
var react_native_1 = require("react-native");
function PassScreen(_a) {
    var image = _a.image, title = _a.title, price = _a.price, description = _a.description, includes = _a.includes, _b = _a.priceColor, priceColor = _b === void 0 ? '#00D9FF' : _b;
    return (<react_native_1.View style={styles.container}>

      {/* HEADER */}
      <react_native_1.View style={styles.header}>

        <react_native_1.Text style={styles.logo}>
          N
        </react_native_1.Text>

        <react_native_1.Text style={styles.menu}>
          ☰
        </react_native_1.Text>

      </react_native_1.View>

      <react_native_1.ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* HERO IMAGE */}
        <react_native_1.Image source={image} style={styles.heroImage}/>

        {/* TITLE AND PRICE */}
        <react_native_1.View style={styles.titleRow}>

          <react_native_1.Text style={styles.title}>
            {title}
          </react_native_1.Text>

          <react_native_1.Text style={[
            styles.price,
            { color: priceColor },
        ]}>
            {price}
          </react_native_1.Text>

        </react_native_1.View>

        {/* DESCRIPTION */}
        <react_native_1.Text style={styles.description}>
          {description}
        </react_native_1.Text>

        {/* INCLUDES */}
        <react_native_1.Text style={styles.includes}>

          <react_native_1.Text style={styles.includesTitle}>
            Includes
          </react_native_1.Text>

          {' | '}

          {includes}

        </react_native_1.Text>

        {/* BOOK BUTTON */}
        <react_native_1.TouchableOpacity style={styles.bookButton} onPress={function () { return console.log("Booking ".concat(title)); }}>
          <react_native_1.Text style={styles.bookText}>
            BOOK NOW
          </react_native_1.Text>
        </react_native_1.TouchableOpacity>

      </react_native_1.ScrollView>

    </react_native_1.View>);
}
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    header: {
        position: 'absolute',
        top: 45,
        left: 20,
        right: 20,
        zIndex: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        color: '#FFFFFF',
        fontSize: 28,
        fontWeight: '900',
    },
    menu: {
        color: '#FFFFFF',
        fontSize: 28,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    heroImage: {
        width: '100%',
        height: 380,
        resizeMode: 'cover',
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 18,
        marginTop: 15,
    },
    title: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '800',
        flex: 1,
        letterSpacing: 0.5,
    },
    price: {
        fontSize: 16,
        fontWeight: '900',
        marginLeft: 10,
    },
    description: {
        color: '#AFAFAF',
        fontSize: 11,
        lineHeight: 17,
        textAlign: 'center',
        paddingHorizontal: 25,
        marginTop: 20,
    },
    includes: {
        color: '#AFAFAF',
        fontSize: 9,
        lineHeight: 15,
        textAlign: 'center',
        paddingHorizontal: 20,
        marginTop: 20,
    },
    includesTitle: {
        color: '#FFFFFF',
        fontWeight: '900',
    },
    bookButton: {
        backgroundColor: '#FFFFFF',
        alignSelf: 'flex-end',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        marginTop: 15,
        marginRight: 18,
    },
    bookText: {
        color: '#000000',
        fontSize: 9,
        fontWeight: '900',
    },
});
