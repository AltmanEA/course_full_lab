export function getStudents(): { name: string }[] {
  return [
    { name: "Ivan" },
    { name: "Anna" },
  ];
}

export function getStudentsNames(
  loadStudents: () => { name: string }[],
) {
  // TODO: реализовать повторное использование
}
