export type CategoryGroup = {
  group: string;
  items: string[];
};

export const categoryGroups: CategoryGroup[] = [
  {
    group: "Technology",
    items: [
      "Data Security",
      "Web Development",
      "Artificial Intelligence",
      "Cloud & DevOps",
      "Mobile Development",
    ],
  },
  {
    group: "Business",
    items: ["Finance", "Marketing", "Product Management", "Entrepreneurship"],
  },
  {
    group: "Science",
    items: ["Biology", "Physics", "Space", "Environment"],
  },
  {
    group: "Creative",
    items: ["Photography", "Cinematography", "Design", "Music"],
  },
  {
    group: "Personal Growth",
    items: ["Philosophy", "Psychology", "Productivity", "Health"],
  },
];

export const flatCategories = categoryGroups.flatMap((g) =>
  g.items.map((i) => ({ group: g.group, item: i, label: `${g.group} => ${i}` })),
);
