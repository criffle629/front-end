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
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addShelterLoc } from "../../actions/shelterAction";

import shelterProfileStyles from "assets/jss/material-dashboard-pro-react/views/shelterProfileStyles.jsx";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/ShelterCustomInput.jsx";
import Clearfix from "components/Clearfix/Clearfix.jsx";


// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


class LocationForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            street_address: '',
            city: '',
            zipcode: '',
            state_id: '',
            nickname: '',
            shelter_contact_id: '',
            open: false,
            fullWidth: true,
            states: [],
            contacts: [],

        };
    }

    componentDidMount(){
       
        axios
        .get(`https://staging1-pawsnfind.herokuapp.com/api/internal/paws/options/1`)
        .then(options => {
          console.log(options.data)
          this.setState({
            states:options.data.states,
            contacts: options.data.contacts
          })
        })
        .catch( error => 
          console.log(error)
          )
    }


// Dialog functions 

    handleClickOpen = () => {
        this.setState({
          open: true,
        });
      };

    handleClose = () => {
        this.setState({ open: false });
    };

//

    handleSubmit = e => {
        e.preventDefault()

        const newLoc = {
            shelter_id : 1, //localstorage.getItem("shelter_id")
            street_address: this.state.street_address,
            city: this.state.city,
            zipcode: this.state.zipcode,
            state_id: this.state.state_id,
            nickname: this.state.nickname,
            shelter_contact_id: this.state.shelter_contact_id
            }

        this.props.addShelterLoc(newLoc)

        // .then( () => {
        //     this.props.getLocations
        // });

        this.handleClose()
        this.setState({
            street_address: '',
            city: '',
            zipcode: '',
            // state_id: '',
            phone_number: '',
            nickname: '',
            // shelter_contact_id: '',
        })
        
    }

    changeHandler = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    
    onChangeUser = newState => {
        this.setState({ state: newState });
      }


    render() {
        const { classes } = this.props;
        return (
            <div>
                <Button className={classes.addButton} size="lg" color="rose" onClick={this.handleClickOpen}>
                Add A Location
                </Button> 
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                    fullWidth={this.state.fullWidth}
                >
                    <DialogTitle id="form-dialog-title">
                        Add A Location
                    </DialogTitle>
                    <DialogContentText>
                    </DialogContentText>
                    <DialogContent>
                        <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                        <CustomInput 
                        id = "nickname"
                        labelText = "Location Name"
                        onChange = {this.changeHandler}
                        name= "nickname"
                        value= {this.state.nickname}

                        formControlProps={{
                            fullWidth: true
                            }}
                        inputProps={{
                            type: "text"
                            }}
                        
                        />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                        <CustomInput 
                        id = "street_address"
                        labelText = "Street Address"
                        onChange = {this.changeHandler}
                        name= "street_address"
                        value= {this.state.street_address}
                        inputProps={{
                            type: "text"
                        }}
                        formControlProps={{
                            fullWidth: true
                        }}
                        
                        />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                        <CustomInput 
                        id = "city"
                        labelText = "City"
                        onChange = {this.changeHandler}
                        name= "city"
                        value= {this.state.city}
                        inputProps={{
                            type: "text",
                            }}
                        formControlProps={{
                                fullWidth: true
                            }}
                        />
                        </GridItem>
                        
                        <GridItem xs={12} sm={12} md={2}>
                        <FormControl
                        fullWidth
                        className={classes.selectFormControl}>
                        <InputLabel
                        htmlFor="states"
                        className={classes.selectLabel}>
                        States
                        </InputLabel>
                        <Select
                        MenuProps={{
                            className: classes.selectMenu
                        }}
                        classes={{
                            select: classes.select
                        }}
                        value={this.state.state_id}
                        onChange={this.changeHandler}
                        //callback to pass up the parents
                        inputProps={{
                            name: "state_id",
                            id: "state-select"
                        }}>
                            {this.state.states.map(state => (
                                <MenuItem
                                key = {state.id}
                                classes={{
                                    root: classes.selectMenuItem,
                                    selected: classes.selectMenuItemSelected
                                }}
                                value= {state.id}>
                                {state.state}
                                </MenuItem>
                            ))}   
                            </Select>
                        </FormControl>
                        </GridItem>

                        <GridItem xs={12} sm={12} md={4}>

                        <CustomInput 
                        id = "zipcode"
                        labelText = "Zipcode"
                        onChange = {this.changeHandler}
                        name= "zipcode"
                        value= {this.state.zipcode}
                        inputProps={{
                            type: "text"
                        }}
                        
                        />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                        <FormControl
                        fullWidth
                        className={classes.selectFormControl}>
                        <InputLabel
                        htmlFor="contacts"
                        className={classes.selectLabel}>
                        Contact Person
                        </InputLabel>
                        <Select
                        MenuProps={{
                            className: classes.selectMenu
                        }}
                        classes={{
                            select: classes.select
                        }}
                        value={this.state.shelter_contact_id}
                        onChange={this.changeHandler}
                        //callback to pass up the parents
                        inputProps={{
                            name: "shelter_contact_id",
                            id: "contact-select"
                        }}>
                            {this.state.contacts.map(contact => (
                                <MenuItem
                                key = {contact.id}
                                classes={{
                                    root: classes.selectMenuItem,
                                    selected: classes.selectMenuItemSelected
                                }}
                                value= {contact.id}>
                                {contact.id}
                                </MenuItem>
                            ))}   
                            </Select>
                        </FormControl>
                        </GridItem>

                    </GridContainer>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSubmit} color="primary" >
                            Add New Location
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      userID : state.userReducer.userID,
      shelterID : state.shelterReducer.shelterID,
      shelterWorkerID : state.userReducer.shelterWorkerID,
      roleID : state.userReducer.roleID
    }
  }
  
  export default connect(
    mapStateToProps,
    { addShelterLoc }
  )(withStyles(shelterProfileStyles)(LocationForm))
  