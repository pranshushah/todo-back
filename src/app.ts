import express from 'express';
import passport from 'passport';
import cookieSession from 'cookie-session';
import { googleLogin } from './routes/auth/google';
import { twitterLogin } from './routes/auth/twitter';
import { createProjectRoute } from './routes/project/createProject';
import { editProjectRoute } from './routes/project/editProject';
import { deleteProjectRoute } from './routes/project/deleteProject';
import { createTodoRoute } from './routes/todo/createTodo';
import { editTodoTitleRoute } from './routes/todo/editTodoTitle';
import { editTodoDueDateRoute } from './routes/todo/editTodoDueDate';
import { editTodoImportantRoute } from './routes/todo/editTodoImp';
import { editTodoMydayRoute } from './routes/todo/editTodoMyday';
import { editStatusTitleRoute } from './routes/todo/editTodoStatus';
import { getAllProjectRoute } from './routes/project/getAllProject';
import { getAllTaskRoute } from './routes/todo/getAllTask';
import { getAllDueDateRoute } from './routes/todo/getAllTaskWithDueDate';
import { getAllImpRoute } from './routes/todo/getAllImpTasks';
import { getAllMyDayRoute } from './routes/todo/getAllMyDay';
import { getTodosByProjectsRoute } from './routes/todo/getTodosByProject';
import { getAllTaskInProjectRoute } from './routes/project/getAllTaskInproject';
import { addStepRoute } from './routes/todo/addStep';
import { editStepDoneRoute } from './routes/todo/editStepDone';
import { editStepTitleRoute } from './routes/todo/editStepTitle';
import { removeStepRoute } from './routes/todo/removeStep';
import { removeTodo } from './routes/todo/removeTodo';
import { deleteTodoDueDateRoute } from './routes/todo/removeDueDate';
import { errorHandler } from './middleware/errorHandler';
import { currentUser_logout } from './routes/auth/currentUser_logout';
const path = require('path');

const app = express();
app.use(express.json());
app.use(
  cookieSession({
    maxAge: 300 * 24 * 60 * 60 * 1000,
    keys: [process.env.cookieKey!],
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(googleLogin);
app.use(twitterLogin);
app.use(currentUser_logout);
app.use(createProjectRoute);
app.use(deleteProjectRoute);
app.use(editProjectRoute);
app.use(createTodoRoute);
app.use(editTodoTitleRoute);
app.use(editTodoDueDateRoute);
app.use(editTodoMydayRoute);
app.use(editTodoImportantRoute);
app.use(editStatusTitleRoute);
app.use(getAllProjectRoute);
app.use(getAllTaskRoute);
app.use(getTodosByProjectsRoute);
app.use(addStepRoute);
app.use(editStepDoneRoute);
app.use(editStepTitleRoute);
app.use(removeStepRoute);
app.use(deleteTodoDueDateRoute);
app.use(removeTodo);
app.use(getAllDueDateRoute);
app.use(getAllImpRoute);
app.use(getAllMyDayRoute);
app.use(getAllTaskInProjectRoute);
app.use(express.static(path.join(__dirname, '..', 'build')));
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});
app.use(errorHandler);
export { app };
