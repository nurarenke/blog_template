import React from "react";
import { connect } from "react-redux";

class UserHeader extends React.Component {
  render() {
    const { user } = this.props;
    if (!user) {
      return null;
    }
    return <div className="header">{user.name}</div>;
  }
}

// get access to the state
// ownProps gets access to the props that are sent to the component
const mapStateToProps = (state, ownProps) => {
  // you can put the logic of finding the right user in mapStateToProps instead of the component
  // this is because some developers put mapStateToProps in a different file
  return { user: state.users.find((user) => user.id === ownProps.userId) };
};

export default connect(mapStateToProps)(UserHeader);
