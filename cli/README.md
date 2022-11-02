oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g addictive-cli
$ adcli COMMAND
running command...
$ adcli (--version)
addictive-cli/0.0.0 darwin-x64 node-v17.3.0
$ adcli --help [COMMAND]
USAGE
  $ adcli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`adcli hello PERSON`](#adcli-hello-person)
* [`adcli hello world`](#adcli-hello-world)
* [`adcli help [COMMAND]`](#adcli-help-command)
* [`adcli plugins`](#adcli-plugins)
* [`adcli plugins:install PLUGIN...`](#adcli-pluginsinstall-plugin)
* [`adcli plugins:inspect PLUGIN...`](#adcli-pluginsinspect-plugin)
* [`adcli plugins:install PLUGIN...`](#adcli-pluginsinstall-plugin-1)
* [`adcli plugins:link PLUGIN`](#adcli-pluginslink-plugin)
* [`adcli plugins:uninstall PLUGIN...`](#adcli-pluginsuninstall-plugin)
* [`adcli plugins:uninstall PLUGIN...`](#adcli-pluginsuninstall-plugin-1)
* [`adcli plugins:uninstall PLUGIN...`](#adcli-pluginsuninstall-plugin-2)
* [`adcli plugins update`](#adcli-plugins-update)

## `adcli hello PERSON`

Say hello

```
USAGE
  $ adcli hello [PERSON] -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/ADDICTIVE/addictive-sandbox/blob/v0.0.0/dist/commands/hello/index.ts)_

## `adcli hello world`

Say hello world

```
USAGE
  $ adcli hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ adcli hello world
  hello world! (./src/commands/hello/world.ts)
```

## `adcli help [COMMAND]`

Display help for adcli.

```
USAGE
  $ adcli help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for adcli.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.15/src/commands/help.ts)_

## `adcli plugins`

List installed plugins.

```
USAGE
  $ adcli plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ adcli plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.1.2/src/commands/plugins/index.ts)_

## `adcli plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ adcli plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ adcli plugins add

EXAMPLES
  $ adcli plugins:install myplugin 

  $ adcli plugins:install https://github.com/someuser/someplugin

  $ adcli plugins:install someuser/someplugin
```

## `adcli plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ adcli plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ adcli plugins:inspect myplugin
```

## `adcli plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ adcli plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ adcli plugins add

EXAMPLES
  $ adcli plugins:install myplugin 

  $ adcli plugins:install https://github.com/someuser/someplugin

  $ adcli plugins:install someuser/someplugin
```

## `adcli plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ adcli plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ adcli plugins:link myplugin
```

## `adcli plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ adcli plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ adcli plugins unlink
  $ adcli plugins remove
```

## `adcli plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ adcli plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ adcli plugins unlink
  $ adcli plugins remove
```

## `adcli plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ adcli plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ adcli plugins unlink
  $ adcli plugins remove
```

## `adcli plugins update`

Update installed plugins.

```
USAGE
  $ adcli plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->
