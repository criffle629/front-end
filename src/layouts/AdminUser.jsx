/*!

=========================================================
* Material Dashboard PRO React - v1.7.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
import axios from "axios"
import { connect } from "react-redux";
import { axiosWithAuth } from 'axiosWithAuth';
import { get_user } from '../actions/userAction';

// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import AdminNavbar from "components/Navbars/AdminNavbar.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.jsx";

import routes from "userRoutes.js";

import appStyle from "assets/jss/material-dashboard-pro-react/layouts/adminStyle.jsx";

var ps;

class UserDashboard extends React.Component {
  state = {
    mobileOpen: false,
    miniActive: false,
    image: require("assets/img/sidebar-2.jpg"),
    color: "blue",
    bgColor: "blue",
    hasImage: true,
    fixedClasses: "dropdown",
    logo: require("assets/img/logo-white.svg"),
    
  };
  mainPanel = React.createRef();

  onBackButtonEvent = (e) => {
    e.preventDefault();
  }
  
    componentWillMount() {
      //verifying user before proceeding
      axiosWithAuth()
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/auth/user/${localStorage.getItem('user_id')}`)
        .then( result => {
          console.log(result)
        })
        .catch( error => {
          console.log(error)
          this.props.history.push('/')
        })
    }

  componentDidMount() {
    this.getUser(localStorage.getItem('user_id'));

    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });

    document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", this.resizeFunction);
  }
  
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
    window.removeEventListener("resize", this.resizeFunction);
  }

  componentDidUpdate(e) {
    
    if (e.history.location.pathname !== e.location.pathname) {
      this.mainPanel.current.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }

  getUser = async(user_id) => {
    await this.props.get_user(user_id)
  }

  handleFixedClick = () => {
    if (this.state.fixedClasses === "dropdown") {
      this.setState({ fixedClasses: "dropdown show" });
    } else {
      this.setState({ fixedClasses: "dropdown" });
    }
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  getRoute = () => {
    return window.location.pathname !== "/userDash/full-screen-maps";
  };

  getActiveRoute = routes => {
    let activeRoute = "Default Brand Text";
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = this.getActiveRoute(routes[i].views);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].name;
        }
      }
    }
    return activeRoute;
  };

  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return this.getRoutes(prop.views);
      }
      if (prop.layout === "/userDash") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  sidebarMinimize = () => {
    this.setState({ miniActive: !this.state.miniActive });
  };

  resizeFunction = () => {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  };

  render() {
    const { classes, ...rest } = this.props;
    const mainPanel =
      classes.mainPanel +
      " " +
      cx({
        [classes.mainPanelSidebarMini]: this.state.miniActive,
        [classes.mainPanelWithPerfectScrollbar]:
          navigator.platform.indexOf("Win") > -1
      });

    return (
      <div className={classes.wrapper}>
        <Sidebar
          routes={routes}
          logoText={this.props.user.username}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color={this.state.color}
          bgColor={this.state.bgColor}
          miniActive={this.state.miniActive}
          {...rest}
        />

        <div className={mainPanel} ref={this.mainPanel}>
          <AdminNavbar
            sidebarMinimize={this.sidebarMinimize.bind(this)}
            miniActive={this.state.miniActive}
            brandText={this.getActiveRoute(routes)}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />
          {/* On the /maps/full-screen-maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
          {this.getRoute() ? (
            <div className={classes.content}>
              <div className={classes.container}>
                <Switch>
                  {this.getRoutes(routes)}
                  <Redirect from="/userDash" to="/userDash/dashboard" />
                </Switch>
              </div>
            </div>
          ) : (
            <div className={classes.map}>
              <Switch>
                {this.getRoutes(routes)}
                <Redirect from="/userDash" to="/userDash/dashboard" />
              </Switch>
            </div>
          )}
          {this.getRoute() ? <Footer fluid /> : null}
          
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user : state.userReducer.user,
  }
}

UserDashboard.propTypes = {
  classes: PropTypes.object.isRequired
};


export default connect(
  mapStateToProps,
  { get_user }
)(withStyles(appStyle)(UserDashboard))
