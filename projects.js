// Tilføj ét objekt pr. projekt. Brug relative stier til projektfil og miniature.
const projects = [
  // Eksempel:
  // { title: "Projekttitel", author: "Forfatternavn", file: "projects/projekt-1/index.html", image: "projects/projekt-1/thumbnail.jpg" },
];

const gallery = document.querySelector("#gallery");
const detail = document.querySelector("#detail");
const params = new URLSearchParams(location.search);
const selected = projects.find((project) => project.id === params.get("projekt"));

if (selected) {
  gallery.hidden = true;
  detail.hidden = false;
  document.title = `${selected.title} — Workshopprojekter`;
  document.querySelector("#project-title").textContent = selected.title;
  document.querySelector("#project-author").textContent = selected.author;
  document.querySelector("#project-frame").src = selected.file;
} else {
  for (const project of projects) {
    const card = document.createElement("a");
    card.className = "project-card";
    card.href = `?projekt=${encodeURIComponent(project.id)}`;
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
