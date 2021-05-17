//Import outside modules
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Breadcrumbs,
  Button,
  Container,
  Card,
  CardMedia,
  Link,
  Typography,
} from "@material-ui/core";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  result: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: 20,
  },
  container: {
    height: 200,
    width: 250,
    marginRight: 15,
    marginBottom: 50,
  },
  card: {
    height: "100%",
  },
  media: {
    height: "100%",
    backgroundSize: "contain",
  },
  title: {
    textAlign: "center",
    display: "block",
    marginTop: "40vh",
    font: "initial",
  },
  button: {
    width: "100%",
  },
}));

function Result({ selectBranch }) {
  const classes = useStyles();

  const [subCategory, setSubCategory] = useState(null);

  useEffect(() => {
    setSubCategory(null);
  }, [selectBranch]);

  const card = (name, image, subcategories) => (
    <div
      className={classes.container}
      onClick={() => subcategories && setSubCategory({ name, subcategories })}
    >
      <Card className={classes.card} key={name}>
        <CardMedia
          className={classes.media}
          image={`/images/${image}`}
          title={name}
        />
      </Card>
      <Button className={classes.button} variant="contained" color="primary">
        {name}
        {subCategory ? null : <ArrowRightIcon />}
      </Button>
    </div>
  );

  return (
    <Container>
      {selectBranch ? (
        <>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="#" onClick={() => setSubCategory(null)}>
              Equipment Catalog
            </Link>
            {subCategory ? (
              <Typography color="textPrimary">{subCategory.name}</Typography>
            ) : null}
          </Breadcrumbs>
          <div className={classes.result}>
            {subCategory
              ? subCategory.subcategories.map(({ name, image }) =>
                  card(name, image)
                )
              : selectBranch.categories.map(({ name, image, subcategories }) =>
                  card(name, image, subcategories)
                )}
          </div>
        </>
      ) : (
        <div className={classes.title}>
          <div>WELCOME TO RENTAL MANAGEMENT SYSTEM</div>
          <div>Please Select Location</div>
        </div>
      )}
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    selectBranch: state.selectBranch,
  };
};

export default connect(mapStateToProps, null)(Result);
