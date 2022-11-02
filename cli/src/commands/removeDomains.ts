import {Command} from '@oclif/core'
const Hosts = require('hosts-so-easy').default
import {configuration} from '../configuration'

export default class RemoveDomains extends Command {
  static description = 'remove up dev domains in /etc/hosts (requires ROOT privs)'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  public async run(): Promise<void> {
    const hosts = new Hosts({
      header: 'Addictive Dev Docker hosts',
    })
    const domains = configuration.LOCAL_DEV_DOMAINS.split(',')
    if (domains.length === 0) {
      this.error('No domains found, add them to local .env file, like this: `LOCAL_DEV_DOMAINS=www.example.com,mail.example.com`')
      return
    }

    for (const domain of domains) {
      this.log(`Removing ${domain}`)
      hosts.removeHost(domain)
    }

    await hosts.updateFinish()
  }
}
