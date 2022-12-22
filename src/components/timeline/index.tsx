import React from "react";
import { Link } from "gatsby";

export interface timelineItem {
  title?: string;
}

export interface sublineItem {
  link?: string;
  route?: string;
  time?: string;
  title?: number;
}

interface props {
  data: timelineItem[];
}

const Timeline = (props: props) => {
  const formatTime = (time: string) =>
    `${new Date(time).getMonth() + 1} 月 ${new Date(time).getUTCDate() + 1} 日`;
  const sortSublineByTime = (data: sublineItem[]) =>
    data.sort((a, b) => {
      const prev = new Date(a.time!).getTime();
      const next = new Date(b.time!).getTime();
      return next - prev;
    });
  const transferDate = (times: sublineItem[]) => {
    const years = new Map();
    sortSublineByTime(times);
    return times.reduce<sublineItem[]>((sum, next, index) => {
      const year = new Date(next.time!).getFullYear();
      if (!years.has(year) && Array.isArray(sum)) {
        years.set(year, sum.length);
        sum.push({ title: year });
      } else {
        const currentYear = years.get(year);
        const subline = sum[currentYear + 1];
        if (Array.isArray(subline)) {
          next.time = formatTime(next.time);
          subline.push(next);
          console.log(next, " next");
        } else {
          next.time = formatTime(next.time);
          sum[currentYear + 1] = [next];
        }
      }
      return sum;
    }, []);
  };

  const getData = (item1: timelineItem | sublineItem[], index: number) => {
    if (item1.title) {
      return (
        <div key={item1.title}>
          <h3>{item1.title}</h3>
        </div>
      );
    } else {
      return (
        <ul key={index}>
          {item1.map((item, index, arr) => {
            return (
              <li key={item.link}>
                <div>{item.time}</div>
                <Link to={item.route}>{item.link}</Link>
              </li>
            );
          })}
        </ul>
      );
    }
  };

  return <div>{transferDate(props.data).map(getData)}</div>;
};

const data = [
  { title: "2019" },
  [
    { time: "2020.1.1", link: "1231231", route: "www.baidu.com" },
    { time: "2020.1.1", link: "2131231", route: "www.baidu.com" },
    { time: "2020.1.1", link: "12312312", route: "www.baidu.com" },
    { time: "2020.1.1", link: "1231213", route: "www.baidu.com" },
  ],
  { title: "2020" },
  [
    { time: "2020.1.2", link: "1214124", route: "www.baidu.com" },
    { time: "2020.1.3", link: "123141", route: "www.baidu.com" },
    { time: "2020.1.4", link: "1231", route: "www.baidu.com" },
    { time: "2020.1.5", link: "15123", route: "www.baidu.com" },
  ],
];

Timeline.defaultProps = {
  data,
};

export default Timeline;
