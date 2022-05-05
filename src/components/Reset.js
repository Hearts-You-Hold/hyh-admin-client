import React from "react";
import Userfront from "@userfront/react";

Userfront.init("5nxgy66b");

const PasswordResetForm = Userfront.build({
  toolId: "nrbmoo",
});

export default function Reset() {
  return <PasswordResetForm />;
}
