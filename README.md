# Workshopgalleri

Et lille statisk galleri til GitHub Pages. Forsiden bruger et responsivt grid; hvert projekt åbnes på sin egen visningsside med en tilbageknap.

## Tilføj et projekt

1. Opret en mappe under `projects/`, fx `projects/min-app/`.
2. Læg projektets startfil dér som `index.html`. Medtag også projektets billeder, stylesheets og scripts, så relative filstier fortsat virker.
3. Læg et godkendt skærmbillede som `thumbnail.jpg` i samme mappe.
4. Tilføj et objekt i listen øverst i `projects.js`:

```js
{
  id: "min-app",
  title: "Projekttitel",
  author: "Forfatternavn",
  file: "projects/min-app/index.html",
  image: "projects/min-app/thumbnail.jpg"
}
```

Brug unikke `id`-værdier uden mellemrum. Projektet vises i den rækkefølge, det står i listen.

## Udgiv på GitHub Pages

Opret et offentligt GitHub repository, læg indholdet af `galleri/` i repositoryets rod, og vælg **Settings → Pages → Deploy from a branch → main → / (root)**. GitHub viser derefter sidens adresse på samme Pages-side.

## Før offentliggørelse

Kontrollér, at der er tilladelse til at offentliggøre hver projektfil, eventuelle billeder og forfatternavn. En offentlig GitHub Pages-side og dens filer kan ses og kopieres af alle. Projekter vises isoleret i en sandboxed iframe; browserfunktioner, der kræver yderligere rettigheder, kan være begrænsede.
