import React from "react";
import { useState } from "react";
import "./SidebarOption.css";

function SidebarOption({text, Icon, onPress}) {

  return (
    <div className="sidebarOption">
      <Icon />
      <h4>{text}</h4>
    </div>
  );
}

export default SidebarOption;
