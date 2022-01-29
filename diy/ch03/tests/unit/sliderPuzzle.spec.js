import { mount } from '@vue/test-utils';
import SliderPuzzle from '@/components/SliderPuzzle.vue';
import 'jest-localstorage-mock';

describe('Testing component SliderPuzzle.vue', () => {
  it('No.1: inserts the index of the image to swap when we click on an image', () => {
    const wrapper = mount(SliderPuzzle);
    wrapper.find('#start-button').trigger('click');
    wrapper.find('img').trigger('click');
    expect(wrapper.vm.indexesToSwap.length).toBeGreaterThan(0);
  });

  it('No.2: swaps the image order when 2 images are clicked', () => {
    const wrapper = mount(SliderPuzzle);
    wrapper.find('#start-button').trigger('click');

    const [img01, img02] = wrapper.vm.shuffledPuzzleArray;

    wrapper.get('.column:nth-child(1) img').trigger('click');
    wrapper.get('.column:nth-child(2) img').trigger('click');

    expect(wrapper.vm.indexesToSwap.length).toBe(0);
    const [img11, img12] = wrapper.vm.shuffledPuzzleArray;
    expect(img01).toBe(img12);
    expect(img02).toBe(img11);
  });

  it('No.3: starts timer when start method is called', () => {
    jest.spyOn(window, 'setInterval');
    const wrapper = mount(SliderPuzzle);
    wrapper.vm.start();
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);
  });

  it('No.4: stops timer when stop method is called', () => {
    jest.spyOn(window, 'clearInterval');
    const wrapper = mount(SliderPuzzle);
    wrapper.vm.stop();
    expect(clearInterval).toHaveBeenCalledTimes(1);
  });

  it('No.5: records record to local storage.', () => {
    const wrapper = mount(SliderPuzzle, {
      data() {
        const now = new Date();
        return {
          startDateTime: now,
          currentDateTime: now,
        };
      },
    });
    wrapper.vm.recordSpeedRecords();
    const { elapsedDiff, elapsedTime } = wrapper.vm;
    const target = JSON.stringify([{ elapsedDiff, elapsedTime }]);
    expect(localStorage.setItem).toHaveBeenCalledWith('records', target);
  });

  it('No.6: starts timer with Start button is clicked', () => {
    jest.spyOn(window, 'setInterval');
    const wrapper = mount(SliderPuzzle);
    wrapper.find('#start-button').trigger('click');
    expect(setInterval).toHaveBeenCalledTimes(1);
  });

  it('No.7: stops timer with Quit button is clicked', () => {
    jest.spyOn(window, 'clearInterval');
    const wrapper = mount(SliderPuzzle);
    wrapper.find('#quit-button').trigger('click');
    expect(clearInterval).toHaveBeenCalledTimes(1);
  });

  it('No.8: shows the elapsed time', () => {
    const wrapper = mount(SliderPuzzle, {
      data() {
        return {
          startDateTime: new Date(2021, 0, 1, 0, 0, 0),
          currentDateTime: new Date(2021, 0, 1, 0, 0, 1),
        };
      },
    });
    expect(wrapper.html()).toContain('00:00:01');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
