'use strict'
const Project = use('App/Models/Project');
const AutherizationService = use('App/Services/AutherizationService');
 
class ProjectController {
 
  async index ({ auth }) {
    const user =await auth.getUser();
    return await user.projects().fetch();
  }

 
  async create ({ request, auth }) {
    const user =await auth.getUser();
    const {title, description} = request.all();
    const project  = new Project();
    project.fill({
      title, description
    })
    await user.projects().save(project);
    return project;
  }

  
  async store ({ request, response }) {
  }
 
  async show ({ params, request, response, view }) {
  }

 
  async edit ({ params, request, response, auth }) {
    const user = await auth.getUser();
    const {id} = params;
    const project =await Project.find(id);

    await AutherizationService.verifyPermission(project, user);
    project.merge(request.only(['title', 'description']));
    await project.save();
    return project;

  }
 
  async update ({ params, request, response }) {
  }

 
  async destroy ({ params, request, auth, response }) {
    const user = await auth.getUser();
    const {id} = params;
    const project = await Project.find(id);
    AutherizationService.verifyPermission(project, user);
    await project.delete();
    return project;
  }
}

module.exports = ProjectController
