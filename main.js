//
// Competition Data
//
// To contributors: if you need to add/delete/update any competitions,
// please update the following table. If possible, please keep it sorted.
//
//

// Utility for parsing date time strings.
// Examples:
//   datetime("2020-01-30", "PDT")
//   datetime("2020-01-30T11:59", "America/New_York")
function datetime(iso, zone) {
  return zone
    ? luxon.DateTime.fromISO(iso, { zone: zone })
    : luxon.DateTime.fromISO(iso);
}

var contests = [
  {
    name: "Sony Would Photography Awards > Open Competition > Street Photography",
    url: "https://www.worldphoto.org/sony-world-photography-awards",
    deadline: datetime("2023-01-06T13:00:00", "GMT"),
    status: "Open",
    tags: ["free to enter"],
    revision: datetime("2022-12-30", "EST"),
  },
  {
    name: "Siena International Photo Awards > Street Photography",
    url: "https://sipacontest.com",
    deadline: datetime("2023-01-09", "GMT"),
    status: "Open",
    tags: ["free for 1 image", "pay for more images"],
    revision: datetime("2022-12-30", "EST"),
  },
  {
    name: "Urban Photo Awards",
    url: "https://www.urbanphotoawards.com/",
    deadline: datetime("2022-06-12", "GMT"),
    status: "Concluded",
    tags: ["pay to enter"],
    revision: datetime("2022-12-30", "EST"),
  },
  {
    name: "Italian Street Photo Festival",
    url: "https://italianstreetphotofestival.com",
    deadline: datetime("2022-03-10T23:59:59", "Europe/Rome"),
    status: "Concluded",
    tags: ["pay to enter"],
    revision: datetime("2022-12-30", "EST"),
  },
  {
    name: "Los Angeles Center of Photography > Street Shooting Around the World Exhibition",
    url: "https://lacphoto.org/call-for-entries/",
    deadline: datetime("2022-03-01", "America/Los_Angeles"),
    status: "Concluded",
    tags: ["pay to enter"],
    revision: datetime("2022-12-30", "EST"),
  },
  {
    name: "Lens Culture Street Photography Awards",
    url: "https://www.lensculture.com/photo-competitions/street-photography-awards-2022",
    deadline: "N/A",
    status: "Concluded",
    tags: ["pay to enter"],
    revision: datetime("2022-12-30", "EST"),
  },
  {
    name: "Street Photography International Awards",
    url: "https://streetphotographyinternational.com/spi-street-awards",
    deadline: "N/A",
    status: "Concluded",
    tags: [],
    revision: datetime("2022-12-30", "EST"),
  },
  {
    name: "Paris International Street Photo Awards",
    url: "https://www.streetphotoawards.art/site/index",
    deadline: datetime("2022-11-30", "Europe/Paris"),
    status: "Concluded",
    tags: ["pay to enter"],
    revision: datetime("2022-12-30", "EST"),
  },
  {
    name: "London Street Photography Festival",
    url: "https://lspf.co.uk/contests/",
    deadline: datetime("2022-07-15", "Europe/London"),
    status: "Concluded",
    tags: ["free to enter"],
    revision: datetime("2022-12-30", "EST"),
  },
  {
    name: "Brussels Street Photography Festival",
    url: "https://www.bspfestival.org/",
    deadline: datetime("2022-08-01", "Europe/Brussels"),
    status: "Concluded",
    tags: ["pay to enter"],
    revision: datetime("2022-12-30", "EST"),
  },
  {
    name: "Moment Street Photo Awards",
    url: "https://momentstreetphoto.pl/",
    deadline: datetime("2022-11-07", "CET"),
    status: "Concluded",
    tags: ["pay to enter"],
    revision: datetime("2022-12-30", "EST"),
  },
  {
    name: "Miami Street Photography Festival",
    url: "https://www.miamistreetphotographyfestival.org",
    deadline: datetime("2022-10-23", "America/New_York"),
    status: "Concluded",
    tags: ["pay to enter"],
    revision: datetime("2022-12-30", "EST"),
  },
  {
    name: "Leica Street Photo Awards",
    url: "https://leicastreetphoto.pl",
    deadline: datetime("2023-01-30T19:59", "CET"),
    status: "Open",
    tags: ["free to enter"],
    revision: datetime("2022-12-30", "EST"),
  },
  {
    name: "Istanbul Street Photography Festival",
    url: "https://streetphotoistanbul.com/",
    deadline: datetime("2022-10-16", "CET"),
    status: "Concluded",
    tags: ["free to enter"],
    revision: datetime("2022-12-30", "EST"),
  },
  {
    name: "Exibart Street Photography Contest",
    url: "https://www.exibartstreet.com",
    deadline: datetime("2022-04-01", "GMT"),
    status: "Concluded",
    tags: ["pay to enter"],
    revision: datetime("2022-12-30", "EST"),
  },
  {
    name: "Fine Art Photography Awards > Street",
    url: "https://fineartphotoawards.com",
    deadline: datetime("2023-02-12", "GMT"),
    status: "Open",
    tags: ["pay to enter"],
    revision: datetime("2022-12-30", "EST"),
  },
  {
    name: "Monovisions Black & White Photography Awards > Street Photography",
    url: "https://monovisionsawards.com",
    deadline: datetime("2023-01-22", "GMT"),
    status: "Open",
    tags: ["pay to enter"],
    revision: datetime("2022-12-30", "EST"),
  },
];

