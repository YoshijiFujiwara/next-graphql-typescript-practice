import React from "react";
import { NextPage } from "next";
import { withApollo } from "../lib/apollo";
import { gql, useQuery } from "@apollo/client";
import { useTasksQuery, TaskStatus } from "../generated/graphql";
import TaskList from "../components/TaskList";
import CreateTaskForm from "../components/CreateTaskForm";
import { useRouter } from "next/router";
import TaskFilter from "../components/TaskFilter";

interface InitialProps {}

interface Props extends InitialProps {}

const IndexPage: NextPage<Props, InitialProps> = () => {
  const router = useRouter();
  const status =
    typeof router.query.status === "string"
      ? (router.query.status as TaskStatus)
      : undefined;
  const { loading, error, data, refetch } = useTasksQuery({
    variables: { status }, // 全てのタスク
    fetchPolicy: "cache-and-network"
  });
  const tasks = data?.tasks;
  if (loading && !tasks) {
    return <p>Loading...</p>;
  } else if (error) {
    return <p>An error occurered</p>;
  }
  return (
    <>
      <CreateTaskForm onTaskCreated={refetch} />
      {tasks ? (
        <TaskList status={status} tasks={tasks} />
      ) : (
        <p>There no tasks here</p>
      )}
      <TaskFilter status={status} />
    </>
  );
};

const IndexPageWithApollo = withApollo(IndexPage);

export default IndexPageWithApollo;
