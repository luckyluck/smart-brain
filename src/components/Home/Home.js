import React from 'react';
import { connect } from 'react-redux';
import Logo from '../Logo/Logo';
import Rank from '../Rank/Rank';
import ImageLinkForm from '../ImageLinkForm/ImageLinkForm';
import FaceRecognition from '../FaceRecognition/FaceRecognition';
import * as actions from '../../store/actions';

class Home extends React.Component {
    state = {
        input: ''
    };

    onInputChange = (event) => {
        this.setState({ input: event.target.value });
    };

    onButtonSubmit = () => {
        this.props.imageUrl(this.state.input, this.props.user.id);
    };

    render() {
        return (
            <div>
                <Logo/>
                <Rank
                    name={this.props.user.name}
                    entries={this.props.entries}
                />
                <ImageLinkForm
                    onInputChange={this.onInputChange}
                    onButtonSubmit={this.onButtonSubmit}
                />
                <FaceRecognition box={this.props.box} imageUrl={this.props.url}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    url: state.home.imageUrl,
    entries: state.home.entries,
    box: state.home.box,
    user: state.auth.user
});
const mapDispatchToProps = dispatch => ({
    imageUrl: (input, userId) => dispatch(actions.imageUrl(input, userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);