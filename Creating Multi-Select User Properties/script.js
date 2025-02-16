// Using Node.js
// You can run this code by typing `node script.js` in your terminal at the location of this file
//
// Be sure to replace the `Authorization` header value with your own HubSpot Private App Token.

const axios = require("axios");

// Property Variables
// Replace the empty strings with your property details

const object = ""; // This is the object type of the property
const name = ""; // This is the name of the property
const label = ""; // This is the label of the property
const description = ""; // This is the description of the property
const groupName = ""; // This is the group name of the property

let data = JSON.stringify({
  name: `${name}`,
  label: `${label}`,
  description: `${description}`,
  groupName: `${groupName}`,
  type: "enumeration",
  fieldType: "checkbox",
  referencedObjectType: "OWNER",
  options: [],
  externalOptions: true,
  hidden: false,
  formField: false,
  hasUniqueValue: false,
  displayOrder: 2,
});

let config = {
  method: "post",
  maxBodyLength: Infinity,
  url: `https://api.hubapi.com/crm/v3/properties/${object}`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.HUBSPOT_PRIVATE_APP_TOKEN}`,
  },
  data: data,
};

axios
  .request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });
