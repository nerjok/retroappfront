export enum TopicStatus {
  New,
  InProgress,
  Blocked,
  Finnished,
  Deleted,
}

interface TopicStatuses {
  value: number;
  title: string;
}
export const topicStatus = Object.values(TopicStatus).reduce<TopicStatuses[]>
((acc: TopicStatuses[], value: string | TopicStatus, index: number) => {
  if (typeof value === 'string') {
    // acc[index] = value;
    acc.push({value: index, title: value})
  }
  return acc;
}, []);
