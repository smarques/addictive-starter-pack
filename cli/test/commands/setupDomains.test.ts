import {expect, test} from '@oclif/test'

describe('setupDomains', () => {
  test
  .stdout()
  .command(['setupDomains'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['setupDomains', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
