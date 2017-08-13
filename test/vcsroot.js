const connector = require('../src');
const { of } = require('folktale/concurrency/task');

describe('vcs root', () => {
  before(async () => {
    await connector.project.create({
      host: '192.168.99.100:8111',
      username: 'admin',
      password: 'password',
      name: 'parent project'
    }).orElse(err => {
      console.log('error', err);
      return of(err);
    }).run().promise();
  });

  it('should create a vcs root', async () => {
    connector.vcsroot.create({
      host: '192.168.99.100:8111',
      username: 'admin',
      password: 'password',
      name: 'test vcs root',
      projectName: 'parent project',
      url: 'https://github.com/wenisman/teamcity-connector.git',
      branch: 'master',
      vcsType: 'jetbrains.git'
    }).run().promise();
  });
});
/*
import VcsRoot from '../src/lib/vcsroot';
import Project from '../src/lib/project';

describe('VcsRoot tests', () => {
  let vcs, proj;

  before(async () => {
    proj = new Project('http://localhost:8111', 'testusr', 'testpwd');
    vcs = new VcsRoot('http://localhost:8111', 'testusr', 'testpwd');
  });

  beforeEach(async () => {
    const existing = await proj.get({name: 'Parent'});
    if (existing.isNothing) {
      await proj.create({name: 'Parent'});
      await proj.create({name: 'Child', parent: 'Parent'});
    }
  });

  after('should delete a project', async () => {
    await proj.delete({name: 'Parent'});
    await vcs.delete({name: 'Test Vcs Root'});
  });

  it('should create a vcsroot', async () => {
    const vcsRoot = await vcs.get({ name: 'Test Vcs Root' });

    if (vcsRoot.isNothing) {
      const output = await vcs.create({
        name: 'Test Vcs Root',
        projectName: 'Child',
        url: 'https://github.com/wenisman/teamcity-connector.git',
        branch: 'master',
        vcsType: 'jetbrains.git'
      });
      output.isNothing.should.be.false;
    }
  });

  it('should set the properties', async () => {
    await vcs.addProperties({
      vcsRootName: 'Test Vcs Root',
      properties: [
        { name: 'teamcitySshKey', value: 'test_account_key' },
        { name: 'authMethod', value: 'TEAMCITY_SSH_KEY' }
      ]
    });
  });
});
*/
