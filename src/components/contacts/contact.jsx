import { Component } from 'react';

export class ContactItem extends Component {
  deletContact = () => {
    this.props.deleteFromState(this.props.state.key);
  };

  transformNumber = () => {
    let numberArr = this.props.state.number.split('');
    return `${numberArr.slice(0, 3).join('')}-${numberArr
      .slice(3, 5)
      .join('')}-${numberArr.slice(5, 7).join('')}`;
  };

  render() {
    return (
      <li>
        <div className="contact-wrap">
          {this.props.state.name}: {this.transformNumber()}
          <button className="delete-contact" onClick={this.deletContact}>
            Delete
          </button>
        </div>
      </li>
    );
  }
}
