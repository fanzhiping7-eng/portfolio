"use strict";

const { profile, projects } = window.portfolio;
const byId = id => document.getElementById(id);
const projectHash = project => "#project/" + encodeURIComponent(project.id);
const number = index => String(index + 1).padStart(2, "0");

function make(tag, className, value) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (value !== undefined) node.textContent = value;
  return node;
}

const siteTitle = profile.name + "作品集 · Purple Notes";
document.querySelector('meta[name="description"]').content = profile.bio;
document.querySelectorAll("[data-field]").forEach(node => {
  node.textContent = profile[node.dataset.field];
});
document.querySelectorAll("[data-image]").forEach(img => {
  img.src = profile[img.dataset.image];
});

profile.skills.forEach(skill => byId("skills").append(make("li", "", skill)));
profile.experience.forEach(entry => {
  const item = make("li");
  item.append(make("time", "", entry.period), make("b", "", entry.title), make("small", "", entry.note));
  byId("experience").append(item);
});
const contactLinks = byId("contact-links");
if (profile.wechat) {
  const contactCard = make("div", "wechat-card");
  const wechatId = make("strong", "wechat-id", profile.wechat);
  const copyButton = make("button", "wechat-copy", "复制微信号");
  copyButton.type = "button";
  const feedback = make("span", "wechat-feedback");
  feedback.setAttribute("role", "status");

  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(profile.wechat);
      feedback.textContent = "已复制微信号";
    } catch {
      const selection = window.getSelection();
      if (selection) {
        const range = document.createRange();
        range.selectNodeContents(wechatId);
        selection.removeAllRanges();
        selection.addRange(range);
      }
      feedback.textContent = "请手动复制微信号";
    }
  });

  contactCard.append(make("span", "wechat-label", "微信号"), wechatId, copyButton, feedback);
  contactLinks.append(contactCard);
}
profile.links.forEach(link => {
  const node = make("a", "", link.label + " ↗");
  node.href = link.href;
  contactLinks.append(node);
});

const cards = new Map();
projects.forEach((project, index) => {
  const card = make("a", "project-card");
  card.href = projectHash(project);
  const poster = make("span", "poster");
  const cover = project.cover || project.images[0]?.src;
  if (cover) {
    const image = make("img");
    image.src = cover;
    image.alt = "";
    image.loading = "lazy";
    image.decoding = "async";
    poster.append(image);
  }
  const meta = make("span", "card-meta");
  const names = make("span");
  names.append(make("strong", "", project.title), make("span", "project-en", project.english));
  const category = make("span", "card-type", project.category);
  const arrow = make("span", "card-arrow", "↗");
  arrow.setAttribute("aria-hidden", "true");
  category.append(arrow);
  meta.append(names, category);
  card.append(make("span", "number", number(index)), poster, meta);
  byId("projects").append(card);
  cards.set(project.id, card);
});

const dialog = byId("lightbox");
const stage = byId("light-stage");
const lightImage = byId("light-image");
const zoom = byId("zoom");
const previous = byId("prev");
const next = byId("next");
let activeProject;
let currentImage = 0;
let opener;

function setZoom(enabled) {
  if (enabled) {
    const width = Math.max(lightImage.getBoundingClientRect().width * 2, 1);
    stage.style.setProperty("--zoom-width", width + "px");
  }
  stage.classList.toggle("zoomed", enabled);
  zoom.textContent = enabled ? "缩小" : "放大";
  zoom.setAttribute("aria-pressed", String(enabled));
  stage.scrollTo(0, 0);
}

function showImage(index) {
  const images = activeProject.images;
  if (index < 0 || index >= images.length) return;
  currentImage = index;
  const item = images[index];
  setZoom(false);
  lightImage.src = item.src;
  lightImage.alt = item.alt || item.title;
  byId("light-caption").textContent = number(index) + " / " + number(images.length - 1) + " · " + item.title;
  previous.disabled = index === 0;
  next.disabled = index === images.length - 1;
}

