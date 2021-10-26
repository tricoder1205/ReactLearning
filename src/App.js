import { useEffect, useState } from 'react';
import queryString from 'query-string';

import './App.css';
import ColorBox from './components/ColorBox/index';
import TodoList from './components/TodoList/index';
import TodoForm from './components/TodoForm';
import PostList from './components/PostList';
import Pagination from './components/Pagination';
import PostFilterForm from './components/PostFilterForm';
import CLock from './components/Clock';


function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: 'I love you too' },
    { id: 2, title: 'I love you too 2' },
    { id: 3, title: 'I love you too 3' },
  ]);

  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 1,
  })

  const [filters, setFilter] = useState({
    _limit: 10,
    _page: 1,
  })

  function handlePaginationChange(newPage) {
    console.log(newPage);

    setFilter({
      ...filters,
      _page: newPage,
    });
  }

  function handleTodoClick(todo) {
    console.log(todo);
    const index = todoList.findIndex(x => x.id === todo.id);
    if (index < 0) return;
    const newTodoList = [...todoList]
    newTodoList.splice(index, 1);

    setTodoList(newTodoList);
  }

  function handleTodoFormSubmit(formValues) {
    console.log("Form submit", formValues);

    const newTodo = {
      id: Math.random() * 10,
      ...formValues,
    }
    const newTodoList = [...todoList];
    newTodoList.push(newTodo);
    setTodoList(newTodoList);
  }

  const [postList, setPostlist] = useState([]);

  useEffect(() => {
    async function fetchPostList() {

      try {
        const paramsString = queryString.stringify(filters);
        const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`;
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        console.log({ responseJSON });

        const { data, pagination } = responseJSON;
        setPostlist(data);
        setPagination(pagination);
      } catch (error) {
        console.log("False to fetch post list", error.message);
      }
    }

    fetchPostList();
  }, [filters]);

  function handlePostFilterChange(newFilters) {
    console.log(newFilters);
    setFilter({
      ...filters,
      _page: 1,
      title_like: newFilters.searchTerm,
    })
  }

  return (
    <div className="App">
      <h2>CLock</h2>
      <CLock />
      <h2>Post List API</h2>
      <ColorBox />
      <TodoList todos={todoList}
        onTodoClick={handleTodoClick}
      />
      <h1>React Hook Form</h1>
      <TodoForm onSubmit={handleTodoFormSubmit} />
      <h2>Search</h2>
      <PostFilterForm onSubmit={handlePostFilterChange} />
      <PostList posts={postList} />
      <Pagination
        pagination={pagination}
        onPageChange={handlePaginationChange}
      />
    </div>
  );
}

export default App;
