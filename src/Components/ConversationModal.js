import React, { Component } from 'react';
import firebase from '../firebase';

class ConversationModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classKey: this.props.classKey,
      chats: [],
      userInput: '',
      isAdmin: this.props.isAdmin,
      user: this.props.user,
      questionKey: this.props.questionKey,
    };
  }

  refreshOnChange = () => {
    if (this.state.isAdmin) {
      // dbRef.ref(`/Chat/`).on("child_added", (snapshot) => {
      // this.refreshMessageList();
      // });
      // } else {
      // dbRef
      //   .ref(`/Users/Students/}/${this.state.user.uid}/enrolledClasses/`)
      //   .on("value", (snapshot) => {
      //     this.createClassList();
      //   });
      // }
    }
  };

  checkQuestionOwner = () => {};

  componentDidMount() {
    const dbRef = firebase.database();
    // console.log(dbRef.ref.parent);
    dbRef
      .ref(`/Chat/${this.state.classKey}/${this.state.questionKey}/`)
      .on('value', snapshot => {
        if (!snapshot.exists()) {
          this.setState({ chats: [] });
        } else if (snapshot.val()) {
          // console.log(snapshot.val());
          const chatArray = Object.entries(snapshot.val());
          // console.log(questionArray);
          this.setState({ chats: chatArray });
        }
      });
  }

  handleSubmit = e => {
    const dbRef = firebase.database();
    e.preventDefault();
    // post this new book to firebase
    dbRef.ref(`/Chat/${this.state.classKey}/${this.state.questionKey}/`).push({
      name: this.state.user.displayName,
      content: this.state.userInput,
      uid: this.state.user.uid,
      photoURL: this.state.user.photoURL,
      dateCreated: +new Date(),
    });
    this.setState({ userInput: '' });
    // console.log(dbRef.ref.parent.key);
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({
      userInput: e.target.value,
    });
  };

  render() {
    return (
      <div style={modal}>
        <button
          type="button"
          id="close"
          onClick={this.props.closeModal}
          style={{ display: 'block' }}
        >
          X
        </button>
        <div style={modalMain}>
          {this.state.chats.map(chat => (
            <div className="chat" key={chat[0]}>
              <div className="chat__chatContent" style={{ textAlign: 'right' }}>
                <p>{chat[1].content}</p>
              </div>
              <div
                className="chat__userInfo"
                style={{ textAlign: 'right', fontWeight: 'bold' }}
              >
                <p>{chat[1].name}</p>
                {/* <img src={chat[1].photoURL} alt="" /> */}
              </div>
            </div>
          ))}
          <form
            action=""
            onSubmit={this.handleSubmit}
            style={{ textAlign: 'right' }}
          >
            <input
              type="text"
              name=""
              onChange={this.handleChange}
              value={this.state.userInput}
              id="submitInput"
              style={{
                display: 'inline-block',
                marginTop: '50px',
                width: '90%',
              }}
            />
            {/* <label htmlFor="submitChatMessage">Submit</label> */}

            <input
              type="submit"
              id="submitChatMessage"
              style={{ display: 'inline-block', width: '10%' }}
            />
          </form>
          {console.log(
            `i'm open and here is my question id: ${this.props.questionKey} `
          )}
          {/* <button onClick={this.props.closeModal}>close</button> */}
        </div>
      </div>
    );
  }
}
const ConversationModelStyle = {};

const modal = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  display: 'block',
  height: '100%',
  background: 'rgba(169, 169, 169, 0.8)',
};

const modalMain = {
  position: 'fixed',
  display: 'block',
  background: 'white',
  width: '80%',
  height: 'auto',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

export default ConversationModel;