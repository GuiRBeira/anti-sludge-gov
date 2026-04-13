const path = require('path');
const fs = require('fs');

// Obtém o nome da aplicação baseada na pasta atual
const appName = path.basename(process.cwd());

// Lista todas as aplicações para isolar os scopes
const appsDir = path.join(__dirname, 'apps');
const allApps = fs.existsSync(appsDir) 
  ? fs.readdirSync(appsDir).filter(f => fs.statSync(path.join(appsDir, f)).isDirectory())
  : [];

const otherApps = allApps.filter(app => app !== appName);

module.exports = {
  extends: 'semantic-release-monorepo',
  branches: ['main'],
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'conventionalcommits',
        releaseRules: [
          // Ignora explicitamente commits com scope de outras aplicações
          ...otherApps.map(app => ({ scope: app, release: false })),
          { type: 'refactor', release: 'patch' },
          { type: 'perf', release: 'patch' },
          { type: 'docs', scope: 'README', release: false },
          { type: 'docs', release: 'patch' },
        ],
      },
    ],
    [
      '@semantic-release/release-notes-generator',
      {
        preset: 'conventionalcommits',
      },
    ],
    '@semantic-release/changelog',
    [
      '@semantic-release/npm',
      {
        npmPublish: false,
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: ['package.json', 'CHANGELOG.md'],
        message: `chore(release): ${appName} \${nextRelease.version} [skip ci]\n\n\${nextRelease.notes}`,
      },
    ],
    '@semantic-release/github',
  ],
};
