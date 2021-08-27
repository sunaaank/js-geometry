// 특정 조건에 따라 필터링
let hasVEC3 = data.accessors.filter((val) => val.type === 'VEC3');
hasVEC3;

// 배열 속 배열들 하나의 배열로 합치기
let nestedMax = data.accessors.map((val) => val.max);
let flat = nestedMax.reduce((acc, it) => [...acc, ...it], []);

// 위와 동일한 기능인데 성능 더 나음
let flat2 = [].concat.apply([], nested);

// 객체 key-value map 역전
let cities = {
  Lyon: 'France',
  Berlin: 'Germany',
  Paris: 'France',
};

let countries = Object.keys(cities).reduce((acc, k) => {
  let country = cities[k];
  acc[country] = [...(acc[country] || []), k];
  return acc;
}, {});

// A와 B 합집합 구하기
let arrA = [1, 4, 3, 2];
let arrB = [5, 2, 6, 7, 1];
[...new Set([...arrA, ...arrB])];

// A와 B 교집합 구하기
let arrA = [1, 4, 3, 2];
let arrB = [5, 2, 6, 7, 1];
arrA.filter((it) => arrB.includes(it)); // returns [1, 2]
