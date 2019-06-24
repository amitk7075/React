import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../action';

class GoogleAuth extends React.Component {

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '383645313057-503v44laot7vbn0sd21rpfe3pnjih03m.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                //this.setState({ isSignedIn: this.auth.isSignedIn.get() });
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);

            });
        });
    }

    onAuthChange = (isSignedIn) => {
        //this.setState({ isSignedIn: this.auth.isSignedIn.get() });
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    }

    onSignIn = () => {
        this.auth.signIn();
    }

    onSignOut = () => {
        this.auth.signOut();
    }
    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
                <div>
                    <button onClick={this.onSignOut} className="ui red google button">
                        <i className="google icon">Signout</i>
                    </button>
                </div>
            );
        } else {
            return (
                <div>
                    <button onClick={this.onSignIn} className="ui red google button">
                        <i className="google icon">Signin</i>
                    </button>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                { this.renderAuthButton() }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn
    }
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);