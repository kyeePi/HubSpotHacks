# Guide

#AnyStarter #HubSpotAPI

### Summary

Create a HubSpot User property with a specified Field Type of Checkbox, to allow your users to set multiple HubSpot Users within a single property.

### Background

Ever come across a use-case where you may need multiple owners of a record, only to find that HubSpot User properties are restricted to a single select dropdown? 

The current answer is pretty simple: just *create another* property. 

This works fine when you have definitive roles you wish to classify the owner by (eg. Customer Success Manager, Project Manager, etc).

But let's consider an example where the role or number of potential owners are **not defined** ... Now you're creating multiple properties with less than ideal labels such as "Secondary Owner", "Tertiary Owner", "Additional Owner #1 (#2, #3)", etc.

As you can imagine, this can get quite overwhelming as an admin, but even worse for your users - especially when you want to do things like *send internal notifications to your owners within a workflow*.

Well here's a #HubSpotHack - you **can** create a Multi-Select HubSpot User property, using the HubSpot API!

With just a single API call, you can have your very own Multiple Checkbox HubSpot User property, allowing you to do all the things you'd expect - Send internal notifications, build Lists, Views and Reports, etc.
### Instructions

##### Prerequisites 
- API Client of your choosing (eg. [Postman](https://www.postman.com/) - *which I'll be using in this guide*)
- HubSpot Private App with the scope of `crm.schemas.{object}.write`

##### Create Request in Postman
1. Open Postman, select your Environment and Collection, click "New" and click "HTTP".

[step-1](Screenshots/step-1.png)

2. Setup your Request Parameters as shown below:

	Method: `POST`
	URL: `https://api.hubapi.com/crm/v3/properties/:object`
	Path Variables: `{Object Name}` (eg. `contact)

[step-2](Screenshots/step-2.png)

3. Setup your Request Body as shown below:

	Type: `raw`
	Format: `JSON`
	Body:

```
{
	"name": "{name}",
	"label": "{label}",
	"description": "{description}",
	"groupName": "{groupName}",
	"type": "enumeration",
	"fieldType": "checkbox",
	"referencedObjectType": "OWNER",
	"options": [],
	"externalOptions": true,
	"hidden": false,
	"formField": false,
	"hasUniqueValue": false,
	"displayOrder": 2
}
```

**The only values you need to adjust to suit your needs are:**

- Name
- Label
- Description
- Group Name 
	If you're unsure what your group name is, you can use
	`GET https://api.hubapi.com/crm/v3/properties/{objectType}/groups`

**See example below:**

[step-3](Screenshots/step-3.png)

4. Ensure to setup your Authorization

	*I recommend setting up an Environment to store your Private Tokens - then setting up Authorization within a Collection so all Requests within can Inherit auth from parent like shown below:*

[step-4](Screenshots/step-4.png)

5. Verify your setup and click Send

	After sending the API request, you should receive a response from the HubSpot API like shown below:

[step-5](Screenshots/step-5.png)

In HubSpot, you should now see your Custom Property within the Property Settings, ready to be used on your records!

[results-1](Screenshots/results-1.png)

[results-2](Screenshots/results-2.png)

##### Using Node.JS

If you prefer to do things within your code editor, I've provided an example Node.JS script using Axios.