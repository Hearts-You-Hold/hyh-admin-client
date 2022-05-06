import React from "react";
import Userfront from "@userfront/react";

Userfront.init("5nxgy66b");

const PasswordResetForm = Userfront.build({
  toolId: "nrbmoo",
});

export default function Reset() {
  return (
    <div style={{position:'absolute', left:'50%', top:'50%', transform:'translate(-50%, -50%'}}>
      <PasswordResetForm />
    </div>
  );
}
