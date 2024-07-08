import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/TodoList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faSquare, faPencilAlt, faTrashAlt, faSave } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [dueDate, setDueDate] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState<string>('');
  const [editingDueDate, setEditingDueDate] = useState<string>('');

  axios.defaults.baseURL = 'http://localhost:3000';

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get<Todo[]>('/api/todos');
        setTodos(response.data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    if (newTodo.trim() === '') return;

    const newTodoItem: Todo = {
      id: Date.now(),
      title: newTodo,
      description: '',
      completed: false,
      dueDate: dueDate,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    try {
      const response = await axios.post<Todo>('/api/todos', newTodoItem);
      setTodos([...todos, response.data]);
      setNewTodo('');
      setDueDate('');
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  const handleToggleComplete = async (id: number) => {
    try {
      const todoToUpdate = todos.find(todo => todo.id === id);
      if (!todoToUpdate) return;

      const updatedTodo: Todo = { ...todoToUpdate, completed: !todoToUpdate.completed };
      const response = await axios.put<Todo>(`/api/todos/${id}`, updatedTodo);

      setTodos(todos.map(todo =>
        todo.id === id ? response.data : todo
      ));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await axios.delete(`/api/todos/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleEditTodo = (id: number, title: string, dueDate: string) => {
    setEditingTodoId(id);
    setEditingTitle(title);
    setEditingDueDate(dueDate);
  };

  const handleSaveEdit = async (id: number) => {
    try {
      const todoToUpdate = todos.find(todo => todo.id === id);
      if (!todoToUpdate) return;

      const updatedTodo: Todo = { 
        ...todoToUpdate, 
        title: editingTitle, 
        dueDate: editingDueDate,
        updatedAt: new Date().toISOString() 
      };

      const response = await axios.put<Todo>(`/api/todos/${id}`, updatedTodo);

      setTodos(todos.map(todo =>
        todo.id === id ? response.data : todo
      ));
      setEditingTodoId(null);
      setEditingTitle('');
      setEditingDueDate('');
    } catch (error) {
      console.error('Error saving edit:', error);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredIncompleteTodos = todos.filter(todo =>
    !todo.completed &&
    (todo.title?.toLowerCase().includes(search.toLowerCase()) ||
    todo.description?.toLowerCase().includes(search.toLowerCase()))
  );

  const filteredCompletedTodos = todos.filter(todo =>
    todo.completed &&
    (todo.title?.toLowerCase().includes(search.toLowerCase()) ||
    todo.description?.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="container m-5 p-2 rounded mx-auto bg-light shadow">
      <div className="row m-1 p-4">
        <div className="col">
          <div className="p-1 h1 text-primary text-center mx-auto display-inline-block">
            <FontAwesomeIcon icon={faPencilAlt} className="text-primary" />
            <span className="ml-2">To Do Application</span>
          </div>
        </div>
      </div>

      <div className="row m-1 p-3">
        <div className="col col-11 mx-auto">
          <div className="row bg-white rounded shadow-sm p-2 add-todo-wrapper align-items-center justify-content-center">
            <div className="col">
              <input 
                className="form-control form-control-lg border-0 add-todo-input bg-transparent rounded" 
                type="text" 
                placeholder="Add new .."
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
              />
            </div>
            <div className="col-auto px-0 mx-0 mr-2">
              <input 
                type="date" 
                className="form-control form-control-lg border-0 add-todo-input bg-transparent rounded"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
            <div className="col-auto px-0 mx-0 mr-2">
              <Button type="button" className="btn btn-primary" onClick={handleAddTodo}>Add</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-2 mx-4 border-black-25 border-bottom"></div>

      <div className="row m-1 p-3 px-5 justify-content-end">
        <div className="col-auto d-flex align-items-center">
          <input 
            type="text" 
            className="form-control form-control-lg border-0 add-todo-input bg-transparent rounded search-input" 
            placeholder="Search .."
            value={search}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div className="row mx-1 px-5 pb-3 w-80">
        <div className="col mx-auto">
          {filteredIncompleteTodos.map(todo => (
            <div key={todo.id} className="row px-3 align-items-center todo-item rounded">
              <div className="col-auto m-1 p-0 d-flex align-items-center">
                <h2 className="m-0 p-0">
                  <FontAwesomeIcon 
                    icon={todo.completed ? faCheckSquare : faSquare} 
                    className="text-white btn m-0 p-0"  
                    style={{ fontSize: '1.5rem' }} 
                    onClick={() => handleToggleComplete(todo.id)}
                  />
                </h2>
              </div>
              <div className="col px-1 m-1 d-flex align-items-center">
                {editingTodoId === todo.id ? (
                  <>
                    <input 
                      type="text" 
                      className="form-control form-control-lg border-0 edit-todo-input bg-transparent rounded px-3" 
                      value={editingTitle} 
                      onChange={(e) => setEditingTitle(e.target.value)}
                    />
                    <input 
                      type="date" 
                      className="form-control form-control-lg border-0 edit-todo-input bg-transparent rounded px-3 ml-2" 
                      value={editingDueDate} 
                      onChange={(e) => setEditingDueDate(e.target.value)}
                    />
                  </>
                ) : (
                  <>
                    <input 
                      type="text" 
                      className="form-control form-control-lg border-0 edit-todo-input bg-transparent rounded px-3" 
                      readOnly 
                      value={todo.title} 
                    />
                    {todo.dueDate && (
                      <small className="text-muted ml-2">
                        Due: {new Date(todo.dueDate).toLocaleDateString()}
                      </small>
                    )}
                  </>
                )}
              </div>
              <div className="col-auto m-1 p-0 px-3 d-flex align-items-center">
                {editingTodoId === todo.id ? (
                  <Button 
                    type="button" 
                    className="btn btn-primary mr-2" 
                    onClick={() => handleSaveEdit(todo.id)}
                  >
                    <FontAwesomeIcon icon={faSave} />
                  </Button>
                ) : (
                  <Button 
                    type="button" 
                    className="btn btn-primary mr-2" 
                    onClick={() => handleEditTodo(todo.id, todo.title, todo.dueDate || '')}
                  >
                    <FontAwesomeIcon icon={faPencilAlt} />
                  </Button>
                )}

                <Button 
                  type="button" 
                  className="btn btn-danger" 
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

     
      {filteredCompletedTodos.length > 0 && (
        <div className="row m-1 p-3">
          <div className="col col-11 mx-auto">
            <h5 className="text-primary text-center mx-auto display-inline-block">
              Completed Todos
            </h5>
            {filteredCompletedTodos.map(todo => (
              <div key={todo.id} className="row px-3 align-items-center todo-item rounded">
                <div className="col-auto m-1 p-0 d-flex align-items-center">
                  <h2 className="m-0 p-0">
                    <FontAwesomeIcon 
                      icon={todo.completed ? faCheckSquare : faSquare} 
                      className="text-white btn m-0 p-0"  
                      style={{ fontSize: '1.5rem' }} 
                      onClick={() => handleToggleComplete(todo.id)}
                    />
                  </h2>
                </div>
                <div className="col px-1 m-1 d-flex align-items-center">
                  <input 
                    type="text" 
                    className="form-control form-control-lg border-0 edit-todo-input bg-transparent rounded px-3" 
                    readOnly 
                    value={todo.title} 
                  />
                  {todo.dueDate && (
                    <small className="text-muted ml-2">
                      Due: {new Date(todo.dueDate).toLocaleDateString()}
                    </small>
                  )}
                </div>
                <div className="col-auto m-1 p-0 px-3 d-flex align-items-center">
                  <Button 
                    type="button" 
                    className="btn btn-primary mr-2" 
                    onClick={() => handleEditTodo(todo.id, todo.title, todo.dueDate || '')}
                  >
                    <FontAwesomeIcon icon={faPencilAlt} />
                  </Button>
                  <Button 
                    type="button" 
                    className="btn btn-danger" 
                    onClick={() => handleDeleteTodo(todo.id)}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default TodoList;
