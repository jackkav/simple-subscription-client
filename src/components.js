import React from "react";

export const SimpleList = ({ list, fields }) => (
  <div className="pa3 pa5-ns">
    <ul className="list pl0 measure ">
      {list.map(x => (
        <li
          key={x.id}
          className="lh-copy pv3 ba bl-0 bt-0 br-0 b--dotted b--black-30"
        >
          {fields.map(y => x[y]).join`, `}
        </li>
      ))}
    </ul>
  </div>
);

export const SimpleInput = ({ submit, fields }) => {
  let input = [];
  return (
    <div className="pa4-l">
      <form
        className="pa4 black-80"
        onSubmit={e => {
          e.preventDefault();
          let data = {};
          fields.forEach(x => (data[x] = input[x].value));
          submit({ variables: { data } });
          fields.forEach(x => (input[x].value = ""));
        }}
      >
        <fieldset className="ba b--transparent ph0 mh0">
          {fields.map(x => (
            <div key={x} className="mt3">
              <label className="db fw4 lh-copy f6" htmlFor={x}>
                {x}
              </label>
              <input
                className="pa2 input-reset ba bg-transparent w-100 measure"
                type="text"
                name={x}
                id={x}
                ref={node => {
                  input[x] = node;
                }}
              />
            </div>
          ))}
        </fieldset>
        <div className="mt3">
          <input
            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6"
            type="submit"
            value="Submit"
          />
        </div>
      </form>
    </div>
  );
};
