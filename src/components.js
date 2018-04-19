import React from "react";

export const SimpleList = ({ list }) => (
  <div className="pa3 pa5-ns">
    <ul className="list pl0 measure center">
      {list.map(x => (
        <li
          key={x.id}
          className="lh-copy pv3 ba bl-0 bt-0 br-0 b--dotted b--black-30"
        >
          {x.text}
        </li>
      ))}
    </ul>
  </div>
);

export const SimpleInput = ({ addFeedback }) => {
  let input;
  return (
    <div className="pa4-l">
      <form
        onSubmit={e => {
          e.preventDefault();
          addFeedback({ variables: { data: { text: input.value } } });
          input.value = "";
        }}
        className="bg-light-green mw7 center pa4 br2-ns ba b--black-10"
      >
        <fieldset className="cf bn ma0 pa0">
          <legend className="pa0 f5 f4-ns mb3 black-80">
            Leave some feedback
          </legend>
          <div className="cf">
            <label className="clip" htmlFor="feedback">
              Feedback
            </label>
            <input
              className="f6 f5-l input-reset bn fl black-80 bg-white pa3 lh-solid w-100 w-75-m w-80-l br2-ns br--left-ns"
              placeholder="Your Feedback"
              type="text"
              name="feedback"
              id="feedback"
              ref={node => {
                input = node;
              }}
            />
            <input
              className="f6 f5-l button-reset fl pv3 tc bn bg-animate bg-black-70 hover-bg-black white pointer w-100 w-25-m w-20-l br2-ns br--right-ns"
              type="submit"
              value="Submit"
            />
          </div>
        </fieldset>
      </form>
    </div>
  );
};
