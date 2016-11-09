import VcsRoot from '../src/lib/vcsroot';
import Project from '../src/lib/project';
import chai from 'chai';

describe('VcsRoot tests', () => {
  let vcs, proj;
  let assert = chai.assert;

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
    // await proj.delete('Parent');
  });

  it('should create and remove a vcsroot', async () => {
    await vcs.create({
      name: 'Test Vcs Root',
      projectName: 'Child',
      url: 'https://github.com/wenisman/teamcity-connector.git',
      branch: 'master',
      vcsType: 'jetbrains.git'
    })
    .then((result) => {
      // result.getOrElse(true).should.be(true);
    })
    .catch((e) => {
      console.log(e);
      assert.fail(null, null, 'unable to create a vcsroot');
    });

    // await vcs.delete('Test Vcs Root');
  });
});
