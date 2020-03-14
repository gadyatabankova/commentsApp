import React from 'react';
import ReactDOM from 'react-dom';
import './css/addcomment.css';
import './css/historycomments.css';

class CommentsApp extends React.Component {
  constructor() {
    super();

    const object = JSON.parse(localStorage.getItem ('this.state'));
    let propObject;

    if (object == null) {
      propObject = [];
    } else {
      propObject = object.items;
    };

    this.state = {
      items: propObject,
      newComment: '',
      newUser: ''
    };
    this.addComment = this.addComment.bind(this);
    this.delComment = this.delComment.bind(this);

  }

  addComment(event) {
    event.preventDefault();

    if (!this.state.newComment.length) {
      return;
    }

    if (this.state.newUser === '') {
      alert('Введите Ваше имя');
      return;
    }

    const items = this.state.items;
    const date = new Date();

    items.push({
      user: this.state.newUser,
      comment: this.state.newComment,
      id: Date.now(),
      time: date.toLocaleString()
    });

    localStorage.setItem ('this.state', JSON.stringify(this.state));

    this.setState({
      items,
      newComment: '',
      newUser: '',
    });
  }

  delComment(item) {
    const items = this.state.items;
    const index = items.indexOf(item);

    if (index > -1) {
      items.splice(index, 1);
    }

    localStorage.setItem ('this.state', JSON.stringify(this.state));

    this.setState({items});
  }

  render() {
    return (
      <div>

        <div>
          {
            this.state.items.map(item => {
              return (
                <div
                  className="commentBlock"
                  key={item.id}
                >
                  <span><b>Пользователь:</b> {item.user}</span>
                  <span><b>Дата/время:</b> {item.time}</span>
                  <span>
                    <button
                      onClick={() => this.delComment(item)}
                    >
                      DEL
                    </button>
                  </span>
                  <div>
                    <b>Комментарий: </b>
                    <span dangerouslySetInnerHTML={{ __html: item.comment}}></span>
                  </div>
                </div>
              );
            })
          }
        </div>

        <form onSubmit = {this.addComment}>
          <p>Ваше имя:</p>
          <input
            type = 'text'
            value = {this.state.newUser}
            onChange = {ev => {
              this.setState({newUser: ev.target.value})
            }}
          />
          <p>Введите комментарий:</p>
          <textarea
            type = 'text'
            value = {this.state.newComment}
            onChange = {ev => {
              this.setState({newComment: ev.target.value})
            }}
          />
          <div>
            <button className="button">Добавить</button>
          </div>
        </form>

      </div>
    );
  }
}

ReactDOM.render(
  <CommentsApp />,
  document.querySelector('#app')
);
