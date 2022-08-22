import { Tree, formatFiles, installPackagesTask } from '@nrwl/devkit';
import * as angular from '@nrwl/angular/generators';
import * as nest from '@nrwl/nest';
import * as nrwl from '@nrwl/workspace';

export type Schema = {
  name: string;
  ui?: boolean;
  api?: boolean;
  shared?: boolean;
}

export default async function (tree: Tree, schema: Schema) {
  const { name, ui, api, shared } = schema;
  const Name = name.charAt(0).toUpperCase() + name.slice(1);

  // Create Angular Library
  if (ui) {
    await angular.libraryGenerator(tree, {
      directory: name,
      name: 'ui',
      simpleModuleName: true,
      strict: true,
    });

    // Rename the Angular Module from ui.module.ts to plugin.module.ts
    const oldModuleName = `libs/${name}/ui/src/lib/ui.module.ts`;
    const newModuleName = `libs/${name}/ui/src/lib/${name}.module.ts`;
    tree.rename(oldModuleName, newModuleName);

    // Update name from UiModule to PluginModule
    const module = tree.read(newModuleName)?.toString();
    if (module) {
      tree.write(newModuleName, module.replace('UiModule', `${Name}Module`) || '');
    }
    tree.write(`libs/${name}/ui/src/index.ts`, `export * from './lib/${name}.module';\n`);

    // Create the root Angular Component
    await angular.componentGenerator(tree, {
      name,
      project: `${name}-ui`,
      flat: true,
    });

    // Delete README
    tree.delete(`libs/${name}/ui/README.md`);
  }

  // Create the Nest Library
  if (api) {
    await nest.libraryGenerator(tree, {
      directory: name,
      name: 'api',
      strict: true,
      controller: true,
      service: true,
    });

    // Rename the Nest Module from plugin-api.module.ts to plugin.module.ts
    const oldModuleName = `libs/${name}/api/src/lib/${name}-api.module.ts`;
    const newModuleName = `libs/${name}/api/src/lib/${name}.module.ts`;
    tree.rename(oldModuleName, newModuleName);

    // Update name from PluginApiModule to PluginModule
    const module = tree.read(newModuleName)?.toString();
    if (module) {
      tree.write(newModuleName, module.replace(`${Name}ApiModule`, `${Name}Module`) || '');
    }
    tree.write(`libs/${name}/api/src/index.ts`, `export * from './lib/${name}.module';\n`);

    // Create the root Nest Controller & Service
    await nest.controllerGenerator(tree, {
      name,
      project: `${name}-api`,
      directory: 'lib',
      flat: true,
    });
    await nest.serviceGenerator(tree, {
      name,
      project: `${name}-api`,
      directory: 'lib',
      flat: true,
    });

    // Delete README
    tree.delete(`libs/${name}/api/README.md`);
  }

  // Create the Shared Library
  if (shared) {
    await nrwl.libraryGenerator(tree, {
      directory: name,
      name: 'shared',
      simpleModuleName: true,
      skipBabelrc: true,
      unitTestRunner: 'none',
      strict: true,
    });

    // Rename the Shared Module from shared.ts to plugin.ts
    const oldModuleName = `libs/${name}/shared/src/lib/shared.ts`;
    const newModuleName = `libs/${name}/shared/src/lib/${name}.ts`;
    tree.rename(oldModuleName, newModuleName);

    // Update the plugin.ts file
    tree.write(newModuleName, `export type ${Name} = {
  name: string;
};\n`);
    tree.write(`libs/${name}/shared/src/index.ts`, `export * from './lib/${name}';\n`);

    // Delete README
    tree.delete(`libs/${name}/shared/README.md`);
  }

  // Create 1 README.md for entire plugin
  tree.write(`libs/${name}/README.md`, `# 😎 ${Name} Plugin
This library was generated with [Nx](https://nx.dev) using [Edwin's plugin generator](../../tools/generators/plugin/schema.json).

## About
This is a nifty plugin for Edwin!

## Libraries
${api ? `* ${name}-api\n` : ''}${shared ? `* ${name}-shared\n` : ''}${ui ? `* ${name}-ui\n` : ''}`);

  await formatFiles(tree);

  return () => {
    installPackagesTask(tree);
  };
}
