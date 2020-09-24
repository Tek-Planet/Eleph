import FirebaseKeys from "./config";
import firebase, { database } from "firebase";
import { string } from "react-native-redash";
require("firebase/firestore");

class Fire {
  constructor() {
    //rjesavanje errora "Firebase App named '[DEFAULT]' already exists" sa sljedecim IF-om:
    if (!firebase.apps.length) {
      firebase.initializeApp(FirebaseKeys);
    }
  }

  addPost = async ({ text, localUri, likes, comments }) => {
    this.uploadPhotoAsync(localUri)
      .then((uri) => {
        new Promise(async (res, rej) => {
          const response = await firebase
            .firestore()
            .collection("posts")
            .doc(this.uid)
            .set({
              posts: [
                {
                  text,
                  likes,
                  comments,
                  uid: this.uid,
                  timestamp: this.timestamp,
                  image: uri,
                },
              ],
            });
          this.userInfos.get().then((resp) => {
            resp = resp.data();
            console.log(resp, " e ", resp.posts);
            firebase
              .firestore()
              .collection("users")
              .doc(this.uid)
              .update({
                posts: resp.posts + 1,
              })
              .then(() => {});
          });

          return res(response);
        });
      })
      .catch((err) => {
        rej(err);
        console.log("erro : ", err);
      });
  };

  // addPost = async ({ text, mood, user }) => {
  //   //const remoteUri = await this.uploadPhotoAsync(localUri, `photos/${this.uid}/${Date.now()}`);

  //   return new Promise((res, rej) => {
  //     this.firestore
  //       .collection("posts")
  //       .add({
  //         text,
  //         uid: this.uid,
  //         timestamp: this.timestamp,
  //         mood,
  //         user: Fire.shared.uid,
  //         //image: remoteUri
  //       })
  //       .then((ref) => {
  //         res(ref);
  //       })
  //       .catch((error) => {
  //         rej(error);
  //       });
  //   });
  // };

  // uploadPhotoAsync = (uri, filename) => {
  //     return new Promise(async (res, rej) => {
  //         const response = await fetch(uri);
  //         const file = await response.blob();

  //         let upload = firebase
  //             .storage()
  //             .ref(filename)
  //             .put(file);

  //         upload.on(
  //             "state_changed",
  //             snapshot => {},
  //             err => {
  //                 rej(err);
  //             },
  //             async () => {
  //                 const url = await upload.snapshot.ref.getDownloadURL();
  //                 res(url);
  //             }
  //         );
  //     });
  // };

  createUser = async (user) => {
    let remoteUri = null;

    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password);

      let db = this.firestore.collection("users").doc(this.uid);

      db.set({
        name: user.name,
        email: user.email,
        avatar: null,
      });

      if (user.avatar) {
        remoteUri = await this.uploadPhotoAsync(
          user.avatar,
          `avatars/${this.uid}`
        );

        db.set({ avatar: remoteUri }, { merge: true });
      }
    } catch (error) {
      alert("Error with creating: ", error);
    }
  };

  signOut = () => {
    firebase.auth().signOut();
  };

  get firestore() {
    return firebase.firestore();
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get timestamp() {
    return Date.now();
  }
  get mood() {}

  get userInfos() {
    return firebase.firestore().collection("users").doc(this.uid);
  }
  getScream = (req, res) => {
    let screamData = {};
    firebase
      .firestore()
      .doc(`/posts/${req.params.postId}`)
      .get()
      .then((doc) => {
        if (!doc.exists) {
          return res.status(404).json({ error: "Scream not found" });
        }
        screamData = doc.data();
        screamData.postId = doc.id;
        return firebase
          .firestore()
          .collection("comments")
          .orderBy("createdAt", "desc")
          .where("postId", "==", req.params.postId)
          .get();
      })
      .then((data) => {
        screamData.comments = [];
        data.forEach((doc) => {
          screamData.comments.push(doc.data());
        });
        return res.json(screamData);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: err.code });
      });
  };
}

export async function getPosts(PostsRetreived) {
  var post = [];

  var snapshot = await firebase
    .firestore()
    .collection("posts")
    .orderBy("timestamp", "desc")
    .get();

  snapshot.forEach((doc) => {
    const PostItem = doc.data();
    PostItem.id = doc.id;
    post.push(PostItem);
  });
  console.log();
  PostsRetreived(post);
}


export async function getCom(req, PostsRetreived) {
  var post = {};
  var comments = [];
  var postDetails = await  firebase
    .firestore()
    .doc(`/posts/${req}`)
    .get()
    
    var snapshot = await firebase
      .firestore()
      .collection("comments")
      .where("postId".trim(), "==", "  y7FN13SKWUDsWdKsGJiT")
      .get();

    snapshot.forEach((doc) => {
      const PostItem = doc.data();
      PostItem.id = doc.id;
      comments.push(PostItem);
    });
    
  post.details = postDetails.data()
  post.comments = comments
  PostsRetreived(post);
}

//POKUSAJ DOBIVANJA KOMENTARA

//POKUSAJ KOMENTARI

export async function getComments(CommentsRetreived) {
  var comments = {};

  var user = firebase.auth().currentUser;
  var snapshot = await firebase.firestore().collection("comments").get();

  //.where("author", "==", user.uid).get();
  snapshot.forEach((doc) => {
    const CommentItem = doc.data();
    CommentItem.id = doc.id;
    comments.push(CommentItem);
  });
  CommentsRetreived(comments);
}

Fire.shared = new Fire();
export default Fire;
