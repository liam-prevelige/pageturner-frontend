import React from 'react';
import Form from 'react-bootstrap/Form';

export const PreferenceList = ({name}) => {
  return (
    <div>
      <h3>
        {name}&apos;s List
      </h3>
      <h5>
        What would you like to see here?
      </h5>
      <Form>
        <Form.Check type='checkbox' id='1' label='Popular Community Content'/>
        <Form.Check type='checkbox' id='2' label='Posts by your Friends'/>
        <Form.Check type='checkbox' id='3' label='BookFinder Curated Feed'/>
        <Form.Check type='checkbox' id='4' label='Community Reading Metrics'/>
      </Form>
    </div>
  );
};
