//Import Outside modules
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  Collapse,
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { connect } from "react-redux";
//Import Inner modules
import locations from "../Data";
import selectBranch from "../actions/branchAction";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  location: {
    textTransform: "unset",
  },
}));

function Bar({ selectBranch }) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const [openState, setOpenState] = useState({});

  const handleClick = (index) => {
    setOpenState({ [index]: !openState[index] });
  };

  const selectLocation = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (dealers_id, branch_id) => {
    setOpenState({});
    setAnchorEl(null);
    selectBranch(dealers_id, branch_id);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Rental Management System
          </Typography>
          <Button
            color="inherit"
            aria-controls="location-menu"
            aria-haspopup="true"
            className={classes.location}
            onClick={selectLocation}
          >
            Select Location
          </Button>
          <Menu
            id="location-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={() => {
              setOpenState({});
              setAnchorEl(null);
            }}
            PaperProps={{
              style: {
                maxHeight: "max-content",
              },
            }}
          >
            {locations.map(({ dealers_id, name, branches }) => (
              <div key={dealers_id}>
                <MenuItem onClick={() => handleClick(dealers_id)}>
                  <span style={{ width: "90%" }}>{name}</span>
                  {openState[dealers_id] ? <ExpandLess /> : <ExpandMore />}
                </MenuItem>
                <Collapse in={openState[dealers_id]}>
                  {branches.map(({ branch_id, name }) => (
                    <MenuItem
                      key={branch_id}
                      onClick={() => handleClose(dealers_id, branch_id)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Collapse>
              </div>
            ))}
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default connect(null, { selectBranch })(Bar);
