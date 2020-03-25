'use strict'

const Project = use('App/Models/Project');
const Task = use('App/Models/Task');
const User = use('App/Models/User');
const AutherizationService = use('App/Services/AutherizationService');

class TaskController {
 
  async index ({ request, auth, params }) {
    const user =await auth.getUser();
    const {id} = params;
    const project =await Project.find(id);
    AutherizationService.verifyPermission(project, user);
    return await project.tasks().fetch();

  }
 
  async create ({ request, auth, params }) {
    const user = await auth.getUser();
    const {description} = request.all();
    const {id} = params;
    const project = await Project.find(id);
    AutherizationService.verifyPermission(project, user);
    const task = new Task();
    task.fill({
      description,
    })
    await project.tasks().save(task);
    return task;

  }

 
  async store ({ request, response }) {
  }

  /**
   * Display a single task.
   * GET tasks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing task.
   * GET tasks/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update task details.
   * PUT or PATCH tasks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, auth }) {
    const user = await auth.getUser();
    const {id} = params;
    const task = await Task.find(id);
    const project = task.project().fetch();
    AutherizationService.verifyPermission(project, user);
    task.merge(request.only(['description']));
    return task;


  }

 
  async destroy ({ params, auth }) {
    const user = await auth.getUser();
    const {id} = params;
    const task = await Task.find(id);
    const project = task.project().fetch();
    AutherizationService.verifyPermission(project, user);
    await task.delete();
    return task;



  }
}

module.exports = TaskController
