# This project is a toy project for training and quality assurance purposes

# Web App

Boilerplate Webpack 5, React and Bootstrap 5 project with global Css and Css modules enabled.

# Hosts File Config

In order to run this application in local, you'll need to modify your hosts file configuration. Then you will be able to access/serve your application at https://test.manaknightdev.com:3000

### Windows

Please include the following line in your hosts file

`127.0.0.1 test.manaknightdev.com`

See How to edit your hosts file on Windows [here](https://www.groovypost.com/howto/edit-hosts-file-windows-10/)

### Mac

Please do the following steps

`sudo nano /private/etc/hosts`

add `127.0.0.1 test.manaknightdev.com` to the end of the file and save

run `sudo dscacheutil -flushcache` to flush the DNS cache

you might need to run `chmod +x .husky/pre-commit` to have the linter activated on commits

# App Setup

This project is setup to use yarn.

to get started.

`run yarn`

This will install the nodule modules

# Dev Build

`yarn run start`

The Webpack build has a lot of outputs, if this is not intterupted then allow it to completely build for the first time... consecutive builds on "save" are faster after the first build.

In the event you run into any error with the build failing
for this project you can downgrade your `node version to 14 or 16`

# Staging Build

`yarn run staging`

# Production Build

`yarn run production`

# Task

- To login go to https://test.manaknightdev.com:3000/

- devtest@manaknightdev.com / Abcdef123

- Create the form page https://test.manaknightdev.com:3000/form as in screenshot_1

- Need to integrate API to load the table <a href="#get_form">go to doc</a>

- When we click on add button, it will open modal popup showing form. need to integrate the ADD FORM api <a href="#add_form">go to doc</a>

- When we click on a form on the list, it will open modal popup showing form with saved details of the form. need to integrate the EDIT FORM api <a href="#edit_form">go to doc</a>

- Create delete modal and it can delete the form as well screenshot_2 <a href="#delete_form">go to doc</a>

## Important Detail

The popup modal that shows the form has two sections, the left panel and the right panel.

- **The Left Panel**: this is a list of template strings starting with three tilds and ending with three tilds => `~~~name~~~`
  when a template is clicked, it is added to the right panel which is a `<textarea></textarea>` as you see in screenshot_3.

- **The Right Panel**: this is a `<textarea></textarea>` where you can type in any text of your choice and also add templates by clicking on a template on the left panel as you see in screenshot_3.

<div id="get_form">

## API for getting Contract Forms

```
GET `/companies/${companyId}/contract-forms`
```

</div>

<div id="add_form">

## API for Adding Contract Forms

```
Request Body: {
company_id: companyId,
name: formName,
replacement_tags: typeof String,
status: 'active',
template: typeof string,
has_signature: true || false,
}
```

```
POST  `/contract-forms`
```

</div>

<div id="edit_form">

## API for Editing Contract Forms

```
Request Body: {
company_id: companyId,
name: formName,
replacement_tags: typeof String,
status: 'active',
template: typeof string,
has_signature: true || false,
}
```

```
PUT  `/contract-forms`
```

</div>

<div id="delete_form">

```
DELETE `/contract-forms/${contractId}`
```

</div>
