export const RootMonorepoPkgJson = `
{
  "name": "{{proj_name}}",
  "version": "1.0.0",
  "description": "{{pkg_description}}",
  "private": true,
  "workspaces": [
    "packages/*"
  ],
  "scripts": {
    "start": "yarn workspaces run start",
    "dev": "yarn workspaces run dev",
    "build": "yarn workspaces run build",
    "watch": "yarn workspaces run watch"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
`;

export const ClientPkgDepen = `
{
  "name": "{{client_monorepo_name}}",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    {{client_scripts}}
  },
  "dependencies": {
    {{client_dependencies}}
  },
  "devDependencies": {
    {{client_devDependencies}}
  }
}
`;
