import {Command} from '@oclif/core'
const { exec } = require("child_process");
const path = require('path')

export default class ExportConfig extends Command {
  static description = 'Export current Keycloak configuration to /keycloak/conf/settings.json'

  static examples = [
    `<%= config.bin %> <%= command.id %>
keycloak exportConfig
`,
  ]

  static flags = {}

  static args = []

  async run(): Promise<void> {
    // docker-compose exec viblio-auth /opt/keycloak/bin/kc.sh export --file /opt/keycloak/conf/$json
    // compose.exec('addictive-keycloak', '/opt/keycloak/bin/kc.sh export --file /opt/keycloak/conf/settings.json', {cwd: '/Users/sergiomarchesini/Coding/ADDICTIVE/docker-compose.yml' })
    // .then(
    //   () => {
    //     console.log('done')
    //   },
    //   error => {
    //     console.log('something went wrong:', error.message)
    //   },
    // )
    exec("docker-compose exec -t addictive-keycloak /opt/keycloak/bin/kc.sh export --file /opt/keycloak/conf/settings.json", (error: any, stdout: any, stderr: any) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    })

  }
}
