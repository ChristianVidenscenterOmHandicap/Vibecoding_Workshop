// Tilføj ét objekt pr. projekt. Brug relative stier til projektfil og miniature.
const projects = [
  {
    id: "matematik-med-guden-alf",
    title: "Mette Frederiksen laver matematik med Guden Alf",
    author: "Alf",
    description: "projects/matematik-med-guden-alf/description.txt",
    file: "projects/matematik-med-guden-alf/index.html",
    image: "projects/matematik-med-guden-alf/thumbnail.png",
  },
  {
    id: "forhindringsassistent",
    title: "Forhindringsassistent",
    author: "Christian Bundgaard",
    description: "projects/forhindringsassistent/description.txt",
    file: "projects/forhindringsassistent/index.html",
    image: "projects/forhindringsassistent/thumbnail.png",
  },
  {
    id: "tilgaengelig-handel",
    title: "Tilgængelig Handel",
    author: "Erik Vind Frost",
    description: "projects/tilgaengelig-handel/description.txt",
    file: "projects/tilgaengelig-handel/index.html",
    image: "projects/tilgaengelig-handel/thumbnail.png",
  },
  {
    id: "tolkeklar",
    title: "Tolkeklar",
    author: "Nicklas Kleczewski",
    description: "projects/tolkeklar/description.txt",
    file: "projects/tolkeklar/index.html",
    image: "projects/tolkeklar/thumbnail.png",
  },
  {
    id: "bpa-overblik",
    title: "BPA Overblik",
    author: "Jonas Dreiøe",
    description: "projects/bpa-overblik/description.txt",
    type: "teaser",
    image: "projects/bpa-overblik/thumbnail.png",
    github: "https://github.com/Jdreioe/BPA_Overblik",
    release: "https://github.com/Jdreioe/BPA_Overblik/releases/latest",
    screenshots: [
      {
        file: "projects/bpa-overblik/vagtplan.png",
        title: "Vagtplan",
        alt: "Ugevisning med planlagte vagter. Hjælpernavne er skjult.",
      },
      {
        file: "projects/bpa-overblik/kompensation.png",
        title: "Kompensationsydelse",
        alt: "Appens fane til registrering af udgifter og kørsel.",
      },
    ],
  },
];

const gallery = document.querySelector("#gallery");
const detail = document.querySelector("#detail");
const params = new URLSearchParams(location.search);
const selected = projects.find((project) => project.id === params.get("projekt"));
const projectFrame = document.querySelector("#project-frame");
const teaser = document.createElement("section");
teaser.className = "teaser";
teaser.hidden = true;
detail.append(teaser);

if (selected) {
  gallery.hidden = true;
  detail.hidden = false;
  document.title = `${selected.title} — Workshopprojekter`;
  document.querySelector("#project-title").textContent = selected.title;
  projectFrame.title = `${selected.title} – interaktiv projektvisning`;
  document.querySelector("#project-author").textContent = selected.author;
  const description = document.querySelector("#project-description");
  if (selected.description) {
    fetch(selected.description)
      .then((response) => {
        if (!response.ok) throw new Error("Beskrivelsen kunne ikke indlæses.");
        return response.text();
      })
      .then((text) => {
        description.textContent = text.trim();
        description.hidden = !description.textContent;
      })
      .catch(() => {});
  }
  if (selected.type === "teaser") {
    projectFrame.hidden = true;
    teaser.hidden = false;

    const links = document.createElement("nav");
    links.className = "teaser-links";
    links.setAttribute("aria-label", "Links til BPA Overblik");
    for (const [label, href, style] of [
      ["Se projektet på GitHub", selected.github, "primary"],
      ["Hent seneste udgave", selected.release, "secondary"],
    ]) {
      const link = document.createElement("a");
      link.className = `teaser-link ${style}`;
      link.href = href;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = label;
      link.setAttribute("aria-label", `${label} (åbner i ny fane)`);
      links.append(link);
    }
    teaser.append(links);

    const screenshots = document.createElement("div");
    screenshots.className = "teaser-screenshots";
    for (const screenshot of selected.screenshots) {
      const figure = document.createElement("figure");
      figure.className = "teaser-screenshot";
      const image = document.createElement("img");
      image.src = screenshot.file;
      image.alt = screenshot.alt;
      image.loading = "lazy";
      const caption = document.createElement("figcaption");
      caption.textContent = screenshot.title;
      figure.append(image, caption);
      screenshots.append(figure);
    }
    teaser.append(screenshots);
  } else {
    projectFrame.hidden = false;
    projectFrame.src = selected.file;
  }
} else {
  if (projects.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "Projekterne vises her, når de er lagt ind.";
    gallery.append(empty);
  }
  for (const project of projects) {
    const card = document.createElement("a");
    card.className = "project-card";
    card.href = `?projekt=${encodeURIComponent(project.id)}`;
    card.setAttribute("aria-label", `Åbn ${project.title}, projekt af ${project.author}`);
    let image = document.createElement("div");
    image.className = "project-image";
    if (project.image) {
      const img = document.createElement("img");
      img.className = "project-image";
      img.src = project.image;
      img.alt = "";
      image = img;
    } else {
      image.classList.add("project-placeholder");
      image.textContent = project.title;
    }
    const title = document.createElement("h2");
    title.textContent = project.title;
    const author = document.createElement("p");
    author.textContent = project.author;
    card.append(image, title, author);
    gallery.append(card);
  }
}







