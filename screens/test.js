export default class HomeScreen extends React.Component {

    constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('History');
    this.unsubscribe = null;
    this.state = {
    post: [],
    
        };
    
      }
    componentDidMount() {
    
    var user = firebase.auth().currentUser;
    const ref = firebase.firestore().collection('Topup').where("uid", "==", user.uid);
    
    ref.get().then((querySnapshot => {
    const data = querySnapshot.docs.map(doc => doc.data());
    this.setState({ post : data});
        }));
      }
    
    renderPost = post => {
    return (
    <View style={styles.feedItem}>
    <Image source={post.avatar} style={styles.avatar} />
    <View style={{ flex: 1 }}>
    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
    <View>
    <Text style={styles.name}>{post.Desk}</Text>
    <Text style={styles.timestamp}>{moment(post.createdAt.toDate()).format("lll")}
    </Text>
    </View><Text style={styles.minus}>+</Text><Text style={styles.Rupees} >{post.topup}Rs.</Text>
    
    <Ionicons name="ios-more" size={24} color="#73788B" />
    </View>
    
    <View style={{ flexDirection: "row" }}>
    
    </View>
    </View>
    </View>
        );
    };
    render() {
    return (
    <View style={styles.container}>
    <View style={styles.header}>
    <Text style={styles.headerTitle}>Top-Ups</Text>
    </View>
    <FlatList
    style={styles.feed}
    data={this.state.post}
    renderItem={({ item }) => this.renderPost(item)}
    keyExtractor={item => item.id}
    showsVerticalScrollIndicator={false}
    ></FlatList>
    </View>
        );
    }
    }