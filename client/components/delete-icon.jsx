import React from 'react';
export default class DeleteButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalActive: false,
      trails: []
    };
    this.renderModal = this.renderModal.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    fetch('/api/all-trails')
      .then(res => res.json())
      .then(trails => {
        this.setState({ trails });
      }
      );
  }

  handleClick() {
    this.setState({ modalActive: !this.state.modalActive });
  }

  // deleteTrail(trailId) {

  //   const selectedTrail = this.state.trails.find(trail => trail.trailId === trailId);

  //   fetch('/api/trails/:trailId', {
  //     method: 'DELETE',
  //     headers: {
  //       'X-Access-Token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoidGVzdCIsImlhdCI6MTY0NTY3MTkyNX0.0Vxwc_F_T5PCP8um4mG8frQenmN4tDo4cF-W-zd81Pg'
  //     }
  //   })
  //     .then(res => res.json())
  //     .then(result => {
  //       this.setState({
  //         modalActive: false
  //       });
  //     })
  //     .catch(err => console.error(err));
  // }

  renderModal() {
    return (
      <div className="position-relative">
        <div id="modal-view" className="row">
          <div className="modal-bg position-fixed">
            <div className="modal-box modal-center">
              <div className="row justify-center">
                <a onClick={this.handleClick}><i className="exit-icon fas fa-times"></i></a>
                <p className="delete-msg-main">Are you sure?</p>
                <p className="delete-msg-minor">Would you like to delete this trail? This process cannot be undone.</p>
              </div>
              <div className="row space-evenly">
                <button onClick={this.handleClick} type="button" className="cancel-btn">CANCEL</button>
                <button type="button" className="delete-btn">DELETE</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <>
        {this.state.modalActive ? this.renderModal() : null}
        <a onClick={this.handleClick}><i className="trash-icon fas fa-trash icon-margin"></i></a>
      </>
    );
  }
}
