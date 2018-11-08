
import React from 'react';
import "./Player.css"
class Player extends React.Component {


    componentDidUpdate(prevProps) {
        if (this.props.musicUrl !== prevProps.musicUrl) {
            let video = document.getElementById("leipengAudio");
            if (video.paused) {
                video.play();
            } else {
                video.paused();
                video.play();
            }
        }
    }

    formatTime = (time) => {
        var min = Math.floor(time / 60);
        var sec = Math.floor(time % 60);
        return min + ':' + (sec < 10 ? '0' + sec : sec);
    }


    togglePlay = () => {
        const player = this.refs.audio
        if (player.paused) {
            playPause.attributes.d.value = "M0 0h6v24H0zM12 0h6v24h-6z";
            player.play();
        } else {
            playPause.attributes.d.value = "M18 12L0 24V0";
            player.pause();
        }
    }

    render() {
        const self = this;
        return (
            <div className="audio green-audio-player">
                <div className="loading" ref="loading">
                    <div className="spinner"></div>
                </div>
                <div className="play-pause-btn" ref="playPauseBtn" onClick={() => {
                    this.togglePlay()
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="24" viewBox="0 0 18 24">
                        <path fill="#566574" fillRule="evenodd" d="M18 12L0 24V0" className="play-pause-icon" id="playPause" ref="playPause" />
                    </svg>
                </div>

                <div className="controls">
                    <span className="current-time" ref="currentTime">0:00</span>
                    <div className="slider" data-direction="horizontal">
                        <div className="progress" ref="progress">
                            <div className="pin" id="progress-pin" data-method="rewind"></div>
                        </div>
                    </div>
                    <span className="total-time" ref="totalTime">0:00</span>
                </div>

                <div className="volume">
                    <div className="volume-btn" ref="volumeBtn" onClick={() => {
                        self.refs.volumeBtn.classList.toggle("open")
                        self.refs.volumeControls.classList.toggle('hidden')
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="#566574" fillRule="evenodd" d="M14.667 0v2.747c3.853 1.146 6.666 4.72 6.666 8.946 0 4.227-2.813 7.787-6.666 8.934v2.76C20 22.173 24 17.4 24 11.693 24 5.987 20 1.213 14.667 0zM18 11.693c0-2.36-1.333-4.386-3.333-5.373v10.707c2-.947 3.333-2.987 3.333-5.334zm-18-4v8h5.333L12 22.36V1.027L5.333 7.693H0z" id="speaker" ref="speaker" />
                        </svg>
                    </div>
                    <div className="volume-controls hidden" ref="volumeControls">
                        <div className="slider" data-direction="vertical" ref="sliders">
                            <div className="progress" ref="sliderProgress">
                                <div className="pin" id="volume-pin" data-method="changeVolume"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <video id="leipengAudio" src={this.props.musicUrl} ref="audio" autoPlay
                    onTimeUpdate={(event) => {
                        const play = event.target
                        let current = play.currentTime
                        let percent = current / play.duration * 100
                        self.refs.progress.style.width = `${percent}%`
                        self.refs.currentTime.textContent = self.formatTime(current)
                    }}
                    onVolumeChange={(event) => {
                        // self.refs.volumeProgress.style.height = `${event.volume * 100}%`
                        const speaker = self.refs.speaker
                        const player = event.target
                        if (player.volume >= 0.5) {
                            speaker.attributes.d.value = 'M14.667 0v2.747c3.853 1.146 6.666 4.72 6.666 8.946 0 4.227-2.813 7.787-6.666 8.934v2.76C20 22.173 24 17.4 24 11.693 24 5.987 20 1.213 14.667 0zM18 11.693c0-2.36-1.333-4.386-3.333-5.373v10.707c2-.947 3.333-2.987 3.333-5.334zm-18-4v8h5.333L12 22.36V1.027L5.333 7.693H0z';
                        } else if (player.volume < 0.5 && player.volume > 0.05) {
                            speaker.attributes.d.value = 'M0 7.667v8h5.333L12 22.333V1L5.333 7.667M17.333 11.373C17.333 9.013 16 6.987 14 6v10.707c2-.947 3.333-2.987 3.333-5.334z';
                        } else if (player.volume <= 0.05) {
                            speaker.attributes.d.value = 'M0 7.667v8h5.333L12 22.333V1L5.333 7.667';
                        }
                    }}
                    onLoadedMetadata={(event) => {
                        self.refs.totalTime.textContent = self.formatTime(event.target.duration);
                    }}
                    onCanPlay={() => {
                        self.refs.playPauseBtn.style.display = 'block';
                        self.refs.loading.style.display = 'none';
                    }}
                    onEnded={(event) => {
                        self.refs.playPause.attributes.d.value = "M18 12L0 24V0";
                        event.target.currentTime = 0;
                    }}
                >
                </video>
            </div>
        );
    }
}

export default Player