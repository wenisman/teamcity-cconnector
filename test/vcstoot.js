import VcsRoot from '../src/lib/vcsroot';
import Project from '../src/lib/project';

describe('VcsRoot tests', () => {
  let vcs, proj;

  before(async () => {
    proj = new Project('http://192.168.99.100:8111', 'testusr', 'testpwd');
    vcs = new VcsRoot('http://192.168.99.100:8111', 'testusr', 'testpwd');
  });

  beforeEach(async () => {
    const existing = await proj.get('Parent');
    if (existing.isNothing) {
      await proj.create('Parent');
      await proj.create('Child', 'Parent');
    }
  });

  afterEach('should delete a project', async () => {
    await proj.delete('Parent');
    await vcs.delete('Test Vcs Root');
  });

  it('should create a vcsroot', async () => {
    const output = await vcs.create({
      name: 'Test Vcs Root',
      projectName: 'Child',
      url: 'https://github.com/wenisman/teamcity-connector.git',
      branch: 'master',
      vcsType: 'jetbrains.git'
    });

    output.isNothing.should.be.false;
  });
});
