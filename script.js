(function () {
  "use strict";

  const data = typeof PORTFOLIO_DATA !== "undefined" ? PORTFOLIO_DATA : null;
  const missingFields = [];

  function isEmpty(value) {
    if (value === null || value === undefined) return true;
    if (typeof value === "string") return value.trim() === "";
    if (Array.isArray(value)) return value.length === 0;
    return false;
  }

  function recordMissing(fieldPath, element) {
    missingFields.push(fieldPath);
    console.warn("[Portfolio] Missing data.js value:", fieldPath);
    if (element) {
      element.hidden = true;
    }
  }

  function setTextOrHide(element, value, fieldPath) {
    if (!element) return false;
    if (isEmpty(value)) {
      recordMissing(fieldPath, element);
      return false;
    }
    element.textContent = value;
    return true;
  }

  function createLink(label, url, fieldPath) {
    if (isEmpty(label) || isEmpty(url)) {
      recordMissing(fieldPath, null);
      return null;
    }
    const a = document.createElement("a");
    a.textContent = label;
    a.href = url;
    if (url.startsWith("https://") || url.startsWith("http://")) {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    }
    return a;
  }

  function createLabeledParagraph(label, value, fieldPath) {
    if (isEmpty(value)) {
      recordMissing(fieldPath, null);
      return null;
    }
    const p = document.createElement("p");
    const strong = document.createElement("span");
    strong.className = "field-label";
    strong.textContent = label + ": ";
    p.appendChild(strong);
    p.appendChild(document.createTextNode(value));
    return p;
  }

  if (!data) {
    console.error("[Portfolio] PORTFOLIO_DATA is not loaded.");
    return;
  }

  // Owner & Header/Footer
  const owner = data.owner || {};
  setTextOrHide(document.getElementById("owner-name"), owner.name, "owner.name");
  setTextOrHide(
    document.getElementById("owner-tagline"),
    owner.tagline,
    "owner.tagline"
  );
  const footerText =
    !isEmpty(owner.name) && !isEmpty(owner.institution)
      ? `${owner.name} — ${owner.institution}`
      : "";
  setTextOrHide(
    document.getElementById("footer-text"),
    footerText,
    "owner.name / owner.institution"
  );

  // Section 1: About Me
  setTextOrHide(
    document.getElementById("about-paragraph"),
    data.about && data.about.paragraph,
    "about.paragraph"
  );

  // Section 2: Skills
  const skillsContainer = document.getElementById("skills-container");
  if (skillsContainer) {
    if (isEmpty(data.skills)) {
      recordMissing("skills", skillsContainer);
    } else {
      data.skills.forEach((group, groupIdx) => {
        if (isEmpty(group.category) || isEmpty(group.items)) {
          recordMissing(`skills[${groupIdx}]`, null);
          return;
        }
        const wrapper = document.createElement("div");
        wrapper.className = "skill-group";

        const heading = document.createElement("h3");
        heading.textContent = group.category;
        wrapper.appendChild(heading);

        const ul = document.createElement("ul");
        ul.className = "skill-list";

        group.items.forEach((skill, itemIdx) => {
          const basePath = `skills[${groupIdx}].items[${itemIdx}]`;
          if (isEmpty(skill.name) || isEmpty(skill.note)) {
            recordMissing(basePath, null);
            return;
          }
          const li = document.createElement("li");

          const nameEl = document.createElement("strong");
          nameEl.textContent = skill.name;
          li.appendChild(nameEl);
          li.appendChild(document.createTextNode(" — " + skill.note + " "));

          if (isEmpty(skill.evidence)) {
            recordMissing(`${basePath}.evidence`, null);
          } else {
            const evSpan = document.createElement("span");
            evSpan.className = "evidence-links";
            evSpan.appendChild(document.createTextNode("Evidence: "));
            let addedCount = 0;
            skill.evidence.forEach((ev, evIdx) => {
              const link = createLink(
                ev.label,
                ev.url,
                `${basePath}.evidence[${evIdx}]`
              );
              if (link) {
                if (addedCount > 0) {
                  evSpan.appendChild(document.createTextNode(", "));
                }
                evSpan.appendChild(link);
                addedCount++;
              }
            });
            if (addedCount > 0) {
              li.appendChild(evSpan);
            }
          }

          ul.appendChild(li);
        });

        wrapper.appendChild(ul);
        skillsContainer.appendChild(wrapper);
      });
    }
  }

  // Section 3: S&AI Open-Source Contributions
  const contrib = data.contributions || {};
  const contribRepoEl = document.getElementById("contributions-repo");
  if (contribRepoEl) {
    if (isEmpty(contrib.repoName) || isEmpty(contrib.repoUrl)) {
      recordMissing("contributions.repoName / repoUrl", contribRepoEl);
    } else {
      contribRepoEl.appendChild(document.createTextNode("Repository: "));
      const repoLink = createLink(
        contrib.repoName,
        contrib.repoUrl,
        "contributions.repoUrl"
      );
      if (repoLink) contribRepoEl.appendChild(repoLink);

      if (!isEmpty(contrib.forkName) && !isEmpty(contrib.forkUrl)) {
        contribRepoEl.appendChild(document.createTextNode(" (fork: "));
        const forkLink = createLink(
          contrib.forkName,
          contrib.forkUrl,
          "contributions.forkUrl"
        );
        if (forkLink) contribRepoEl.appendChild(forkLink);
        contribRepoEl.appendChild(document.createTextNode(")"));
      } else {
        recordMissing("contributions.forkName / forkUrl", null);
      }
    }
  }

  const contribContainer = document.getElementById("contributions-container");
  if (contribContainer) {
    if (isEmpty(contrib.tasks)) {
      recordMissing("contributions.tasks", contribContainer);
    } else {
      contrib.tasks.forEach((task, idx) => {
        const basePath = `contributions.tasks[${idx}]`;
        if (isEmpty(task.taskId) || isEmpty(task.exercise)) {
          recordMissing(basePath, null);
          return;
        }
        const card = document.createElement("article");
        card.className = "card";

        const header = document.createElement("div");
        header.className = "card-header";

        const title = document.createElement("h3");
        title.className = "card-title";
        title.textContent = `${task.taskId} — ${task.exercise}`;
        header.appendChild(title);

        if (!isEmpty(task.prNumber) && !isEmpty(task.prUrl)) {
          const prLink = createLink(
            `PR #${task.prNumber}`,
            task.prUrl,
            `${basePath}.prUrl`
          );
          if (prLink) {
            prLink.className = "card-meta";
            header.appendChild(prLink);
          }
        } else {
          recordMissing(`${basePath}.prNumber / prUrl`, null);
        }

        card.appendChild(header);

        const modP = createLabeledParagraph(
          "Modifications",
          task.modifications,
          `${basePath}.modifications`
        );
        if (modP) card.appendChild(modP);

        const ratP = createLabeledParagraph(
          "Technical rationale",
          task.rationale,
          `${basePath}.rationale`
        );
        if (ratP) card.appendChild(ratP);

        contribContainer.appendChild(card);
      });
    }
  }

  // Section 4: Projects
  const projectsContainer = document.getElementById("projects-container");
  if (projectsContainer) {
    if (isEmpty(data.projects)) {
      recordMissing("projects", projectsContainer);
    } else {
      data.projects.forEach((proj, idx) => {
        const basePath = `projects[${idx}]`;
        if (isEmpty(proj.title)) {
          recordMissing(`${basePath}.title`, null);
          return;
        }

        const card = document.createElement("article");
        card.className = "card";
        if (!isEmpty(proj.id)) {
          card.id = `project-${proj.id}`;
        }

        const header = document.createElement("div");
        header.className = "card-header";

        const title = document.createElement("h3");
        title.className = "card-title";
        title.textContent = proj.title;
        header.appendChild(title);

        if (!isEmpty(proj.subtitle)) {
          const sub = document.createElement("span");
          sub.className = "card-meta";
          sub.textContent = proj.subtitle;
          header.appendChild(sub);
        }

        card.appendChild(header);

        const problemP = createLabeledParagraph(
          "Problem statement",
          proj.problem,
          `${basePath}.problem`
        );
        if (problemP) card.appendChild(problemP);

        const archP = createLabeledParagraph(
          "Solution architecture",
          proj.architecture,
          `${basePath}.architecture`
        );
        if (archP) card.appendChild(archP);

        const stackStr = Array.isArray(proj.stack) ? proj.stack.join(", ") : "";
        const stackP = createLabeledParagraph(
          "Tech stack",
          stackStr,
          `${basePath}.stack`
        );
        if (stackP) card.appendChild(stackP);

        const contribP = createLabeledParagraph(
          "My contribution",
          proj.contribution,
          `${basePath}.contribution`
        );
        if (contribP) card.appendChild(contribP);

        if (!isEmpty(proj.note)) {
          const noteP = document.createElement("p");
          noteP.className = "note-text";
          noteP.textContent = proj.note;
          card.appendChild(noteP);
        }

        const linkRow = document.createElement("div");
        linkRow.className = "link-row";

        const repoLink = createLink(
          "Repository",
          proj.repoUrl,
          `${basePath}.repoUrl`
        );
        if (repoLink) linkRow.appendChild(repoLink);

        const docsLink = createLink(
          "Documentation",
          proj.docsUrl,
          `${basePath}.docsUrl`
        );
        if (docsLink) linkRow.appendChild(docsLink);

        if (linkRow.childElementCount > 0) {
          card.appendChild(linkRow);
        }

        projectsContainer.appendChild(card);
      });
    }
  }

  // Section 5: Education and Achievements
  const eduCard = document.getElementById("education-card");
  const edu = data.education || {};
  if (eduCard) {
    if (
      isEmpty(edu.degree) &&
      isEmpty(edu.institution) &&
      isEmpty(edu.expectedGraduation)
    ) {
      recordMissing("education", eduCard);
    } else {
      const degP = createLabeledParagraph("Degree", edu.degree, "education.degree");
      if (degP) eduCard.appendChild(degP);

      const instP = createLabeledParagraph(
        "Institution",
        edu.institution,
        "education.institution"
      );
      if (instP) eduCard.appendChild(instP);

      const yearP = createLabeledParagraph(
        "Current status",
        edu.year,
        "education.year"
      );
      if (yearP) eduCard.appendChild(yearP);

      const gradP = createLabeledParagraph(
        "Expected graduation",
        edu.expectedGraduation,
        "education.expectedGraduation"
      );
      if (gradP) eduCard.appendChild(gradP);
    }
  }

  const achContainer = document.getElementById("achievements-container");
  if (achContainer) {
    if (isEmpty(data.achievements)) {
      recordMissing("achievements", achContainer);
    } else {
      data.achievements.forEach((ach, idx) => {
        const basePath = `achievements[${idx}]`;
        if (isEmpty(ach.title)) {
          recordMissing(`${basePath}.title`, null);
          return;
        }
        const card = document.createElement("article");
        card.className = "card";

        const header = document.createElement("div");
        header.className = "card-header";

        const title = document.createElement("h4");
        title.className = "card-title";
        title.textContent = ach.title;
        header.appendChild(title);

        if (!isEmpty(ach.date)) {
          const dateSpan = document.createElement("span");
          dateSpan.className = "card-meta";
          dateSpan.textContent = ach.date;
          header.appendChild(dateSpan);
        } else {
          recordMissing(`${basePath}.date`, null);
        }

        card.appendChild(header);

        if (!isEmpty(ach.description)) {
          const descP = document.createElement("p");
          descP.textContent = ach.description;
          card.appendChild(descP);
        } else {
          recordMissing(`${basePath}.description`, null);
        }

        const linkRow = document.createElement("div");
        linkRow.className = "link-row";

        if (!isEmpty(ach.links)) {
          ach.links.forEach((lnk, lnkIdx) => {
            const a = createLink(
              lnk.label,
              lnk.url,
              `${basePath}.links[${lnkIdx}]`
            );
            if (a) linkRow.appendChild(a);
          });
        } else {
          recordMissing(`${basePath}.links`, null);
        }

        if (!isEmpty(ach.relatedProjectId)) {
          const projAnchor = document.createElement("a");
          projAnchor.textContent = "View CloudCode in Projects";
          projAnchor.href = `#project-${ach.relatedProjectId}`;
          linkRow.appendChild(projAnchor);
        }

        if (linkRow.childElementCount > 0) {
          card.appendChild(linkRow);
        }

        achContainer.appendChild(card);
      });
    }
  }

  // Section 6: Contact
  const contactList = document.getElementById("contact-list");
  if (contactList) {
    if (isEmpty(data.contact)) {
      recordMissing("contact", contactList);
    } else {
      data.contact.forEach((item, idx) => {
        const basePath = `contact[${idx}]`;
        if (isEmpty(item.label) || isEmpty(item.value) || isEmpty(item.url)) {
          recordMissing(basePath, null);
          return;
        }
        const li = document.createElement("li");
        const label = document.createElement("strong");
        label.textContent = item.label + ": ";
        li.appendChild(label);

        const link = createLink(item.value, item.url, `${basePath}.url`);
        if (link) li.appendChild(link);

        if (!isEmpty(item.note)) {
          li.appendChild(document.createTextNode(" — " + item.note));
        }

        contactList.appendChild(li);
      });
    }
  }

  if (missingFields.length > 0) {
    console.warn("[Portfolio] Summary of missing fields:", missingFields);
  }
})();
