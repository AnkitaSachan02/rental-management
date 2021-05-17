//Import Outside modules
import React, { Fragment } from "react";
//Import Inner modules
import Bar from "../components/bar";
import Result from "../components/result";

export default function Home() {
  return (
    <Fragment>
      <Bar />
      <Result />
    </Fragment>
  );
}
