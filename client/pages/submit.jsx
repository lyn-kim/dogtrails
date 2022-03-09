import React from 'react';
import SubmitProgressIndicator from '../components/submit-progress-indicator';
export default class SubmitPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trailName: '',
      length: '',
      difficulty: '',
      location: '',
      isDeleted: false,
      fetchInProgress: false
    };
    this.fileInputRef = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDifficultyChange = this.handleDifficultyChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleLengthChange = this.handleLengthChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  handleDifficultyChange(event) {
    this.setState({ difficulty: event.target.value });
  }

  handleNameChange(event) {
    this.setState({ trailName: event.target.value });
  }

  handleLengthChange(event) {
    this.setState({ length: event.target.value });
  }

  handleAddressChange(event) {
    this.setState({ location: event.target.value });
  }

  handleImageChange(event) {
    this.setState({ previewImageUrl: URL.createObjectURL(event.target.files[0]) });
  }

  handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();

    formData.append('trailName', this.state.trailName);
    formData.append('length', this.state.length);
    formData.append('difficulty', this.state.difficulty);
    formData.append('location', this.state.location);
    formData.append('isDeleted', this.state.isDeleted);
    formData.append('file-to-upload', this.fileInputRef.current.files[0]);

    fetch('/api/trails', {
      method: 'POST',
      body: formData,
      headers: {
        'X-Access-Token': window.localStorage.getItem('react-context-jwt')
      }
    })
      .then(this.setState({ fetchInProgress: true }))
      .then(res => res.json())
      .then(result => {
        this.setState({
          trailName: '',
          length: '',
          difficulty: '',
          location: '',
          isDeleted: false,
          previewImageUrl: null,
          fetchInProgress: false
        });
        this.fileInputRef.current.value = null;
      })
      .catch(err => console.error(err));
  }

  render() {
    if (this.state.fetchInProgress === true) {
      return <SubmitProgressIndicator/>;
    }
    return (
      <>
      <div className="row justify-center">
        <h3 className="add-trail-title">Add A Trail</h3>
      </div>
      <form id="entry-form" onSubmit={this.handleSubmit}>
        <div className="row">
          <div className="column-half">
            <div className="image-submit-box" style={this.state.previewImageUrl ? { backgroundImage: `url(${this.state.previewImageUrl})` } : null}>
              <label htmlFor="img-upload" className="image-upload-button">
                <i className="fas fa-plus-circle plus-button"></i>
              </label>
              <input
                required
                type="file"
                name="image"
                ref={this.fileInputRef}
                onChange={this.handleImageChange}
                accept="image/*"
                id="img-upload" />
            </div>
          </div>
          <div className="column-half">
            <label htmlFor="trail-name">
              <p className="input-title">Name:</p>
              <input
                required
                id="trailTitle"
                type="text"
                className="input-box"
                name="title"
                value={this.state.trailName}
                onChange={this.handleNameChange} />
            </label>
            <label htmlFor="trail-length">
              <p className="input-title">Length(miles):</p>
              <input
                required
                id="lengthTitle"
                type="number"
                className="input-box"
                name="length"
                value={this.state.length}
                onChange={this.handleLengthChange}
                min="0"
                step="0.1"/>
            </label>
            <label htmlFor="trail-address">
              <p className="input-title">Address:</p>
              <input
                required
                id="addressTitle"
                type="text"
                className="input-box"
                name="address"
                value={this.state.location}
                onChange={this.handleAddressChange} />
            </label>
            <label htmlFor="trail-difficulty">
              <p className="input-title">Difficulty:</p>
                <select defaultValue={'default'} className="dropdown" id="difficulty" onChange={this.handleDifficultyChange} required>
                <option value='default'>Designate a difficulty rating:</option>
                <option value="easy">Easy</option>
                <option value="moderate">Moderate</option>
                <option value="difficult">Difficult</option>
              </select>
            </label>
            <div className="submit-button">
              <button className="submit-text" type="submit">SUBMIT</button>
            </div>
          </div>
        </div>
      </form>
      </>
    );
  }
}