function openImage(index, button) {
  opener = button;
  byId("lightbox-title").textContent = activeProject.title;
  showImage(index);
  dialog.showModal();
  byId("close").focus();
}

byId("close").addEventListener("click", () => dialog.close());
previous.addEventListener("click", () => showImage(currentImage - 1));
next.addEventListener("click", () => showImage(currentImage + 1));
zoom.addEventListener("click", () => setZoom(!stage.classList.contains("zoomed")));
dialog.addEventListener("close", () => opener?.focus({ preventScroll: true }));
dialog.addEventListener("click", event => {
  if (event.target === dialog) dialog.close();
});
dialog.addEventListener("keydown", event => {
  if (stage.classList.contains("zoomed") && event.target === stage) return;
  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
    event.preventDefault();
    showImage(currentImage + (event.key === "ArrowLeft" ? -1 : 1));
  }
});
let touchStart;
stage.addEventListener("touchstart", event => {
  touchStart = !stage.classList.contains("zoomed") && event.touches.length === 1
    ? [event.touches[0].clientX, event.touches[0].clientY]
    : null;
}, { passive: true });
stage.addEventListener("touchend", event => {
  if (!touchStart) return;
  const { clientX, clientY } = event.changedTouches[0];
  const distance = clientX - touchStart[0];
  if (Math.abs(distance) > 55 && Math.abs(clientY - touchStart[1]) < Math.abs(distance) / 2) {
    showImage(currentImage + (distance > 0 ? -1 : 1));
  }
  touchStart = null;
}, { passive: true });
stage.addEventListener("touchcancel", () => { touchStart = null; });

function renderProject(project) {
  const index = projects.indexOf(project);
  byId("project-meta").textContent = [number(index), project.english, project.category, project.year].join(" / ");
  byId("project-title").textContent = project.title;
  byId("project-description").textContent = project.description;
  byId("project-count").textContent = project.images.length + " 张作品 · 点击放大";
  const gallery = byId("gallery");
  gallery.replaceChildren();
  project.images.forEach((item, position) => {
    const figure = make("figure", "gallery-card");
    const button = make("button");
    button.type = "button";
    const image = make("img");
    image.src = item.src;
    image.alt = item.alt || item.title;
    image.loading = position === 0 ? "eager" : "lazy";
    const label = make("span", "gallery-label", number(position) + " / " + item.title);
    label.append(make("span", "", "放大查看 ↗"));
    button.append(image, label);
    button.addEventListener("click", () => openImage(position, button));
    figure.append(button);
    gallery.append(figure);
  });
  const nextLink = byId("next-project");
  nextLink.hidden = projects.length < 2;
  const upcoming = projects[(index + 1) % projects.length];
  nextLink.href = projectHash(upcoming);
  nextLink.textContent = "下一组 · " + upcoming.title + " →";
}

function route(initial = false) {
  const hash = location.hash || "#home";
  const wasProject = activeProject;
  activeProject = projects.find(project => projectHash(project) === hash);
  const missing = hash.startsWith("#project/") && !activeProject;
  if (dialog.open) dialog.close();
  byId("home-view").hidden = Boolean(activeProject || missing);
  byId("project-view").hidden = !activeProject;
  byId("missing-view").hidden = !missing;
  document.title = activeProject ? activeProject.title + " · " + siteTitle : siteTitle;
  if (activeProject || missing) {
    if (activeProject) renderProject(activeProject);
    const heading = activeProject ? byId("project-title") : byId("missing-view").querySelector("h1");
    window.scrollTo({ top: 0, behavior: "instant" });
    if (!initial) heading.focus({ preventScroll: true });
    return;
  }
  requestAnimationFrame(() => {
    if (location.hash && location.hash !== hash) return;
    const target = byId(hash.slice(1));
    if (target && (location.hash || !initial)) {
      target.scrollIntoView({ behavior: wasProject || initial ? "instant" : "auto" });
    }
    if (wasProject && hash === "#work") cards.get(wasProject.id)?.focus({ preventScroll: true });
  });
}

history.scrollRestoration = "manual";
window.addEventListener("hashchange", () => route());
route(true);
