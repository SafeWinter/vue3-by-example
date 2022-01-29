import { mount } from '@vue/test-utils';
import Puzzles from '@/components/Puzzles.vue';

describe('Testing component Puzzles.vue', () => {
  it('should emit puzzle-changed event when play button is clicked.', () => {
    const wrapper = mount(Puzzles);
    wrapper.find('.play-button button').trigger('click');
    expect(wrapper.emitted()).toHaveProperty('puzzle-changed');
  });

  it('should emit puzzle-changed event with the puzzle ID when play button is clicked', () => {
    const wrapper = mount(Puzzles);
    wrapper.find('.play-button button').trigger('click');
    const puzzleChanged = wrapper.emitted('puzzle-changed');
    expect(puzzleChanged[0]).toEqual([wrapper.vm.puzzles[0].id]);
  });
});
