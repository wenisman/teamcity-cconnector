import BuildType from '../src/lib/buildtype';
import Project from '../src/lib/project';

describe('buildType tests', () => {
  let bt, proj;

  before(async () => {
    proj = new Project('http://localhost:8111', 'testusr', 'testpwd');
    bt = new BuildType('http://localhost:8111', 'testusr', 'testpwd');
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
  });

  it('should create a buildType', async () => {
    const build = await bt.get({name: 'test build', project: 'Child'});
    if (build.isNothing) {
      const output = await bt.create({name: 'test build', projectId: 'Parent_Child', template: 'Default_DotNet_BuildTest'});
      console.log(output);
    }
  });

  it('should create the parameters', async () => {
    let build = await bt.get({name: 'test build', project: 'Child'});
    if (build.isNothing) {
      build = await bt.create({name: 'test build', projectId: 'Parent_Child', template: 'Default_DotNet_BuildTest'});
    }

    await bt.addParameters({
      buildTypeId: build.get().id,
      parameters: [
        { name: 'ExcludedCategories', value: 'newValue' }
      ]
    });
  });
});
