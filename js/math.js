function BellCurve(Mean, Deviation, x) {
  //1 / (B2* SQRT(2 * PI())) ^ (EXP(1) ^ -((B3 - B1) ^ 2 / (2 * B2 ^ 2)))
  //1 / ((B2* SQRT(2 * PI())) ^ ((EXP(1) ^ (-(((B3 - B1) ^ 2) / (2 * (B2 ^ 2)))))))
  //1 / ((Deviation* Math.sqrt(2 * Math.PI)) ^ ((Math.E ^ (-(((x - Mean) ^ 2) / (2 * (Deviation ^ 2)))))))

  var Mean = 950;
  var Deviation = 200;
  var x = 850;

  let c1 = Deviation ^ 2;
  let c2 = 2 * c1;
  let c3 = x - Mean;
  let c4 = c3 ^ 2;
  let c5 = c4 / c2;
  let c6 = Math.E ^ -c5;
  let c7 = 2 * Math.PI;
  let c8 = Math.sqrt(c7);
  let c9 = Deviation * c8;
  let c10 = c9 ^ c6;
  let c11 = 1 / c10;

  console.log(c11);

  return c11;
}
BellCurve(950, 200, 850);

function BuildBellCurve(Mean, Deviation) {
  for (let index = 1; index < Mean; index++) {
    console.log(BellCurve(Mean, Deviation, index));
  }
}

BuildBellCurve(18, 3.75);

c1 = Deviation ^ 2;
c2 = 2 * c1;
c3 = x - Mean;
c4 = c3 ^ 2;
c5 = c4 / c2;
c6 = Math.E ^ (c5 * -1);
c7 = 2 * Math.PI;
c8 = Math.sqrt(c7);
c9 = Deviation * c8;
c10 = c9 ^ c6;
c11 = 1 / c10;

console.log(c11);
