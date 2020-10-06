const bgColors = ['rgba(153,0,51,0.4)', 'rgba(255,0,127,0.4)', 'rgba(255,0,42,0.4)', 'rgba(122,0,114,0.4)', 'rgba(157,0,181,0.4)', 'rgba(255,0,255,0.4)', 'rgba(189,12,125,0.4)', 'rgba(0,255,0,0.4)', 'rgba(157,219,0,0.4)', 'rgba(0,247,136,0.4)', 'rgba(82,120,0,0.4)', 'rgba(0,178,169,0.4)', 'rgba(0,255,255,0.4)', 'rgba(0,130,217,0.4)', 'rgba(0,69,138,0.4)', 'rgba(47,186,250,0.4)', 'rgba(210,252,252,0.4)', 'rgba(255,244,92,0.4)', 'rgba(255,255,0,0.4)', 'rgba(255,238,0,0.4)', 'rgba(255,174,0,0.4)', 'rgba(196,196,50,0.4)', 'rgba(107,55,0,0.4)', 'rgba(201,201,111,0.4)', 'rgba(168,112,0,0.4)', 'rgba(102,34,0,0.4)', 'rgba(68,63,62,0.4)', 'rgba(184,254,114,0.4)', 'rgba(252,84,0,0.4)', 'rgba(153,253,247,0.4)']
function str2Color(item) {
  let str = ''
  if (item.type !== 0) {
    str = String(item.type)
  } else if (item.data && item.data.content) {
    str = item.data.content
  }
  let res = 0
  let max = Math.min(50, str.length)
  for (let i = 0; i < max; i++) {
    res += str.charCodeAt(i)
  }
  return bgColors[res % bgColors.length]
}
export { str2Color }
