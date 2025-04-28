import React from 'react';

export default function About() {
  return (
    <div>
      <h1>About</h1>
      <button
        type="button"
        className="btn btn-primary"
        aria-haspopup="dialog"
        aria-expanded="false"
        aria-controls="basic-modal"
        data-overlay="#basic-modal"
      >
        {' '}
        Open modal{' '}
      </button>

      <div
        id="basic-modal"
        className="overlay modal overlay-open:opacity-100 hidden overlay-open:duration-300 bg-amber-200"
        role="dialog"
        tabIndex="-1"
      >
        <div className="modal-dialog overlay-open:opacity-100 overlay-open:duration-300 ">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Dialog Title</h3>
              <button
                type="button"
                className="btn btn-text btn-circle btn-sm absolute end-3 top-3"
                aria-label="Close"
                data-overlay="#basic-modal"
              >
                <span className="icon-[tabler--x] size-4"></span>
              </button>
            </div>
            <div className="modal-body">
              This is some placeholder content to show the scrolling behavior for modals. Instead of
              repeating the text in the modal, we use an inline style to set a minimum height,
              thereby extending the length of the overall modal and demonstrating the overflow
              scrolling. When content becomes longer than the height of the viewport, scrolling will
              move the modal as needed.
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-soft btn-secondary"
                data-overlay="#basic-modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
