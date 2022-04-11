import ProgressTrack from "@/components/bpm/ProgressTrack.vue";
import { render } from "@testing-library/vue";

describe("ProgressTrack.vue", () => {
  it("should match snapshot with progress = 0", async () => {
    const { container } = render(ProgressTrack, {
      props: {
        progress: 0
      }
    });

    expect(container).toMatchSnapshot();
  });

  it("should match snapshot with progress = 60", async () => {
    const { container } = render(ProgressTrack, {
      props: {
        progress: 0.6
      }
    });

    expect(container).toMatchSnapshot();
  });

  it("should match snapshot with progress = 100", async () => {
    const { container } = render(ProgressTrack, {
      props: {
        progress: 1
      }
    });

    expect(container).toMatchSnapshot();
  });
});
