const connector = require('../src');
const maybe = require('folktale/maybe');

describe('projects', () => {
  it('should create the basic project', async () => {
    let result = await connector.project.create({
      host: '192.168.99.100:8111',
      username: 'admin',
      password: 'password',
      name: 'parent project'
    }).run().promise();

    maybe.hasInstance(result).should.be.true;
  });

  it('should create a sub-project', async () => {
    let result = await connector.project.create({
      host: '192.168.99.100:8111',
      username: 'admin',
      password: 'password',
      name: 'child project',
      parent: 'parent project'
    }).run().promise();

    maybe.hasInstance(result).should.be.true;
  });
});

/*
import Project from '../src/lib/project';

describe('project library', () => {
  let proj = null;

  before(() => {
    proj = new Project('http://localhost:8111', 'testusr', 'testpwd');
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

  it('should get a project', async () => {
    for (let projectName of ['Parent', 'Child']) {
      const result = await proj.get({name: projectName});
      const projectInfo = result.getOrElse(false);
      projectInfo.name.should.equal(projectName);
    }
  });
});
*/
