import * as React from 'react'
import * as ReactDOM from 'react-dom'

const Welcome = () => {
  return (
    <div className="container">
      <h1>Hello  wwWorld!</h1>
    </div>
  );
};

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Welcome />,
    document.getElementById('root')
  );
});

export default Welcome