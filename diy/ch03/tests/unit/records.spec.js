import { shallowMount } from "@vue/test-utils";
import "jest-localstorage-mock";
import Records from "@/components/Records.vue";

describe("Testing component Records.vue", () => {
  it("should retrieve records from local storage", () => {
    shallowMount(Records, {});
    expect(localStorage.getItem).toBeCalledWith("records");
  });
});
