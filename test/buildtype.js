import BuildType from '../src/lib/buildtype';

describe('buildType tests', () => {
  let bt = null;
  before(() => {
    bt = new BuildType('http://192.168.99.100:8111', 'testusr', 'testpwd');
  });

  it('should create a buildType', async () => {
    await bt.create('test build', 'TestProject_TestSubproject', 'NetBuildTest');
  });
});
