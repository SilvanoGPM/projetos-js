const {
  readFileSync,
  existsSync,
  statSync,
  readdirSync,
  writeFileSync
} = require('fs');

const { join } = require('path');

const INSERT_NAVBAR_REGEX = /(\<\!\-\- INSERT NAVBAR HERE \-\-\>)/;

function formatProjectName(project) {
  const [first, ...rest] = Array.from(project);

  return first.toUpperCase() + rest.map((l) => (
    l === '-'
      ? ' '
      : l
  )).join('');
}

function getAllProjects(projectsPath) {
  const stats = statSync(projectsPath);

  const isDirectoryAndExists = !stats.isDirectory() && existsSync(projectsPath);
  if (isDirectoryAndExists) {
    throw new ReferenceError(`Caminho "${projectsPath}" não existe ou não é um diretório!`);
  }

  const projects = readdirSync(projectsPath)
    .filter((project) =>
      statSync(project).isDirectory() && !project.startsWith('.')
    );

  return projects;
}

function verifyIfPathExistsAndIsHTML(path) {
  const fileExistsAndIsHTML = existsSync(path) && path.endsWith('.html');

  if (!fileExistsAndIsHTML) {
    throw ReferenceError('Arquivo não existe, ou não é um .html!');
  }
}

function getHTMLContent(pathToHtml) {
  verifyIfPathExistsAndIsHTML(pathToHtml);

  const html = readFileSync(pathToHtml, {
    encoding: 'utf-8',
  });

  return html;
}

function generateHTMLNavbar(pathToHtml, projectsPath) {
  const html = getHTMLContent(pathToHtml);

  const navbarComment = INSERT_NAVBAR_REGEX.exec(html);

  if (!navbarComment) {
    console.log('Comentário de inserção não encontrado!');
    return;
  }

  const [value] = navbarComment;
  const { index } = navbarComment;

  const projects = getAllProjects(projectsPath)
    .map((project) => (
      `
      <li class="navbar__item">
        <button data-button="${project}" class="navbar__link">
          ${formatProjectName(project)}
        </button>
      </li>`));

  const navbar = `<nav class="navbar">
    <h2 class="navbar__title">Projetos</h2>

    <ul class="navbar__links">
      ${projects.join('\n')}
    </ul>

  </nav>`;

  const htmlHeader = html.slice(0, index);
  const htmlFooter = html.slice(index).replace(value, '');

  const newHtml = `${htmlHeader}${navbar}${htmlFooter}`;

  writeFileSync(pathToHtml, newHtml);
}

const htmlPath = join(__dirname, 'index.html');
const projectsPath = __dirname;

generateHTMLNavbar(htmlPath, projectsPath);
