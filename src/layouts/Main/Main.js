import React from "react";
import LinearProgress from '@material-ui/core/LinearProgress'

function main({ children,isLoading=false }) {
  return (
    <>
      {isLoading ? <LinearProgress style={{background:"#14a37f"}} /> : <div style={{ borderBottom: "2px solid #14a37f" }}>
      </div>}
      <div style={{ marginTop: "15px", padding: "0px 5%" }}>{children}</div>
    </>
  );
}

export default main;
