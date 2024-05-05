import React from 'react';
import HomePage from './pages/HomePage';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import JobsPage from './pages/JobsPage';
import NotFoundPage from './pages/NotFoundPage';
import JobPage, { jobLoader } from './pages/JobPage';
import AddJobPage from './pages/AddJobPage';
import EditJobPage from './pages/EditJobPage';




const App = () => {

  // Add new job
  const addJob = async (newJob) => {
    const res = await fetch('/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newJob)
    });
    return;
  }

  // Delete Job
  const deleteJob = async (id) => {
    const res = await fetch(`/api/jobs/${id}`, {
      method: 'DELETE',
    });
    return;
  }

  //update job
  const updateJob = async (job) => {
    const res = await fetch(`/api/jobs/${job.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(job)
    });
    return;
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout></MainLayout>}>
        <Route index element={<HomePage></HomePage>}></Route>
        <Route path='/jobs' element={<JobsPage></JobsPage>}></Route>
        <Route path='/add-job' element={<AddJobPage addJobSubmit={addJob}></AddJobPage>}></Route>
        <Route path='/jobs/:id' element={<JobPage deleteJob={deleteJob}></JobPage>} loader={jobLoader}></Route>
        <Route path='/edit-job/:id' element={<EditJobPage updateJobSubmit={updateJob}></EditJobPage>} loader={jobLoader}></Route>
        <Route path='*' element={<NotFoundPage></NotFoundPage>}></Route>
      </Route>
    )
  );

  return <RouterProvider router={router}></RouterProvider>
}

export default App