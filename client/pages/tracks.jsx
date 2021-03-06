import React from 'react';
import Cookies from 'js-cookie';
import SpotifyLogo from '../../server/public/assets/spotify.png';

export default class Tracks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeRange: 'all-time'
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    if (event.target.id === 'six-months') {
      fetch('/api/tracks6months')
        .then(res => res.json())
        .then(userInfo => {
          this.setState({
            timeRange: '6 months',
            track: userInfo
          });
        });
    } else if (event.target.id === 'one-month') {
      fetch('/api/tracks1month')
        .then(res => res.json())
        .then(userInfo => {
          this.setState({
            timeRange: '1 month',
            track: userInfo
          });
        });
    } else {
      fetch('/api/tracksalltime')
        .then(res => res.json())
        .then(userInfo => {
          this.setState({
            timeRange: 'all-time',
            track: userInfo
          });
        });
    }
  }

  componentDidMount() {
    fetch('/api/tracksalltime')
      .then(res => res.json())
      .then(userInfo => {
        this.setState({
          timeRange: 'all-time',
          track: userInfo
        });
      });
  }

  render() {
    if (this.state.track === undefined) {
      return null;
    }

    const tracklist = this.state.track.map(index => {
      const trackURL = 'https://open.spotify.com/track/' + index.trackId;
      return (
        <div key={index.id} className='column-one-half-row padding-right'>
          <div className='row padding-top'>
            <div className='column-one-half align-baseline'>
              <img className='track-cover' src={index.image} />
            </div>
            <div className='column-one-half'>
              <a target="_blank" href={trackURL} className='track-info track-name margin-none' rel="noreferrer">{index.track}</a>
              <p className='track-info'>{index.artist}</p>
              <p className='track-info'>Popularity: {index.popularity}</p>
            </div>
          </div>
        </div>
      );
    });

    const header = (
      <div id="header-container">
        <img id="spotify-logo" src={SpotifyLogo} alt="Spotify"/>
        <div id="header">TOP TRACKS</div>
        <div id="message">Hi {Cookies.get('displayName')}, here are your top tracks of {this.state.timeRange}.</div>
      </div>);

    if (this.state.timeRange === '6 months') {
      return (
        <div className='home-container padding-bottom'>
          {header}
          <div id="time-container" className='padding-top'>
            <div className='column-one-third padding-left'>
              <div id="all-time" className="time-range" onClick={this.handleClick}>All-Time</div>
            </div>
            <div className='column-one-third'>
              <div id="six-months" className="time-range green" onClick={this.handleClick}>6 Months</div>
            </div>
            <div className='column-one-third padding-right'>
              <div id="one-month" className="time-range" onClick={this.handleClick}>1 Month </div>
            </div>
          </div>
          <div id="tracks-container">{tracklist}
          </div>
        </div>
      );
    } else if (this.state.timeRange === '1 month') {
      return (
        <div className='home-container padding-bottom'>
          {header}
          <div id="time-container" className='padding-top'>
            <div className='column-one-third padding-left'>
              <div id="all-time" className="time-range" onClick={this.handleClick}>All-Time</div>
            </div>
            <div className='column-one-third'>
              <div id="six-months" className="time-range" onClick={this.handleClick}>6 Months</div>
            </div>
            <div className='column-one-third padding-right'>
              <div id="one-month" className="time-range green" onClick={this.handleClick}>1 Month </div>
            </div>
          </div>
          <div id="tracks-container">{tracklist}
          </div>
        </div>
      );
    }
    return (
      <div className='home-container padding-bottom'>
        {header}
        <div id="time-container" className='padding-top'>
          <div className='column-one-third padding-left'>
            <div id="all-time" className="time-range green" onClick={this.handleClick}>All-Time</div>
          </div>
          <div className='column-one-third'>
            <div id="six-months" className="time-range" onClick={this.handleClick}>6 Months</div>
          </div>
          <div className='column-one-third padding-right'>
            <div id="one-month" className="time-range" onClick={this.handleClick}>1 Month </div>
          </div>
        </div>
        <div id="tracks-container">{tracklist}
        </div>
      </div>
    );
  }
}
