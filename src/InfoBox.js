import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";

function InfoBox({ title, cases, total, isDark }) {
  return (
    <Card
      className="infobox"
      // style={{
      //   backgroundColor: isDark ? "#333333" : "#fff",
      //   color: isDark ? "#fff" : "#000",
      // }}
    >
      <CardContent>
        <Typography
          // style={{ color: isDark ? "#fff" : "#555" }}
          className="infobox__title"
          color="textSecondary"
        >
          {title}
        </Typography>
        <h2 className="infobox__caes"> {cases}</h2>
        <Typography
          //          style={{ color: isDark ? "#fff" : "#555" }}
          className="infobox__total"
          color="textSecondary"
        >
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
