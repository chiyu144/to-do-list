import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../src/app';

// 測有沒有 ClassName="nav" 的元素（正確要有 3 個）
test('Have 3 Nav Btn', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(".nav").length).toBe(3);
});