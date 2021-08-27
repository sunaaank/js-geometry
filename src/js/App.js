import { $ } from '../utils/dom.js';
import { getData, getMockData } from '../api/api.js';

export default function App($el) {
  const updateData = async () => {
    console.log('dd');
    // const data = await getData(1);
    const data = await getMockData();
    console.log(data);
  };

  updateData();
}
