import Project from '../src/lib/project';

describe('project library', () => {
  let proj = null;

  before(() => {
    proj = new Project('http://192.168.99.100:8111', 'testusr', 'testpwd');
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
  });

  it('should get a project', async () => {
    for (let projectName of ['Parent', 'Child']) {
      const result = await proj.get(projectName);
      const projectInfo = result.getOrElse(false);
      projectInfo.name.should.equal(projectName);
    }
  });
});
