const data = {
  name: "Root Square",
  size: 100,
  color: "#ffffe0",
  children: [
    {
      name: "Branch 1",
      size: 25, // 1/4 of the root size
      color: "#fafac5",
      children: [
        {
          name: "Leaf 1.1",
          size: 6.25, // 1/4 of the branch size
          color: "#f0e68c",
          children: [
            { name: "Fruit 1.1.1", size: 1.5625, color: "#fa8072" }, // 1/4 of the leaf size
            { name: "Fruit 1.1.2", size: 1.5625, color: "#e9967a" },
            { name: "Fruit 1.1.3", size: 1.5625, color: "#ffa07a" },
          ],
        },
        {
          name: "Leaf 1.2",
          size: 6.25,
          color: "#f5f3b0",
          children: [
            { name: "Fruit 1.2.1", size: 1.5625, color: "#fa8072" },
            { name: "Fruit 1.2.2", size: 1.5625, color: "#e9967a" },
            { name: "Fruit 1.2.3", size: 1.5625, color: "#ffa07a" },
          ],
        },
        {
          name: "Leaf 1.3",
          size: 6.25,
          color: "#faebd7",
          children: [
            { name: "Fruit 1.3.1", size: 1.5625, color: "#fa8072" },
            { name: "Fruit 1.3.2", size: 1.5625, color: "#e9967a" },
            { name: "Fruit 1.3.3", size: 1.5625, color: "#ffa07a" },
          ],
        },
      ],
    },
    {
      name: "Branch 2",
      size: 25,
      color: "#d7ccc8",
      children: [
        {
          name: "Leaf 2.1",
          size: 6.25,
          color: "#c0bbb4",
          children: [
            { name: "Fruit 2.1.1", size: 1.5625, color: "#fa8072" },
            { name: "Fruit 2.1.2", size: 1.5625, color: "#e9967a" },
            { name: "Fruit 2.1.3", size: 1.5625, color: "#ffa07a" },
          ],
        },
        {
          name: "Leaf 2.2",
          size: 6.25,
          color: "#d3d3d3",
          children: [
            { name: "Fruit 2.2.1", size: 1.5625, color: "#fa8072" },
            { name: "Fruit 2.2.2", size: 1.5625, color: "#e9967a" },
            { name: "Fruit 2.2.3", size: 1.5625, color: "#ffa07a" },
          ],
        },
        {
          name: "Leaf 2.3",
          size: 6.25,
          color: "#a9a9a9",
          children: [
            { name: "Fruit 2.3.1", size: 1.5625, color: "#fa8072" },
            { name: "Fruit 2.3.2", size: 1.5625, color: "#e9967a" },
            { name: "Fruit 2.3.3", size: 1.5625, color: "#ffa07a" },
          ],
        },
      ],
    },
    {
      name: "Branch 3",
      size: 25,
      color: "#add8e6",
      children: [
        {
          name: "Leaf 3.1",
          size: 6.25,
          color: "#87ceeb",
          children: [
            { name: "Fruit 3.1.1", size: 1.5625, color: "#fa8072" },
            { name: "Fruit 3.1.2", size: 1.5625, color: "#e9967a" },
            { name: "Fruit 3.1.3", size: 1.5625, color: "#ffa07a" },
          ],
        },
        {
          name: "Leaf 3.2",
          size: 6.25,
          color: "#4682b4",
          children: [
            { name: "Fruit 3.2.1", size: 1.5625, color: "#fa8072" },
            { name: "Fruit 3.2.2", size: 1.5625, color: "#e9967a" },
            { name: "Fruit 3.2.3", size: 1.5625, color: "#ffa07a" },
          ],
        },
        {
          name: "Leaf 3.3",
          size: 6.25,
          color: "#b0c4de",
          children: [
            { name: "Fruit 3.3.1", size: 1.5625, color: "#fa8072" },
            { name: "Fruit 3.3.2", size: 1.5625, color: "#e9967a" },
            { name: "Fruit 3.3.3", size: 1.5625, color: "#ffa07a" },
          ],
        },
      ],
    },
    {
      name: "Branch 4",
      size: 25,
      color: "#ffdead",
      children: [
        {
          name: "Leaf 4.1",
          size: 6.25,
          color: "#ffdab9",
          children: [
            { name: "Fruit 4.1.1", size: 1.5625, color: "#fa8072" },
            { name: "Fruit 4.1.2", size: 1.5625, color: "#e9967a" },
            { name: "Fruit 4.1.3", size: 1.5625, color: "#ffa07a" },
          ],
        },
        {
          name: "Leaf 4.2",
          size: 6.25,
          color: "#ffe4b5",
          children: [
            { name: "Fruit 4.2.1", size: 1.5625, color: "#fa8072" },
            { name: "Fruit 4.2.2", size: 1.5625, color: "#e9967a" },
            { name: "Fruit 4.2.3", size: 1.5625, color: "#ffa07a" },
          ],
        },
        {
          name: "Leaf 4.3",
          size: 6.25,
          color: "#ffebcd",
          children: [
            { name: "Fruit 4.3.1", size: 1.5625, color: "#fa8072" },
            { name: "Fruit 4.3.2", size: 1.5625, color: "#e9967a" },
            { name: "Fruit 4.3.3", size: 1.5625, color: "#ffa07a" },
          ],
        },
      ],
    },
  ],
};
