import React from "react";
import "./styles.css";

class TaskItem extends React.Component {
  handleIconClick = () => {
    this.props.taskAction(this.props.id);
  };

  render() {
    let taskItem = this.props.isShowingTodoTask ? (
      <label>
        {this.props.task}{" "}
        <span role="img" aria-label="Mark Done" onClick={this.handleIconClick}>
          &#9989;
        </span>
      </label>
    ) : (
      <label>
        {this.props.task}{" "}
        <span
          role="img"
          aria-label="Mark UnDone"
          onClick={this.handleIconClick}
        >
          &#10060;
        </span>
      </label>
    );
    return <li>{taskItem}</li>;
  }
}

class TaskList extends React.Component {
  render() {
    let tasksList = this.props.tasks.map((task, index) => (
      <TaskItem
        key={index}
        id={index}
        task={task}
        isShowingTodoTask={this.props.isShowingTodoTask}
        taskAction={this.props.taskAction}
      />
    ));
    return tasksList.length > 0 ? tasksList : <p>No tasks</p>;
  }
}

const taskTypes = [
  { text: "Whatever", level: "low" },
  { text: "Normal", level: "mid" },
  { text: "Urgent", level: "high" }
];

class TODOList extends React.Component {
  constructor(props) {
    super(props);
    this.doneTasks = [];
    this.todoTasks = ["task1", "task2"];
    this.state = {
      text: "",
      taskType: "",
      isShowingTodoTask: true,
      tasks: this.todoTasks
    };
  }

  handleChangeText = e => {
    this.setState({
      ...this.state,
      text: e.target.value
    });
  };

  handleChangeType = e => {
    this.setState({
      ...this.state,
      taskType: e.target.value
    });
    console.log(e.target.value);
  };

  handleSwitchTasksList = e => {
    let tasks = !this.state.isShowingTodoTask ? this.todoTasks : this.doneTasks;
    this.setState({
      ...this.state,
      isShowingTodoTask: !this.state.isShowingTodoTask,
      tasks
    });
  };

  handleTaskItemAction = index => {
    const currentDisplayTasks = [...this.state.tasks];
    const task = currentDisplayTasks[index];
    currentDisplayTasks.splice(index, 1);
    if (!this.state.isShowingTodoTask) {
      this.todoTasks.push(task);
      this.doneTasks = currentDisplayTasks;
    } else {
      this.doneTasks.push(task);
      this.todoTasks = currentDisplayTasks;
    }
    this.setState({
      ...this.state,
      tasks: currentDisplayTasks
    });
  };

  handleKeyDown = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.submitTask(e);
    }
  };

  submitTask = e => {
    e.preventDefault();
    this.todoTasks.push(this.state.text);
    let tasks = this.todoTasks;
    if (this.state.isShowingTodoTask) {
      this.setState({
        ...this.state,
        tasks
      });
    }
  };

  renderTaskTypeSelector = () => {
    let taskTypeOptions = taskTypes.map(taskType => (
      <option value={taskType.level}>{taskType.text}</option>
    ));
    return (
      <select value={this.state.taskType} onChange={this.handleChangeType}>
        {taskTypeOptions}
      </select>
    );
  };

  render() {
    const taskTypeSelector = this.renderTaskTypeSelector();
    return (
      <div className="todo-list">
        <table>
          <th>
            <label>MY TASKS</label>
          </th>
          <tr>
            <input
              type="text"
              onChange={this.handleChangeText}
              onKeyDown={this.handleKeyDown}
            />
            {taskTypeSelector}
            <button value="Add task" onClick={this.submitTask}>
              <span
                role="img"
                aria-label="Add Task"
                onClick={this.handleIconClick}
              >
                &#10133;
              </span>
            </button>
          </tr>
          <tr>
            <button onClick={this.handleSwitchTasksList}>
              {this.state.isShowingTodoTask ? "Show Done" : "Show ToDo"}
            </button>
          </tr>
          <tr>
            <label>
              {this.state.isShowingTodoTask ? "To Do Tasks:" : "Done Tasks:"}
            </label>
          </tr>
          <tr>
            <TaskList
              tasks={this.state.tasks}
              isShowingTodoTask={this.state.isShowingTodoTask}
              taskAction={this.handleTaskItemAction}
            />
          </tr>
        </table>
      </div>
    );
  }
}

export default TODOList;
