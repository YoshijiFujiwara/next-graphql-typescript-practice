import React from "react";
import { NextPage } from "next";
import { withApollo } from "../lib/apollo";
import { gql, useQuery } from "@apollo/client";
import { useTasksQuery, TaskStatus } from "../generated/graphql";
import TaskList from "../components/TaskList";
import CreateTaskForm from "../components/CreateTaskForm";

interface InitialProps {}

interface Props extends InitialProps {}

const IndexPage: NextPage<Props, InitialProps> = () => {
  const { loading, error, data } = useTasksQuery({
    variables: { status: TaskStatus.Active }
  });
  if (loading) {
    return <p>Loading...</p>;
  } else if (error) {
    return <p>An error occurered</p>;
  }
  const tasks = data?.tasks;
  return (
    <>
      <CreateTaskForm />
      {tasks ? <TaskList tasks={tasks} /> : <p>There no tasks here</p>}
    </>
  );
};

const IndexPageWithApollo = withApollo(IndexPage);

export default IndexPageWithApollo;
