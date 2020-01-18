import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../actions/auth";
import axios from "axios";

export class Register extends Component {
    state = {
        username: "", 
        email: "",
        password: "",
        justRegister: false,
        justRegisterUser: false,
        groups: [1],
        groupList: []
    };

    static propTypes = {
        register: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    };

    componentDidMount() {
      this.setState({justRegister: false});
      this.setState({justRegisterUser: false});
      this.getGroupList();
    };

    getGroupList() {
      axios
        .get('http://127.0.0.1:8000/groups/')
        .then( res => {
          this.setState({ groupList: res.data.results });
        })
        .catch(err => console.log(err));
    };

    renderGroupOptions() {
      return this.state.groupList.map(group => (
        <option key={group.id} value={group.id}>{group.name}</option>
      ))
    };

    handleChange = e => {
      const { value } = e.target;
      this.setState({ groups: [value]});
    };

    onSubmit = e => {
        e.preventDefault();
        const { username, email, password, groups } = this.state;
        const newUser = {
            username,
            password,
            email,
            groups
        };
        this.props.register(newUser);
        this.setState({justRegister: true});
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        // if(this.props.isAuthenticated) {
        //   return <Redirect to="/"/>;
        // }
        if(this.state.justRegister) {
          return <Redirect to="/login"/>;
        }
        const { username, email, password } = this.state;
        return (
            <div className="col-md-6 m-auto">
              <div className="card card-body mt-5">
                <h2 className="text-center">Register</h2>
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label className="redUserText"><strong className="blackUserText">Username</strong> *cannot include spaces</label>
                    <input
                      type="text"
                      className="form-control"
                      name="username"
                      onChange={this.onChange}
                      value={username}
                    />
                  </div>
                  <div className="form-group">
                    <label><strong>Email</strong></label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      onChange={this.onChange}
                      value={email}
                    />
                  </div>
                  <div className="form-group">
                    <label><strong>Password</strong></label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      onChange={this.onChange}
                      value={password}
                    />
                  </div>
                  <div className="form-group">
                    <label><strong>Group</strong></label>
                    <select
                      className="form-control"
                      name="groups"
                      // value={this.state.groups}
                      onChange={this.handleChange}>
                        {this.renderGroupOptions()}
                    </select> 
                  </div>
                  <div className="form-group">
                    <button type="submit" className="btn btn-primary">Register</button>
                  </div>
                  <p>
                    Already have an account? <Link to="/login">Login</Link>
                  </p>
                </form>
              </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { register })(Register);