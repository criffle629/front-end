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
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from 'axios';
import moment from 'moment'

import { updateAnimal, getAllAnimalInfo } from '../../actions/animalAction.js'

// react component plugin for creating a beautiful datetime dropdown picker
import Datetime from "react-datetime";
// react component plugin for creating beatiful tags on an input
import TagsInput from "react-tagsinput";
// plugin that creates slider
import nouislider from "nouislider";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import Switch from "@material-ui/core/Switch";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';

// @material-ui/icons
import Today from "@material-ui/icons/Today";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import AvTimer from "@material-ui/icons/AvTimer";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import CustomLinearProgress from "components/CustomLinearProgress/CustomLinearProgress.jsx";
import ImageUpload from "components/CustomUpload/ImageUpload.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";

import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
import { borderBottom } from "@material-ui/system";

class AnimalView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      animal: {},
      animal_meta: {},
      animal_notes: [],
      animal_followers: [],
      isEditing: false,
      read: true,
      editInfo: {
        breed: '',
        coat_length: '',
        color: '',
        description: '',
        health: '',
        is_good_with_cats: '',
        is_good_with_dogs: '',
        is_good_with_kids: '',
        is_house_trained: '',
        is_mixed: '',
        is_neutered_spayed: '',
        is_vaccinated: '',
        sex: true,
        size: '',
        animal_status: '',
        notes: '',
        species: '',
        name: '',
        nickname: ''
      },
      breeds: [],
      size: [],
      coat_length: [],
      ages: [],
      species: [],
      animal_status: []

    };
  }

  getEachAnimal = () => {
    return axios.
      get(`http://localhost:8000/api/animals/${this.props.match.params.id}`)
  }

  getEachAnimalInfo = () => {
    return axios.get('http://localhost:8000/api/internal/paws/options')
  }

  componentDidMount() {

    Promise.all([this.getEachAnimal(), this.getEachAnimalInfo()])
      .then(([animal, animalInfo]) => {
        // call setState here
        console.log('animal ', animal)
        console.log('animal info', animalInfo)
        this.setState({
          animal: animal.data,
          animal_meta: animal.data.meta,
          animal_notes: animal.data.notes,
          animal_followers: animal.data.followers,
          breeds: animalInfo.data.breeds,
          size: animalInfo.data.size,
          ages: animalInfo.data.ages,
          species: animalInfo.data.species,
          coat_length: animalInfo.data.coat_length,
          animal_status: animalInfo.data.animal_status,
        })
      })
      .catch(error => {
        console.log('animal info error', error)
      })

  }


  handleUpdate = (event) => {
    event.preventDefault()
    if (this.state.isEditing) {

      this.updateForm()
    }
    else this.handleToggle(event)

  }

  updateForm = () => {
    this.setState({
      isEditing: false,
      read: true
    })


    // this.props.updateForm()
    // .then(result => {
    //   this.setState({
    //     isEditing:false,
    //     read:true
    //   })
    // })
  }



  handleAdoption = (event) => {
    this.setState({
      editInfo: {
        ...this.state.editInfo,
        [event.target.name]: event.target.value
      }
    })
  }


  handleToggle = (event) => {
    event.preventDefault()
    this.setState({
      isEditing: !this.state.isEditing,
      read: !this.state.read
    })

  }


  render() {
    const { classes } = this.props;


    const customStyle = {
      titleStyle: {
        padding: "10% 0px 0px 0px"
      },
      imgCardStyle: {
        padding: "0px 15px",
        width: "224px",
        height: "224px"
      },
      imgStyle: {
        borderRadius: "4px",
      },
      animalInfoStyle: {
        padding: "20px 0px"
      },
      buttonStyle: {
        margin: "0px 10px 10px 0px"
      },
      noteButtonStyle: {
        margin: "0px 10px 10px 15px",
        width: "40%"
      },
      containerStyle: {
        padding: "3%"
      },
      textFieldStyle: {
        width: "43%",
        marginRight: "7%"
      },
      textFieldNote: {
        padding: "0px 3%"
      },
      oneTextFieldStyle: {
        width: 300,
        marginRight: "150px"
      },
      detailsContainerStyle: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      gridItemStyle: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      gridStyle: {
        margin: "40px 40px",
        borderTop: "1px solid lightgray",

      },
      animalButtonStyle: {
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight: '12%'
      },
      runningNoteButtonStyle: {
        display: 'flex',
        justifyContent: 'flex-end',
      },
      imgTitle: {
        background:
          'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
        opacity: 0.8,
        fontSize: "26px",
        fontWeight: "bold"
      },
      noteStyle: {
        color: "lightgray",
        display: 'flex',
        flexWrap: 'wrap',

      },
      typographyStyle: {
        marginRight: "7%",
      },
      adoptionStyle: {
        paddingTop: "3%",
        // width: "43%",
        // marginRight: "7%",
        display: "flex",
        flexWrap: 'wrap',
      },
      formControlStyle: {
        // display:"flex",
        // flexWrap: 'wrap',
        width: "50%",
        // marginRight: "1%",
      },
      form1ControlStyle: {
        width: "50%",
        marginRight: "1%",
      }

    }

    let gender = ''

    if (this.state.animal_meta.sex) {
      gender = 'male'
    }
    else if (!this.state.animal_meta.sex) {
      gender = 'female'
    }


    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <GridContainer style={customStyle.containerStyle}>

                <GridItem xs={12} sm={12} md={5}>
                  <GridList className={classes.gridList} >
                    <GridListTile key={this.state.animal.img_url} style={customStyle.imgCardStyle}>
                      <img src={this.state.animal.img_url} alt={`${this.state.animal_meta.breed} for adoption`}
                        style={customStyle.imgStyle} />

                      {/* <GridListTileBar style={{ display: this.state.isEditing ? "none" : "block" }}
                        title={this.state.animal.name}
                        subtitle={<span>#{this.state.animal.id}</span>}
                        classes={{
                          root: classes.titleBar,
                          title: classes.title,
                        }}
                      /> */}
                      <GridListTileBar style={customStyle.imgTitle}
                        title={this.state.animal.name}
                        subtitle={<span>#{this.state.animal.id}</span>}
                        classes={{
                          root: classes.titleBar,
                          title: classes.title,
                        }}
                      />
                    </GridListTile>
                  </GridList>
                </GridItem>

                <GridItem xs={12} sm={12} md={7}>
                  <div style={customStyle.titleStyle}>
                    {this.state.isEditing ?
                      <form>
                        <TextField
                          name="name"
                          label="Name"
                          className={classes.textField}
                          value={this.state.animal.name}
                          onChange={this.handleAdoption}
                          margin="normal"
                        />

                        <TextField
                          name="description"
                          label="Description"
                          multiline
                          rows="4"
                          className={classes.textField}
                          value={this.state.animal_meta.description}
                          onChange={this.handleAdoption}
                          margin="normal"
                        />
                      </form> :
                      <div>
                        <h1>{this.state.animal.name}</h1>
                        <legend>{this.state.animal_meta.description}</legend>
                      </div>}

                    <div style={customStyle.animalButtonStyle}>

                      <Button size="small" className={classes.button} onClick={this.handleUpdate}>
                        {this.state.isEditing ? "SAVE" : "EDIT"}
                      </Button>

                      <Button size="small" className={classes.button} onClick={this.handleToggle}
                        style={{ display: this.state.isEditing ? "block" : "none" }}>

                        CANCEL
                      </Button>

                    </div>
                  </div>

                </GridItem>

                <GridItem xs={12} sm={12} md={12} style={customStyle.gridStyle}>

                  <div style={customStyle.titleStyle}>
                    <legend>Details</legend>
                  </div>

                  <GridContainer style={customStyle.detailsContainerStyle}>
                    <GridItem xs={12} sm={12} md={12} style={customStyle.gridItemStyle}>

                      {/* <TextField style={customStyle.textFieldStyle}
                        id="standard-read-only-input"
                        label="Species"
                        value={this.state.animal.species}
                        className={classes.textField}
                        margin="normal"
                        InputProps={{
                          readOnly: this.state.read,
                        }}
                      /> */}

                      {this.state.isEditing ?
                        <form
                          className={classes.root}
                          autoComplete="off" style={customStyle.adoptionStyle}>

                          <FormControl style={customStyle.form1ControlStyle} className={classes.formControl} >
                            <InputLabel htmlFor="animal_status">Adoption Status</InputLabel>
                            <Select

                              value={this.state.editInfo.animal_status ? this.state.editInfo.animal_status : this.state.animal.animal_status}
                              name='animal_status'
                              onChange={this.handleAdoption}
                              renderValue={value => `${value}`}
                              input={<Input id="animal_status" />}
                            >

                              {this.state.animal_status.map(status => {
                                return (
                                  <MenuItem value={status.animal_status}>{status.animal_status}</MenuItem>
                                )
                              })}

                            </Select>
                          </FormControl>

                          <FormControl style={customStyle.formControlStyle} className={classes.formControl} >
                            <InputLabel >Species</InputLabel>
                            <Select
                              value={this.state.editInfo.species ? this.state.editInfo.species : this.state.animal.species}
                              name='species'
                              onChange={this.handleAdoption}
                              renderValue={value => `${value}`}
                              input={<Input id="species" />}
                            >
                              
                              {this.state.species.map(status => {
                                return (
                                  <MenuItem value={status.species}>{status.species}</MenuItem>
                                )
                              })}
                            </Select>
                          </FormControl>

                          <FormControl style={customStyle.formControlStyle} className={classes.formControl} >
                            <InputLabel >Breed</InputLabel>
                            <Select
                              value={this.state.editInfo.breed ? this.state.editInfo.breed : this.state.animal_meta.breed}
                              name='breed'
                              onChange={this.handleAdoption}
                              renderValue={value => `${value}`}
                              input={<Input id="breed" />}
                            >
                              {this.state.breeds.map(status => {
                                return (
                                  <MenuItem value={status.breed}>{status.breed}</MenuItem>
                                )
                              })}
                            </Select>
                          </FormControl>

                          <FormControl style={customStyle.formControlStyle} className={classes.formControl} >
                            <InputLabel >Age</InputLabel>
                            <Select
                              value={this.state.editInfo.age ? this.state.editInfo.age : this.state.animal_meta.age}
                              name='age'
                              onChange={this.handleAdoption}
                              renderValue={value => `${value}`}
                              input={<Input id="age" />}
                            >
                              {this.state.ages.map(status => {
                                return (
                                  <MenuItem value={status.age}>{status.age}</MenuItem>
                                )
                              })}
                            </Select>
                          </FormControl>

                          <FormControl style={customStyle.formControlStyle} className={classes.formControl} >
                            <InputLabel >Size</InputLabel>
                            <Select
                              value={this.state.editInfo.size ? this.state.editInfo.size : this.state.animal_meta.size}
                              name='size'
                              onChange={this.handleAdoption}
                              renderValue={value => `${value}`}
                              input={<Input id="size" />}
                            >
                              {this.state.size.map(status => {
                                return (
                                  <MenuItem value={status.size}>{status.size}</MenuItem>
                                )
                              })}
                            </Select>
                          </FormControl>

                          <FormControl style={customStyle.formControlStyle} className={classes.formControl} >
                            <InputLabel >Coat Length</InputLabel>
                            <Select
                              value={this.state.editInfo.coat_length ? this.state.editInfo.coat_length : this.state.animal_meta.coat_length}
                              name='coat_length'
                              onChange={this.handleAdoption}
                              renderValue={value => `${value}`}
                              input={<Input id="coat_length" />}
                            >
                              {this.state.coat_length.map(status => {
                                return (
                                  <MenuItem value={status.coat_length}>{status.coat_length}</MenuItem>
                                )
                              })}
                            </Select>
                          </FormControl>

                          <TextField
                            name="color"
                            label="Color"
                            className={classes.textField}
                            value={this.state.editInfo.color ? this.state.editInfo.color : this.state.animal_meta.color}

                            // value={this.state.animal_meta.color}
                            onChange={this.handleAdoption}
                            margin="normal"
                          />

                        </form> :
                        <div>
                          <TextField style={customStyle.textFieldStyle}
                            id="standard-read-only-input"
                            label="Species"
                            value={this.state.animal.species}
                            className={classes.textField}
                            margin="normal"
                            InputProps={{
                              readOnly: this.state.read,
                            }}
                          />
                          <TextField style={customStyle.textFieldStyle}
                            id="standard-read-only-input"
                            label="Adoption Status"
                            value={this.state.animal.animal_status}
                            className={classes.textField}
                            margin="normal"
                            InputProps={{
                              readOnly: this.state.read,
                            }}
                          />
                          <TextField style={customStyle.textFieldStyle}
                            id="standard-read-only-input"
                            label="Breed"
                            value={this.state.animal_meta.breed}
                            className={classes.textField}
                            margin="normal"
                            InputProps={{
                              readOnly: this.state.read,
                            }}
                          />
                          <TextField style={customStyle.textFieldStyle}
                            id="standard-read-only-input"
                            label="Age"
                            value={this.state.animal_meta.age}
                            className={classes.textField}
                            margin="normal"
                            InputProps={{
                              readOnly: this.state.read,
                            }}
                          />
                          <TextField style={customStyle.textFieldStyle}
                            id="standard-read-only-input"
                            label="Size"
                            value={this.state.animal_meta.size}
                            className={classes.textField}
                            margin="normal"
                            InputProps={{
                              readOnly: this.state.read,
                            }}
                          />
                          <TextField style={customStyle.textFieldStyle}
                            id="standard-read-only-input"
                            label="Coat Length"
                            value={this.state.animal_meta.coat_length}
                            className={classes.textField}
                            margin="normal"
                            InputProps={{
                              readOnly: this.state.read,
                            }}
                          />
                        </div>
                      }

                      {/* <TextField style={customStyle.textFieldStyle}
                        id="standard-read-only-input"
                        label="Adoption Status"
                        value={this.state.animal.animal_status}
                        className={classes.textField}
                        margin="normal"
                        InputProps={{
                          readOnly: this.state.read,
                        }}
                      /> */}

                      {/* <TextField style={customStyle.textFieldStyle}
                        id="standard-read-only-input"
                        label="Breed"
                        value={this.state.animal_meta.breed}
                        className={classes.textField}
                        margin="normal"
                        InputProps={{
                          readOnly: this.state.read,
                        }}
                      /> */}

                      {/* <TextField style={customStyle.textFieldStyle}
                        id="standard-read-only-input"
                        label="Age"
                        value={this.state.animal_meta.age}
                        className={classes.textField}
                        margin="normal"
                        InputProps={{
                          readOnly: this.state.read,
                        }}
                      /> */}

                      {/* <TextField style={customStyle.textFieldStyle}
                        id="standard-read-only-input"
                        label="Size"
                        value={this.state.animal_meta.size}
                        className={classes.textField}
                        margin="normal"
                        InputProps={{
                          readOnly: this.state.read,
                        }}
                      /> */}

                      {/* <TextField style={customStyle.textFieldStyle}
                        id="standard-read-only-input"
                        label="Color"
                        value={this.state.animal_meta.color}
                        className={classes.textField}
                        margin="normal"
                        InputProps={{
                          readOnly: this.state.read,
                        }}
                      /> */}

                      {/* <TextField style={customStyle.textFieldStyle}
                        id="standard-read-only-input"
                        label="Coat Length"
                        value={this.state.animal_meta.coat_length}
                        className={classes.textField}
                        margin="normal"
                        InputProps={{
                          readOnly: this.state.read,
                        }}
                      /> */}

                      <TextField style={customStyle.textFieldStyle}
                        id="standard-read-only-input"
                        label="Gender"
                        value={gender}
                        className={classes.textField}
                        margin="normal"
                        InputProps={{
                          readOnly: this.state.read,
                        }}
                      />

                    </GridItem>
                  </GridContainer>
                </GridItem>

                <GridItem xs={12} sm={12} md={12} style={customStyle.gridStyle}>
                  <div style={customStyle.titleStyle}>
                    <legend>Health and Personality</legend>
                  </div>

                  <GridContainer style={customStyle.detailsContainerStyle}>
                    <GridItem xs={12} sm={12} md={10}>

                      <TextField style={customStyle.oneTextFieldStyle}
                        id="standard-read-only-input"
                        label="Health"
                        value={this.state.animal_meta.health}
                        className={classes.textField}
                        margin="normal"
                        InputProps={{
                          readOnly: this.state.read,
                        }}
                      />

                      <TextField style={customStyle.textFieldStyle}
                        id="standard-read-only-input"
                        label="Vaccinated?"
                        value={this.state.animal_meta.is_vaccinated}
                        className={classes.textField}
                        margin="normal"
                        InputProps={{
                          readOnly: this.state.read,
                        }}
                      />

                      <TextField style={customStyle.textFieldStyle}
                        id="standard-read-only-input"
                        label="House trained?"
                        value={this.state.animal_meta.is_house_trained}
                        className={classes.textField}
                        margin="normal"
                        InputProps={{
                          readOnly: this.state.read,
                        }}
                      />

                      <TextField style={customStyle.textFieldStyle}
                        id="standard-read-only-input"
                        label="Good with Kids?"
                        value={this.state.animal_meta.is_good_with_kids}
                        className={classes.textField}
                        margin="normal"
                        InputProps={{
                          readOnly: this.state.read,
                        }}
                      />

                      <TextField style={customStyle.textFieldStyle}
                        id="standard-read-only-input"
                        label="Good with Cats?"
                        value={this.state.animal_meta.is_good_with_cats}
                        className={classes.textField}
                        margin="normal"
                        InputProps={{
                          readOnly: this.state.read,
                        }}
                      />

                      <TextField style={customStyle.textFieldStyle}
                        id="standard-read-only-input"
                        label="Good with Dogs?"
                        value={this.state.animal_meta.is_good_with_dogs}
                        className={classes.textField}
                        margin="normal"
                        InputProps={{
                          readOnly: this.state.read,
                        }}
                      />

                      <TextField style={customStyle.textFieldStyle}
                        id="standard-read-only-input"
                        label="Neutered/Spayed?"
                        value={this.state.animal_meta.is_neutered_spayed}
                        className={classes.textField}
                        margin="normal"
                        InputProps={{
                          readOnly: this.state.read,
                        }}
                      />

                    </GridItem>
                  </GridContainer>


                </GridItem>
              </GridContainer>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={12} md={4}>
            <Card style={customStyle.textFieldNote}>

              <CardHeader>
                <legend>Animal Notes</legend>
              </CardHeader>

              <TextField
                id="standard-textarea"
                label="Add a note"
                multiline
                className={classes.textField}
                margin="normal"
              />

              <div style={customStyle.detailsContainerStyle}>
                <Button style={customStyle.noteButtonStyle} variant="contained" color="secondary" disabled className={classes.button}>
                  CANCEL
                </Button>
                <Button style={customStyle.noteButtonStyle} variant="contained" className={classes.button}>
                  SUBMIT
                </Button>
              </div>

              <List
                subheader={<ListSubheader >Notes of {this.state.animal.name}</ListSubheader>}
                className={classes.root}
              >

                {this.state.animal_notes.map(note => {
                  return (
                    <ListItem button key={note.id}>
                      <ListItemText key={note.id} primary={note.notes}
                        secondary={
                          <React.Fragment>
                            <span style={customStyle.noteStyle}>
                              <Typography style={customStyle.typographyStyle}
                                component="span">
                                User:#{note.shelter_user_id}
                              </Typography>
                              {/* {moment(note.created_at).format("MMMM Do YYYY").toString()} */}
                              {moment(note.created_at).fromNow()}
                            </span>

                            <span style={customStyle.runningNoteButtonStyle}>
                              <Button size="small" disabled className={classes.button}>
                                DELETE
                            </Button>
                              <Button size="small" className={classes.button}>
                                EDIT
                            </Button>
                            </span>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                  )
                })}
              </List>
            </Card>
          </GridItem>
        </GridContainer>
      </div >
    );
  }
}

AnimalView.propTypes = {
  classes: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    userID: state.userReducer.userID,
    shelterID: state.shelterReducer.shelterID,
    shelterWorkerID: state.userReducer.shelterWorkerID,
    roleID: state.userReducer.roleID,
    shelter: state.shelterReducer.shelter,
    breeds: state.animalReducer.dropdownAnimalInfo.breeds,
    size: state.animalReducer.dropdownAnimalInfo.size,
    coat_length: state.animalReducer.dropdownAnimalInfo.coat_length,
    ages: state.animalReducer.dropdownAnimalInfo.ages,
    animal_status: state.animalReducer.dropdownAnimalInfo.animal_status,
    species: state.animalReducer.dropdownAnimalInfo.species,
  }
}

export default connect(
  mapStateToProps, { updateAnimal, getAllAnimalInfo }
)(withStyles(regularFormsStyle)(AnimalView))

        //export default withStyles(extendedFormsStyle)(AnimalView);
