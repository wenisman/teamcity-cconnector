import Project from '../src/lib/project';
import R from 'Ramda';

describe('project library', () => {
  let proj = null;
  before(() => {
    proj = new Project('http://192.168.99.100:8111', 'testusr', 'testpwd');
  });

  it('should create a project', async () => {
    await R.pipeP(
      (input) => { return proj.create('test project'); },
      (input) => { return proj.create('test subproject', 'TestProject'); }
    )().then(
      (result) => { console.log(result); },
      (exception) => { console.log(exception); }
    );
  });


  it('should get a project', async () => {
    proj.get('test project');
  });

  it('should delete a project', async () => {
    proj.delete('test project');
    proj.delete('test subproject');
  });
});
