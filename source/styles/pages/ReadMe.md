Pages
=====

We have lots of pages on our site. Most of them are Content Pages. Here are some examples:
- Home
- Shipping
- Returns
- Store Locator
- Grand Openings
- Fit Assistance
- Legal
- FAQ

### Terrible Things
In older versions of our setup, these styles either went directly into the *shop_record* files or they were placed in *content.css*.

_Please don't do that._


### Better Things
Place references to these page styles in the _cap shop record. Here's what the file looks like in your local environment: *shop_records/{{PageName}}_capTop.html*

To place this into the Admin, createa  shop record with the name:
*{{PageName}}_cap*

You will place the reference in the section labeled **Top**. Scripts will go in the **Main** section of the Admin.

[Return to Main ReadMe.md](/ReadMe.md)