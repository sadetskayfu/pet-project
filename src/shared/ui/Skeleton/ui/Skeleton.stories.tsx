import { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./Skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "shared/Skeleton",
  component: Skeleton,
  args: {
    borderRadius: 'm',
  },
}

export default meta;

type Story = StoryObj<typeof Skeleton>

export const Default: Story = {
    args: {
      style: {
        width: '40px',
        height: '40px'
      }
    }
};



