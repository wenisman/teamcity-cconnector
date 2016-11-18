# teamcity-connector
A client that will connect to teamcity API to perform all functions for maintaining projects 

#Usage

##Creating the connector
Create a new TeamcityConnector
``` javascript
let connector = new TeamcityConnector('http://localhost:8111', 'user', 'password');
```

##Projects
All project work is located under the Project property of the TeamcityConnector

###Get a project
To retrieve an existing project you can search for the project by name
``` javascript
let projectDetails = connector.project.get({name: 'Project Name'});
```

###Create a Project
To create a project you just need the name of the project to create and the id of the parent project. If this is a new 
project created from scratch you do not need to provide a parent project anf the new project will be placed under the root.
``` javascript
let result = connector.project.create({name: 'My Subproject', parent: 'Parent Project Name'});
```


##BuildTypes
The buildTypes are the definitions used when creating a TeamcityBuild, you will need to create this after you create your project

###Get A BuildType
To locate a BuildType you will need to know its name and the name of the project that it belongs to 
``` javascript
let buildTypeDetail = connector.buildtype.get({name: 'BuildType Name', project: 'Project Name'});
```

###Create a new BuildType
Creating a basic BuildType can be done manually or you can use a template, to use the template just provide the
Id of the template you wish to use.  If you leave the template Id empty then no template will be used
you can substitute the project name for projectId
``` javascript
let result = connector.buildtype.create({name: 'My Buildtype', projectName: 'Project Name', template: 'TemplateId'});

let result = connector.buildtype.create({name: 'My Buildtype', projectId: 'Project_Id', template: 'TemplateId'});
```


##VcsRoot
All builds needs to get their source form somewhere, so provide an VcsRoot
###Get an existing VcsRoot
``` javascript
let vcsrootDetail = connector.VcsRoot().get({name: 'VcsRoot name'});
```

###Create a VcsRoot
Creating a VcsRoot is more involved, 
``` javascript
let result = connector.vcsroot.create({
  name: 'VcsRoot Name',
  projectName: 'Project Name',
  projectId: 'ProjectId',
  url: 'Repository Url',
  branch: 'Branch name',
  vcsType: 'Type name'    
});
```

This is a lot of options but lets go through them
* name - this is the name of the VcsRoot and is Required
* projectName - the name of the project to create the VcsRoot in
* projectId - the Id of the project of the project, you must have either this or the project name specified
* url - the url to the Repository, this is mandatory
* branch - the name of the branch to use
* vcsType - the type of VcsRoot to create [jetbrains.get|perforce|svn|tfs] 


#Testing
##Docker
To test the library you can set up a new TeamCity server using JetBrains Docker container
```
docker pull jetbrains/teamcity-server
docker run -p 8111:8111 -d jetbrains/teamcity-server
```
