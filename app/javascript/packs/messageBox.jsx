// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'


const REQUEST_URL = 'http://localhost:3000/messages.json'

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state={
      title: "",
      body: ""
    }
    this.handleUserIdChange = this.handleUserIdChange.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUserIdChange(event) {
    console.log("state:user_id", this.state.user_id);
    this.setState({user_id: event.target.value});
  }

  handleMessageChange(event) {
    console.log("state:message", this.state.message);
    this.setState({message: event.target.value});
  }

  handleSubmit(event) {
    console.log("handleSubmit");
    //alert('送信内容:' + this.state.user_id + this.state.message);
    event.preventDefault();

    this.props.addPost(this.state.user_id, this.state.message)
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>
            タイトル：
            <input type="text" value={this.state.user_id} onChange={this.handleUserIdChange}/>
          </label>
        </div>
        <div>
          <label>
            本文：
            <input type="text" value={this.state.message} onChange={this.handleMessageChange}/>
          </label>
        </div>
        <div>
          <label>
            <input type="submit" value = "追加"/>
          </label>
        </div>
      </form>
    )
  }
}

class MessageBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    console.log(this.props);
    console.log(this.state.data);
    this.add = this.add.bind(this);
  }

  add(user_id, message) {
    console.log("add is called")
    console.log("user_id", user_id)
    console.log("text", message)

    fetch(this.props.url, {
      method: 'POST',
      body: JSON.stringify({
        user_id:user_id,
        text: message
      }),
      headers: new Headers({"Content-type" : "application/json"})
    }).then(function(response) {
      console.log(response);
      return response.json
    }).then(function(json) {
      console.log(json)
      this.state.data.push({
        user_id: json.user_id,
        text: json.message
      })
      this.setState(this.state);
    }.bind(this));
  }

 componentDidMount() {
   this.fetchData()
 }

 fetchData() {
   fetch(REQUEST_URL)
     .then((response) => response.json())
   .then((responseData) => {
     console.log(responseData)
     this.setState({
       data: responseData,
     })
   })
 }

  render() {
    return(
      <section>
        <ul>
          {this.state.data.map((message => {
            return (
              <li id ={message.id}>{message.text}</li>
            )
          }))}
        </ul>
        <Form addPost={this.add}/>
      </section>
    )
  }
}


// componentDidMount: function() {
//      $.ajax({
//        url:      this.props.url,
//        dataType: 'json',
//        cache:    false,
//        success: function(messages) {
//          this.setState({ messages: messages });
//        }.bind(this),
//        eror: function(_xhr, status, err) {
//          console.error(this.props.url, status, err.toString());
//        }.bind(this)
//      });
//    },

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <MessageBox url="/messages"/>,
    document.getElementById('messages'),
   )
})

// ReactDOM.render(
//   <Hello />,
//   document.getElementById('test')
// )
