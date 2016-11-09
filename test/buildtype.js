import BuildType from '../src/lib/buildtype';
import Project from '../src/lib/project';
import chai from 'chai';
import maybe from 'data.maybe';

describe('buildType tests', () => {
  let bt, proj;
  let assert = chai.assert;
  let expect = chai.expect;

  before(async () => {
    proj = new Project('http://192.168.99.100:8111', 'testusr', 'testpwd');
    bt = new BuildType('http://192.168.99.100:8111', 'testusr', 'testpwd');
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

  it('should create a buildType', async () => {
    const build = await bt.get('test build', 'Child');
    if (build.isNothing) {
      const output = await bt.create('test build', 'Parent_Child', 'NetBuildTest');
      console.log(output);
    }
  });
});
