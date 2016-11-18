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

  afterEach('should delete a project', async () => {
    await proj.delete({name: 'Parent'});
    await vcs.delete({name: 'Test Vcs Root'});
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
