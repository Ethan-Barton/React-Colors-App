import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";


export default class PaletteMetaForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: true,
            newPaletteName: ""
        };
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount(){
        ValidatorForm.addValidationRule("paletteNameUnique", (value) => 
        this.props.palettes.every(
          ({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase()
        )
      );
    }
    handleChange(evt){
        this.setState({[evt.target.name]: evt.target.value})
    }
    handleClickOpen = () => {
        this.setState({open: true});
    };
    handleClose = () => {
        this.setState({open: false});
    };
    render() {
        const {newPaletteName} = this.state;
        const { hideForm, handleSubmit } = this.props
        return (
            <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title" onClose={hideForm}>
                <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
                <ValidatorForm onSubmit={() => handleSubmit(newPaletteName)}>
                <DialogContent>
                <DialogContentText>
                    Please Enter a Name For Your New Handcrafted Palette.
                </DialogContentText>
                <Picker />

                <TextValidator
                label="Palette Name"
                value={newPaletteName}
                name="newPaletteName" 
                onChange={this.handleChange} 
                fullWidth
                margin="normal"
                validators={["required", "paletteNameUnique"]}
                errorMessages={["Enter Palette Name", "Palette Name Already in Use"]}
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={hideForm} color="primary">
                    Cancel
                </Button>
                <Button 
                variant="contained" 
                color="primary" 
                type="submit"
                >
                Save Palette
                </Button>
                </DialogActions>
                </ValidatorForm>
            </Dialog>
        )
    }
}