const headers = [
  { name: "Name" },
  {
    name: "Submission Deadline",
    asc: true,
    sortkey: (datum) =>
      datum.deadline === "N/A"
        ? luxon.DateTime.fromISO("1900-01-01")
        : datum.deadline,
  },
  { name: "Status", asc: true, sortkey: (datum) => datum.status },
  { name: "Tags" },
  { name: "Updated" },
];

//
// Table
//

function mkcontesttag(datum) {
  const div = d3.select(document.createElement("div")).attr("class", "tags");
  div
    .selectAll("span")
    .data(datum.tags)
    .enter()
    .append("span")
    .attr("class", "tag")
    .text((d) => d);

  return div.node();
}

function mkrow(datum) {
  tr = d3.select(document.createElement("tr"));
  tr.append("td").append("a").text(datum.name).attr("href", datum.url);
  tr.append("td").text(
    datum.deadline.toLocaleString
      ? datum.deadline.toLocaleString(luxon.DateTime.DATETIME_FULL)
      : datum.deadline
  );
  tr.append("td").text(datum.status);
  tr.append("td").append(() => mkcontesttag(datum));
  tr.append("td").text(datum.revision.toLocaleString());
  return tr.node();
}

d3.select("#contests tbody")
  .selectAll("tr")
  .data(contests, (d) => d.name)
  .enter()
  .append(mkrow);

d3.select("#contests thead")
  .append("tr")
  .selectAll("th")
  .data(headers)
  .enter()
  .append("th")
  .attr("class", (d) => (d.sortkey ? "is-clickable" : "")) // the class is used by CSS on hover
  .text((d) => d.name)
  .on("click", (_, header) => {
    header.asc = !header.asc;
    d3.select("#contests tbody")
      .selectAll("tr")
      .sort((a, b) =>
        header.asc
          ? d3.ascending(header.sortkey(a), header.sortkey(b))
          : d3.descending(header.sortkey(a), header.sortkey(b))
      );
  });

//
// Tags
//

// Icon list: https://fontawesome.com/v4/cheatsheet/
const tags = [
  {
    name: "Last Updated",
    value: datetime("2022-12-30", "EST").toLocaleString(),
  },
  {
    name: "Github",
    url: "https://github.com/steinwaywhw/streetphotographycontests",
    icon: "fa fa-github-alt",
  },
  {
    name: "Discussions",
    url: "https://github.com/steinwaywhw/streetphotographycontests/discussions",
    icon: "fa fa-comments",
  },
  {
    name: "Contribute",
    url: "https://github.com/steinwaywhw/streetphotographycontests/issues",
    icon: "fa fa-pencil",
  },
  {
    name: "Buy me a Coffee",
    url: "https://buymeacoffee.com/steinwaywu",
    icon: "fa fa-coffee",
  },
];

function mktagicon(datum) {
  const span = d3
    .select(document.createElement("span"))
    .attr("class", "icon-text");
  span
    .append("span")
    .attr("class", "icon")
    .append("i")
    .attr("class", datum.icon);
  span.append("span").text(datum.name);
  return span.node();
}

function mkbtn(datum) {
  const control = d3
    .select(document.createElement("div"))
    .attr("class", "control");
  const btn = control
    .append("a")
    .attr("class", "button is-small is-outlined")
    .attr("href", datum.url);
  const icon = btn.append("span").attr("class", "icon ");
  icon.append("i").attr("class", datum.icon);
  btn.append("span").text(datum.name);
  return control.node();
}

function mktag(datum) {
  const control = d3
    .select(document.createElement("div"))
    .attr("class", "control");
  const tag = control.append("div").attr("class", "tags has-addons");

  // Set height to 2.5em to match button.is-small
  const key = tag
    .append("span")
    .attr("class", "tag is-dark")
    .style("height", "2.5em");
  if (datum.icon) {
    key.append(() => mktagicon(datum));
  } else {
    key.text(datum.name);
  }

  tag
    .append("span")
    .attr("class", "tag")
    .text(datum.value)
    .style("height", "2.5em");
  return control.node();
}

d3.select("#tags")
  .selectAll("div")
  .data(tags, (d) => d.name)
  .enter()
  .append((d) => {
    if (d.url) {
      return mkbtn(d);
    } else {
      return mktag(d);
    }
  });
