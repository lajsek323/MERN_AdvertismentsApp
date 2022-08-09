import React from 'react';

export const Form = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="title">title</label>
        <input className="form-control" id="title" />
      </div>
      <div className="form-group">
        <label htmlFor="description">Email address</label>
        <input
          type="description"
          className="form-control"
          id="description"
          placeholder="name@example.com"
        />
      </div>
      <div className="form-group">
        <button className="form-control btn btn-primary" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};
export default Form;
