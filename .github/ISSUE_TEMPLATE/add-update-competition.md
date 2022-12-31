---
name: Add/Update Competition
about: Please use the template to submit a request for adding a new competition.
title: 'FR: Add/Update Competition'
labels: enhancement
assignees: steinwaywhw

---

Please fill in the content below. An example is given at the end. 

```js
  {
    name: "",
    url: "https://",
    deadline: datetime("", ""),
    status: "",
    tags: [""],
    revision: datetime("", ""),
  }
```

You can include some key information in the "tags" section. For instance, you can include the following info.

* Is it free to enter? 
* Is there a limit on how many images you can submit? 
* Is there a limit on how recent the images are taken? 
* What about limits on cameras used for taking the image? 
* What's the prize? 

For such informations, please include a reference to the official rules below:

Official Rules for Tags:

Example: 

```js
  {
    name: "Sony Would Photography Awards > Open Competition > Street Photography",
    url: "https://www.worldphoto.org/sony-world-photography-awards",
    deadline: datetime("2023-01-06T13:00:00", "GMT"),
    status: "Open",
    tags: ["free to enter"],
    revision: datetime("2022-12-30", "EST"),
  }
```
