import { render, screen } from '@testing-library/react';
import App from './App';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {configure, shallow } from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

describe("App", ()=>{
  it("renders title page", ()=>{
   const wrapper = shallow(<App />)
    expect(wrapper.find('h1').text()).toContain("Wellcome to this page")
  
  })
})